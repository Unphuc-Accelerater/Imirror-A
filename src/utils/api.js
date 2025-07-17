// Simulated API functions for backend functionality
import { storage } from './storage';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Authentication
  login: async (phoneNumber) => {
    await delay(1000);
    // Simulate successful login
    return {
      success: true,
      message: 'OTP sent successfully',
      data: { phoneNumber }
    };
  },
  
  verifyOTP: async (phoneNumber, otp) => {
    await delay(800);
    // Simulate OTP verification
    if (otp === '1234' || otp.length === 4) {
      return {
        success: true,
        message: 'OTP verified successfully',
        data: { token: 'mock-jwt-token' }
      };
    }
    return {
      success: false,
      message: 'Invalid OTP'
    };
  },
  
  // User profile
  updateProfile: async (profileData) => {
    await delay(500);
    storage.setUserData(profileData);
    return {
      success: true,
      message: 'Profile updated successfully',
      data: profileData
    };
  },
  
  getProfile: async () => {
    await delay(300);
    const userData = storage.getUserData();
    return {
      success: true,
      data: userData
    };
  },
  
  // Feedback forms
  submitFeedbackForm: async (formData) => {
    await delay(1000);
    return {
      success: true,
      message: 'Feedback form submitted successfully',
      data: {
        formId: Date.now(),
        shareLink: `https://imirror.com/feedback/${Date.now()}`
      }
    };
  },
  
  // Self assessment
  submitSelfAssessment: async (answers) => {
    await delay(800);
    const score = calculateAssessmentScore(answers);
    storage.setSelfAssessmentScore(score);
    return {
      success: true,
      message: 'Assessment completed successfully',
      data: { score }
    };
  },
  
  // Journal entries
  saveJournalEntry: async (entry) => {
    await delay(500);
    const entries = storage.getJournalEntries();
    const newEntry = {
      ...entry,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    entries.unshift(newEntry);
    storage.setJournalEntries(entries);
    return {
      success: true,
      message: 'Journal entry saved',
      data: newEntry
    };
  },
  
  getJournalEntries: async () => {
    await delay(300);
    const entries = storage.getJournalEntries();
    return {
      success: true,
      data: entries
    };
  },
  
  deleteJournalEntry: async (entryId) => {
    await delay(300);
    const entries = storage.getJournalEntries();
    const filteredEntries = entries.filter(entry => entry.id !== entryId);
    storage.setJournalEntries(filteredEntries);
    return {
      success: true,
      message: 'Journal entry deleted'
    };
  },
  
  // Coaches
  getCoaches: async () => {
    await delay(500);
    return {
      success: true,
      data: [
        {
          id: 1,
          name: "Dr. Sarah Chen",
          specialty: "Clinical Psychologist",
          experience: "12 years",
          consultations: "300+",
          rating: 4.8,
          image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400",
          price: 549,
          available: true
        },
        {
          id: 2,
          name: "Dr. Michael Johnson",
          specialty: "Behavioral Therapist",
          experience: "8 years",
          consultations: "250+",
          rating: 4.7,
          image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400",
          price: 449,
          available: true
        }
      ]
    };
  },
  
  // Notifications
  getNotifications: async () => {
    await delay(300);
    const notifications = storage.getNotifications();
    if (notifications.length === 0) {
      // Generate some sample notifications
      const sampleNotifications = [
        {
          id: 1,
          type: "feedback",
          title: "New Feedback Received",
          message: "You have received new feedback on your personal growth form",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          read: false
        },
        {
          id: 2,
          type: "assessment",
          title: "Assessment Reminder",
          message: "It's time for your weekly self-assessment",
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          read: true
        }
      ];
      storage.setNotifications(sampleNotifications);
      return { success: true, data: sampleNotifications };
    }
    return { success: true, data: notifications };
  },
  
  markNotificationAsRead: async (notificationId) => {
    await delay(200);
    const notifications = storage.getNotifications();
    const updatedNotifications = notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    );
    storage.setNotifications(updatedNotifications);
    return { success: true };
  }
};

// Helper function to calculate assessment score
function calculateAssessmentScore(answers) {
  let totalScore = 0;
  let maxScore = answers.length;
  
  answers.forEach(answer => {
    switch (answer.toLowerCase()) {
      case 'yes':
      case 'always':
      case 'often':
      case 'very confident':
        totalScore += 1;
        break;
      case 'sometimes':
      case 'somewhat':
      case 'moderately confident':
        totalScore += 0.5;
        break;
      default:
        totalScore += 0;
    }
  });
  
  return Math.round((totalScore / maxScore) * 100);
}