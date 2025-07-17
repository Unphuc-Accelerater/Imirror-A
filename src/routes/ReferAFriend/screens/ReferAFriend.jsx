import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const ReferAFriend = () => {
  const navigate = useNavigate();
  const referralCode = "IMIRROR25"; // Example referral code
  const referralLink = "https://imirror.com/refer?code=" + referralCode; // Example referral link

  const handleGoBack = () => {
    navigate(-1);
  };

  const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(message);
    }).catch(err => {
      console.error("Failed to copy: ", err);
      alert("Failed to copy. Please try again.");
    });
  };

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      <div className="bg-white w-[381px] min-h-screen relative overflow-hidden pb-20">
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
              src="https://c.animaapp.com/md5g6gzw6zh9TS/img/arrow-1.svg"
            />
          </motion.button>
          <h1 className="font-bold text-inkdarkest text-xl">Refer a Friend</h1>
        </div>

        {/* Main Content Card */}
        <div className="w-[350px] min-h-[calc(100vh-100px)] mt-[80px] mx-auto bg-white rounded-[20px] shadow-lg p-6 flex flex-col items-center">
          {/* Referral Banner */}
          <div className="w-full h-[220px] rounded-xl bg-[linear-gradient(90deg,rgba(252,231,243,1)_100%,rgba(219,234,254,1)_0%)] flex flex-col items-center justify-center text-center p-4 shadow-md">
            <p className="font-bold text-blue-800 text-2xl mb-2">
              Earn $25 for each friend!
            </p>
            <p className="font-normal text-gray-800 text-base">
              Share your referral code and both you and your friend get $25 when
              they sign up.
            </p>
          </div>

          {/* Referred Friends Count */}
          <div className="mt-8 text-center">
            <p className="font-normal text-gray-500 text-sm mb-2">
              You have referred
            </p>
            <div className="w-[120px] h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="font-bold text-blue-800 text-lg">
                3 friends
              </span>
            </div>
          </div>

          {/* Referral Code Section */}
          <div className="w-full mt-8">
            <h3 className="font-medium text-gray-800 text-base mb-3">
              Your Referral Code
            </h3>
            <div className="relative w-full h-14 bg-gray-50 rounded-lg border border-solid border-gray-300 flex items-center px-4">
              <span className="flex-grow text-gray-800 text-lg font-semibold">{referralCode}</span>
              <motion.button
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => copyToClipboard(referralCode, "Referral code copied!")}
              >
                <img
                  className="w-5 h-5"
                  alt="Copy Icon"
                  src="https://c.animaapp.com/md5g6gzw6zh9TS/img/vector-5.svg"
                />
              </motion.button>
            </div>
            <motion.button
              className="w-full h-12 mt-4 bg-blue-800 rounded-lg text-white font-medium text-base shadow-md"
              whileHover={{ scale: 1.02, boxShadow: "0px 6px 15px rgba(43,108,176,0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => copyToClipboard(referralCode, "Referral code copied!")}
            >
              Copy Code
            </motion.button>
          </div>

          {/* Share Referral Link Section */}
          <div className="w-full mt-8">
            <h3 className="font-medium text-gray-800 text-base mb-3">
              Share Referral Link
            </h3>
            <div className="relative w-full h-14 bg-gray-50 rounded-lg border border-solid border-gray-300 flex items-center px-4">
              <span className="flex-grow text-gray-800 text-lg font-semibold truncate">{referralLink}</span>
              <motion.button
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => copyToClipboard(referralLink, "Referral link copied!")}
              >
                <img
                  className="w-5 h-5"
                  alt="Copy Link Icon"
                  src="https://c.animaapp.com/md5g6gzw6zh9TS/img/vector-7.svg"
                />
              </motion.button>
            </div>
            <motion.button
              className="w-full h-12 mt-4 bg-blue-800 rounded-lg text-white font-medium text-base shadow-md"
              whileHover={{ scale: 1.02, boxShadow: "0px 6px 15px rgba(43,108,176,0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => copyToClipboard(referralLink, "Referral link copied!")}
            >
              Copy Link
            </motion.button>
          </div>

          {/* Share via Social Media Section */}
          <div className="w-full mt-8">
            <h3 className="font-medium text-gray-800 text-base mb-3">
              Share via Social Media
            </h3>
            <div className="flex justify-around w-full space-x-4">
              <motion.button
                className="flex-1 h-12 bg-[#1877f2] rounded-lg flex items-center justify-center text-white font-medium text-base shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert("Share to Facebook clicked!")}
              >
                <img
                  className="w-5 h-5 mr-2"
                  alt="Facebook Icon"
                  src="https://c.animaapp.com/md5g6gzw6zh9TS/img/vector-10.svg"
                />
                Facebook
              </motion.button>
              <motion.button
                className="flex-1 h-12 bg-[#1da1f2] rounded-lg flex items-center justify-center text-white font-medium text-base shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert("Share to Twitter clicked!")}
              >
                <img
                  className="w-5 h-5 mr-2"
                  alt="Twitter Icon"
                  src="https://c.animaapp.com/md5g6gzw6zh9TS/img/vector.svg"
                />
                Twitter
              </motion.button>
            </div>
            <motion.button
              className="w-full h-12 mt-4 bg-[#058c2e] rounded-lg text-white font-medium text-base shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => alert("Share to WhatsApp clicked!")}
            >
              WhatsApp
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
