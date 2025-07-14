import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'USER',
    terms: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { register, user } = useAuth();
  const navigate = useNavigate();
  
  // If user is already logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error message when field is changed
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase, one lowercase, and one number';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.terms) {
      newErrors.terms = 'You must agree to the Terms of Service';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.userType
      };
      
      const success = await register(userData);
      
      if (success) {
        // Redirect based on user type
        if (formData.userType === 'PROFESSIONAL') {
          navigate('/professional');
        } else {
          navigate('/user');
        }
      }
    } catch (err) {
      console.error('Registration error:', err);
      setErrors({ general: err.message || 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
            <p className="text-gray-600 mt-2">Join NestHome to access all services</p>
          </div>
          
          {errors.general && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{errors.general}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="reg-username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
              <input 
                type="text" 
                id="reg-username" 
                name="username" 
                value={formData.username}
                onChange={handleChange}
                className={`shadow appearance-none border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-500`}
                placeholder="Choose a username" 
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                className={`shadow appearance-none border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-500`}
                placeholder="Enter your email" 
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="reg-password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input 
                type="password" 
                id="reg-password" 
                name="password" 
                value={formData.password}
                onChange={handleChange}
                className={`shadow appearance-none border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-500`}
                placeholder="Create a password" 
              />
              <p className="text-gray-500 text-xs mt-1">Must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number</p>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirm-password" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
              <input 
                type="password" 
                id="confirm-password" 
                name="confirmPassword" 
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`shadow appearance-none border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-500`}
                placeholder="Confirm your password" 
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
            
            <div className="mb-6">
              <label htmlFor="user-type" className="block text-gray-700 text-sm font-bold mb-2">I want to:</label>
              <select 
                id="user-type" 
                name="userType" 
                value={formData.userType}
                onChange={handleChange}
                className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-500" 
              >
                <option value="USER">Hire professionals (User)</option>
                <option value="PROFESSIONAL">Offer my services (Professional)</option>
              </select>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center">
                <input 
                  id="terms" 
                  name="terms"
                  type="checkbox" 
                  checked={formData.terms}
                  onChange={handleChange}
                  className={`h-4 w-4 text-primary-600 focus:ring-primary-500 ${errors.terms ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  I agree to the <a href="#" className="text-primary-600 hover:text-primary-800">Terms of Service</a> and <a href="#" className="text-primary-600 hover:text-primary-800">Privacy Policy</a>
                </label>
              </div>
              {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
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
                    Creating Account...
                  </span>
                ) : 'Create Account'}
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account? 
                <Link to="/login" className="text-primary-600 hover:text-primary-800 font-medium ml-1">Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
