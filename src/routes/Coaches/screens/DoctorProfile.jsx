import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BackButton } from "../../../components/UI/BackButton";

export const DoctorProfile = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleBookSession = () => {
    navigate("/coaches/sarah-chen/book-session");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6e9de3] to-[#74a4ee] pt-12 pb-20">
        <div className="flex items-center justify-between px-6">
          <BackButton onClick={handleGoBack} style="dark" />
          <h1 className="text-white text-xl font-bold">Doctor Profile</h1>
          <div className="w-12" />
        </div>
      </div>

      {/* Profile Image - Perfectly Centered */}
      <div className="flex justify-center -mt-16 mb-6 z-10 relative">
        <motion.div
          className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <img
            className="w-full h-full object-cover"
            alt="Dr. Sarah Chen"
            src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400"
          />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="px-6">
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Doctor Info */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Dr. Sarah Chen</h2>
            <p className="text-gray-600 text-lg mb-2">Clinical Psychologist</p>
            <p className="text-gray-500 text-sm">MBBS, Fellow Certificate in Practical Psychology, MD - Medicine</p>
          </div>

          {/* Stats */}
          <div className="flex justify-around items-center mb-6 py-4 bg-gray-50 rounded-2xl">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#74a4ee]">12</p>
              <p className="text-sm text-gray-500">Years Exp</p>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <span className="text-2xl font-bold text-[#74a4ee] mr-1">4.8</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
              </div>
              <p className="text-sm text-gray-500">Rating</p>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div className="text-center">
              <p className="text-2xl font-bold text-[#74a4ee]">300+</p>
              <p className="text-sm text-gray-500">Patients</p>
            </div>
          </div>

          {/* About */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">About</h3>
            <p className="text-gray-600 leading-relaxed">
              Specializing in cognitive behavioral therapy and mindfulness-based interventions for anxiety and depression. 
              Dr. Chen has over 12 years of experience helping patients overcome mental health challenges and achieve personal growth.
            </p>
          </div>

          {/* Specializations */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Specializations</h3>
            <div className="flex flex-wrap gap-2">
              {["Depression", "Anxiety", "Trauma", "Relationships", "Stress Management"].map((spec, index) => (
                <motion.span
                  key={spec}
                  className="px-4 py-2 bg-blue-100 text-[#74a4ee] rounded-full text-sm font-medium"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                >
                  {spec}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Consultation Fee */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Consultation Fee</p>
                <p className="text-2xl font-bold text-gray-800">$549</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6312 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6312 13.6815 18 14.5717 18 15.5C18 16.4283 17.6312 17.3185 16.9749 17.9749C16.3185 18.6312 15.4283 19 14.5 19H6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Book Session Button */}
          <motion.button
            className="w-full h-14 bg-blue-500 rounded-2xl text-white text-lg font-bold shadow-lg"
            whileHover={{ scale: 1.02, boxShadow: "0px 8px 25px rgba(116,164,238,0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBookSession}
          >
            Book Session
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};