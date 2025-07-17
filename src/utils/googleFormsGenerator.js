// Google Forms Generator Utility
// This utility helps create and manage Google Forms programmatically

// Direct public form URLs for each emotion path
const publicFormUrls = {
  'personal-growth': 'https://docs.google.com/forms/d/e/1FAIpQLSeat8tbyjCaJNX3Ywlw2a5D0PfZu3gbEfo5YaoxdhuhmZcnBw/viewform',
  'emotional-intelligence': 'https://docs.google.com/forms/d/e/1FAIpQLSdZnxVbWcbK_tIVr3dNoaLGHdY_DhOQZLmMnK0rjSjYBP-Yjw/viewform',
  'relationship': 'https://docs.google.com/forms/d/e/1FAIpQLSfQeKKRnmCTcwM9V52OSVXfH-Vt_mL_i0Z_MjzKlKEkm0tZKQ/viewform',
  'mental-health': 'https://docs.google.com/forms/d/e/1FAIpQLSdkZVxdUeXE1_1YOhQUFUHFCQGW_0xQfTAZoqQHBGTEPJcgww/viewform',
  'communication': 'https://docs.google.com/forms/d/e/1FAIpQLSfLCGm4wKLXKCGPBOvJCkHWnKpGQvuGZVK-wHGIPJXI4E4IWg/viewform',
  'values': 'https://docs.google.com/forms/d/e/1FAIpQLSdQXTCDfQ-Ki8E6xSi_mxRYHEUxJ1QzXzkEJx6ueBmwUZwPwA/viewform',
  'conflicts-resolution': 'https://docs.google.com/forms/d/e/1FAIpQLSfXXtLkMNRrxwJYwJZ7KXdsXXLEZJJHYLGnR9EHE0DYEfGUVQ/viewform',
  'romantic': 'https://docs.google.com/forms/d/e/1FAIpQLSdYpwj9KPkZSJj5cCYtV5XgbLLnN0CL_vWl9TNTxQQSGBLOlQ/viewform'
};

// Pre-defined questions for each emotional path
const emotionQuestions = {
  'personal-growth': [
    "What's one habit or behavior you've noticed I've improved recently?",
    "In what areas do you think I've shown the most personal growth?",
    "What strengths do you see in me that I might not recognize in myself?",
    "What's one area where you think I could focus more attention for growth?",
    "How do you think I handle challenges or setbacks compared to before?",
    "What positive changes have you observed in my mindset or attitude?"
  ],
  'emotional-intelligence': [
    "How well do I recognize and manage my own emotions?",
    "How effectively do I respond to others' emotions?",
    "Do I show empathy and understanding in difficult situations?",
    "How well do I handle conflicts or disagreements?",
    "Do I seem aware of how my actions affect others emotionally?",
    "How do I respond when receiving criticism or feedback?"
  ],
  'relationship': [
    "How would you describe my communication style in our relationship?",
    "Do I make you feel heard and understood when we talk?",
    "How well do I respect your boundaries?",
    "What's one thing I do that strengthens our relationship?",
    "What's one thing I could do to improve our relationship?",
    "How do I handle conflicts or disagreements between us?"
  ],
  'mental-health': [
    "How do I appear to handle stress or pressure?",
    "Have you noticed any changes in my overall mood or energy lately?",
    "Do I seem to have healthy ways to cope with difficult emotions?",
    "How open am I about discussing mental health topics?",
    "Do I seem to maintain a healthy work-life balance?",
    "What signs of burnout or overwhelm have you noticed in me, if any?"
  ],
  'communication': [
    "How clearly do I express my thoughts and ideas?",
    "Do I listen actively when others are speaking?",
    "How well do I adapt my communication style to different situations?",
    "Do I come across as approachable and open to discussion?",
    "How effectively do I handle difficult conversations?",
    "What could I improve about my communication style?"
  ],
  'values': [
    "What values or principles do you see me consistently demonstrate?",
    "Are there times when my actions don't align with the values I claim to hold?",
    "How do I handle situations that challenge my values or beliefs?",
    "Do I respect others' values even when they differ from my own?",
    "What values seem most important to me based on my actions?",
    "How do my values influence my decision-making process?"
  ],
  'conflicts-resolution': [
    "How do I typically respond when conflicts arise?",
    "Do I address issues directly or tend to avoid confrontation?",
    "How well do I listen to opposing viewpoints during disagreements?",
    "Do I focus on finding solutions or getting my way in conflicts?",
    "How do I handle my emotions during heated discussions?",
    "What could I improve about how I handle conflicts?"
  ],
  'romantic': [
    "How well do I express affection and appreciation in our relationship?",
    "Do I make you feel valued and respected as a partner?",
    "How do I respond to your emotional needs?",
    "What could I do to be more supportive of your goals and dreams?",
    "How well do I communicate my own needs and expectations?",
    "What's one thing I do that makes you feel especially loved?"
  ]
};

// Google Form templates with pre-filled questions
const formTemplates = {
  'personal-growth': 'https://docs.google.com/forms/d/e/1FAIpQLSeat8tbyjCaJNX3Ywlw2a5D0PfZu3gbEfo5YaoxdhuhmZcnBw/viewform',
  'emotional-intelligence': 'https://docs.google.com/forms/d/e/1FAIpQLSdZnxVbWcbK_tIVr3dNoaLGHdY_DhOQZLmMnK0rjSjYBP-Yjw/viewform',
  'relationship': 'https://docs.google.com/forms/d/e/1FAIpQLSfQeKKRnmCTcwM9V52OSVXfH-Vt_mL_i0Z_MjzKlKEkm0tZKQ/viewform',
  'mental-health': 'https://docs.google.com/forms/d/e/1FAIpQLSdkZVxdUeXE1_1YOhQUFUHFCQGW_0xQfTAZoqQHBGTEPJcgww/viewform',
  'communication': 'https://docs.google.com/forms/d/e/1FAIpQLSfLCGm4wKLXKCGPBOvJCkHWnKpGQvuGZVK-wHGIPJXI4E4IWg/viewform',
  'values': 'https://docs.google.com/forms/d/e/1FAIpQLSdQXTCDfQ-Ki8E6xSi_mxRYHEUxJ1QzXzkEJx6ueBmwUZwPwA/viewform',
  'conflicts-resolution': 'https://docs.google.com/forms/d/e/1FAIpQLSfXXtLkMNRrxwJYwJZ7KXdsXXLEZJJHYLGnR9EHE0DYEfGUVQ/viewform',
  'romantic': 'https://docs.google.com/forms/d/e/1FAIpQLSdYpwj9KPkZSJj5cCYtV5XgbLLnN0CL_vWl9TNTxQQSGBLOlQ/viewform'
};

// Function to get form URL for a specific emotion
export const getFormUrl = (emotion) => {
  // Normalize emotion path
  const normalizedEmotion = emotion.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
  
  // Find the closest matching emotion
  const emotionKey = Object.keys(formTemplates).find(key => 
    normalizedEmotion === key || normalizedEmotion.includes(key) || key.includes(normalizedEmotion)
  ) || 'personal-growth'; // Default to personal growth if no match
  
  return formTemplates[emotionKey];
};

// Function to get questions for a specific emotion
export const getQuestions = (emotion) => {
  // Normalize emotion path
  const normalizedEmotion = emotion.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
  
  // Find the closest matching emotion
  const emotionKey = Object.keys(emotionQuestions).find(key => 
    normalizedEmotion === key || normalizedEmotion.includes(key) || key.includes(normalizedEmotion)
  ) || 'personal-growth'; // Default to personal growth if no match
  
  return emotionQuestions[emotionKey];
};

// Function to get the public form URL for a specific emotion
export const getPublicFormUrl = (emotion) => {
  // Normalize emotion path
  const normalizedEmotion = emotion.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
  
  // Find the closest matching emotion
  const emotionKey = Object.keys(publicFormUrls).find(key => 
    normalizedEmotion === key || normalizedEmotion.includes(key) || key.includes(normalizedEmotion)
  ) || 'personal-growth'; // Default to personal growth if no match
  
  return publicFormUrls[emotionKey];
};

// Function to generate a shareable link with custom parameters
export const generateShareableLink = (emotion, userId) => {
  const baseUrl = getPublicFormUrl(emotion);
  const timestamp = Date.now();
  const uniqueId = `${userId || 'anonymous'}-${timestamp}`;
  
  // Add parameters to track the source and user
  return `${baseUrl}?usp=pp_url&entry.1=${uniqueId}&source=imirror`;
};

// Function to generate a WhatsApp share link
export const generateWhatsAppLink = (emotion, userId) => {
  const formUrl = generateShareableLink(emotion, userId);
  const emotionTitle = emotion.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  const message = `Hi! I'd love your honest feedback on my ${emotionTitle.toLowerCase()}. Please take a moment to fill out this quick form: ${formUrl}

Your feedback will be completely anonymous and will help me grow. Thank you!`;
  
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
};

// Function to generate an email share link
export const generateEmailLink = (emotion, userId) => {
  const formUrl = generateShareableLink(emotion, userId);
  const emotionTitle = emotion.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  const subject = `Request for ${emotionTitle} Feedback`;
  const body = `Hi there,

I'm working on improving my ${emotionTitle.toLowerCase()} and would really value your honest feedback. Could you please take a few minutes to fill out this form?

${formUrl}

Your responses will be completely anonymous, so please feel free to be candid. Your insights will help me understand how I'm doing and where I can improve.

Thank you for your time and support!

Best regards`;
  
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

// Function to store form data in the database
export const storeFormData = async (db, userId, emotion, formUrl, questions) => {
  try {
    // Create form record in database
    const formData = {
      user_id: userId || 'anonymous',
      emotion: emotion,
      form_url: formUrl,
      questions: questions,
      created_at: new Date().toISOString(),
      response_count: 0
    };
    
    // Store in local database
    const result = await db.api.feedbackForms.create(formData);
    return result;
  } catch (error) {
    console.error('Error storing form data:', error);
    throw error;
  }
};