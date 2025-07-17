import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const RelationshipForm = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    { id: 1, text: "How supported do you feel in our relationship?" },
    { id: 2, text: "Do I communicate my needs clearly?" },
    { id: 3, text: "How do I handle conflicts with you?" },
    { id: 4, text: "What's one thing I could improve as a partner/friend?" },
  ]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleQuestionChange = (id, newText) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text: newText } : q)));
  };

  const handleQuestionDelete = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), text: "New custom question..." },
    ]);
  };

  const generateShareLink = () => {
    // In a real app, this would generate a unique form link
    return `https://imirror.com/feedback/form?template=relationship&questions=${encodeURIComponent(JSON.stringify(questions))}`;
  };

  const handleCopyLink = () => {
    const link = generateShareLink();
    navigator.clipboard.writeText(link).then(() => {
      alert("Form link copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy link: ", err);
      alert("Failed to copy link. Please try again.");
    });
  };

  const handleShareWhatsApp = () => {
    const link = generateShareLink();
    const message = `Hey! I'd love your honest feedback on our relationship. Please fill out this quick form: ${link}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleSaveAndContinue = () => {
    // In a real app, you'd save the customized form to a database
    alert("Form saved and ready to share!");
    navigate("/dashboard"); // Navigate back to dashboard or a sharing confirmation screen
  };

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      <div className="bg-[linear-gradient(136deg,rgba(252,231,243,1)_11%,rgba(202,225,254,1)_43%,rgba(219,234,254,1)_100%)] w-[381px] min-h-screen relative overflow-hidden pb-20">
        {/* Header */}
        <div className="absolute w-full h-[120px] top-0 left-0 bg-white/80 backdrop-blur-sm shadow-sm flex flex-col items-center justify-center pt-10">
          <motion.button
            className="absolute top-8 left-6 w-9 h-[15px]"
            whileTap={{ scale: 0.9 }}
            onClick={handleGoBack}
          >
            <img
              className="w-full h-full"
              alt="Arrow"
              src="https://c.animaapp.com/md5i17leZoCaAz/img/arrow-1.svg"
              style={{ filter: "brightness(0) saturate(100%) invert(25%) sepia(90%) saturate(1000%) hue-rotate(200deg) brightness(90%) contrast(100%)" }} /* Blue color */
            />
          </motion.button>
          <h1 className="font-bold text-inkdarkest text-xl mt-4">Relationship Feedback</h1>
          <p className="text-gray-700 text-sm text-center mt-1 px-4">
            Ask how you show up in your relationships. Edit below.
          </p>
        </div>

        {/* Form Area */}
        <div className="w-[350px] mx-auto mt-[140px] pb-20">
          {questions.map((q) => (
            <motion.div
              key={q.id}
              className="bg-white rounded-[15px] shadow-md p-4 mb-4 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <textarea
                className="w-full p-2 text-base text-black outline-none resize-none"
                value={q.text}
                onChange={(e) => handleQuestionChange(q.id, e.target.value)}
                rows="3"
              ></textarea>
              <motion.button
                className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleQuestionDelete(q.id)}
              >
                ❌
              </motion.button>
            </motion.div>
          ))}

          <motion.button
            className="w-full h-12 bg-white border-2 border-[#74a4ee] text-[#74a4ee] rounded-[25px] font-bold text-base shadow-md mt-4"
            whileHover={{ scale: 1.03, boxShadow: "0px 6px 15px rgba(116,164,238,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAddQuestion}
          >
            + Add Question
          </motion.button>

          {/* Share Section */}
          <div className="mt-8">
            <h2 className="font-bold text-black text-xl mb-4">Share Your Form</h2>
            <motion.button
              className="w-full h-12 bg-white border-2 border-gray-300 text-black rounded-[25px] font-medium text-base shadow-md flex items-center justify-center mb-4"
              whileHover={{ scale: 1.03, boxShadow: "0px 6px 15px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCopyLink}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="#1A202C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="#1A202C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Copy Link
            </motion.button>
            <motion.button
              className="w-full h-12 bg-emerald-500 text-white rounded-[25px] font-medium text-base shadow-md flex items-center justify-center"
              whileHover={{ scale: 1.03, boxShadow: "0px 6px 15px rgba(16,185,129,0.3)" }}
              whileTap={{ scale: 0.97 }}
              onClick={handleShareWhatsApp}
            >
              <img
                className="w-6 h-6 mr-2"
                alt="WhatsApp Icon"
                src="https://c.animaapp.com/md5g6gzw6zh9TS/img/whatsapp.svg"
              />
              Share via WhatsApp
            </motion.button>
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <motion.button
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[350px] h-12 bg-[#74a4ee] rounded-[25px] text-white text-lg font-bold shadow-lg"
          whileHover={{ scale: 1.03, boxShadow: "0px 6px 15px rgba(116,164,238,0.3)" }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSaveAndContinue}
        >
          Save & Continue
        </motion.button>

        {/* Bottom Bar (if needed, though footer is global) */}
        <div className="absolute w-full h-[34px] bottom-0 left-0 flex items-center justify-center">
          <div className="w-[148px] h-[5px] bg-inkdarkest rounded-[100px]" />
        </div>
      </div>
    </div>
  );
};
