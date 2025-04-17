import React from 'react';
import { FaLinkedinIn, FaFacebookF, FaLine } from 'react-icons/fa';

const SocialMedia: React.FC = () => {
  // Replace these with your actual profile URLs
  const socialLinks = {
    line: 'https://line.me/ti/p/gvbDU4FLGB',
    linkedin: 'https://linkedin.com/in/pyi-hein-aung-66a417244',
    facebook: 'https://www.facebook.com/share/16CGisjViH/?mibextid=wwXIfr'
  };

  const handleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };


  return (
    <div className='app__social'>
        <div 
          onClick={() => handleClick(socialLinks.line)}
          style={{ cursor: 'pointer' }}
          aria-label="Visit our Line profile"
        >
            <FaLine />
        </div>
        <div 
          onClick={() => handleClick(socialLinks.linkedin)}
          style={{ cursor: 'pointer' }}
          aria-label="Visit our LinkedIn profile"
        >
            <FaLinkedinIn />
        </div>
        <div 
          onClick={() => handleClick(socialLinks.facebook)}
          style={{ cursor: 'pointer' }}
          aria-label="Visit our Facebook profile"
        >
            <FaFacebookF />
        </div>
    </div>
  );
};

export default SocialMedia;