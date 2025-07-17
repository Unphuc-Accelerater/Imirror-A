// Complete backend simulation for iMirror app
import { storage } from './storage';
import { toast } from '../components/UI/Toast';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generate unique IDs
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

export const backend = {
  // Feedback Forms Backend
  feedbackForms: {
    create: async (formData) => {
      await delay(1000);
      
      const form = {
        id: generateId(),
        ...formData,
        createdAt: new Date().toISOString(),
        responses: [],
        shareCount: 0,
        responseCount: 0
      };
      
      // Store form
      const forms = storage.getFeedbackForms() || [];
      forms.push(form);
      storage.setFeedbackForms(forms);
      
      return {
        success: true,
        data: form,
        shareLink: `${window.location.origin}/feedback/form/${form.id}`
      };
    },
    
    getById: async (formId) => {
      await delay(500);
      
      const forms = storage.getFeedbackForms() || [];
      const form = forms.find(f => f.id === formId);
      
      if (!form) {
        return { success: false, error: 'Form not found' };
      }
      
      return { success: true, data: form };
    },
    
    submitResponse: async (formId, responses) => {
      await delay(800);
      
      const forms = storage.getFeedbackForms() || [];
      const formIndex = forms.findIndex(f => f.id === formId);
      
      if (formIndex === -1) {
        return { success: false, error: 'Form not found' };
      }
      
      const response = {
        id: generateId(),
        formId,
        responses,
        submittedAt: new Date().toISOString(),
        ipAddress: 'xxx.xxx.xxx.xxx' // Simulated
      };
      
      forms[formIndex].responses.push(response);
      forms[formIndex].responseCount += 1;
      storage.setFeedbackForms(forms);
      
      return { success: true, data: response };
    },
    
    getResponses: async (formId) => {
      await delay(600);
      
      const forms = storage.getFeedbackForms() || [];
      const form = forms.find(f => f.id === formId);
      
      if (!form) {
        return { success: false, error: 'Form not found' };
      }
      
      return { success: true, data: form.responses };
    },
    
    incrementShareCount: async (formId) => {
      const forms = storage.getFeedbackForms() || [];
      const formIndex = forms.findIndex(f => f.id === formId);
      
      if (formIndex !== -1) {
        forms[formIndex].shareCount += 1;
        storage.setFeedbackForms(forms);
      }
    }
  },

  // WhatsApp Integration
  whatsapp: {
    shareForm: async (formData, customMessage = '') => {
      await delay(500);
      
      try {
        // Create form first
        const formResult = await backend.feedbackForms.create(formData);
        
        if (!formResult.success) {
          throw new Error('Failed to create form');
        }
        
        // Increment share count
        await backend.feedbackForms.incrementShareCount(formResult.data.id);
        
        const defaultMessage = `Hi! I'd love your honest feedback to help me grow personally. Please take a moment to fill out this quick form: ${formResult.shareLink}

Your feedback is completely anonymous and will help me understand how I can improve. Thank you! 🌱`;
        
        const message = customMessage || defaultMessage;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        return {
          success: true,
          data: {
            formId: formResult.data.id,
            shareLink: formResult.shareLink,
            message
          }
        };
      } catch (error) {
        return {
          success: false,
          error: error.message
        };
      }
    }
  },

  // Email Integration
  email: {
    shareForm: async (formData, recipients = [], customMessage = '') => {
      await delay(500);
      
      try {
        // Create form first
        const formResult = await backend.feedbackForms.create(formData);
        
        if (!formResult.success) {
          throw new Error('Failed to create form');
        }
        
        // Increment share count
        await backend.feedbackForms.incrementShareCount(formResult.data.id);
        
        const subject = `Feedback Request - ${formData.title}`;
        const defaultBody = `Hi there!

I'm working on my personal growth and would really value your honest feedback. Could you please take a few minutes to fill out this quick form?

${formResult.shareLink}

Your insights will help me understand how I'm progressing and what areas I should focus on next. Thank you so much for taking the time to help me grow!

Best regards`;
        
        const body = customMessage || defaultBody;
        const mailtoUrl = `mailto:${recipients.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open email client
        window.location.href = mailtoUrl;
        
        return {
          success: true,
          data: {
            formId: formResult.data.id,
            shareLink: formResult.shareLink,
            subject,
            body
          }
        };
      } catch (error) {
        return {
          success: false,
          error: error.message
        };
      }
    }
  },

  // Link Sharing
  links: {
    generateShareableLink: async (formData) => {
      await delay(300);
      
      try {
        // Create form first
        const formResult = await backend.feedbackForms.create(formData);
        
        if (!formResult.success) {
          throw new Error('Failed to create form');
        }
        
        return {
          success: true,
          data: {
            formId: formResult.data.id,
            shareLink: formResult.shareLink,
            shortLink: `imirror.app/f/${formResult.data.id.substr(0, 8)}` // Simulated short link
          }
        };
      } catch (error) {
        return {
          success: false,
          error: error.message
        };
      }
    },
    
    copyToClipboard: async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        return { success: true };
      } catch (error) {
        return { success: false, error: 'Failed to copy to clipboard' };
      }
    }
  },

  // Analytics
  analytics: {
    getFormStats: async (formId) => {
      await delay(400);
      
      const forms = storage.getFeedbackForms() || [];
      const form = forms.find(f => f.id === formId);
      
      if (!form) {
        return { success: false, error: 'Form not found' };
      }
      
      const stats = {
        totalShares: form.shareCount,
        totalResponses: form.responseCount,
        responseRate: form.shareCount > 0 ? (form.responseCount / form.shareCount * 100).toFixed(1) : 0,
        averageCompletionTime: '2.5 minutes', // Simulated
        lastResponseAt: form.responses.length > 0 ? form.responses[form.responses.length - 1].submittedAt : null
      };
      
      return { success: true, data: stats };
    }
  },

  // Notifications
  notifications: {
    send: async (userId, notification) => {
      await delay(200);
      
      const notifications = storage.getNotifications() || [];
      const newNotification = {
        id: generateId(),
        userId,
        ...notification,
        createdAt: new Date().toISOString(),
        read: false
      };
      
      notifications.unshift(newNotification);
      storage.setNotifications(notifications);
      
      return { success: true, data: newNotification };
    },
    
    markAsRead: async (notificationId) => {
      await delay(200);
      
      const notifications = storage.getNotifications() || [];
      const notificationIndex = notifications.findIndex(n => n.id === notificationId);
      
      if (notificationIndex !== -1) {
        notifications[notificationIndex].read = true;
        storage.setNotifications(notifications);
      }
      
      return { success: true };
    }
  },

  // User Management
  users: {
    updateProfile: async (userData) => {
      await delay(500);
      
      const existingData = storage.getUserData() || {};
      const updatedData = { ...existingData, ...userData, updatedAt: new Date().toISOString() };
      
      storage.setUserData(updatedData);
      
      return { success: true, data: updatedData };
    },
    
    getProfile: async () => {
      await delay(300);
      
      const userData = storage.getUserData();
      return { success: true, data: userData };
    }
  },

  // Coach Booking
  coaches: {
    book: async (coachId, sessionData) => {
      await delay(1000);
      
      const booking = {
        id: generateId(),
        coachId,
        ...sessionData,
        status: 'confirmed',
        bookedAt: new Date().toISOString()
      };
      
      const bookings = storage.getBookings() || [];
      bookings.push(booking);
      storage.setBookings(bookings);
      
      // Send notification
      await backend.notifications.send('current-user', {
        type: 'booking',
        title: 'Session Confirmed',
        message: `Your session with ${sessionData.coachName} has been confirmed for ${sessionData.date} at ${sessionData.time}`,
        data: { bookingId: booking.id }
      });
      
      return { success: true, data: booking };
    }
  }
};

// Enhanced storage utilities
const enhancedStorage = {
  ...storage,
  
  getFeedbackForms: () => {
    const forms = localStorage.getItem('feedbackForms');
    return forms ? JSON.parse(forms) : [];
  },
  
  setFeedbackForms: (forms) => {
    localStorage.setItem('feedbackForms', JSON.stringify(forms));
  },
  
  getBookings: () => {
    const bookings = localStorage.getItem('bookings');
    return bookings ? JSON.parse(bookings) : [];
  },
  
  setBookings: (bookings) => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }
};

// Update storage reference
Object.assign(storage, enhancedStorage);