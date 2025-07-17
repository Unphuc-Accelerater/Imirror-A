import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Component } from "../../components/Component";

export const LoginSignup = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setIsContinueEnabled(phoneNumber.length === 10);
  }, [phoneNumber]);

  const handlePhoneNumberChange = (digit) => {
    if (phoneNumber.length < 10) {
      setPhoneNumber(prev => prev + digit);
    }
  };

  const handleBackspace = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  const handleContinue = () => {
    if (isContinueEnabled) {
      navigate("/enterotp", { state: { phoneNumber } });
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setIsKeyboardVisible(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const renderKeypad = () => {
    const keypadButtons = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['', '0', 'DEL']
    ];

    return (
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-gray-100 rounded-t-3xl shadow-2xl z-50 p-6"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-center mb-4">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>
        
        <div className="flex justify-end mb-4">
          <motion.button
            className="px-6 py-2 bg-[#74a4ee] rounded-full text-white font-medium"
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsKeyboardVisible(false)}
          >
            Done
          </motion.button>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
          {keypadButtons.map((row, rowIndex) => (
            row.map((key, keyIndex) => {
              if (key === '') {
                return <div key={`${rowIndex}-${keyIndex}`} className="h-14" />;
              }
              
              return (
                <motion.button
                  key={`${rowIndex}-${keyIndex}`}
                  className={`h-14 rounded-2xl font-semibold text-xl flex items-center justify-center ${
                    key === 'DEL' 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-white text-gray-800 shadow-sm'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (key === 'DEL') {
                      handleBackspace();
                    } else {
                      handlePhoneNumberChange(key);
                    }
                  }}
                >
                  {key === 'DEL' ? '⌫' : key}
                </motion.button>
              );
            })
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col">
      {/* Status Bar */}
      <div className="h-11 bg-white/80 backdrop-blur-sm flex items-center justify-between px-4 text-sm font-medium text-gray-900">
        <span>9:41</span>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-2.5 bg-gray-900 rounded-sm" />
          <div className="w-4 h-3 border border-gray-900 rounded-sm">
            <div className="w-2.5 h-1.5 bg-gray-900 rounded-sm m-0.5" />
          </div>
        </div>
      </div>

      {/* Header */}
      <motion.div 
        className="flex items-center justify-between p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm"
          whileTap={{ scale: 0.9 }}
          onClick={handleGoBack}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19L5 12L12 5" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
        
        <Component
          className="!h-10 !w-10"
          overlapGroupClassName="!h-[38px] !w-[36px]"
          rectangleClassName="!h-[30px] !w-[20px] !top-1"
          rectangleClassNameOverride="!h-[30px] !left-2 !w-[20px] !top-2"
          star="https://c.animaapp.com/hUOULd8k/img/star-5-1.svg"
          starClassName="!h-[8px] !left-[28px] !w-[8px]"
        />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 px-6">
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-8 mx-auto max-w-sm"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome</h1>
            <p className="text-gray-600">Log in to your account</p>
          </div>

          {/* Phone Input */}
          <motion.div
            className={`relative mb-6 p-4 bg-gray-50 rounded-2xl border-2 transition-colors ${
              isFocused ? 'border-[#74a4ee] bg-blue-50' : 'border-gray-200'
            }`}
            whileTap={{ scale: 0.98 }}
            onClick={handleInputFocus}
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-700 font-medium">+91</span>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <div className="flex-1 flex items-center">
                <span className={`text-lg ${phoneNumber ? 'text-gray-800' : 'text-gray-400'}`}>
                  {phoneNumber || "Mobile number"}
                </span>
                {isFocused && (
                  <motion.div 
                    className="w-0.5 h-6 bg-[#74a4ee] ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                )}
              </div>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-500 mb-8 leading-relaxed">
            You will receive an SMS verification that may apply message and data rates.
          </p>

          {/* Continue Button */}
          <motion.button
            className={`w-full h-14 rounded-2xl font-semibold text-lg transition-all ${
              isContinueEnabled 
                ? 'bg-[#74a4ee] text-white shadow-lg' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={isContinueEnabled ? { scale: 1.02 } : {}}
            whileTap={isContinueEnabled ? { scale: 0.98 } : {}}
            onClick={handleContinue}
            disabled={!isContinueEnabled}
          >
            Continue
          </motion.button>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
            By continuing, you agree to our{' '}
            <span className="text-[#74a4ee] font-medium">Terms of Service</span>{' '}
            and{' '}
            <span className="text-[#74a4ee] font-medium">Privacy Policy</span>.
          </p>
        </motion.div>
      </div>

      {/* Custom Keyboard */}
      <AnimatePresence>
        {isKeyboardVisible && renderKeypad()}
      </AnimatePresence>
    </div>
  );
};