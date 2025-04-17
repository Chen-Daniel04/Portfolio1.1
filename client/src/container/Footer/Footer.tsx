import React, { useState } from 'react';
import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './Footer.scss';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Footer = () => {
  const [formData, setFormData] = useState<FormData>({ 
    name: '', 
    email: '', 
    message: '' 
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
        setFormData({ name: '', email: '', message: '' }); // Clear form on success
      })
      .catch((err: Error) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:pyiheinaung92@gmail.com" className="p-text">pyiheinaung92@gmail.com</a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <a href="tel:+959966341128" className="p-text">+95 9966341128</a>
        </div>
      </div>

      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input 
              className="p-text" 
              type="text" 
              placeholder="Your Name" 
              name="name" 
              value={name} 
              onChange={handleChangeInput} 
              required
            />
          </div>
          <div className="app__flex">
            <input 
              className="p-text" 
              type="email" 
              placeholder="Your Email" 
              name="email" 
              value={email} 
              onChange={handleChangeInput} 
              required
            />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
              required
              rows={5}
            />
          </div>
          <button 
            type="button" 
            className="p-text" 
            onClick={handleSubmit}
            disabled={loading || !name || !email || !message}
          >
            {!loading ? 'Send Message' : 'Sending...'}
          </button>
        </div>
      ) : (
        <div className="app__footer-thankyou">
          <h3 className="head-text">Thank you for getting in touch!</h3>
          <p className="p-text" style={{ marginTop: 10 }}>
            I'll respond to your message as soon as possible.
          </p>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);