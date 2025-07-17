import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const HelpFAQ = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("FAQ"); // "FAQ", "App Guide", "Privacy"
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState(null); // Stores the ID of the currently expanded FAQ

  const handleGoBack = () => {
    navigate(-1);
  };

  const faqData = [
    {
      id: 1,
      question: "How do I receive feedback?",
      answer: "You will get feedback in your personal dashboard anonymously once your form is filled.",
    },
    {
      id: 2,
      question: "Is feedback anonymous?",
      answer: "Yes, all responses are anonymous unless the responder chooses to reveal themselves.",
    },
    {
      id: 3,
      question: "Can I respond to feedback?",
      answer: "No. I Mirror is designed for one-way, non-intrusive reflections.",
    },
    {
      id: 4,
      question: "How do I book a coach?",
      answer: "Go to the “Coach” section → Select a professional → Pick a time slot → Confirm.",
    },
    {
      id: 5,
      question: "Can I delete feedback I receive?",
      answer: "Yes, swipe left on a feedback card and tap the trash icon.",
    },
    {
      id: 6,
      question: "How do I invite others to send feedback?",
      answer: "Tap “Share Form” from your dashboard to copy your unique link.",
    },
    {
      id: 7,
      question: "What is a self-assessment?",
      answer: "A private reflection tool that helps you track mood, thoughts, and patterns.",
    },
    {
      id: 8,
      question: "Can I export my reports?",
      answer: "Yes, premium users can download detailed PDF reports from the dashboard.",
    },
    {
      id: 9,
      question: "Is my data secure?",
      answer: "100%. We use end-to-end encryption and never share your data with third parties.",
    },
  ];

  const filteredFaqs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
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
          <h1 className="font-bold text-inkdarkest text-xl">Help / FAQ</h1>
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
          {/* Intro */}
          <div className="mb-6">
            <h2 className="font-bold text-black text-xl mb-2">What is I Mirror?</h2>
            <p className="text-gray-700 text-base leading-relaxed">
              I Mirror helps you receive anonymous feedback and support for your
              emotional well-being and self-growth.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-around w-full bg-gray-100 rounded-full p-1 mb-6 shadow-inner">
            {["FAQ", "App Guide", "Privacy"].map((tab) => (
              <motion.button
                key={tab}
                className={`flex-1 py-2 rounded-full text-sm font-medium ${
                  activeTab === tab ? "bg-[#74a4ee] text-white shadow-md" : "text-black"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </motion.button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="w-full h-12 bg-white rounded-lg border border-gray-300 flex items-center px-4 mb-6 shadow-sm">
            <svg
              className="w-5 h-5 text-gray-500 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              className="flex-grow h-full bg-transparent outline-none text-black text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* FAQ List */}
          <h2 className="font-bold text-black text-xl mb-4">Frequently asked questions</h2>
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <motion.div
                  key={faq.id}
                  className="bg-gray-50 rounded-lg p-4 shadow-sm cursor-pointer"
                  whileHover={{ backgroundColor: "#f0f7ff" }}
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-black text-base flex-grow pr-4">
                      {faq.question}
                    </h3>
                    <motion.svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        expandedFAQ === faq.id ? "rotate-90" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </motion.svg>
                  </div>
                  <AnimatePresence>
                    {expandedFAQ === faq.id && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-700 text-sm mt-2 overflow-hidden"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-10">
                <p className="text-lg mb-2">No articles found.</p>
                <p className="text-sm">Try a different search term.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Bottom Bar (if needed, though footer is global) */}
        <div className="absolute w-full h-[34px] bottom-0 left-0 flex items-center justify-center">
          <div className="w-[148px] h-[5px] bg-inkdarkest rounded-[100px]" />
        </div>
      </div>
    </div>
  );
};
