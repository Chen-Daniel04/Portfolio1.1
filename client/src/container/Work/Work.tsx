import { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Work.scss';

interface WorkItem {
  _id: string;
  name: string;
  title: string;
  description: string;
  projectLink: string;
  codeLink: string;
  imageUrl: any;
  tags: string[];
}

const Work = () => {
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [filterWork, setFilterWork] = useState<WorkItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch<WorkItem[]>(query)
      .then((data) => {
        const validWorks = data.filter(work => work.imageUrl);
        setWorks(validWorks);
        setFilterWork(validWorks);
      })
      .catch(error => {
        console.error('Error fetching works:', error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleWorkFilter = (item: string) => {
    setActiveFilter(item);
    setAnimateCard({ y: 100, opacity: 0 });

    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });

      if (item === 'All') {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="app__flex" style={{ height: '100vh' }}>
        <h2 className="head-text">Loading Portfolio...</h2>
      </div>
    );
  }

  return (
    <>
      <h2 className="head-text">My Creative <span>Portfolio</span> Section</h2>

      <div className="app__work-filter">
        {['Web App', 'Mobile App', 'AI & IoT', 'Certificates', 'All'].map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.length > 0 ? (
          filterWork.map((work) => (
            <div className="app__work-item app__flex" key={work._id}>
              <div className="app__work-img app__flex">
                <img 
                  src={urlFor(work.imageUrl).url()} 
                  alt={work.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />

                <motion.div
                  whileHover={{ opacity: [0, 1] }}
                  transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                  className="app__work-hover app__flex"
                >
                  {work.projectLink && (
                    <a href={work.projectLink} target="_blank" rel="noreferrer">
                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.90] }}
                        transition={{ duration: 0.25 }}
                        className="app__flex"
                      >
                        <AiFillEye />
                      </motion.div>
                    </a>
                  )}
                  {work.codeLink && (
                    <a href={work.codeLink} target="_blank" rel="noreferrer">
                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.90] }}
                        transition={{ duration: 0.25 }}
                        className="app__flex"
                      >
                        <AiFillGithub />
                      </motion.div>
                    </a>
                  )}
                </motion.div>
              </div>

              <div className="app__work-content app__flex">
                <h4 className="bold-text">{work.title}</h4>
                <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>

                <div className="app__work-tag app__flex">
                  <p className="p-text">{work.tags?.[0] || ''}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="app__flex" style={{ width: '100%' }}>
            <h2 className="head-text">No projects found</h2>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg',
);