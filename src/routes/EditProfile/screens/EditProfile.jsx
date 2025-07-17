import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PhotoVideoCamera } from "../../../icons/PhotoVideoCamera"; // Assuming this is the camera icon

export const EditProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    dateOfBirth: "",
  });
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    const storedProfileImage = localStorage.getItem("profileImage");
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("profileImage", reader.result);
        alert("Profile picture updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Changes saved successfully!");
    navigate("/dashboard");
  };

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
              src="https://c.animaapp.com/md5ftykhnMOpVD/img/arrow-1.svg"
            />
          </motion.button>
          <h1 className="font-bold text-inkdarkest text-xl">Edit Profile</h1>
        </div>

        {/* Main Content Card */}
        <div className="w-[350px] min-h-[calc(100vh-100px)] mt-[80px] mx-auto bg-white rounded-[32px] overflow-hidden shadow-lg pb-20">
          {/* Profile Picture Section */}
          <div className="w-full flex flex-col items-center justify-center pt-8 pb-4">
            <motion.div
              className="w-24 h-24 rounded-full bg-gradient-to-br from-[#DBEAFF] to-[#FCE7F3] flex items-center justify-center shadow-md cursor-pointer relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleProfilePhotoClick}
            >
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <PhotoVideoCamera className="!w-10 !h-10" />
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="absolute bottom-0 right-0 w-7 h-7 bg-blue-800 rounded-full flex items-center justify-center text-white text-xl font-bold">
                +
              </div>
            </motion.div>
            <h3 className="mt-4 font-bold text-gray-800 text-base">Profile Picture</h3>
          </div>

          {/* Form Fields */}
          <div className="px-6 py-4 space-y-6">
            <div>
              <label className="block font-medium text-gray-700 text-sm mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                className="w-full h-12 px-4 rounded-lg border border-solid border-gray-300 focus:border-[#74a4ee] focus:ring-2 focus:ring-[#74a4ee]/30 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 text-sm mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                className="w-full h-12 px-4 rounded-lg border border-solid border-gray-300 focus:border-[#74a4ee] focus:ring-2 focus:ring-[#74a4ee]/30 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 text-sm mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className="w-full h-12 px-4 rounded-lg border border-solid border-gray-300 focus:border-[#74a4ee] focus:ring-2 focus:ring-[#74a4ee]/30 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 text-sm mb-2">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="w-full h-12 px-4 rounded-lg border border-solid border-gray-300 focus:border-[#74a4ee] focus:ring-2 focus:ring-[#74a4ee]/30 outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 text-sm mb-2">Bio</label>
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-solid border-gray-300 focus:border-[#74a4ee] focus:ring-2 focus:ring-[#74a4ee]/30 outline-none resize-none"
              ></textarea>
            </div>
            <div>
              <label className="block font-medium text-gray-700 text-sm mb-2">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={userData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full h-12 px-4 rounded-lg border border-solid border-gray-300 focus:border-[#74a4ee] focus:ring-2 focus:ring-[#74a4ee]/30 outline-none appearance-none"
              />
            </div>
          </div>

          {/* Save Changes Button */}
          <motion.button
            className="w-[248px] h-[39px] mx-auto mt-8 bg-[#74a4ee] rounded-[25px] shadow-[0px_4px_16px_rgba(116,164,238,0.3)] flex items-center justify-center text-white font-bold text-base"
            whileHover={{ scale: 1.03, boxShadow: "0px 6px 20px rgba(116,164,238,0.4)" }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSaveChanges}
          >
            Save Changes
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
