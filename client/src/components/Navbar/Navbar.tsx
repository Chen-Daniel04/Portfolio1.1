import React, { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import './Navbar.scss';
import CV from '../../assets/CV.pdf'; // Adjust the path as necessary

const Navbar: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const navItems = ['home', 'about', 'work', 'skills', 'contact'];
  
  // Function to handle PDF download
  const handleDownload = () => {
    // Replace with your actual PDF file path
    const pdfUrl = CV;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'PYIHEINAUNG_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <button 
          className="download-btn"
          onClick={handleDownload}
        >
          Download CV
        </button>
      </div>
      
      <ul className="app__navbar-links">
        {navItems.map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {navItems.map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <button 
                  className="download-btn mobile-download-btn"
                  onClick={() => {
                    handleDownload();
                    setToggle(false);
                  }}
                >
                  Download CV
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;