import React from 'react';
import { motion } from 'framer-motion';
// import { AppWrap } from '../../wrapper';
import { images } from '../../constants';
import './Header.scss';

import { AppWrap } from '../../wrapper';

// Define type for scaleVariants
const scaleVariants = {
  whileInView: {
    scale: [0, 1] as [number, number],
    opacity: [0, 1] as [number, number],
    transition: {
      duration: 1,
      ease: 'easeInOut' as const,
    },
  },
};

const Header: React.FC = () => (
  <div className="app__header app__flex">
    <motion.div
      whileInView={{ x: [-100, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      className="app__header-info"
    >
      <div className="app__header-badge">
        <div className="badge-cmp app__flex">
          <span>👋</span>
          <div style={{ marginLeft: 20 }}>
            <p className="p-text">Hello, I am</p>
            <h1 className="head-text">Pyi Hein Aung (Daniel)</h1>
          </div>
        </div>

        <div className="tag-cmp app__flex">
          <p className="p-text">Fullstack Developer (Mobile & Web)</p>
          <p className="p-text">Digital Entrepreneur</p>
        </div>
      </div>
    </motion.div>

    <motion.div
      whileInView={{ opacity: [0, 1] }}
      transition={{ duration: 0.5, delayChildren: 0.5 }}
      className="app__header-img"
    >
      <img src={images.daniel_portfolio} alt="profile_bg" />
      <motion.img
        whileInView={{ scale: [0, 1] }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        src={images.circle}
        alt="profile_circle"
        className="overlay_circle"
      />
    </motion.div>

    <motion.div
      variants={scaleVariants}
      whileInView={scaleVariants.whileInView}
      className="app__header-circles"
    >
      {[images.java, images.node, images.firebase].map((circle, index) => (
        <div className="circle-cmp app__flex" key={`circle-${index}`}>
          <img src={circle} alt={`skill-${index}`} />
        </div>
      ))}
    </motion.div>
  </div>
);

export default AppWrap(Header, 'home');