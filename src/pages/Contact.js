import React, { useState } from 'react';
import { createContact } from '../services/api';
import { handleApiError } from '../utils/errorUtils';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const { name, email, subject, message } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await createContact(formData);
      setSuccess('Thank you for your message! We will get back to you soon.');
      setError('');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setError(handleApiError(err));
      setSuccess('');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Contact Our Health Experts</h2>
        <p>Have questions or suggestions? Our team of health professionals is here to help you. Fill out the form below and we'll get back to you within 24 hours.</p>
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              placeholder="Enter your email address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={onChange}
              required
              placeholder="What is this regarding?"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={message}
              onChange={onChange}
              required
              placeholder="Please provide as much detail as possible..."
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;