/*
  # Create Feedback System Tables

  1. New Tables
    - `forms`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `emotion` (text)
      - `form_url` (text)
      - `questions` (jsonb)
      - `created_at` (timestamptz)
      - `response_count` (integer)
    
    - `feedback_responses`
      - `id` (uuid, primary key)
      - `form_id` (uuid, references forms)
      - `emotion` (text)
      - `answers` (jsonb)
      - `submitted_at` (timestamptz)
      - `anonymous` (boolean)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their forms
    - Add policies for anonymous users to submit responses
*/

-- Create forms table
CREATE TABLE IF NOT EXISTS forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  emotion text NOT NULL,
  form_url text NOT NULL,
  questions jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  response_count integer DEFAULT 0
);

-- Create feedback_responses table
CREATE TABLE IF NOT EXISTS feedback_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id uuid REFERENCES forms NOT NULL,
  emotion text NOT NULL,
  answers jsonb NOT NULL,
  submitted_at timestamptz DEFAULT now(),
  anonymous boolean DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_responses ENABLE ROW LEVEL SECURITY;

-- Policies for forms table
CREATE POLICY "Users can create their own forms"
  ON forms
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own forms"
  ON forms
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own forms"
  ON forms
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for feedback_responses table
CREATE POLICY "Anyone can submit responses"
  ON feedback_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view responses to their forms"
  ON feedback_responses
  FOR SELECT
  TO authenticated
  USING (
    form_id IN (
      SELECT id FROM forms WHERE user_id = auth.uid()
    )
  );

-- Create function to increment response count
CREATE OR REPLACE FUNCTION increment_form_response_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE forms
  SET response_count = response_count + 1
  WHERE id = NEW.form_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to increment response count when new response is added
CREATE TRIGGER increment_response_count
AFTER INSERT ON feedback_responses
FOR EACH ROW
EXECUTE FUNCTION increment_form_response_count();