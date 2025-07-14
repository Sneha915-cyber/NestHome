import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = new URLSearchParams(location.search).get('redirect') || '/';
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const result = await login(formData.username, formData.password);
      if (result) {
        navigate(from, { replace: true });
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Login to Your Account</h2>
            <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>
          </div>
          
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                value={formData.username}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-500" 
                placeholder="Enter your username" 
                required 
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={formData.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-500" 
                placeholder="Enter your password" 
                required 
              />
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input 
                  id="rememberMe" 
                  name="rememberMe"
                  type="checkbox" 
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" 
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>
              <a href="#" className="text-sm text-primary-600 hover:text-primary-800">Forgot password?</a>
            </div>
            
            <div className="mb-6">
              <button 
                type="submit" 
                disabled={loading}
                className={`w-full ${loading ? 'bg-primary-400' : 'bg-primary-600 hover:bg-primary-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-solid rounded-full mr-2 loading-spinner"></div>
                    Logging in...
                  </span>
                ) : 'Login'}
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account? 
                <Link to="/register" className="text-primary-600 hover:text-primary-800 font-medium ml-1">Sign up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
