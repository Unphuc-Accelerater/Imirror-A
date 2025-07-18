import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Component } from "../../components/Component";
import { MobileLayout } from "../../components/Layout/MobileLayout";
import { LoadingSpinner } from "../../components/UI/LoadingSpinner";
import { api } from "../../utils/api";
import { storage } from "../../utils/storage";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [selfAssessmentScore, setSelfAssessmentScore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load user data
      const userResponse = await api.getProfile();
      if (userResponse.success && userResponse.data) {
        setUserData(userResponse.data);
      }

      // Load profile image
      const image = storage.getProfileImage();
      if (image) {
        setProfileImage(image);
      }

      // Load self-assessment score
      const score = storage.getSelfAssessmentScore();
      if (score) {
        setSelfAssessmentScore(score);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const dashboardCards = [
    {
      title: "Request Feedback",
      subtitle: "1/5 completed",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      route: "/request-feedback",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      title: "Self Assessment",
      subtitle: "Try it now",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400",
      route: "/self-assessment",
      gradient: "from-purple-400 to-purple-600"
    },
    {
      title: "Journal Stories",
      subtitle: "Write today",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
      route: "/journals",
      gradient: "from-green-400 to-green-600"
    },
    {
      title: "Coaches",
      subtitle: "Find support",
      image: "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=400",
      route: "/coaches",
      gradient: "from-pink-400 to-pink-600"
    }
  ];

  if (loading) {
    return (
      <MobileLayout showFooter={false}>
        <div className="flex items-center justify-center h-full">
          <LoadingSpinner size="lg" />
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm shadow-sm p-4 pt-6 flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-3">
            <Component
              className="!h-12 !w-12"
              overlapGroupClassName="!h-[46px] !w-[44px]"
              rectangleClassName="!h-[37px] !w-[25px] !top-1"
              rectangleClassNameOverride="!h-[37px] !left-3 !w-[25px] !top-2"
              star="https://c.animaapp.com/hUOULd8k/img/star-5-2.svg"
              starClassName="!h-[11px] !left-[33px] !w-[11px]"
            />
            <h1 className="text-xl font-bold text-gray-800">iMirror</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.button
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/edit-profile')}
            >
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                  {userData?.name ? userData.name[0].toUpperCase() : '?'}
                </div>
              )}
            </motion.button>
            
            <motion.button
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/settings')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z" fill="#374151" />
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Welcome Section */}
        <motion.div 
          className="p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {userData?.name ? `Welcome back, ${userData.name}!` : "Welcome back!"}
          </h2>
          <p className="text-gray-600">What would you like to do today?</p>
        </motion.div>

        {/* Dashboard Cards */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {dashboardCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
              >
                <Link to={card.route}>
                  <motion.div 
                    className="bg-white rounded-2xl p-4 shadow-lg h-40 flex flex-col items-center justify-center text-center relative overflow-hidden"
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.gradient}`} />
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                      <img 
                        src={card.image} 
                        alt={card.title}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm mb-1">{card.title}</h3>
                    <p className="text-xs text-gray-500">{card.subtitle}</p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* My Sessions Card */}
          <motion.div
            className="bg-white rounded-2xl p-4 shadow-lg mb-6 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12L15 15" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3B82F6" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">My Sessions</h3>
              <p className="text-sm text-gray-500">No upcoming sessions</p>
            </div>
          </motion.div>

          {/* Self Assessment Progress */}
          {selfAssessmentScore !== null && (
            <motion.div
              className="bg-white rounded-2xl p-4 shadow-lg mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <h3 className="font-bold text-gray-800 mb-3">Self-Assessment Progress</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Latest Score</span>
                <span className="font-bold text-blue-600">{Math.round(selfAssessmentScore)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <motion.div
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${selfAssessmentScore}%` }}
                  transition={{ delay: 1, duration: 1 }}
                />
              </div>
              <Link to="/self-assessment" className="text-sm text-blue-600 font-medium">
                Take Assessment Again →
              </Link>
            </motion.div>
          )}

          {/* Updates Section */}
          <motion.div
            className="bg-white rounded-2xl p-4 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <h3 className="font-bold text-gray-800 mb-3">Recent Updates</h3>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-600">No new updates</p>
            </div>
          </motion.div>
        </div>
      </div>
    </MobileLayout>
  );
};