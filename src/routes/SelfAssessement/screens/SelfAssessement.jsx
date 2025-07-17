import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const SelfAssessement = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const questions = [
    {
      id: 1,
      text: "Do you often compare yourself to others?",
      options: ["Yes", "Sometimes", "No"],
      type: "negative",
    },
    {
      id: 2,
      text: "Are you proud of who you are becoming?",
      options: ["Yes", "Sometimes", "No"],
      type: "positive",
    },
    {
      id: 3,
      text: "Do you prioritize your emotional well-being daily?",
      options: ["Yes", "Sometimes", "No"],
      type: "positive",
    },
    {
      id: 4,
      text: "Are you able to set clear boundaries in personal or professional life?",
      options: ["Yes", "Sometimes", "No"],
      type: "positive",
    },
    {
      id: 5,
      text: "Do you feel a sense of purpose in your daily activities?",
      options: ["Yes", "Sometimes", "No"],
      type: "positive",
    },
    {
      id: 6,
      text: "How often do you engage in activities that genuinely make you happy?",
      options: ["Often", "Sometimes", "Rarely"],
      type: "positive",
    },
    {
      id: 7,
      text: "Do you feel a strong sense of connection with your close friends and family?",
      options: ["Yes", "Somewhat", "No"],
      type: "positive",
    },
    {
      id: 8,
      text: "Are you able to manage stress effectively?",
      options: ["Always", "Sometimes", "Rarely"],
      type: "positive",
    },
    {
      id: 9,
      text: "Do you regularly reflect on your personal growth and learning?",
      options: ["Yes", "Sometimes", "No"],
      type: "positive",
    },
    {
      id: 10,
      text: "How confident are you in pursuing your goals and aspirations?",
      options: ["Very Confident", "Moderately Confident", "Not Confident"],
      type: "positive",
    },
  ];

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, { questionId: questions[currentQuestionIndex].id, answer }];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const score = getScore(newAnswers);
      setFinalScore(score);
      localStorage.setItem("selfAssessmentScore", score.toString());
      setShowResults(true);
    }
  };

  const calculateProgress = () => {
    return ((currentQuestionIndex + (showResults ? 1 : 0)) / questions.length) * 100;
  };

  const getScore = (currentAnswers) => {
    let score = 0;
    currentAnswers.forEach(ans => {
      const question = questions.find(q => q.id === ans.questionId);
      if (question) {
        if (question.type === "negative") {
          if (ans.answer === "No") score += 1;
          else if (ans.answer === "Sometimes") score += 0.5;
        } else {
          if (ans.answer === "Yes" || ans.answer === "Often" || ans.answer === "Always" || ans.answer === "Very Confident") score += 1;
          else if (ans.answer === "Sometimes" || ans.answer === "Somewhat" || ans.answer === "Moderately Confident") score += 0.5;
        }
      }
    });
    return (score / questions.length) * 100;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return { bg: "from-green-500 to-emerald-600", text: "Excellent" };
    if (score >= 60) return { bg: "from-blue-500 to-cyan-600", text: "Good" };
    if (score >= 40) return { bg: "from-yellow-500 to-orange-500", text: "Fair" };
    return { bg: "from-red-500 to-pink-600", text: "Needs Improvement" };
  };

  const handleGoBack = () => {
    if (showResults) {
      setShowResults(false);
      setCurrentQuestionIndex(questions.length - 1);
    } else if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswers(answers.slice(0, -1));
    } else {
      navigate(-1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const scoreData = getScoreColor(finalScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm p-4 flex items-center justify-between">
        <motion.button
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          whileTap={{ scale: 0.9 }}
          onClick={handleGoBack}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19L5 12L12 5" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
        <h1 className="text-xl font-bold text-gray-800">Self-Assessment</h1>
        <div className="w-10" />
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4">
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <motion.div
            className="bg-gradient-to-r from-[#74a4ee] to-[#9783d3] h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${calculateProgress()}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-sm text-gray-600 text-center">
          {showResults ? "Complete!" : `Question ${currentQuestionIndex + 1} of ${questions.length}`}
        </p>
      </div>

      {/* Main Content */}
      <div className="px-6 flex-1">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-xl p-8 mx-auto max-w-md"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-[#74a4ee] to-[#9783d3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">{currentQuestionIndex + 1}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 leading-relaxed">
                  {currentQuestion.text}
                </h2>
              </div>

              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={option}
                    className="w-full p-4 bg-gray-50 hover:bg-blue-50 rounded-2xl border-2 border-transparent hover:border-[#74a4ee] transition-all text-left font-medium text-gray-700 hover:text-[#74a4ee]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl p-8 mx-auto max-w-md text-center"
            >
              <motion.div
                className="mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Assessment Complete!</h2>
                <p className="text-gray-600">Here's your self-reflection score</p>
              </motion.div>

              {/* Score Display */}
              <motion.div
                className={`w-40 h-40 rounded-full bg-gradient-to-r ${scoreData.bg} flex flex-col items-center justify-center mx-auto mb-6 shadow-xl`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
              >
                <span className="text-white text-4xl font-bold">{Math.round(finalScore)}%</span>
                <span className="text-white text-sm font-medium">{scoreData.text}</span>
              </motion.div>

              {/* Score Interpretation */}
              <motion.div
                className="bg-gray-50 rounded-2xl p-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-sm text-gray-600 leading-relaxed">
                  {finalScore >= 80 && "Outstanding! You show excellent self-awareness and emotional well-being."}
                  {finalScore >= 60 && finalScore < 80 && "Great job! You have good self-awareness with room for growth."}
                  {finalScore >= 40 && finalScore < 60 && "You're on the right track. Focus on areas that need attention."}
                  {finalScore < 40 && "This is a starting point. Consider seeking support for personal growth."}
                </p>
              </motion.div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <motion.button
                  className="w-full h-12 bg-gradient-to-r from-[#74a4ee] to-[#9783d3] rounded-2xl text-white font-bold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/dashboard")}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  Back to Dashboard
                </motion.button>
                
                <motion.button
                  className="w-full h-12 bg-white border-2 border-[#74a4ee] rounded-2xl text-[#74a4ee] font-bold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowResults(false);
                    setCurrentQuestionIndex(0);
                    setAnswers([]);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  Retake Assessment
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};