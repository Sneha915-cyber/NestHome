import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { API_URL } from '../config';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    professionals: 0,
    serviceRequests: 0,
    revenue: 0
  });
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch dashboard statistics
        const statsResponse = await fetch(`${API_URL}/admin/dashboard-stats`, {
          method: 'GET',
          credentials: 'include',
        });
        
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }
        
        // Fetch recent users
        const usersResponse = await fetch(`${API_URL}/admin/recent-users`, {
          method: 'GET',
          credentials: 'include',
        });
        
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setUsers(usersData);
        }
        
        // Fetch service categories
        const categoriesResponse = await fetch(`${API_URL}/admin/service-categories`, {
          method: 'GET',
          credentials: 'include',
        });
        
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData);
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

  const mockUsers = [
    {
      id: 1,
      username: 'Sarah Wilson',
      email: 'sarahw@example.com',
      role: 'USER',
      status: 'ACTIVE',
      joined: '2023-05-20'
    },
    {
      id: 2,
      username: 'James Brown',
      email: 'jamesb@example.com',
      role: 'PROFESSIONAL',
      status: 'PENDING',
      joined: '2023-05-21'
    },
    {
      id: 3,
      username: 'Jennifer Lopez',
      email: 'jenniferl@example.com',
      role: 'USER',
      status: 'ACTIVE',
      joined: '2023-05-22'
    },
    {
      id: 4,
      username: 'Michael Chen',
      email: 'michaelc@example.com',
      role: 'PROFESSIONAL',
      status: 'ACTIVE',
      joined: '2023-05-23'
    }
  ];

  const mockCategories = [
    { id: 1, name: 'Plumbing', services: 15, percentage: 70 },
    { id: 2, name: 'Cleaning', services: 22, percentage: 85 },
    { id: 3, name: 'Electrical', services: 12, percentage: 60 },
    { id: 4, name: 'Home Repair', services: 18, percentage: 75 }
  ];

  const displayUsers = users.length > 0 ? users : mockUsers;
  const displayCategories = categories.length > 0 ? categories : mockCategories;

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-primary-800 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                {user?.username ? user.username.charAt(0).toUpperCase() : 'A'}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user?.username || 'Admin User'}</h1>
                <p className="text-gray-600">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg flex items-center">
                <span className="material-symbols-rounded mr-1">person_add</span>
                Add User
              </button>
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 border border-gray-300 rounded-lg flex items-center">
                <span className="material-symbols-rounded mr-1">settings</span>
                System Settings
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Total Users</h2>
              <span className="bg-primary-100 text-primary-800 text-sm font-medium py-1 px-2 rounded-md">All Time</span>
            </div>
            <div className="text-4xl font-bold text-primary-600">{stats.totalUsers || 512}</div>
            <p className="text-gray-600">Registered platform users</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Professionals</h2>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium py-1 px-2 rounded-md">Verified</span>
            </div>
            <div className="text-4xl font-bold text-blue-600">{stats.professionals || 78}</div>
            <p className="text-gray-600">Active service providers</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Service Requests</h2>
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium py-1 px-2 rounded-md">This Month</span>
            </div>
            <div className="text-4xl font-bold text-yellow-600">{stats.serviceRequests || 145}</div>
            <p className="text-gray-600">Bookings in the last 30 days</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Revenue</h2>
              <span className="bg-green-100 text-green-800 text-sm font-medium py-1 px-2 rounded-md">This Month</span>
            </div>
            <div className="text-4xl font-bold text-green-600">${stats.revenue || 12450}</div>
            <p className="text-gray-600">Platform earnings this month</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Users</h2>
              <a href="#" className="text-primary-600 hover:text-primary-800 text-sm font-medium">View All</a>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3">User</th>
                    <th scope="col" className="px-4 py-3">Email</th>
                    <th scope="col" className="px-4 py-3">Role</th>
                    <th scope="col" className="px-4 py-3">Status</th>
                    <th scope="col" className="px-4 py-3">Joined</th>
                    <th scope="col" className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayUsers.map((user) => (
                    <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                      <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                        {user.username}
                      </th>
                      <td className="px-4 py-3">
                        {user.email}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`${
                          user.role === 'PROFESSIONAL' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-primary-100 text-primary-800'
                        } text-xs font-medium px-2 py-0.5 rounded`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`${
                          user.status === 'ACTIVE' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        } text-xs font-medium px-2 py-0.5 rounded`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {user.joined}
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-primary-600 hover:underline font-medium text-xs">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Service Categories</h2>
              <a href="#" className="text-primary-600 hover:text-primary-800 text-sm font-medium">Manage</a>
            </div>
            
            <div className="space-y-4">
              {displayCategories.map((category) => (
                <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{category.name}</h3>
                    <div className="flex items-center">
                      <span className="text-primary-600 text-sm font-medium mr-2">{category.services} Services</span>
                      <button className="text-gray-500 hover:text-gray-700">
                        <span className="material-symbols-rounded">edit</span>
                      </button>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary-600 h-2.5 rounded-full" 
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              
              <button className="w-full bg-primary-50 hover:bg-primary-100 text-primary-600 font-medium py-2 rounded-lg flex items-center justify-center">
                <span className="material-symbols-rounded mr-1">add</span>
                Add New Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
