import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_URL}/home/all-services`);
        if (response.ok) {
          const data = await response.json();
          setServices(data);
          setFilteredServices(data);
        } else {
          // If API fails, use fallback data
          const mockServices = [
            {
              id: 1,
              title: 'Home Cleaning',
              description: 'Professional cleaning service for your entire home. Includes dusting, vacuuming, mopping, and sanitizing.',
              price: 90,
              category: 'cleaning',
              image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=350&q=80'
            },
            {
              id: 2,
              title: 'Plumbing Repair',
              description: 'Expert plumbing solutions for leaks, clogs, installations, and general plumbing maintenance.',
              price: 75,
              category: 'plumbing',
              image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=350&q=80'
            },
            {
              id: 3,
              title: 'Electrical Services',
              description: 'Professional electrical work including installations, repairs, and safety inspections.',
              price: 95,
              category: 'electrical',
              image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=350&q=80'
            },
            {
              id: 4,
              title: 'Home Painting',
              description: 'Interior and exterior painting services with professional techniques and quality materials.',
              price: 120,
              category: 'repair',
              image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=350&q=80'
            },
            {
              id: 5,
              title: 'Appliance Repair',
              description: 'Expert repairs for all major household appliances, including refrigerators, washers, and dryers.',
              price: 85,
              category: 'repair',
              image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=350&q=80'
            },
            {
              id: 6,
              title: 'Landscaping & Gardening',
              description: 'Professional garden design, maintenance, and lawn care services to beautify your outdoor space.',
              price: 110,
              category: 'garden',
              image: 'https://images.unsplash.com/photo-1599685315640-4ddc088c0ba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=350&q=80'
            }
          ];
          setServices(mockServices);
          setFilteredServices(mockServices);
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

  // Filter services based on search term and category
  useEffect(() => {
    const filtered = services.filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === '' || service.category === category;
      return matchesSearch && matchesCategory;
    });
    setFilteredServices(filtered);
  }, [searchTerm, category, services]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleBookNow = (serviceId) => {
    // In a real implementation, this would redirect to a booking page or show a modal
    console.log('Book service with ID:', serviceId);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Our Services</h1>
        
        {/* Search & Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input 
                  type="text" 
                  id="search-services" 
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5" 
                  placeholder="Search for services..." 
                />
              </div>
            </div>
            <div className="flex-shrink-0">
              <select 
                id="service-category" 
                value={category}
                onChange={handleCategoryChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              >
                <option value="">All Categories</option>
                <option value="cleaning">Cleaning</option>
                <option value="repair">Repair & Maintenance</option>
                <option value="electrical">Electrical</option>
                <option value="plumbing">Plumbing</option>
                <option value="garden">Gardening & Landscaping</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Services Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-primary-600 border-solid rounded-full loading-spinner"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No services match your search criteria. Please try a different search or browse all categories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => (
              <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img className="w-full h-48 object-cover" src={service.image} alt={service.title} />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-600 font-bold">From ${service.price}</span>
                    <button 
                      onClick={() => handleBookNow(service.id)}
                      className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
