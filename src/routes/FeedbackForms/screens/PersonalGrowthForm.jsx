import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "../../../utils/database"; 
import { toast } from "../../../components/UI/Toast";
import { supabase } from "../../../utils/supabaseClient";

export const PersonalGrowthForm = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    { id: 1, text: "What's one habit I've improved in the last 3 months?" },
    { id: 2, text: "Where do you see growth in me recently?" },
    { id: 3, text: "What should I focus on next to continue growing?" },
    { id: 4, text: "How do I handle challenges or discomfort now vs. before?" },
  ]);
  const [isSharing, setIsSharing] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleQuestionChange = (id, newText) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text: newText } : q)));
  };

  const handleQuestionDelete = (id) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    } else {
      toast.error("You need at least one question");
    }
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      text: "Enter your custom question here..."
    };
    setQuestions([...questions, newQuestion]);
  };

  const createAndShareForm = async (shareMethod) => {
    setIsSharing(true);
    try {
      // Get current user ID
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || 'anonymous';
      
      const formData = {
        title: "Personal Growth Feedback",
        type: "personal-growth",
        questions: questions,
        description: "Help me understand my personal growth journey"
      };

      const result = await db.api.feedbackForms.create(formData);
      
      if (result.success) {
        const form = result.data;
        
        // Track share
        await db.api.feedbackForms.share(form.id, shareMethod);
        
        if (shareMethod === 'whatsapp') {
          const message = `Hi! I'd love your honest feedback on my personal growth journey. Please take a moment to fill out this quick form: ${form.shareUrl}

Your feedback will help me understand how I'm growing and what areas I can focus on next. Thank you! 🌱`;
          
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, "_blank");
          toast.success("WhatsApp opened with your feedback form!");
          
        } else if (shareMethod === 'email') {
          const subject = "Personal Growth Feedback Request";
          const body = `Hi there!

I'm working on my personal growth and would really value your honest feedback. Could you please take a few minutes to fill out this quick form?

${form.shareUrl}

Your insights will help me understand how I'm progressing and what areas I should focus on next. Thank you so much for taking the time to help me grow!

Best regards`;
          
          const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          window.location.href = mailtoUrl;
          toast.success("Email client opened with your feedback form!");
          
        } else if (shareMethod === 'copy') {
          await navigator.clipboard.writeText(form.shareUrl);
          toast.success("Feedback form link copied to clipboard!");
        }
      }
    } catch (error) {
      toast.error("Failed to create form. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#74a4ee] to-[#9783d3] pt-12 pb-8">
        <div className="flex items-center justify-between px-6 mb-4">
          <motion.button
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg"
            whileTap={{ scale: 0.9 }}
            onClick={handleGoBack}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
          <div className="w-12" />
        </div>
        
        <div className="text-center px-6">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Personal Growth Feedback</h1>
          <p className="text-white/80">Customize your questions and share with friends</p>
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
          <h2 className="text-xl font-bold text-gray-800 mb-6">Customize Your Questions</h2>
          
          <div className="w-full overflow-hidden rounded-xl mb-6">
            <div className="relative" style={{ paddingTop: '120%' }}>
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSeat8tbyjCaJNX3Ywlw2a5D0PfZu3gbEfo5YaoxdhuhmZcnBw/viewform?embedded=true&usp=pp_url&entry.1=anonymous" 
                width="100%" 
                height="100%" 
                style={{ border: 'none' }}
                className="rounded-xl absolute top-0 left-0 w-full h-full"
              >
                Loading…
              </iframe>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            This Google Form will be shared with your friends and family. Responses will appear in your Messages tab.
          </p>
        </motion.div>

        {/* Share Options */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-6 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">Share Your Form</h2>
          
          <div className="space-y-4">
            <motion.button
              className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl text-white font-bold flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.02, boxShadow: "0px 8px 20px rgba(59,130,246,0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => createAndShareForm('copy')}
              disabled={isSharing}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {isSharing ? "Creating..." : "Copy Shareable Link"}
            </motion.button>

            <motion.button
              className="w-full h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl text-white font-bold flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.02, boxShadow: "0px 8px 20px rgba(16,185,129,0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => createAndShareForm('whatsapp')}
              disabled={isSharing}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {isSharing ? "Creating..." : "Share via WhatsApp"}
            </motion.button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">How it works</h3>
                <p className="text-sm text-blue-700 leading-relaxed">
                  Your friends will receive this Google Form. Their responses will be collected anonymously and you'll get insights in your Messages tab to help with your personal growth journey. Check the Messages tab in the footer navigation to see responses.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );  
};