import React from 'react';
import { motion } from 'framer-motion';

export const BackButton = ({ onClick, className = "", style = "default" }) => {
  const baseClasses = "w-12 h-12 rounded-full flex items-center justify-center shadow-lg back-button";
  
  const styleClasses = {
    default: "bg-white/90 backdrop-blur-sm border border-white/20",
    dark: "bg-black/20 backdrop-blur-sm border border-white/20",
    primary: "bg-blue-500/90 backdrop-blur-sm border border-blue-400/20"
  };

  return (
    <motion.button
      className={`${baseClasses} ${styleClasses[style]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{ zIndex: 10 }}
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M19 12H5M12 19L5 12L12 5" 
          stroke={style === "primary" ? "white" : "#374151"} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
};