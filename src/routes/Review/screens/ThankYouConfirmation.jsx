import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const ThankYouConfirmation = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleYes = () => {
    navigate("/write-review"); // Go back to write another review
  };

  const handleNo = () => {
    navigate("/dashboard"); // Go to dashboard
  };

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      <div className="bg-[linear-gradient(136deg,rgba(219,234,254,1)_11%,rgba(202,225,254,1)_43%,rgba(252,231,243,1)_100%)] w-[381px] min-h-screen relative overflow-hidden">
        {/* Header */}
        <div className="absolute w-full h-[60px] top-0 left-0 bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center">
          <motion.button
            className="absolute left-4 w-9 h-[15px]"
            whileTap={{ scale: 0.9 }}
            onClick={handleGoBack}
          >
            <img
              className="w-full h-full"
              alt="Arrow"
              src="https://c.animaapp.com/md5i17leZoCaAz/img/arrow-1.svg"
            />
          </motion.button>
          {/* Decorative icon */}
          <div className="absolute right-4 w-10 h-10 flex items-center justify-center">
            <img
              src="https://c.animaapp.com/md5f5ldin4OF2T/img/vector-9.svg" // Placeholder for sparkle icon
              alt="Sparkle"
              className="w-6 h-6"
            />
          </div>
        </div>

        {/* Thank You Card */}
        <motion.div
          className="w-[350px] mx-auto bg-white rounded-[20px] shadow-lg pt-8 pb-6 px-6 mt-[100px] relative flex flex-col items-center text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-bold text-black text-4xl mb-2">Thank You</h2>
          <p className="text-gray-700 text-base leading-relaxed">
            Your review helps us to grow
          </p>
        </motion.div>

        {/* Footer Action */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[350px] flex flex-col items-center">
          <p className="text-white text-base mb-4">Want to Submit more?</p>
          <div className="flex justify-between space-x-4 w-full">
            <motion.button
              className="flex-1 h-12 bg-white border-2 border-[#74a4ee] rounded-[25px] text-black text-lg font-bold shadow-md"
              whileHover={{ scale: 1.03, boxShadow: "0px 6px 15px rgba(116,164,238,0.3)" }}
              whileTap={{ scale: 0.97 }}
              onClick={handleYes}
            >
              Yes
            </motion.button>
            <motion.button
              className="flex-1 h-12 bg-[#74a4ee] rounded-[25px] text-white text-lg font-bold shadow-md"
              whileHover={{ scale: 1.03, boxShadow: "0px 6px 15px rgba(116,164,238,0.3)" }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNo}
            >
              No
            </motion.button>
          </div>
        </div>

        {/* Bottom Bar (if needed, though footer is global) */}
        <div className="absolute w-full h-[34px] bottom-0 left-0 flex items-center justify-center">
          <div className="w-[148px] h-[5px] bg-inkdarkest rounded-[100px]" />
        </div>
      </div>
    </div>
  );
};
