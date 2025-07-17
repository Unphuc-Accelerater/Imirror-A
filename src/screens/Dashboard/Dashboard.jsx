import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Component } from "../../components/Component";
import { Bell } from "../../icons/Bell";
import { Menu } from "../../icons/Menu";
import { FooterNavBar } from "../../components/FooterNavBar";
import { motion } from "framer-motion";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [selfAssessmentScore, setSelfAssessmentScore] = useState(null);

  useEffect(() => {
    // Load user data from localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    // Load profile image from localStorage
    const storedProfileImage = localStorage.getItem("profileImage");
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }

    // Load self-assessment score from localStorage
    const storedScore = localStorage.getItem("selfAssessmentScore");
    if (storedScore) {
      setSelfAssessmentScore(parseFloat(storedScore));
    }
  }, []);

  return (
    <div
      className="bg-white flex flex-row justify-center w-full"
      data-model-id="681:926"
    >
      <div className="bg-white overflow-hidden bg-[linear-gradient(168deg,rgba(219,234,254,1)_11%,rgba(202,225,254,1)_43%,rgba(252,231,243,1)_100%)] w-[381px] h-[801px] relative">
        {/* Header */}
        <div className="absolute w-full h-[80px] top-0 left-0 bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-between px-4">
          <div className="flex items-center">
            <Component
              className="!h-14 !w-14"
              overlapGroupClassName="!h-[54px] !w-[54px]"
              rectangleClassName="!h-[43px] !w-[29px] !top-[3px]"
              rectangleClassNameOverride="!h-[43px] !left-3.5 !w-[29px] !top-[11px]"
              star="https://c.animaapp.com/hUOULd8k/img/star-5-2.svg"
              starClassName="!h-[13px] !left-[41px] !w-[13px]"
            />
            <div className="ml-2 font-open-sans-semibold font-[number:var(--open-sans-semibold-font-weight)] text-new-fill-000000 text-[length:var(--open-sans-semibold-font-size)] tracking-[var(--open-sans-semibold-letter-spacing)] leading-[var(--open-sans-semibold-line-height)] [font-style:var(--open-sans-semibold-font-style)]">
              iMirror
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Profile Picture */}
            {profileImage ? (
              <motion.img
                className="w-10 h-10 rounded-full object-cover border-2 border-[#74a4ee]"
                alt="Profile"
                src={profileImage}
                whileHover={{ scale: 1.1 }}
                onClick={() => navigate("/setupprofile")}
              />
            ) : (
              <motion.img
                className="w-10 h-10 rounded-full border-2 border-[#74a4ee]"
                alt="Ellipse"
                src="https://c.animaapp.com/hUOULd8k/img/ellipse-2@2x.png"
                whileHover={{ scale: 1.1 }}
                onClick={() => navigate("/setupprofile")}
              />
            )}
            {/* Hamburger Menu */}
            <motion.button
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f8f5ff]"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/settings")}
            >
              <Menu className="!w-6 !h-6" />
            </motion.button>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="absolute top-[100px] left-0 right-0 px-6">
          <motion.h1 
            className="text-2xl font-bold text-[#333] mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {userData?.name ? `Welcome, ${userData.name}!` : "Welcome!"}
          </motion.h1>
          <motion.p 
            className="text-sm text-gray-600 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            What would you like to do today?
          </motion.p>
        </div>

        {/* Main Cards - First Row */}
        <div className="absolute top-[160px] left-0 right-0 px-4 flex justify-between">
          <Link to="/request-feedback" className="block w-[48%]">
            <motion.div 
              className="w-full h-[170px] bg-white rounded-[20px] shadow-[0px_5px_15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col items-center justify-center relative"
              whileHover={{ y: -5, boxShadow: "0px 10px 25px rgba(116,164,238,0.2)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#74a4ee] to-[#9783d3]"></div>
              <img
                className="w-[50px] h-[50px] mb-3 object-cover"
                alt="Image"
                src="https://c.animaapp.com/hUOULd8k/img/image-26@2x.png"
              />
              <h3 className="font-bold text-[#333] text-center text-lg mb-1">Request Feedback</h3>
              <span className="text-xs text-gray-500">1/5 completed</span>
            </motion.div>
          </Link>
          
          <Link to="/self-assessment" className="block w-[48%]">
            <motion.div 
              className="w-full h-[170px] bg-white rounded-[20px] shadow-[0px_5px_15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col items-center justify-center relative"
              whileHover={{ y: -5, boxShadow: "0px 10px 25px rgba(116,164,238,0.2)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#74a4ee] to-[#9783d3]"></div>
              <img
                className="w-[50px] h-[50px] mb-3 object-cover"
                alt="Image"
                src="https://c.animaapp.com/hUOULd8k/img/image-28@2x.png"
              />
              <h3 className="font-bold text-[#333] text-center text-lg mb-1">Self Assessment</h3>
              <span className="text-xs text-gray-500">Try it now</span>
            </motion.div>
          </Link>
        </div>

        {/* Main Cards - Second Row */}
        <div className="absolute top-[350px] left-0 right-0 px-4 flex justify-between">
          <Link to="/journals" className="block w-[48%]">
            <motion.div 
              className="w-full h-[170px] bg-white rounded-[20px] shadow-[0px_5px_15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col items-center justify-center relative"
              whileHover={{ y: -5, boxShadow: "0px 10px 25px rgba(116,164,238,0.2)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#74a4ee] to-[#9783d3]"></div>
              <img
                className="w-[50px] h-[50px] mb-3"
                alt="Open book"
                src="https://c.animaapp.com/hUOULd8k/img/open-book@2x.png"
              />
              <h3 className="font-bold text-[#333] text-center text-lg mb-1">Journal Stories</h3>
              <span className="text-xs text-gray-500">Write today</span>
            </motion.div>
          </Link>
          
          <Link to="/coaches" className="block w-[48%]">
            <motion.div 
              className="w-full h-[170px] bg-white rounded-[20px] shadow-[0px_5px_15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col items-center justify-center relative"
              whileHover={{ y: -5, boxShadow: "0px 10px 25px rgba(116,164,238,0.2)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#74a4ee] to-[#9783d3]"></div>
              <img
                className="w-[50px] h-[50px] mb-3 object-cover"
                alt="Image"
                src="https://c.animaapp.com/hUOULd8k/img/image-27@2x.png"
              />
              <h3 className="font-bold text-[#333] text-center text-lg mb-1">Coaches</h3>
              <span className="text-xs text-gray-500">Find support</span>
            </motion.div>
          </Link>
        </div>

        {/* My Sessions Card */}
        <motion.div 
          className="absolute top-[540px] left-0 right-0 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="w-full h-[80px] bg-white rounded-[20px] shadow-[0px_5px_15px_rgba(0,0,0,0.05)] overflow-hidden flex items-center px-6 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#74a4ee] to-[#9783d3]"></div>
            <div className="w-[40px] h-[40px] bg-[#f0f7ff] rounded-full flex items-center justify-center mr-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12L15 15" stroke="#74a4ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#74a4ee" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-[#333] text-lg">My Sessions</h3>
              <p className="text-xs text-gray-500">No upcoming sessions</p>
            </div>
          </div>
        </motion.div>

        {/* Updates Section */}
        <motion.div 
          className="absolute top-[640px] left-0 right-0 px-4 mb-[100px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h2 className="text-lg font-bold text-[#333] mb-3">Updates</h2>
          <div className="w-full h-[60px] bg-white rounded-[15px] shadow-[0px_5px_15px_rgba(0,0,0,0.05)] flex items-center px-4">
            <div className="w-[34px] h-[34px] bg-[#f0f7ff] rounded-full flex items-center justify-center mr-4">
              <img
                className="w-5 h-5"
                alt="Vector"
                src="https://c.animaapp.com/hUOULd8k/img/vector.svg"
              />
            </div>
            <p className="font-medium text-[#333]">No new updates</p>
          </div>
        </motion.div>

        {/* Self-Assessment Progress Card */}
        {selfAssessmentScore !== null && (
          <motion.div 
            className="absolute top-[730px] left-0 right-0 px-4 mb-[100px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <h2 className="text-lg font-bold text-[#333] mb-3">Self-Assessment Progress</h2>
            <div className="w-full h-[80px] bg-white rounded-[20px] shadow-[0px_5px_15px_rgba(0,0,0,0.05)] overflow-hidden flex items-center px-6 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#74a4ee] to-[#9783d3]"></div>
              <div className="flex-grow">
                <h3 className="font-bold text-[#333] text-lg">Your Latest Score: {Math.round(selfAssessmentScore)}%</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <motion.div
                    className="bg-[#74a4ee] h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${selfAssessmentScore}%` }}
                    transition={{ duration: 1.0 }}
                  />
                </div>
              </div>
              <Link to="/self-assessment" className="ml-4 text-sm text-[#74a4ee] font-medium">View Details</Link>
            </div>
          </motion.div>
        )}

        <FooterNavBar />
      </div>
    </div>
  );
};
