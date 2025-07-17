import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export const FooterNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (routeName) => {
    return location.pathname === routeName;
  };

  const renderIcon = (name, active) => {
    const color = active ? '#74a4ee' : '#6e6e6e';
    
    switch (name) {
      case 'home':
        return (
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
              stroke={color} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M9 22V12H15V22" 
              stroke={color} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'messages':
        return (
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" 
              stroke={color} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'notifications':
        return (
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" 
              stroke={color} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" 
              stroke={color} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'profile':
        return (
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" 
              stroke={color} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" 
              stroke={color} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const NavItem = ({ name, label, routeName }) => {
    const active = isActive(routeName);
    
    return (
      <motion.button 
        className="flex flex-col items-center justify-center min-w-0 flex-1 py-2"
        onClick={() => navigate(routeName)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div 
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            active ? 'bg-[#e9e1ff]' : 'bg-transparent'
          }`}
          animate={active ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {renderIcon(name, active)}
        </motion.div>
        <motion.span 
          className={`text-xs font-medium mt-1 transition-colors duration-300 ${
            active ? 'text-[#74a4ee]' : 'text-[#6e6e6e]'
          }`}
          animate={active ? { y: [0, -2, 0] } : { y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {label}
        </motion.span>
      </motion.button>
    );
  };

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="bg-[#f8f5ff]/95 backdrop-blur-xl border-t border-white/20 shadow-2xl">
        <div className="flex items-center justify-around px-4 py-2 max-w-md mx-auto relative">
          <NavItem name="home" label="Home" routeName="/dashboard" />
          <NavItem name="messages" label="Messages" routeName="/messages" />
          
          {/* Center Add Button */}
          <motion.div 
            className="flex flex-col items-center justify-center min-w-0 flex-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.button
              className="w-16 h-16 bg-gradient-to-r from-[#74a4ee] to-[#9783d3] rounded-full shadow-xl flex items-center justify-center -mt-8 border-4 border-white relative overflow-hidden"
              onClick={() => navigate('/request-feedback')}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(116, 164, 238, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#9783d3] to-[#74a4ee]"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Plus icon */}
              <motion.div
                className="relative z-10"
                animate={{ rotate: [0, 90, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width={28} height={28} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M12 5V19M5 12H19" 
                    stroke="white" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              
              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/30"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          </motion.div>
          
          <NavItem name="notifications" label="Alerts" routeName="/notifications" />
          <NavItem name="profile" label="Profile" routeName="/edit-profile" />
        </div>
        
        {/* Safe area for devices with home indicator */}
        <div className="h-safe-bottom bg-[#f8f5ff]/95" />
      </div>
    </motion.div>
  );
};