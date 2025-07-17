import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export const FooterNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      path: '/dashboard',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
            stroke={active ? "#74a4ee" : "#6e6e6e"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M9 22V12H15V22" 
            stroke={active ? "#74a4ee" : "#6e6e6e"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      id: 'messages',
      label: 'Messages',
      path: '/messages',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" 
            stroke={active ? "#74a4ee" : "#6e6e6e"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      id: 'notifications',
      label: 'Alerts',
      path: '/notifications',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" 
            stroke={active ? "#74a4ee" : "#6e6e6e"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" 
            stroke={active ? "#74a4ee" : "#6e6e6e"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      id: 'profile',
      label: 'Profile',
      path: '/edit-profile',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" 
            stroke={active ? "#74a4ee" : "#6e6e6e"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" 
            stroke={active ? "#74a4ee" : "#6e6e6e"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      )
    }
  ];

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 z-50 safe-area-pb"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-around h-20 px-4 max-w-md mx-auto">
        {navItems.map((item, index) => {
          const isItemActive = isActive(item.path);
          
          if (index === 2) {
            // Center add button
            return (
              <React.Fragment key="center-group">
                <NavItem item={navItems[2]} isActive={isActive(navItems[2].path)} navigate={navigate} />
                
                <motion.button
                  className="relative -mt-8 w-16 h-16 bg-gradient-to-r from-[#74a4ee] to-[#9783d3] rounded-full shadow-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate('/request-feedback')}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 12H19" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
                
                <NavItem item={navItems[3]} isActive={isActive(navItems[3].path)} navigate={navigate} />
              </React.Fragment>
            );
          }
          
          if (index > 2) return null;
          
          return (
            <NavItem 
              key={item.id} 
              item={item} 
              isActive={isItemActive} 
              navigate={navigate} 
            />
          );
        })}
      </div>
    </motion.div>
  );
};

const NavItem = ({ item, isActive, navigate }) => (
  <motion.button
    className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors ${
      isActive ? 'bg-blue-50' : ''
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => navigate(item.path)}
  >
    <div className="mb-1">
      {item.icon(isActive)}
    </div>
    <span className={`text-xs font-medium ${
      isActive ? 'text-[#74a4ee]' : 'text-gray-500'
    }`}>
      {item.label}
    </span>
  </motion.button>
);