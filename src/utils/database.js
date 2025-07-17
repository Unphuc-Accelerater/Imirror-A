// Complete database simulation for iMirror feedback app
class Database {
  constructor() {
    this.tables = {
      users: 'imirror_users',
      feedbackForms: 'imirror_feedback_forms',
      responses: 'imirror_responses',
      notifications: 'imirror_notifications',
      sessions: 'imirror_sessions'
    };
  }

  // Generic CRUD operations
  create(table, data) {
    const items = this.getAll(table);
    const newItem = {
      id: this.generateId(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    items.push(newItem);
    localStorage.setItem(table, JSON.stringify(items));
    return newItem;
  }

  getAll(table) {
    const data = localStorage.getItem(table);
    return data ? JSON.parse(data) : [];
  }

  getById(table, id) {
    const items = this.getAll(table);
    return items.find(item => item.id === id);
  }

  update(table, id, data) {
    const items = this.getAll(table);
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = {
        ...items[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(table, JSON.stringify(items));
      return items[index];
    }
    return null;
  }

  delete(table, id) {
    const items = this.getAll(table);
    const filteredItems = items.filter(item => item.id !== id);
    localStorage.setItem(table, JSON.stringify(filteredItems));
    return true;
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Feedback Forms specific operations
  createFeedbackForm(formData) {
    const form = this.create(this.tables.feedbackForms, {
      ...formData,
      shareCount: 0,
      responseCount: 0,
      isActive: true
    });
    
    // Generate shareable URL
    const shareUrl = `${window.location.origin}/feedback/form/${form.id}`;
    this.update(this.tables.feedbackForms, form.id, { shareUrl });
    
    return { ...form, shareUrl };
  }

  getFeedbackForm(id) {
    return this.getById(this.tables.feedbackForms, id);
  }

  submitResponse(formId, responseData) {
    const response = this.create(this.tables.responses, {
      formId,
      ...responseData,
      ipAddress: '192.168.1.1' // Simulated
    });

    // Update form response count
    const form = this.getById(this.tables.feedbackForms, formId);
    if (form) {
      this.update(this.tables.feedbackForms, formId, {
        responseCount: form.responseCount + 1
      });
    }

    return response;
  }

  getFormResponses(formId) {
    const responses = this.getAll(this.tables.responses);
    return responses.filter(response => response.formId === formId);
  }

  incrementShareCount(formId) {
    const form = this.getById(this.tables.feedbackForms, formId);
    if (form) {
      this.update(this.tables.feedbackForms, formId, {
        shareCount: form.shareCount + 1
      });
    }
  }

  // API interface
  api = {
    // Feedback Forms
    feedbackForms: {
      create: async (formData) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const form = this.createFeedbackForm(formData);
        return { success: true, data: form };
      },

      getById: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const form = this.getFeedbackForm(id);
        if (!form) {
          return { success: false, error: 'Form not found' };
        }
        return { success: true, data: form };
      },

      submitResponse: async (formId, responseData) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        const response = this.submitResponse(formId, responseData);
        return { success: true, data: response };
      },

      getResponses: async (formId) => {
        await new Promise(resolve => setTimeout(resolve, 400));
        const responses = this.getFormResponses(formId);
        return { success: true, data: responses };
      },

      share: async (formId, method) => {
        await new Promise(resolve => setTimeout(resolve, 200));
        this.incrementShareCount(formId);
        return { success: true, method };
      }
    },

    // Notifications
    notifications: {
      create: async (notificationData) => {
        await new Promise(resolve => setTimeout(resolve, 200));
        const notification = this.create(this.tables.notifications, notificationData);
        return { success: true, data: notification };
      },

      getAll: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const notifications = this.getAll(this.tables.notifications);
        return { success: true, data: notifications };
      },

      markAsRead: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 200));
        const notification = this.update(this.tables.notifications, id, { read: true });
        return { success: true, data: notification };
      }
    },

    // Users
    users: {
      create: async (userData) => {
        await new Promise(resolve => setTimeout(resolve, 600));
        const user = this.create(this.tables.users, userData);
        return { success: true, data: user };
      },

      update: async (id, userData) => {
        await new Promise(resolve => setTimeout(resolve, 400));
        const user = this.update(this.tables.users, id, userData);
        return { success: true, data: user };
      },

      getById: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 200));
        const user = this.getById(this.tables.users, id);
        return { success: true, data: user };
      }
    },

    // Sessions
    sessions: {
      book: async (sessionData) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const session = this.create(this.tables.sessions, {
          ...sessionData,
          status: 'confirmed'
        });
        return { success: true, data: session };
      }
    }
  };
}

export const db = new Database();