import React from "react";
import { motion } from "framer-motion";

export const VirtualKeyboard = ({ onKeyPress, onBackspace, onClose }) => {
  const rows = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M", ".", "@", "DEL"],
    ["Space"],
  ];

  const handleButtonClick = (key) => {
    if (key === "DEL") {
      onBackspace();
    } else if (key === "Space") {
      onKeyPress(" ");
    } else {
      onKeyPress(key);
    }
  };

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 rounded-t-2xl shadow-lg z-50"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-end mb-2">
        <motion.button
          className="px-4 py-1 bg-gray-300 rounded-full text-sm font-medium"
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
        >
          Done
        </motion.button>
      </div>
      <div className="flex flex-col space-y-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center space-x-1">
            {row.map((key) => (
              <motion.button
                key={key}
                className={`flex-1 h-10 rounded-md bg-white text-black font-medium text-lg flex items-center justify-center ${
                  key === "Space" ? "flex-[3]" : ""
                } ${key === "DEL" ? "bg-red-200 text-red-700" : ""}`}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleButtonClick(key)}
              >
                {key}
              </motion.button>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
};
