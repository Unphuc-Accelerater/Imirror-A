import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingSpinner } from "../../components/UI/LoadingSpinner";
import { BackButton } from "../../components/UI/BackButton";
import { FooterNavBar } from "../../components/FooterNavBar";
import { db } from "../../utils/database";

export const Messages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const responses = await db.api.feedbackResponses.getAll();
        const forms = await db.api.feedbackForms.getAll();
        
        // Group responses by form and create messages
        const messageMap = new Map();
        
        responses.forEach(response => {
          const form = forms.find(f => f.id === response.form_id);
          if (!form) return;
          
          const messageId = `form-${form.id}`;
          if (!messageMap.has(messageId)) {
            messageMap.set(messageId, {
              id: messageId,
              title: "New Feedback Received",
              message: `Someone responded to your ${form.emotion} form`,
              createdAt: response.submitted_at,
              read: false,
              form: {
                title: `${form.emotion.charAt(0).toUpperCase() + form.emotion.slice(1)} Feedback`,
                id: form.id,
                emotion: form.emotion
              },
              responses: []
            });
          }
          
          messageMap.get(messageId).responses.push(response);
        });
        
        const messagesArray = Array.from(messageMap.values())
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setMessages(messagesArray);
      } catch (error) {
        console.error('Error loading messages:', error);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    // Mark as read
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === message.id ? {...msg, read: true} : msg
      )
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (selectedMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#74a4ee] to-[#9783d3] pt-12 pb-6">
          <div className="flex items-center justify-between px-6">
            <motion.button
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg"
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedMessage(null)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M12 19L5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
            <h1 className="text-white text-xl font-bold">Feedback Details</h1>
            <div className="w-12" />
          </div>
        </div>

        {/* Message Content */}
        <div className="px-6 -mt-3 pb-24">
          <motion.div
            className="bg-white rounded-3xl shadow-xl p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedMessage.form?.title}</h2>
              <p className="text-gray-600">Anonymous feedback received</p>
              <p className="text-sm text-gray-500">{formatDate(selectedMessage.createdAt)}</p>
            </div>

            {selectedMessage.responses && selectedMessage.responses.length > 0 ? (
              <div className="space-y-6">
                {selectedMessage.responses.map((response, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl p-4">
                    <div className="space-y-4">
                      {response.answers && response.answers.map((item, qIndex) => (
                        <div key={qIndex}>
                          <h3 className="font-semibold text-gray-800 mb-2">{item.question}</h3>
                          <div className="bg-white rounded-xl p-4 border-l-4 border-[#74a4ee]">
                            <p className="text-gray-700">{item.answer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No responses yet</p>
              </div>
            )}
          </motion.div>
        </div>

        <FooterNavBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#74a4ee] to-[#9783d3] pt-12 pb-6">
        <div className="flex items-center justify-between px-6">
          <BackButton onClick={handleGoBack} style="dark" />
          <h1 className="text-white text-xl font-bold">Messages</h1>
          <div className="w-12" />
        </div>
      </div>

      {/* Messages List */}
      <div className="px-6 -mt-3 pb-24">
        {messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                className="bg-white rounded-2xl shadow-lg p-4 cursor-pointer relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMessageClick(message)}
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#74a4ee] to-[#9783d3] rounded-full flex items-center justify-center mr-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" fill="white"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-800">{message.title}</h3>
                      <span className="text-xs text-gray-500">{formatDate(message.createdAt)}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{message.message}</p>
                    {message.form && (
                      <div className="bg-blue-50 rounded-lg p-2">
                        <p className="text-xs text-blue-700 font-medium">{message.form.title}</p>
                        <p className="text-xs text-blue-600">
                          {message.responses?.length || 0} response(s)
                        </p>
                      </div>
                    )}
                    {!message.read && (
                      <div className="w-2 h-2 bg-red-500 rounded-full absolute top-4 right-4"></div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="bg-white rounded-3xl shadow-xl p-8 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">No Messages Yet</h2>
            <p className="text-gray-600 mb-6">
              When people respond to your feedback forms, their anonymous responses will appear here.
            </p>
            <motion.button
              className="bg-gradient-to-r from-[#74a4ee] to-[#9783d3] text-white px-6 py-3 rounded-2xl font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/request-feedback')}
            >
              Create Your First Form
            </motion.button>
          </motion.div>
        )}
      </div>

      <FooterNavBar />
    </div>
  );
};