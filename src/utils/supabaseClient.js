import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Forms API
export const formsApi = {
  // Create a new form
  createForm: async (userId, emotion, formUrl, questions) => {
    const { data, error } = await supabase
      .from('forms')
      .insert({
        user_id: userId,
        emotion,
        form_url: formUrl,
        questions,
      })
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  // Get forms by user ID
  getUserForms: async (userId) => {
    const { data, error } = await supabase
      .from('forms')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },
  
  // Get form by ID
  getFormById: async (formId) => {
    const { data, error } = await supabase
      .from('forms')
      .select('*')
      .eq('id', formId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Update form response count
  updateResponseCount: async (formId, count) => {
    const { data, error } = await supabase
      .from('forms')
      .update({ response_count: count })
      .eq('id', formId)
      .select();
    
    if (error) throw error;
    return data[0];
  }
};

// Responses API
export const responsesApi = {
  // Submit a response to a form
  submitResponse: async (formId, emotion, answers, anonymous = true) => {
    // Call the Edge Function to process the response
    const { data, error } = await supabase.functions.invoke('process-form-response', {
      body: { formId, emotion, answers, anonymous },
    });
    
    if (error) throw error;
    return data;
  },
  
  // Get responses for a form
  getFormResponses: async (formId) => {
    const { data, error } = await supabase
      .from('feedback_responses')
      .select('*')
      .eq('form_id', formId)
      .order('submitted_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },
  
  // Get all responses for a user's forms
  getUserResponses: async (userId) => {
    const { data: forms, error: formsError } = await supabase
      .from('forms')
      .select('id')
      .eq('user_id', userId);
    
    if (formsError) throw formsError;
    
    if (forms.length === 0) return [];
    
    const formIds = forms.map(form => form.id);
    
    const { data, error } = await supabase
      .from('feedback_responses')
      .select('*, forms!inner(*)')
      .in('form_id', formIds)
      .order('submitted_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

// Auth API
export const authApi = {
  // Get current user
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },
  
  // Sign up
  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  },
  
  // Sign in
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  },
  
  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
};