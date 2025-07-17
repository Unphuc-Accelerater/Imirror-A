import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FooterNavBar } from "../../../components/FooterNavBar";

export const SelfAssessement = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      text: "Do you often compare yourself to others?",
      options: ["Yes", "Sometimes", "No"],
      type: "negative", // "No" is positive, "Yes" is negative
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
      const finalScore = getScore(newAnswers);
      localStorage.setItem("selfAssessmentScore", finalScore.toString());
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
        } else { // Positive questions
          if (ans.answer === "Yes" || ans.answer === "Often" || ans.answer === "Always" || ans.answer === "Very Confident") score += 1;
          else if (ans.answer === "Sometimes" || ans.answer === "Somewhat" || ans.answer === "Moderately Confident") score += 0.5;
        }
      }
    });
    return (score / questions.length) * 100; // Percentage score
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

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen relative pb-20">
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
              src="https://c.animaapp.com/md5egsqeNVgn7E/img/arrow-1.svg"
            />
          </motion.button>
          <h1 className="font-bold text-inkdarkest text-xl">Self-Assessment</h1>
        </div>

        {/* Main Content Card */}
        <div className="w-[350px] min-h-[calc(100vh-180px)] mt-[80px] mx-auto bg-[#f6f6f6] rounded-[35px] p-6 flex flex-col justify-between shadow-lg">
          {!showResults ? (
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full"
            >
              <h2 className="text-lg font-semibold text-center mb-6 text-inkdarkest">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h2>
              <div className="bg-white rounded-[20px] p-6 flex-grow flex flex-col justify-center items-center text-center shadow-md">
                <p className="text-base font-medium text-black mb-8">
                  {currentQuestion.text}
                </p>
                <div className="flex flex-col space-y-4 w-full max-w-[250px]">
                  {currentQuestion.options.map((option) => (
                    <motion.button
                      key={option}
                      className="w-full h-[45px] bg-[#f5f7fc] rounded-[15px] border-2 border-solid border-[#e9eefd] text-inkdarkest font-medium text-base"
                      whileHover={{ scale: 1.03, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleAnswer(option)}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center h-full text-center"
            >
              <h2 className="text-2xl font-bold text-inkdarkest mb-4">Assessment Complete!</h2>
              <p className="text-lg text-gray-700 mb-6">Your Self-Assessment Score:</p>
              <motion.div
                className="w-32 h-32 rounded-full bg-gradient-to-br from-[#74a4ee] to-[#9783d3] flex items-center justify-center text-white text-3xl font-bold shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                {Math.round(getScore(answers))}%
              </motion.div>
              <p className="text-sm text-gray-600 mt-4">Based on your answers, this is your current self-reflection score.</p>
              <motion.button
                className="mt-8 px-6 py-3 bg-[#74a4ee] text-white rounded-[48px] font-medium"
                whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(116,164,238,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/dashboard")}
              >
                Back to Dashboard
              </motion.button>
            </motion.div>
          )}

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-8">
            <motion.div
              className="bg-[#74a4ee] h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${calculateProgress()}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
      <FooterNavBar />
    </div>
  );
};
