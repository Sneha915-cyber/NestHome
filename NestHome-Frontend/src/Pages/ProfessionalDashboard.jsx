import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { API_URL } from '../config';

const ProfessionalDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    pending: 0,
    active: 0,
    completed: 0,
    earnings: 0
  });
  const [upcomingRequests, setUpcomingRequests] = useState([]);
  const [professionalServices, setProfessionalServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch dashboard statistics
        const statsResponse = await fetch(`${API_URL}/professional/dashboard-stats`, {
          method: 'GET',
          credentials: 'include',
        });
        
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }
        
        // Fetch upcoming service requests
        const requestsResponse = await fetch(`${API_URL}/professional/upcoming-requests`, {
          method: 'GET',
          credentials: 'include',
        });
        
        if (requestsResponse.ok) {
          const requestsData = await requestsResponse.json();
          setUpcomingRequests(requestsData);
        }
        
        // Fetch professional services
        const servicesResponse = await fetch(`${API_URL}/professional/my-services`, {
          method: 'GET',
          credentials: 'include',
        });
        
        if (servicesResponse.ok) {
          const servicesData = await servicesResponse.json();
          setProfessionalServices(servicesData);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  const handleAcceptRequest = async (requestId) => {
    try {
      const response = await fetch(`${API_URL}/professional/accept-request/${requestId}`, {
        method: 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        // Update the UI to reflect the change
        setUpcomingRequests(prevRequests => 
          prevRequests.map(request => 
            request.id === requestId 
              ? { ...request, status: 'ACCEPTED' } 
              : request
          )
        );
      } else {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to accept request');
      }
    } catch (err) {
      console.error('Error accepting request:', err);
      alert('Failed to accept request. Please try again.');
    }
  };

  const handleDeclineRequest = async (requestId) => {
    try {
      const response = await fetch(`${API_URL}/professional/decline-request/${requestId}`, {
        method: 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        // Update the UI to reflect the change
        setUpcomingRequests(prevRequests => 
          prevRequests.filter(request => request.id !== requestId)
        );
      } else {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to decline request');
      }
    } catch (err) {
      console.error('Error declining request:', err);
      alert('Failed to decline request. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-primary-600 border-solid rounded-full loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  // Mock data for UI display if API doesn't return data
  const mockUpcomingRequests = [
    {
      id: 1,
      service: 'Plumbing Repair',
      client: 'John Doe',
      dateTime: 'May 26, 2023, 10:00 AM',
      status: 'PENDING'
    },
    {
      id: 2,
      service: 'Water Heater Installation',
      client: 'Maria Garcia',
      dateTime: 'May 27, 2023, 2:00 PM',
      status: 'ACCEPTED'
    },
    {
      id: 3,
      service: 'Sink Installation',
      client: 'Robert Johnson',
      dateTime: 'May 29, 2023, 11:30 AM',
      status: 'PENDING'
    }
  ];

  const mockProfessionalServices = [
    {
      id: 1,
      name: 'Plumbing Services',
      description: 'Professional plumbing services including repairs, installations, and maintenance.',
      rate: 75,
      jobs: 16,
      status: 'ACTIVE'
    },
    {
      id: 2,
      name: 'Water Heater Specialist',
      description: 'Installation and repair of water heaters, including tankless systems.',
      rate: 85,
      jobs: 9,
      status: 'ACTIVE'
    },
    {
      id: 3,
      name: 'Bathroom Remodeling',
      description: 'Full bathroom remodeling services, from fixtures to tiling.',
      rate: 95,
      jobs: 3,
      status: 'ACTIVE'
    }
  ];

  const displayRequests = upcomingRequests.length > 0 ? upcomingRequests : mockUpcomingRequests;
  const displayServices = professionalServices.length > 0 ? professionalServices : mockProfessionalServices;

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                {user?.username ? user.username.charAt(0).toUpperCase() : 'J'}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user?.username || 'Jane Smith'}</h1>
                <p className="text-gray-600">Professional Dashboard</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 border border-gray-300 rounded-lg flex items-center">
                <span className="material-symbols-rounded mr-1">calendar_month</span>
                Manage Schedule
              </button>
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 border border-gray-300 rounded-lg flex items-center">
                <span className="material-symbols-rounded mr-1">settings</span>
                Settings
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Pending</h2>
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium py-1 px-2 rounded-md">{stats.pending || 5} New</span>
            </div>
            <div className="text-4xl font-bold text-yellow-600">{stats.pending || 5}</div>
            <p className="text-gray-600">Service requests awaiting response</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Active</h2>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium py-1 px-2 rounded-md">{stats.active || 3} Jobs</span>
            </div>
            <div className="text-4xl font-bold text-blue-600">{stats.active || 3}</div>
            <p className="text-gray-600">Service jobs in progress</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Completed</h2>
              <span className="bg-green-100 text-green-800 text-sm font-medium py-1 px-2 rounded-md">{stats.completed || 28} Total</span>
            </div>
            <div className="text-4xl font-bold text-green-600">{stats.completed || 28}</div>
            <p className="text-gray-600">Completed service jobs</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Earnings</h2>
              <span className="bg-primary-100 text-primary-800 text-sm font-medium py-1 px-2 rounded-md">This Month</span>
            </div>
            <div className="text-4xl font-bold text-primary-600">${stats.earnings || 1850}</div>
            <p className="text-gray-600">Total earnings for May</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Service Requests</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3">Service</th>
                    <th scope="col" className="px-4 py-3">Client</th>
                    <th scope="col" className="px-4 py-3">Date & Time</th>
                    <th scope="col" className="px-4 py-3">Status</th>
                    <th scope="col" className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayRequests.map((request) => (
                    <tr key={request.id} className="bg-white border-b hover:bg-gray-50">
                      <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                        {request.service}
                      </th>
                      <td className="px-4 py-3">
                        {request.client}
                      </td>
                      <td className="px-4 py-3">
                        {request.dateTime}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`${
                          request.status === 'ACCEPTED' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        } text-xs font-medium px-2 py-0.5 rounded`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {request.status === 'PENDING' ? (
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleAcceptRequest(request.id)}
                              className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-md text-xs px-2 py-1"
                            >
                              Accept
                            </button>
                            <button 
                              onClick={() => handleDeclineRequest(request.id)}
                              className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-md text-xs px-2 py-1"
                            >
                              Decline
                            </button>
                          </div>
                        ) : (
                          <button className="text-primary-600 hover:underline font-medium text-xs">Details</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Your Services</h2>
            
            <div className="space-y-4">
              {displayServices.map((service) => (
                <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{service.name}</h3>
                    <div className="flex items-center">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded mr-2">{service.status}</span>
                      <button className="text-gray-500 hover:text-gray-700">
                        <span className="material-symbols-rounded">edit</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Rate: <span className="text-primary-600 font-medium">${service.rate}/hour</span></span>
                    <span className="text-gray-600">Jobs: <span className="font-medium">{service.jobs}</span></span>
                  </div>
                </div>
              ))}
              
              <button className="w-full bg-primary-50 hover:bg-primary-100 text-primary-600 font-medium py-2 rounded-lg flex items-center justify-center">
                <span className="material-symbols-rounded mr-1">add</span>
                Add New Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
