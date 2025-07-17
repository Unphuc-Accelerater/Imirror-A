import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { db } from '../../utils/database';
import { 
  getPublicFormUrl, 
  getQuestions, 
  generateShareableLink,
  generateWhatsAppLink,
  generateEmailLink,
  storeFormData
} from '../../utils/googleFormsGenerator';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import { toast } from '../UI/Toast';
import { BackButton } from '../UI/BackButton';

export const FeedbackFormContainer = () => {
  const { emotion } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formUrl, setFormUrl] = useState('');
  const [editFormUrl, setEditFormUrl] = useState('');
  const [questions, setQuestions] = useState([]);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState(null);
  const [copying, setCopying] = useState(false);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    const loadUserAndForm = async () => {
      try {
        setLoading(true);
        
        // Get user data
        const userData = localStorage.getItem('userData');
        const parsedUserData = userData ? JSON.parse(userData) : null;
        const currentUserId = parsedUserData?.id || 'anonymous';
        setUserId(currentUserId);
        
        // Get form questions and URLs based on emotion
        const emotionQuestions = getQuestions(emotion);
        setQuestions(emotionQuestions);
        
        // Get public form URL for sharing and viewing
        const url = getPublicFormUrl(emotion);
        setFormUrl(url);
        
        // Get edit form URL (only for the creator)
        const editUrl = url.replace('/viewform', '/edit');
        setEditFormUrl(editUrl);
        
        // Store form data in database
        const result = await storeFormData(db, currentUserId, emotion, url, emotionQuestions);
        setFormData(result.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading form:', error);
        toast.error('Failed to load feedback form');
        setLoading(false);
      }
    };
    
    loadUserAndForm();
  }, [emotion]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCopyLink = async () => {
    try {
      // Use the public viewform URL for sharing
      setCopying(true);
      await navigator.clipboard.writeText(formUrl);
      toast.success('Form link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
      console.error('Copy error:', error);
    } finally {
      setCopying(false);
    }
  };

  const handleShareWhatsApp = () => {
    try {
      setSharing(true);
      // Generate WhatsApp share link with the public form URL
      const message = `Hi! I'd love your honest feedback on my ${formatEmotionTitle(emotion).toLowerCase()}. Please take a moment to fill out this quick form: ${formUrl}

Your feedback will be completely anonymous and will help me grow. Thank you!`;
      
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      toast.success('Opening WhatsApp with your form link');
    } catch (error) {
      toast.error('Failed to share via WhatsApp');
      console.error('WhatsApp share error:', error);
    } finally {
      setSharing(false);
    }
  };

  const handleShareEmail = () => {
    try {
      setSharing(true);
      // Generate email share link with the public form URL
      const subject = `Request for ${formatEmotionTitle(emotion)} Feedback`;
      const body = `Hi there,

I'm working on improving my ${formatEmotionTitle(emotion).toLowerCase()} and would really value your honest feedback. Could you please take a few minutes to fill out this form?

${formUrl}

Your responses will be completely anonymous, so please feel free to be candid. Your insights will help me understand how I'm doing and where I can improve.

Thank you for your time and support!

Best regards`;
      
      const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = emailUrl;
      toast.success('Opening email with your form link');
    } catch (error) {
      toast.error('Failed to share via email');
      console.error('Email share error:', error);
    } finally {
      setSharing(false);
    }
  };

  const formatEmotionTitle = (emotionPath) => {
    return emotionPath
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#74a4ee] to-[#9783d3] pt-12 pb-8 relative">
        <div className="flex items-center justify-between px-6 mb-4">
          <BackButton onClick={handleGoBack} style="dark" />
          <div className="w-12" />
        </div>
        
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
          <h1 className="text-2xl font-bold text-white mb-2">{formatEmotionTitle(emotion)} Feedback</h1>
          <p className="text-white/80">Customize and share this form to get anonymous feedback</p>
        </div>
      </div>

      {/* Form Content */}
      <div className="px-6 -mt-6 pb-24">
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-6 mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-gray-600">Loading your feedback form...</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-6">Your Feedback Form</h2>
              
              <div className="relative w-full overflow-hidden rounded-xl mb-6" style={{ height: '400px' }}>
                {!iframeLoaded ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
                    <LoadingSpinner size="lg" />
                  </div>
                ) : null}
                <iframe 
                  src={formUrl}
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  marginHeight="0" 
                  marginWidth="0"
                  className="rounded-xl"
                  onLoad={() => setIframeLoaded(true)}
                  style={{ minHeight: '90vh' }}
                >
                  Loading…
                </iframe>
              </div>
              
              {/* Edit Form Button (only for creator) */}
              {userId && userId !== 'anonymous' && (
                <div className="mb-6">
                  <motion.a
                    href={editFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl text-white font-bold flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.02, boxShadow: "0px 8px 20px rgba(139,92,246,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                      <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Edit Form (Creator Only)
                  </motion.a>
                  </motion.a>
                </div>
              )}

              <div className="bg-blue-50 rounded-2xl p-4 mb-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16V12M12 8H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-1">How it works</h3>
                    <p className="text-sm text-blue-700 leading-relaxed">
                      Share this form with friends or family. Their responses will be completely anonymous and will appear in your Messages tab to help with your personal growth journey.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-4">Questions in this form:</h3>
              <div className="space-y-3 mb-6">
                {questions.map((question, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-gray-700 text-sm">{index + 1}. {question}</p>
                  </div>
                ))}
              </div>
          )}
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
              onClick={handleCopyLink}
              disabled={copying || loading}
            >
              {copying ? (
                <div className="flex items-center">
                  <LoadingSpinner size="sm" color="white" />
                  <span className="ml-2">Copying...</span>
                </div>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Copy Shareable Link
                </>
              )}
            </motion.button>

            <motion.button
              className="w-full h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl text-white font-bold flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.02, boxShadow: "0px 8px 20px rgba(16,185,129,0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShareWhatsApp}
              disabled={sharing || loading}
            >
              {sharing ? (
                <div className="flex items-center">
                  <LoadingSpinner size="sm" color="white" />
                  <span className="ml-2">Opening WhatsApp...</span>
                </div>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Share via WhatsApp
                </>
              )}
            </motion.button>

            <motion.button
              className="w-full h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl text-white font-bold flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.02, boxShadow: "0px 8px 20px rgba(139,92,246,0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShareEmail}
              disabled={sharing || loading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Share via Email
            </motion.button>
          </div>
          
          {/* Error handling message */}
          {!formUrl && !loading && (
            <div className="mt-6 p-4 bg-red-50 rounded-2xl">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-red-800 mb-1">Form Loading Error</h3>
                  <p className="text-sm text-red-700 leading-relaxed">
                    We couldn't load the feedback form. Please try refreshing the page or contact support if the issue persists.
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};