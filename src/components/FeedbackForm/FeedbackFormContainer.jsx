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
                  style={{ border: 'none' }}
                  onLoad={() => setIframeLoaded(true)}
                />
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};