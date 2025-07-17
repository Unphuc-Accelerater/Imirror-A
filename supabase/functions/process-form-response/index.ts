// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "npm:@supabase/functions-js";
import { createClient } from "npm:@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 200,
    });
  }
  
  try {
    // Create a Supabase client with the Auth context of the function
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    // Parse request body
    const { formId, emotion, answers, anonymous = true } = await req.json();
    
    console.log("Received form response:", { formId, emotion, answers });
    
    // Validate required fields
    if (!formId) {
      console.error("Missing form ID");
      return new Response(
        JSON.stringify({ error: 'Missing form ID' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    if (!emotion) {
      console.error("Missing emotion");
      return new Response(
        JSON.stringify({ error: 'Missing emotion' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    if (!answers || !Array.isArray(answers)) {
      console.error("Missing or invalid answers");
      return new Response(
        JSON.stringify({ error: 'Answers must be an array' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Insert response into database
    const { data, error } = await supabaseClient
      .from('feedback_responses')
      .insert({
        form_id: formId,
        emotion,
        answers,
        anonymous,
        submitted_at: new Date().toISOString()
      })
      .select();
    
    if (error) {
      console.error("Database error:", error);
      throw error;
    }
    
    console.log("Response saved successfully:", data);
    
    // Get the form to notify the owner
    const { data: formData, error: formError } = await supabaseClient
      .from('forms')
      .select('user_id')
      .eq('id', formId)
      .single();
      
    if (!formError && formData) {
      // Create a notification for the form owner
      const { error: notifError } = await supabaseClient
        .from('notifications')
        .insert({
          user_id: formData.user_id,
          type: 'feedback_received',
          title: 'New Feedback Received',
          message: `Someone responded to your ${emotion} feedback form`,
          data: { formId },
          read: false
        });
        
      if (notifError) {
        console.error("Error creating notification:", notifError);
      }
    }
    
    // Return the response
    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error processing form response:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'X-Error-Source': 'process-form-response'
        }, 
        status: 500 
      }
    );
  }
});