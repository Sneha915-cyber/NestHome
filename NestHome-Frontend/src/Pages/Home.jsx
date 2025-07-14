import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import { API_URL } from '../config';
import ac_repair from "../assets/AC service.jpeg";
import maid from "../assets/Maid.jpeg";
import electrical from "../assets/Electrician.jpeg";
import plumbing from "../assets/Plumber.jpeg";
const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_URL}/home/services`);
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        } else {
          setServices([
            {
              id: 1,  
              infoimage: ac_repair,
              title: 'AC Servicing',
              description: 'Professional air conditioning cleaning, repair, and maintenance services for all major brands.',
              icon: 'ac_unit'
            },
            {
              id: 2,
              infoimage: maid,
              title: 'Maid Service',
              description: 'Professional cleaning service for your entire home. Includes dusting, vacuuming, mopping, and sanitizing.',
              icon: 'cleaning_services'
            },
            {
              id: 3,
              title: 'Electrical',
              infoimage: electrical,
              description: 'Licensed electricians for wiring, lighting installation, and electrical troubleshooting.',
              icon: 'electrical_services'
            },
            {
              id: 4,
              title: 'Plumbing',
              infoimage: plumbing,
              description: 'Expert plumbing solutions including leak repairs, pipe installations, and fixture replacements.',
              icon: 'plumbing'
            }
          ]);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);
  const testimonials = [
    {
      id: 1,
      text: "The cleaning service was excellent! The professional was thorough and friendly. Will definitely book again.",
      author: "Jane Smith",
      location: "New York, NY",
      rating: 5,
      initials: "JS"
    },
    {
      id: 2,
      text: "Had a great experience with the plumbing service. Fixed my issue quickly and charged a fair price.",
      author: "Robert Johnson",
      location: "Chicago, IL",
      rating: 5,
      initials: "RJ"
    },
    {
      id: 3,
      text: "The electrical service was fantastic! The technician was knowledgeable and completed the work faster than expected.",
      author: "Maria Lopez",
      location: "Miami, FL",
      rating: 5,
      initials: "ML"
    },
  ];

  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <section className="first py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="textcontainer">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Find the perfect service for your home</h1>
            <p className="text-lg text-gray-600 mb-6">Book trusted professionals for all your home service needs. Quality work, guaranteed.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300">
                Browse Services
                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </Link>
              <Link to="/register" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
                Join as Professional
              </Link>
            </div>
          </div>
          <div className="card_container grid grid-cols-2 gap-4">
            {loading ? (
              <div className="col-span-2 flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-primary-600 border-solid rounded-full loading-spinner"></div>
              </div>
            ) : error ? (
              <div className="col-span-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            ) : (
              services.map(service => (
                <Card 
                  key={service.id}
                  infoimage={service.infoimage}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-gray-50 rounded-xl my-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Choose a Service</h3>
              <p className="text-gray-600">Browse through our wide range of home services.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Book a Professional</h3>
              <p className="text-gray-600">Select from our verified professionals based on ratings and reviews.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Get it Done</h3>
              <p className="text-gray-600">Your professional arrives and completes the job to your satisfaction.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium mr-3">{testimonial.initials}</div>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
