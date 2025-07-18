import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const Enterotp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber || "";
  
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [activeInputIndex, setActiveInputIndex] = useState(0);
  const [resendCountdown, setResendCountdown] = useState(25);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);

  useEffect(() => {
    const isComplete = otp.every(digit => digit !== "");
    setIsContinueEnabled(isComplete);
  }, [otp]);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendEnabled(true);
    }
  }, [resendCountdown]);

  const handleDigitClick = (index) => {
    setActiveInputIndex(index);
    setIsKeyboardVisible(true);
  };

  const handleKeyPress = (digit) => {
    if (activeInputIndex < 4) {
      const newOtp = [...otp];
      newOtp[activeInputIndex] = digit;
      setOtp(newOtp);
      
      if (activeInputIndex < 3) {
        setActiveInputIndex(activeInputIndex + 1);
      }
    }
  };

  const handleBackspace = () => {
    if (activeInputIndex >= 0) {
      const newOtp = [...otp];
      newOtp[activeInputIndex] = "";
      setOtp(newOtp);
      
      if (activeInputIndex > 0 && newOtp[activeInputIndex] === "") {
        setActiveInputIndex(activeInputIndex - 1);
      }
    }
  };

  const handleContinue = () => {
    if (isContinueEnabled) {
      navigate("/setupprofile");
    }
  };

  const handleResendCode = () => {
    if (isResendEnabled) {
      setOtp(["", "", "", ""]);
      setActiveInputIndex(0);
      setResendCountdown(25);
      setIsResendEnabled(false);
    }
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
                      handleKeyPress(key);
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
      {/* Header */}
      <motion.div 
        className="flex items-center justify-center p-6 pt-8 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          className="absolute left-6 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm"
          whileTap={{ scale: 0.9 }}
          onClick={handleGoBack}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19L5 12L12 5" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
        
        <h1 className="text-2xl font-bold text-gray-800">Enter OTP</h1>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 px-6">
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-8 mx-auto max-w-sm"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Instructions */}
          <div className="text-center mb-8">
            <p className="text-gray-600 leading-relaxed">
              Enter the 4-digit code that we have sent via the phone number{' '}
              <span className="font-semibold text-gray-800">+91 {phoneNumber}</span>
            </p>
          </div>

          {/* OTP Input */}
          <div className="flex justify-center space-x-4 mb-8">
            {otp.map((digit, index) => (
              <motion.div
                key={index}
                className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center cursor-pointer transition-all ${
                  activeInputIndex === index 
                    ? 'border-[#74a4ee] bg-blue-50 shadow-lg' 
                    : 'border-gray-200 bg-gray-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDigitClick(index)}
              >
                <span className="text-2xl font-bold text-gray-800">{digit}</span>
              </motion.div>
            ))}
          </div>

          {/* Continue Button */}
          <motion.button
            className={`w-full h-14 rounded-2xl font-semibold text-lg mb-4 transition-all ${
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

          {/* Resend Code */}
          <div className="text-center">
            <motion.button
              className={`font-medium ${
                isResendEnabled ? 'text-[#74a4ee]' : 'text-gray-400'
              }`}
              whileHover={isResendEnabled ? { scale: 1.05 } : {}}
              whileTap={isResendEnabled ? { scale: 0.95 } : {}}
              onClick={handleResendCode}
              disabled={!isResendEnabled}
            >
              {isResendEnabled ? 'Resend code' : `Resend code (${resendCountdown}s)`}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Custom Keyboard */}
      <AnimatePresence>
        {isKeyboardVisible && renderKeypad()}
      </AnimatePresence>
    </div>
  );
};