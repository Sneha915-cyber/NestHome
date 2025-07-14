import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { API_URL } from '../config';

const UserDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    active: 0,
    completed: 0,
    upcoming: 0
  });
  const [serviceRequests, setServiceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch dashboard statistics
        const statsResponse = await fetch(`${API_URL}/user/dashboard-stats`, {
          method: 'GET',
          credentials: 'include',
        });
        
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }
        
        // Fetch service requests
        const requestsResponse = await fetch(`${API_URL}/user/service-requests`, {
          method: 'GET',
          credentials: 'include',
        });
        
        if (requestsResponse.ok) {
          const requestsData = await requestsResponse.json();
          setServiceRequests(requestsData);
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

  const handleCreateRequest = () => {
    // In a real implementation, this would navigate to a request creation page or open a modal
    window.location.href = '/services';
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

  // Use mock data for UI display if API doesn't return data
  const mockServiceRequests = [
    {
      id: 1,
      service: 'Plumbing Repair',
      professional: 'Mike Johnson',
      date: 'May 15, 2023',
      status: 'COMPLETED'
    },
    {
      id: 2,
      service: 'Home Cleaning',
      professional: 'Sarah Williams',
      date: 'May 20, 2023',
      status: 'IN_PROGRESS'
    },
    {
      id: 3,
      service: 'Electrical Wiring',
      professional: 'Robert Garcia',
      date: 'May 25, 2023',
      status: 'SCHEDULED'
    }
  ];

  const displayRequests = serviceRequests.length > 0 ? serviceRequests : mockServiceRequests;

  // Helper function to get status badge style
  const getStatusBadge = (status) => {
    switch(status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'SCHEDULED':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
                <h1 className="text-2xl font-bold">{user?.username || 'John Doe'}</h1>
                <p className="text-gray-600">User Dashboard</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleCreateRequest}
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg flex items-center"
              >
                <span className="material-symbols-rounded mr-1">add</span>
                New Request
              </button>
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 border border-gray-300 rounded-lg flex items-center">
                <span className="material-symbols-rounded mr-1">settings</span>
                Settings
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Active Requests</h2>
              <span className="bg-primary-100 text-primary-800 text-sm font-medium py-1 px-2 rounded-md">{stats.active || 3} Active</span>
            </div>
            <div className="text-4xl font-bold text-primary-600">{stats.active || 3}</div>
            <p className="text-gray-600">Services currently in progress</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Completed</h2>
              <span className="bg-green-100 text-green-800 text-sm font-medium py-1 px-2 rounded-md">{stats.completed || 12} Total</span>
            </div>
            <div className="text-4xl font-bold text-green-600">{stats.completed || 12}</div>
            <p className="text-gray-600">Services successfully completed</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Upcoming</h2>
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium py-1 px-2 rounded-md">{stats.upcoming || 2} Scheduled</span>
            </div>
            <div className="text-4xl font-bold text-yellow-600">{stats.upcoming || 2}</div>
            <p className="text-gray-600">Services scheduled for future dates</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Service Requests</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Service</th>
                  <th scope="col" className="px-6 py-3">Professional</th>
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {displayRequests.map((request) => (
                  <tr key={request.id} className="bg-white border-b hover:bg-gray-50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {request.service}
                    </th>
                    <td className="px-6 py-4">
                      {request.professional}
                    </td>
                    <td className="px-6 py-4">
                      {request.date}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`${getStatusBadge(request.status)} text-xs font-medium px-2 py-0.5 rounded`}>{request.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <a href="#" className="font-medium text-primary-600 hover:underline">View Details</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;