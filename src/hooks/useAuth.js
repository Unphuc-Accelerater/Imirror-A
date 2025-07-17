import { useState, useEffect, createContext, useContext } from 'react';
import { storage } from '../utils/storage';

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
    // Check if user is logged in on app start
    const userData = storage.getUserData();
    if (userData) {
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    storage.setUserData(userData);
  };

  const logout = () => {
    setUser(null);
    storage.clearAll();
  };

  const updateUser = (userData) => {
    setUser(userData);
    storage.setUserData(userData);
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};