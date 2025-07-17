import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const RomanticForm = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    { id: 1, text: "How emotionally available do I seem to you?" },
    { id: 2, text: "Do I make my partner feel heard and appreciated?" },
    { id: 3, text: "How do I respond when things get difficult in a relationship?" },
    { id: 4, text: "What could I do to strengthen emotional intimacy?" },
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
      { id: Date.now(), text: "New question..." },
    ]);
  };

  const generateShareLink = () => {
    // In a real app, this would generate a unique form link
    return `https://imirror.com/feedback/form?template=romantic&questions=${encodeURIComponent(JSON.stringify(questions))}`;
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
    const message = `Hey! I'd love your honest feedback on my romantic behavior. Please fill out this quick form: ${link}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      <div className="bg-[linear-gradient(136deg,rgba(252,231,243,1)_11%,rgba(219,234,254,1)_43%,rgba(233,213,255,1)_100%)] w-[381px] min-h-screen relative overflow-hidden pb-20">
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
              style={{ filter: "brightness(0) saturate(100%) invert(25%) sepia(90%) saturate(1000%) hue-rotate(200deg) brightness(90%) contrast(100%)" }} /* Blue color #3B82F6 */
            />
          </motion.button>
          <h1 className="font-bold text-inkdarkest text-xl mt-4">Romantic Feedback</h1>
          <p className="text-gray-700 text-sm text-center mt-1 px-4">
            Ask how you show up in your relationships. You can edit these questions.
          </p>
        </div>

        {/* Form Area - Scrollable */}
        <div className="w-[350px] mx-auto mt-[140px] pb-20 overflow-y-auto">
          {questions.map((q) => (
            <motion.div
              key={q.id}
              className="bg-white rounded-[15px] shadow-md p-4 mb-4 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <textarea
                  className="w-full p-2 pr-8 text-base text-black outline-none resize-none min-h-[80px] rounded-md border border-transparent focus:border-[#3B82F6]"
                  value={q.text}
                  onChange={(e) => handleQuestionChange(q.id, e.target.value)}
                  rows="3"
                ></textarea>
                <motion.button
                  className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center opacity-70 hover:opacity-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✏️
                </motion.button>
              </div>
              <motion.button
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleQuestionDelete(q.id)}
              >
                ❌
              </motion.button>
            </motion.div>
          ))}

          <motion.button
            className="w-full h-12 bg-white border-2 border-[#3B82F6] text-[#3B82F6] rounded-[25px] font-medium text-base shadow-sm mt-4"
            whileHover={{ scale: 1.03, boxShadow: "0px 4px 10px rgba(59,130,246,0.2)" }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAddQuestion}
          >
            + Add Question
          </motion.button>
        </div>

        {/* Share Section - Sticky Footer */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[350px] flex space-x-4">
          <motion.button
            className="flex-1 h-[48px] bg-white border border-gray-300 text-black rounded-[25px] font-medium text-base shadow-sm flex items-center justify-center"
            whileHover={{ scale: 1.03, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCopyLink}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="#1A202C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="#1A202C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Copy Link
          </motion.button>
          <motion.button
            className="flex-1 h-[48px] bg-[#25D366] text-white rounded-[25px] font-medium text-base shadow-sm flex items-center justify-center"
            whileHover={{ scale: 1.03, boxShadow: "0px 4px 10px rgba(37,211,102,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={handleShareWhatsApp}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Share
          </motion.button>
        </div>

        {/* Bottom Bar */}
        <div className="absolute w-full h-[34px] bottom-0 left-0 flex items-center justify-center">
          <div className="w-[148px] h-[5px] bg-inkdarkest rounded-[100px]" />
        </div>
      </div>
    </div>
  );
};
