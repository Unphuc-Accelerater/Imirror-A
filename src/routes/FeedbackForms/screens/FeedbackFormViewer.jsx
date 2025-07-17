import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../../../utils/database";
import { LoadingSpinner } from "../../../components/UI/LoadingSpinner";
import { toast } from "../../../components/UI/Toast";

export const FeedbackFormViewer = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadForm();
  }, [formId]);

  const loadForm = async () => {
    try {
      const result = await api.feedbackForms.getById(formId);
      if (result.success) {
        setForm(result.data);
      } else {
        toast.error("Form not found");
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to load form");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleResponseChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(responses).length !== form.questions.length) {
      toast.warning("Please answer all questions");
      return;
    }

    setSubmitting(true);
    try {
      const responseData = {
        responses: form.questions.map(q => ({
          questionId: q.id,
          question: q.text,
          answer: responses[q.id]
        }))
      };

      const result = await api.feedbackForms.submitResponse(formId, responseData);
      if (result.success) {
        setSubmitted(true);
        toast.success("Thank you for your feedback!");
      }
    } catch (error) {
      toast.error("Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md w-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">Your feedback has been submitted successfully.</p>
          <motion.button
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white font-bold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/")}
          >
            Done
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#74a4ee] to-[#9783d3] pt-12 pb-8">
        <div className="text-center px-6">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{form.title}</h1>
          <p className="text-white/80">Your honest feedback is appreciated</p>
        </div>
      </div>

      {/* Form Content */}
      <div className="px-6 -mt-6">
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-6 mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-6">
            {form.questions.map((question, index) => (
              <motion.div
                key={question.id}
                className="bg-gray-50 rounded-2xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="font-semibold text-gray-800 mb-3">
                  {index + 1}. {question.text}
                </h3>
                <textarea
                  className="w-full p-3 bg-white rounded-xl border-2 border-gray-200 focus:border-[#74a4ee] focus:outline-none resize-none transition-colors"
                  rows="3"
                  placeholder="Your answer..."
                  value={responses[question.id] || ""}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                />
              </motion.div>
            ))}
          </div>

          <motion.button
            className={`w-full h-14 rounded-2xl font-bold text-lg mt-8 transition-all ${
              Object.keys(responses).length === form.questions.length && !submitting
                ? "bg-gradient-to-r from-[#74a4ee] to-[#9783d3] text-white shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            whileHover={Object.keys(responses).length === form.questions.length && !submitting ? { scale: 1.02 } : {}}
            whileTap={Object.keys(responses).length === form.questions.length && !submitting ? { scale: 0.98 } : {}}
            onClick={handleSubmit}
            disabled={Object.keys(responses).length !== form.questions.length || submitting}
          >
            {submitting ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner size="sm" color="white" />
                <span className="ml-2">Submitting...</span>
              </div>
            ) : (
              "Submit Feedback"
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};