import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import logo from '../assets/Designer.png';

export const NavBar = () => {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 mr-3" />
          <span className="self-center text-xl font-semibold whitespace-nowrap">NestHome</span>
        </Link>
        
        <div className="flex md:order-2">
          {!user ? (
            <div>
              <Link to="/login" className="text-primary-600 hover:text-primary-800 font-medium text-sm px-4 py-2 md:mr-2">Login</Link>
              <Link to="/register" className="text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-4 py-2">Sign Up</Link>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center text-sm font-medium text-gray-700 rounded-full hover:text-primary-600 md:mr-0 focus:ring-4 focus:ring-gray-100"
              >
                <span className="sr-only">Open user menu</span>
                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white mr-2">
                  {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                </div>
                <span>{user.username}</span>
                <svg className="w-4 h-4 mx-1.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
              
              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div>{user.username}</div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    {hasRole('ADMIN') && (
                      <li>
                        <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100">Admin Dashboard</Link>
                      </li>
                    )}
                    {hasRole('PROFESSIONAL') && (
                      <li>
                        <Link to="/professional" className="block px-4 py-2 hover:bg-gray-100">Professional Dashboard</Link>
                      </li>
                    )}
                    {hasRole('USER') && (
                      <li>
                        <Link to="/user" className="block px-4 py-2 hover:bg-gray-100">My Dashboard</Link>
                      </li>
                    )}
                    <li>
                      <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                    </li>
                  </ul>
                  <div className="py-2">
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          <button 
            type="button" 
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
        
        <div className={`items-center justify-between ${mobileMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`}>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link to="/" className="block py-2 pl-3 pr-4 text-primary-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0">Home</Link>
            </li>
            <li>
              <Link to="/services" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0">Services</Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0">About</Link>
            </li>
            <li>
              <Link to="/contact" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
