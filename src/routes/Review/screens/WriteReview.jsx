import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const WriteReview = () => {
  const navigate = useNavigate();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    if (reviewText.trim() === "" || rating === 0) {
      alert("Please provide a review and a rating.");
      return;
    }
    // Simulate review submission
    console.log("Review Submitted:", { reviewText, rating });
    navigate("/thank-you-review");
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
          <h1 className="font-bold text-inkdarkest text-xl">Write a Review</h1>
          {/* Decorative icon */}
          <div className="absolute right-4 w-10 h-10 flex items-center justify-center">
            <img
              src="https://c.animaapp.com/md5f5ldin4OF2T/img/vector-9.svg" // Placeholder for sparkle icon
              alt="Sparkle"
              className="w-6 h-6"
            />
          </div>
        </div>

        {/* Main Content Card */}
        <motion.div
          className="w-[350px] mx-auto bg-white rounded-[20px] shadow-lg pt-6 px-6 pb-20 mt-[80px] relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-bold text-black text-xl mb-4">Your Review</h2>
          <textarea
            className="w-full h-32 p-4 rounded-lg border border-gray-300 focus:border-[#74a4ee] focus:ring-2 focus:ring-[#74a4ee]/30 outline-none text-base resize-none"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>

          {/* Star Rating */}
          <div className="mt-6 mb-8 text-center">
            <h3 className="font-bold text-black text-lg mb-3">Rate your experience</h3>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.svg
                  key={star}
                  className={`w-10 h-10 cursor-pointer ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(star)}
                >
                  <path d="M9.049 2.927c.3-.921 1.602-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                </motion.svg>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            className="w-full h-12 bg-[#74a4ee] rounded-[25px] text-white text-lg font-bold shadow-md"
            whileHover={{ scale: 1.03, boxShadow: "0px 6px 15px rgba(116,164,238,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
          >
            Submit
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
