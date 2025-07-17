import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleDownloadInvoice = () => {
    alert("Invoice downloaded!");
    // In a real app, you'd trigger a file download here
  };

  const handleContinue = () => {
    navigate("/dashboard");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      <div className="bg-[linear-gradient(136deg,rgba(219,234,254,1)_11%,rgba(202,225,254,1)_43%,rgba(252,231,243,1)_100%)] w-[381px] min-h-screen relative overflow-hidden">
        {/* Status Bar */}
        <div className="absolute w-full h-11 top-0 left-0 bg-transparent flex items-center justify-between px-4">
          <div className="text-inkdarkest text-sm font-medium">9:41</div>
          <div className="flex items-center space-x-1">
            <img src="https://c.animaapp.com/md5feu4dyKLC8D/img/mobile-signal-3@2x.png" alt="Mobile Signal" className="w-[18px] h-2.5" />
            <img src="https://c.animaapp.com/md5feu4dyKLC8D/img/union-2.svg" alt="Wifi" className="w-[15px] h-[11px]" />
            <div className="w-[27px] h-[13px] border border-inkdarkest rounded-[3px] flex items-center justify-center">
              <div className="w-5 h-2 bg-inkdarkest rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Header with Back Button */}
        <div className="absolute w-full h-[60px] top-0 left-0 flex items-center justify-center">
          <motion.button
            className="absolute top-8 left-6 w-9 h-[15px]"
            whileTap={{ scale: 0.9 }}
            onClick={handleGoBack}
          >
            <img
              className="w-full h-full"
              alt="Arrow"
              src="https://c.animaapp.com/md5i17leZoCaAz/img/arrow-1.svg"
            />
          </motion.button>
        </div>

        {/* Success Card */}
        <motion.div
          className="w-[350px] mx-auto bg-white rounded-[20px] shadow-lg pt-8 pb-6 px-6 mt-[100px] relative flex flex-col items-center text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-white text-4xl font-bold shadow-md mb-4">
            ✓
          </div>
          <h2 className="font-bold text-black text-2xl mb-2">Successful</h2>
          <p className="text-gray-700 text-base leading-relaxed">
            Congratulations! Your transaction has been completed successfully.
          </p>
        </motion.div>

        {/* Doctor Info Section */}
        <motion.div
          className="w-[350px] mx-auto bg-white rounded-[20px] shadow-lg p-6 mt-6 relative flex items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <img
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 shadow-sm mr-4"
            alt="Dr. Sarah Chen"
            src="https://c.animaapp.com/md5i17leZoCaAz/img/ellipse-16.png"
          />
          <div className="flex-grow">
            <h3 className="font-bold text-black text-xl">Dr. Sarah Chen</h3>
            <p className="text-gray-700 text-sm mt-1">
              Clinical Psychologist | General Practitioner
            </p>
            <div className="flex justify-between items-center mt-3">
              <span className="text-gray-500 text-sm">Slot Booked</span>
              <span className="font-semibold text-black text-base">9:00 AM</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom Buttons */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[350px] flex justify-between space-x-4">
          <motion.button
            className="flex-1 h-12 bg-white border-2 border-[#74a4ee] rounded-[25px] text-black text-lg font-bold shadow-md"
            whileHover={{ scale: 1.03, boxShadow: "0px 6px 15px rgba(116,164,238,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={handleDownloadInvoice}
          >
            Download Invoice
          </motion.button>
          <motion.button
            className="flex-1 h-12 bg-[#74a4ee] rounded-[25px] text-white text-lg font-bold shadow-md"
            whileHover={{ scale: 1.03, boxShadow: "0px 6px 15px rgba(116,164,238,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={handleContinue}
          >
            Continue
          </motion.button>
        </div>

        {/* Bottom Bar (if needed, though footer is global) */}
        <div className="absolute w-full h-[34px] bottom-0 left-0 flex items-center justify-center">
          <div className="w-[148px] h-[5px] bg-inkdarkest rounded-[100px]" />
        </div>
      </div>
    </div>
  );
};
