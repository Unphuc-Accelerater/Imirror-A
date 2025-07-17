import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const JournalEntry = ({ entry, onDelete }) => {
  const { mood, text, date } = entry;
  const [isExpanded, setIsExpanded] = useState(false);

  const moodEmojis = {
    "Excited": "😄",
    "Happy": "😊",
    "Neutral": "😐",
    "Sad": "😢"
  };

  const moodColors = {
    "Excited": "bg-blue-50 border-blue-200",
    "Happy": "bg-green-50 border-green-200",
    "Neutral": "bg-gray-50 border-gray-200",
    "Sad": "bg-purple-50 border-purple-200"
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div 
      className={`w-full bg-white rounded-[15px] shadow-[0px_5px_15px_rgba(0,0,0,0.08)] p-4 mb-4 overflow-hidden ${isExpanded ? 'border-l-4 border-[#74a4ee]' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -3 }}
      onClick={toggleExpand}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full ${moodColors[mood]} flex items-center justify-center mr-3`}>
            <span className="text-xl">{moodEmojis[mood]}</span>
          </div>
          <div>
            <span className="font-medium text-[#333]">{mood}</span>
            <div className="text-xs text-gray-500">{date}</div>
          </div>
        </div>
        <motion.button
          className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100"
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
          >
            <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-700 mb-4 mt-2 text-sm">{text}</p>
            
            <div className="flex justify-end border-t border-gray-100 pt-2">
              <motion.button 
                className="text-red-500 text-xs px-2 py-1 bg-red-50 rounded-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(entry);
                }}
              >
                Delete Entry
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isExpanded && (
        <p className="text-gray-700 text-sm line-clamp-1">{text}</p>
      )}
    </motion.div>
  );
};
