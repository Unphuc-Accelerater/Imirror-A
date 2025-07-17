// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "npm:@supabase/functions-js@2.1.5";
import { createClient } from "npm:@supabase/supabase-js@2.31.0";

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
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    // Parse request body
    const { formId, emotion, answers, anonymous = true } = await req.json();
    
    console.log("Received form response:", { formId, emotion, answers });
    
    if (!formId || !emotion || !answers) {
      console.error("Missing required fields:", { formId, emotion, answers });
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
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
    
    // Return the response
    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error processing form response:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});