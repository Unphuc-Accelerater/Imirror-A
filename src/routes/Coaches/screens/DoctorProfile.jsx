import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const DoctorProfile = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleBookSession = () => {
    navigate("/coaches/sarah-chen/book-session");
  };

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      <div className="bg-[#6e9de3] w-[381px] min-h-screen relative overflow-hidden">
        {/* Header */}
        <div className="absolute w-full h-[60px] top-0 left-0 flex items-center justify-center">
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
        </div>

        {/* Profile Image */}
        <div className="absolute top-[100px] left-1/2 transform -translate-x-1/2 z-10">
          <img
            className="w-[120px] h-[120px] rounded-full object-cover border-4 border-white shadow-lg"
            alt="Dr. Sarah Chen"
            src="https://c.animaapp.com/md5i17leZoCaAz/img/ellipse-16.png"
          />
        </div>

        {/* Main Content Card */}
        <motion.div
          className="w-[350px] mx-auto bg-white rounded-[20px] shadow-lg pt-[80px] pb-6 px-6 mt-[160px] relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-6">
            <h2 className="font-bold text-black text-2xl">Dr. Sarah Chen</h2>
            <p className="text-gray-700 text-base mt-1">
              Clinical Psychologist | General Practitioner
            </p>
            <p className="text-gray-500 text-sm mt-2">
              MBBS, Fellow Certificate in Practical Psychology, MD - Medicine
            </p>
          </div>

          {/* Experience and Rating */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-700 text-sm">
              12 years overall experience
            </div>
            <div className="bg-blue-800 rounded-full px-3 py-1 text-white text-sm font-bold flex items-center">
              4.8
              <svg
                className="w-3 h-3 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.602-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>

          {/* Consultations and Stories */}
          <div className="flex justify-around items-center mb-6">
            <div className="text-center">
              <p className="font-bold text-black text-lg">300+</p>
              <p className="text-gray-500 text-sm">Consultations</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-black text-lg">128</p>
              <p className="text-gray-500 text-sm underline cursor-pointer">Stories</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-700 text-base leading-relaxed">
              Specializing in cognitive behavioral therapy and mindfulness-based
              interventions for anxiety and depression.
            </p>
          </div>

          {/* Story Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Depression
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Trauma
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Empathy
            </span>
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
