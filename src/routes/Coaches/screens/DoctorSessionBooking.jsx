import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const DoctorSessionBooking = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("9:00 AM");
  const [getWhatsAppNotification, setGetWhatsAppNotification] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const availableTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"];

  const handleBookSession = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time for your session.");
      return;
    }
    // Navigate to payment page
    navigate("/payment");
  };

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      <div className="bg-[#6e9de3] w-[381px] min-h-screen relative overflow-hidden">
        {/* Status Bar */}
        <div className="absolute w-full h-11 top-0 left-0 bg-transparent flex items-center justify-between px-4">
          <div className="text-white text-sm font-medium">9:41</div>
          <div className="flex items-center space-x-1">
            <img src="https://c.animaapp.com/md5feu4dyKLC8D/img/mobile-signal-3@2x.png" alt="Mobile Signal" className="w-[18px] h-2.5" />
            <img src="https://c.animaapp.com/md5feu4dyKLC8D/img/union-2.svg" alt="Wifi" className="w-[15px] h-[11px]" />
            <div className="w-[27px] h-[13px] border border-white rounded-[3px] flex items-center justify-center">
              <div className="w-5 h-2 bg-white rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Header with Back Button and Profile */}
        <div className="absolute w-full h-[120px] top-0 left-0 flex flex-col items-center justify-center pt-10">
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
          <div className="flex items-center mt-4">
            <img
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md mr-4"
              alt="Dr. Sarah Chen"
              src="https://c.animaapp.com/md5i17leZoCaAz/img/ellipse-16.png"
            />
            <div>
              <h2 className="font-bold text-white text-xl">Dr. Sarah Chen</h2>
              <p className="text-gray-200 text-sm">
                Clinical Psychologist | General Practitioner
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <motion.div
          className="w-[350px] mx-auto bg-white rounded-[20px] shadow-lg pt-6 px-6 pb-20 mt-[200px] relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Choose a Date Section */}
          <div className="mb-6">
            <h3 className="font-bold text-black text-lg mb-3">Choose a Date</h3>
            <input
              type="date"
              className="w-full h-12 px-4 rounded-lg border border-solid border-gray-300 focus:border-[#74a4ee] focus:ring-2 focus:ring-[#74a4ee]/30 outline-none text-black text-base"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          {/* Available Times Section */}
          <div className="mb-6">
            <h3 className="font-bold text-black text-lg mb-3">Available Times</h3>
            <div className="grid grid-cols-3 gap-3">
              {availableTimes.map((time) => (
                <motion.button
                  key={time}
                  className={`h-10 rounded-full text-sm font-medium border ${
                    selectedTime === time
                      ? "bg-[#74a4ee] text-white border-[#74a4ee]"
                      : "bg-white text-black border-gray-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Bill Details Section */}
          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <h3 className="font-bold text-black text-lg mb-3">Bill Details</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 text-base">Consultation Fee</span>
              <span className="font-semibold text-black text-base">$549</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 text-base">Service Fee & Tax</span>
              <span className="font-semibold text-blue-500 text-base">Free</span>
            </div>
            <div className="flex justify-between items-center font-bold text-black text-lg mt-4">
              <span>Total Payable</span>
              <span>$549</span>
            </div>
          </div>

          {/* Notification Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-[#74a4ee] rounded"
                  checked={getWhatsAppNotification}
                  onChange={(e) => setGetWhatsAppNotification(e.target.checked)}
                />
                <span className="ml-3 text-black text-base">Get notification on WhatsApp</span>
              </label>
              <img
                className="w-6 h-6"
                alt="WhatsApp Icon"
                src="https://c.animaapp.com/md5g6gzw6zh9TS/img/whatsapp.svg" // Placeholder WhatsApp icon
              />
            </div>
            <p className="text-gray-500 text-sm ml-8">
              Updates will be sent to +919876543210
            </p>
          </div>

          {/* Data and Privacy */}
          <div className="flex items-center mb-8">
            <img
              className="w-5 h-5 mr-2"
              alt="Lock Icon"
              src="https://c.animaapp.com/md5ftykhnMOpVD/img/vector-3.svg" // Placeholder lock icon
            />
            <span className="font-bold text-black text-base mr-2">Data and Privacy</span>
            <p className="text-gray-500 text-sm flex-grow">
              The contents of your consultations are private and confidential.
            </p>
          </div>

          {/* Book Session Button */}
          <motion.button
            className="w-full h-12 bg-[#74a4ee] rounded-[25px] text-white text-lg font-bold shadow-md"
            whileHover={{ scale: 1.03, boxShadow: "0px 6px 15px rgba(116,164,238,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={handleBookSession}
          >
            Book Session
          </motion.button>
        </motion.div>

        {/* Bottom Bar (if needed, though footer is global) */}
        <div className="absolute w-full h-[34px] bottom-0 left-0 flex items-center justify-center">
          <div className="w-[148px] h-[5px] bg-inkdarkest rounded-[100px]" />
        </div>
      </div>
    </div>
  );
};
