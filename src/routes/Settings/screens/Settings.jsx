import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PhotoVideoCamera } from "../../../icons/PhotoVideoCamera"; // Corrected import path

export const Settings = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("userData");
    localStorage.removeItem("profileImage");
    localStorage.removeItem("selfAssessmentScore");
    localStorage.removeItem("journalEntries");
    // Navigate to splash screen or login page
    navigate("/");
  };

  const handleProfilePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Update profile image in local storage
        localStorage.setItem("profileImage", reader.result);
        // Optionally, trigger a re-render or update state if needed
        alert("Profile picture updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const SettingItem = ({ iconSrc, text, onClick }) => (
    <motion.div
      className="relative w-full h-14 bg-skywhite flex items-center px-6 cursor-pointer border-b border-gray-100 last:border-b-0"
      whileHover={{ backgroundColor: "#f0f7ff", x: 5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <img className="w-6 h-6 mr-4" alt={text} src={iconSrc} />
      <div className="flex-grow font-regular-tight-regular text-inkdarkest text-base">
        {text}
      </div>
      <img
        className="w-2 h-3.5"
        alt="Arrow"
        src="https://c.animaapp.com/md5f5ldin4OF2T/img/vector.svg"
      />
    </motion.div>
  );

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      <div className="bg-white bg-[linear-gradient(136deg,rgba(219,234,254,1)_11%,rgba(202,225,254,1)_43%,rgba(252,231,243,1)_100%)] w-[381px] min-h-screen relative overflow-hidden">
        {/* Header */}
        <div className="absolute w-full h-[60px] top-0 left-0 bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center">
          <motion.button
            className="absolute left-4 w-[31px] h-[15px]"
            whileTap={{ scale: 0.9 }}
            onClick={handleGoBack}
          >
            <img
              className="w-full h-full"
              alt="Arrow"
              src="https://c.animaapp.com/md5f5ldin4OF2T/img/arrow-1.svg"
            />
          </motion.button>
          <h1 className="font-bold text-inkdarkest text-xl">Settings</h1>
        </div>

        {/* Main Content Card */}
        <div className="w-[350px] min-h-[calc(100vh-100px)] mt-[80px] mx-auto bg-skywhite rounded-[32px] overflow-hidden shadow-lg pb-20">
          {/* Profile Section */}
          <div className="w-full h-[100px] bg-skywhite flex flex-col items-center justify-center pt-4">
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-[#DBEAFF] to-[#FCE7F3] flex items-center justify-center shadow-md cursor-pointer relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleProfilePhotoClick}
            >
              <img
                className="w-8 h-8"
                alt="Profile Icon"
                src="https://c.animaapp.com/md5f5ldin4OF2T/img/vector-1.svg"
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              {/* Plus icon for adding photo */}
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center text-white text-xl font-bold">
                +
              </div>
            </motion.div>
          </div>

          {/* Premium Membership Card */}
          <motion.div
            className="w-[333px] h-20 mx-auto mt-4 bg-primarybase rounded-xl p-5 flex flex-col justify-center shadow-md cursor-pointer"
            whileHover={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(107,78,255,0.3)" }}
            onClick={() => navigate("/membership")}
          >
            <h3 className="font-large-none-bold text-skywhite text-lg">
              Premium Membership
            </h3>
            <p className="font-small-none-regular text-primarylightest text-sm">
              Upgrade for more features
            </p>
          </motion.div>

          {/* Account Section */}
          <div className="mt-8 px-0">
            <h2 className="text-lg font-large-normal-bold text-inkdarkest mb-3 px-6">
              Account
            </h2>
            <SettingItem
              iconSrc="https://c.animaapp.com/md5f5ldin4OF2T/img/vector-4.svg"
              text="Profile"
              onClick={() => navigate("/edit-profile")} // Navigate to EditProfile
            />
            <SettingItem
              iconSrc="https://c.animaapp.com/md5f5ldin4OF2T/img/friend.png"
              text="Refer a Friend"
              onClick={() => navigate("/refer-a-friend")} // Navigate to ReferAFriend
            />
            <SettingItem
              iconSrc="https://c.animaapp.com/md5f5ldin4OF2T/img/vector-6.svg"
              text="Notifications"
              onClick={() => navigate("/notifications")} // Navigate to Notifications
            />
          </div>

          {/* More Section */}
          <div className="mt-6 px-0">
            <h2 className="text-lg font-large-normal-bold text-inkdarkest mb-3 px-6">
              More
            </h2>
            <SettingItem
              iconSrc="https://c.animaapp.com/md5f5ldin4OF2T/img/vector-9.svg"
              text="Rate & Review"
              onClick={() => navigate("/write-review")} // Navigate to WriteReview
            />
            <SettingItem
              iconSrc="https://c.animaapp.com/md5f5ldin4OF2T/img/vector-7.svg"
              text="Help"
              onClick={() => navigate("/help-faq")} // Navigate to HelpFAQ
            />
          </div>

          {/* Logout Button */}
          <motion.button
            className="w-full py-4 mt-8 text-skydark font-regular-none-regular text-base text-center"
            whileHover={{ backgroundColor: "#f0f7ff", scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
          >
            Log out
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
