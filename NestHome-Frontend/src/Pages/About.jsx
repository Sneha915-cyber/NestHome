import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About NestHome</h1>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            At NestHome, we're dedicated to transforming the home service industry by connecting homeowners with trusted professionals. 
            Our mission is to create a seamless, reliable platform where high-quality home services are accessible to everyone.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-6">
            Founded in 2023, NestHome was born from a simple observation: finding reliable home service professionals was unnecessarily difficult. 
            Our team experienced firsthand the challenges of searching for verified professionals, comparing quotes, and ensuring quality work.
          </p>
          <p className="text-gray-600 mb-6">
            We built NestHome to solve these problems, creating a platform that vets all professionals, streamlines booking, and guarantees customer satisfaction.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 p-5 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <span className="material-symbols-rounded text-primary-600">verified</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Trust & Quality</h3>
              <p className="text-gray-600 text-sm">We rigorously vet all professionals on our platform to ensure the highest quality service.</p>
            </div>
            <div className="bg-gray-50 p-5 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <span className="material-symbols-rounded text-primary-600">support_agent</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Customer Satisfaction</h3>
              <p className="text-gray-600 text-sm">We stand behind every job, ensuring our customers are completely satisfied with their experience.</p>
            </div>
            <div className="bg-gray-50 p-5 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <span className="material-symbols-rounded text-primary-600">handshake</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Community Growth</h3>
              <p className="text-gray-600 text-sm">We're committed to helping local professionals grow their businesses and serve their communities.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-600 text-2xl font-bold">RK</div>
              <h3 className="font-semibold text-gray-800">Ritesh Kumar</h3>
              <p className="text-gray-600 text-sm">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-600 text-2xl font-bold">DR</div>
              <h3 className="font-semibold text-gray-800">Doraemon</h3>
              <p className="text-gray-600 text-sm">CTO</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-600 text-2xl font-bold">SN</div>
              <h3 className="font-semibold text-gray-800">Senha</h3>
              <p className="text-gray-600 text-sm">Head of Operations</p>
            </div>
          </div>
        </div>
        
        <div className="bg-primary-50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-6">
            Whether you're a homeowner looking for quality service or a professional looking to grow your business, 
            NestHome is the community for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/register" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300">
              Sign Up Today
              <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </a>
            <a href="/contact" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
