import React, { useState } from 'react';
import { API_URL } from '../config';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, we would call the contact API
      const response = await fetch(`${API_URL}/home/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to send message');
      }
    } catch (err) {
      console.error('Error sending contact form:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
        
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <span className="material-symbols-rounded text-primary-600">location_on</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">Our Office</h2>
            <p className="text-gray-600">Lab No.- 402, Fourth Floor, Maharaja Surajmal Institute Of Technology<br />Jankpuri, East-Delhi 110095<br />India</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <span className="material-symbols-rounded text-primary-600">phone</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">Phone</h2>
            <p className="text-gray-600">Support: +91 7982846697 (Doraemnon) <br />Sales: +91 7982846697 (Doraemon) <br />Mon-Fri, 9AM-6PM ET</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <span className="material-symbols-rounded text-primary-600">email</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">Email</h2>
            <p className="text-gray-600">info@nesthome.com<br />support@nesthome.com<br />sales@nesthome.com</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          
          {success ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> Your message has been sent. We'll get back to you shortly.</span>
            </div>
          ) : null}
          
          {error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          ) : null}
          
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" 
                  placeholder="John Doe" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" 
                  placeholder="name@example.com" 
                  required 
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="subject" className="block text-gray-700 text-sm font-medium mb-2">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" 
                placeholder="Let us know how we can help you" 
                required 
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-2">Your Message</label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6" 
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" 
                placeholder="Leave a comment..." 
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className={`py-3 px-5 text-sm font-medium text-center text-white rounded-lg ${loading ? 'bg-primary-400' : 'bg-primary-600 hover:bg-primary-700'} focus:ring-4 focus:outline-none focus:ring-primary-300`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-solid rounded-full mr-2 loading-spinner"></div>
                  Sending...
                </span>
              ) : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
