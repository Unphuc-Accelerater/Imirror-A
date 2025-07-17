import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "../../../utils/database";
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
      const result = await db.api.feedbackForms.getById(formId);
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
        })),
        submittedAt: new Date().toISOString(),
        anonymous: true
      };

      const result = await db.api.feedbackForms.submitResponse(formId, responseData);
      if (result.success) {
        setSubmitted(true);
        toast.success("Thank you for your feedback!");
        
        // Create notification for form owner
        await db.api.notifications.create({
          type: 'feedback_received',
          title: 'New Feedback Received',
          message: `Someone responded to your ${form.title} form`,
          formId: formId,
          read: false
        });
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
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading feedback form...</p>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-6">
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md w-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Form Not Found</h2>
          <p className="text-gray-600 mb-6">This feedback form doesn't exist or has been removed.</p>
        </motion.div>
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
          <motion.div
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">Your anonymous feedback has been submitted successfully. Your response will help them grow!</p>
          <div className="bg-blue-50 rounded-2xl p-4">
            <p className="text-sm text-blue-700">
              <strong>iMirror</strong> - Know yourself from who knows you best!
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#74a4ee] to-[#9783d3] pt-12 pb-8">
        <div className="text-center px-6">
          <motion.div
            className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white"/>
            </svg>
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-2">{form.title}</h1>
          <p className="text-white/80">Your honest feedback is appreciated</p>
          <div className="mt-4 bg-white/20 rounded-full px-4 py-2 inline-block">
            <p className="text-white text-sm">Anonymous • {form.questions.length} questions</p>
          </div>
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
          <div className="mb-6">
            <div className="bg-blue-50 rounded-2xl p-4 mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800">Anonymous Feedback</h3>
                  <p className="text-sm text-blue-600">Your identity will remain completely anonymous</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {form.questions.map((question, index) => (
              <motion.div
                key={question.id}
                className="bg-gray-50 rounded-2xl p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="font-semibold text-gray-800 mb-4 text-lg">
                  {index + 1}. {question.text}
                </h3>
                <textarea
                  className="w-full p-4 bg-white rounded-xl border-2 border-gray-200 focus:border-[#74a4ee] focus:outline-none resize-none transition-colors min-h-[100px]"
                  rows="4"
                  placeholder="Share your honest thoughts..."
                  value={responses[question.id] || ""}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                />
              </motion.div>
            ))}
          </div>

          <motion.button
            className={`w-full h-16 rounded-2xl font-bold text-lg mt-8 transition-all ${
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
              "Submit Anonymous Feedback"
            )}
          </motion.button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Powered by <strong className="text-[#74a4ee]">iMirror</strong> - Know yourself from who knows you best!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};