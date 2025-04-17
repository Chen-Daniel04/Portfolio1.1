import  { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Testimonial.scss';

interface Testimonial {
  _id: string;
  name: string;
  company: string;
  imageurl: any; // Sanity image type
  feedback: string;
}

interface Brand {
  _id: string;
  name: string;
  imgUrl: any; // Sanity image type
}

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  const handleClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = '*[_type == "testimonials"]';
        const brandsQuery = '*[_type == "brands"]';

        const [testimonialsData, brandsData] = await Promise.all([
          client.fetch<Testimonial[]>(query),
          client.fetch<Brand[]>(brandsQuery)
        ]);

        setTestimonials(testimonialsData);
        setBrands(brandsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="app__flex" style={{ height: '100vh' }}>
        <h2 className="head-text">Loading Testimonials...</h2>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="app__flex" style={{ height: '100vh' }}>
        <h2 className="head-text">No testimonials found</h2>
      </div>
    );
  }

  return (
    <>
      <div className="app__testimonial-item app__flex">
        {testimonials[currentIndex].imageurl && (
          <img 
            src={urlFor(testimonials[currentIndex].imageurl).url()} 
            alt={testimonials[currentIndex].name} 
          />
        )}
        <div className="app__testimonial-content">
          <p className="p-text">{testimonials[currentIndex].feedback}</p>
          <div>
            <h4 className="bold-text">{testimonials[currentIndex].name}</h4>
            <h5 className="p-text">{testimonials[currentIndex].company}</h5>
          </div>
        </div>
      </div>

      <div className="app__testimonial-btns app__flex">
        <div 
          className="app__flex" 
          onClick={() => handleClick(
            currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
          )}
        >
          <HiChevronLeft />
        </div>

        <div 
          className="app__flex" 
          onClick={() => handleClick(
            currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1
          )}
        >
          <HiChevronRight />
        </div>
      </div>

      <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: 'tween' }}
            key={brand._id}
          >
            {brand.imgUrl && (
              <img src={urlFor(brand.imgUrl).url()} alt={brand.name} />
            )}
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, 'app__testimonial'),
  'testimonial',
  'app__primarybg',
);