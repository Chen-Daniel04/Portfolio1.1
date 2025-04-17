import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './About.scss';
import { client, urlFor } from '../../client';
import { AppWrap } from '../../wrapper';

interface AboutItem {
  _id: string;
  title: string;
  description: string;
  imageUrl?: {
    asset?: {
      _ref?: string;
    };
  };
}

const About: React.FC = () => {
  const [abouts, setAbouts] = useState<AboutItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = '*[_type == "abouts"]';
    
    client.fetch<AboutItem[]>(query)
      .then((data) => {
        setAbouts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching about data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="app__flex" style={{ height: '100vh' }}>
        <h2 className="head-text">Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <h2 className="head-text">
        The Technopreneur:
        <br />
        <span>Developing, </span>
        <span>Innovating, </span>
        <span>Achieving</span>
      </h2>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="app__profile-item"
            key={`${about._id}-${index}`}
          >
            {about.imageUrl?.asset?._ref && (
              <img 
                src={urlFor(about.imageUrl).url()}
                alt={about.title || `About ${index}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(About, 'about');