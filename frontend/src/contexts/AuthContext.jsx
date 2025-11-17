import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
const API_BASE_URL = 'http://localhost:5000';
axios.defaults.baseURL = API_BASE_URL;
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/auth/me');
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await axios.post('/api/auth/login', { email, password });
    const { token, user } = response.data;
    
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
    
    return user;
  };

  const register = async (userData) => {
    const response = await axios.post('/api/auth/register', userData);
    const { token, user } = response.data;
    
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
    
    return user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };


  // const updateUser = async (userData) => {
  //   try {
  //     const response = await axios.put('/api/auth/profile', userData);
  //     const updatedUser = response.data;
      
  //     // Merge the updated user data with existing user data
  //     setUser(prevUser => ({
  //       ...prevUser, // Keep existing user data
  //       ...updatedUser // Override with updated data
  //     }));
      
  //     return updatedUser;
  //   } catch (error) {
  //     console.error('Error updating user:', error);
  //     throw error;
  //   }
  // };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
   setUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};