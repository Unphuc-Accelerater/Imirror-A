import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export const FooterNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-[80px] bg-[#f8f5ff] backdrop-blur-md bg-opacity-90 rounded-t-[25px] shadow-[0px_-5px_20px_rgba(0,0,0,0.08)] z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Home Button */}
      <motion.button
        className={`flex flex-col items-center justify-center w-[50px] h-[50px] rounded-full ${isActive("/dashboard") ? "bg-[#e9e1ff]" : ""}`}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/dashboard")}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
            stroke={isActive("/dashboard") ? "#74a4ee" : "#6e6e6e"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M9 22V12H15V22" 
            stroke={isActive("/dashboard") ? "#74a4ee" : "#6e6e6e"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <span className={`text-xs mt-1 font-medium ${isActive("/dashboard") ? "text-[#74a4ee]" : "text-[#6e6e6e]"}`}>Home</span>
      </motion.button>

      {/* Messages Button */}
      <motion.button
        className={`flex flex-col items-center justify-center w-[50px] h-[50px] rounded-full ${isActive("/messages") ? "bg-[#e9e1ff]" : ""}`}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/dashboard")}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" 
            stroke={isActive("/messages") ? "#74a4ee" : "#6e6e6e"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <span className={`text-xs mt-1 font-medium ${isActive("/messages") ? "text-[#74a4ee]" : "text-[#6e6e6e]"}`}>Messages</span>
      </motion.button>

      {/* Center Plus Button */}
      <div className="relative flex items-center justify-center">
        <div className="absolute -top-8 w-[65px] h-[65px] rounded-full bg-gradient-to-br from-[#74a4ee] to-[#9783d3] shadow-[0px_8px_20px_rgba(116,164,238,0.5)]">
          <motion.button
            className="w-full h-full flex items-center justify-center"
            whileHover={{ scale: 1.1, boxShadow: "0px 10px 25px rgba(116,164,238,0.7)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/request-feedback")}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M12 5V19" 
                stroke="white" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M5 12H19" 
                stroke="white" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </div>
        <div className="w-[50px] h-[50px] opacity-0">
          <span className="text-xs mt-1">Add</span>
        </div>
      </div>

      {/* Notifications Button */}
      <motion.button
        className={`flex flex-col items-center justify-center w-[50px] h-[50px] rounded-full ${isActive("/notifications") ? "bg-[#e9e1ff]" : ""}`}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/notifications")}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" 
            stroke={isActive("/notifications") ? "#74a4ee" : "#6e6e6e"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" 
            stroke={isActive("/notifications") ? "#74a4ee" : "#6e6e6e"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <span className={`text-xs mt-1 font-medium ${isActive("/notifications") ? "text-[#74a4ee]" : "text-[#6e6e6e]"}`}>Alerts</span>
      </motion.button>

      {/* Profile Button */}
      <motion.button
        className={`flex flex-col items-center justify-center w-[50px] h-[50px] rounded-full ${isActive("/edit-profile") ? "bg-[#e9e1ff]" : ""}`}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/edit-profile")}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" 
            stroke={isActive("/edit-profile") ? "#74a4ee" : "#6e6e6e"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" 
            stroke={isActive("/edit-profile") ? "#74a4ee" : "#6e6e6e"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <span className={`text-xs mt-1 font-medium ${isActive("/edit-profile") ? "text-[#74a4ee]" : "text-[#6e6e6e]"}`}>Profile</span>
      </motion.button>
    </motion.div>
  );
};
