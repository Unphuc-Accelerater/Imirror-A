import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../../utils/supabaseClient';
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
  const [loadError, setLoadError] = useState(false);

  // Map of Google Form URLs for each emotion
  const formUrls = {
    'personal-growth': 'https://docs.google.com/forms/d/e/1FAIpQLSeat8tbyjCaJNX3Ywlw2a5D0PfZu3gbEfo5YaoxdhuhmZcnBw/viewform',
    'emotional-intelligence': 'https://docs.google.com/forms/d/e/1FAIpQLSdZnxVbWcbK_tIVr3dNoaLGHdY_DhOQZLmMnK0rjSjYBP-Yjw/viewform',
    'relationship': 'https://docs.google.com/forms/d/e/1FAIpQLSfQeKKRnmCTcwM9V52OSVXfH-Vt_mL_i0Z_MjzKlKEkm0tZKQ/viewform',
    'mental-health': 'https://docs.google.com/forms/d/e/1FAIpQLSdkZVxdUeXE1_1YOhQUFUHFCQGW_0xQfTAZoqQHBGTEPJcgww/viewform',
    'communication': 'https://docs.google.com/forms/d/e/1FAIpQLSfLCGm4wKLXKCGPBOvJCkHWnKpGQvuGZVK-wHGIPJXI4E4IWg/viewform',
    'values': 'https://docs.google.com/forms/d/e/1FAIpQLSdQXTCDfQ-Ki8E6xSi_mxRYHEUxJ1QzXzkEJx6ueBmwUZwPwA/viewform',
    'conflicts-resolution': 'https://docs.google.com/forms/d/e/1FAIpQLSfXXtLkMNRrxwJYwJZ7KXdsXXLEZJJHYLGnR9EHE0DYEfGUVQ/viewform',
    'romantic': 'https://docs.google.com/forms/d/e/1FAIpQLSdYpwj9KPkZSJj5cCYtV5XgbLLnN0CL_vWl9TNTxQQSGBLOlQ/viewform'
  };

  // Default questions for each emotion
  const defaultQuestions = {
    'personal-growth': [
      "What's one habit I've improved in the last 3 months?",
      "Where do you see growth in me recently?",
      "What should I focus on next to continue growing?",
      "How do I handle challenges or discomfort now vs. before?"
    ],
    'emotional-intelligence': [
      "How well do I recognize and manage my own emotions?",
      "How effectively do I respond to others' emotions?",
      "Do I show empathy and understanding in difficult situations?",
      "How well do I handle conflicts or disagreements?"
    ],
    'relationship': [
      "How would you describe my communication style in our relationship?",
      "Do I make you feel heard and understood when we talk?",
      "How well do I respect your boundaries?",
      "What's one thing I could do to improve our relationship?"
    ],
    'mental-health': [
      "How do I appear to handle stress or pressure?",
      "Have you noticed any changes in my overall mood or energy lately?",
      "Do I seem to have healthy ways to cope with difficult emotions?",
      "How open am I about discussing mental health topics?"
    ],
    'communication': [
      "How clearly do I express my thoughts and ideas?",
      "Do I listen actively when others are speaking?",
      "How well do I adapt my communication style to different situations?",
      "Do I come across as approachable and open to discussion?"
    ],
    'values': [
      "What values or principles do you see me consistently demonstrate?",
      "Are there times when my actions don't align with the values I claim to hold?",
      "How do I handle situations that challenge my values or beliefs?",
      "Do I respect others' values even when they differ from my own?"
    ],
    'conflicts-resolution': [
      "How do I typically respond when conflicts arise?",
      "Do I address issues directly or tend to avoid confrontation?",
      "How well do I listen to opposing viewpoints during disagreements?",
      "Do I focus on finding solutions or getting my way in conflicts?"
    ],
    'romantic': [
      "How well do I express affection and appreciation in our relationship?",
      "Do I make you feel valued and respected as a partner?",
      "How do I respond to your emotional needs?",
      "What could I do to be more supportive of your goals and dreams?"
    ]
  };

  useEffect(() => {
    const loadUserAndForm = async () => {
      try {
        setLoading(true);
        
        // Get user data
        const { data: { user } } = await supabase.auth.getUser();
        const currentUserId = user?.id || 'anonymous';
        setUserId(currentUserId);
        
        // Get form URL based on emotion
        const url = formUrls[emotion] || formUrls['personal-growth'];
        // Add anonymous parameter to track responses
        const publicUrl = `${url}?embedded=true&usp=pp_url&entry.1=${currentUserId}`;
        setFormUrl(publicUrl);
        
        // Get edit URL (replace viewform with edit)
        const editUrl = url.replace('/viewform', '/edit');
        setEditFormUrl(editUrl);
        
        // Get default questions for this emotion
        const emotionQuestions = defaultQuestions[emotion] || defaultQuestions['personal-growth'];
        setQuestions(emotionQuestions);
        
        // Store form data in Supabase
        const { data, error } = await supabase
          .from('forms')
          .insert({
            user_id: currentUserId,
            emotion: emotion,
            form_url: url,
            questions: emotionQuestions.map(q => ({ text: q }))
          })
          .select();
          
        if (error) {
          console.error("Error storing form:", error);
        } else {
          setFormData(data[0]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading form:', error);
        toast.error('Failed to load feedback form');
        setLoadError(true);
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
      const shareUrl = formUrl.replace('?embedded=true', '');
      await navigator.clipboard.writeText(shareUrl);
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
      const shareUrl = formUrl.replace('?embedded=true', '');
      const emotionTitle = formatEmotionTitle(emotion);
      
      const message = `Hi! I'd love your honest feedback on my ${emotionTitle.toLowerCase()}. Please take a moment to fill out this quick form: ${shareUrl}

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
          ) : loadError ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-red-500 text-2xl">!</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Failed to load form</h3>
              <p className="text-gray-600 mb-4">There was an error loading the feedback form.</p>
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-6">Your Feedback Form</h2>
              
              <div className="relative w-full overflow-hidden rounded-xl mb-6" style={{ paddingTop: '150%' }}>
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
                    <LoadingSpinner size="lg" />
                  </div>
                )}
                <iframe 
                  src={formUrl}
                  width="100%" 
                  height="100%" 
                  style={{ border: 'none' }}
                  className="absolute top-0 left-0 w-full h-full"
                  onLoad={() => setIframeLoaded(true)}
                >
                  Loading…
                </iframe>
              </div>
              
              {/* Edit button for creator only */}
              {userId && userId !== 'anonymous' && (
                <div className="mb-6">
                  <motion.a
                    href={editFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-gray-100 rounded-xl text-gray-700 font-medium text-center hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Edit Form (Creator Only)
                  </motion.a>
                </div>
              )}
              
              {/* Share buttons */}
              <div className="space-y-4">
                <motion.button
                  className="w-full h-12 bg-blue-500 rounded-xl text-white font-bold flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCopyLink}
                  disabled={copying}
                >
                  {copying ? (
                    <>
                      <LoadingSpinner size="sm" color="white" />
                      <span className="ml-2">Copying...</span>
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Copy Link
                    </>
                  )}
                </motion.button>
                
                <motion.button
                  className="w-full h-12 bg-green-500 rounded-xl text-white font-bold flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleShareWhatsApp}
                  disabled={sharing}
                >
                  {sharing ? (
                    <>
                      <LoadingSpinner size="sm" color="white" />
                      <span className="ml-2">Opening WhatsApp...</span>
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Share via WhatsApp
                    </>
                  )}
                </motion.button>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
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
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};