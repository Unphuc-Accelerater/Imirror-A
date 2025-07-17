// Local storage utilities for data persistence
export const storage = {
  // User data
  setUserData: (data) => {
    localStorage.setItem('userData', JSON.stringify(data));
  },
  
  getUserData: () => {
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : null;
  },
  
  // Profile image
  setProfileImage: (imageUrl) => {
    localStorage.setItem('profileImage', imageUrl);
  },
  
  getProfileImage: () => {
    return localStorage.getItem('profileImage');
  },
  
  // Journal entries
  setJournalEntries: (entries) => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  },
  
  getJournalEntries: () => {
    const entries = localStorage.getItem('journalEntries');
    return entries ? JSON.parse(entries) : [];
  },
  
  // Self assessment score
  setSelfAssessmentScore: (score) => {
    localStorage.setItem('selfAssessmentScore', score.toString());
  },
  
  getSelfAssessmentScore: () => {
    const score = localStorage.getItem('selfAssessmentScore');
    return score ? parseFloat(score) : null;
  },
  
  // Notifications
  setNotifications: (notifications) => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  },
  
  getNotifications: () => {
    const notifications = localStorage.getItem('notifications');
    return notifications ? JSON.parse(notifications) : [];
  },
  
  // Clear all data
  clearAll: () => {
    localStorage.clear();
  }
};