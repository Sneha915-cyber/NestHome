import { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '../config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem('isLoggedIn') === 'true') {
        try {
          const response = await fetch(`${API_URL}/home/session-check`, {
            method: 'GET',
            credentials: 'include',
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.authenticated) {
              setUser({
                username: data.username,
                roles: data.authorities
              });
            } else {
              // If the server says we're not authenticated, clear local storage
              localStorage.removeItem('isLoggedIn');
            }
          } else {
            localStorage.removeItem('isLoggedIn');
          }
        } catch (error) {
          console.error('Session check error:', error);
          localStorage.removeItem('isLoggedIn');
        }
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (username, password) => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Login failed');
      }
  
      const data = await response.json();
  
      const userData = {
        username: data.user || username,
        roles: data.authorities || []
      };
      
      setUser(userData);
      localStorage.setItem('isLoggedIn', 'true');
      
      return userData;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };  

  const register = async (userData) => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Registration failed');
      }

      const data = await response.json();
      
      const newUser = {
        username: data.username || userData.username,
        roles: data.roles || []
      };
      
      setUser(newUser);
      localStorage.setItem('isLoggedIn', 'true');
      
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('isLoggedIn');
    }
  };

  const hasRole = (role) => {
    if (!user || !user.roles) return false;
    
    const rolesArray = Array.isArray(user.roles) 
      ? user.roles 
      : typeof user.roles === 'string' 
        ? user.roles.replace(/[\[\]]/g, '').split(', ').map(r => r.trim())
        : [];
        
    return rolesArray.some(r => r.includes(role) || r === role);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      register, 
      hasRole, 
      loading, 
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
