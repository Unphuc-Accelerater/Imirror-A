/*
  # Create feedback system tables

  1. New Tables
    - `forms`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `emotion` (text)
      - `form_url` (text)
      - `questions` (jsonb)
      - `created_at` (timestamp)
      - `response_count` (integer, default 0)
    - `feedback_responses`
      - `id` (uuid, primary key)
      - `form_id` (uuid, foreign key to forms)
      - `emotion` (text)
      - `answers` (jsonb)
      - `submitted_at` (timestamp)
      - `anonymous` (boolean, default true)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own forms
    - Add policies for anyone to submit responses
    - Add policies for users to view responses to their forms

  3. Functions
    - Create trigger function to increment response count
    - Add trigger to automatically update response count
*/

-- Create forms table if it doesn't exist
CREATE TABLE IF NOT EXISTS forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  emotion text NOT NULL,
  form_url text NOT NULL,
  questions jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  response_count integer DEFAULT 0
);

-- Create feedback_responses table if it doesn't exist
CREATE TABLE IF NOT EXISTS feedback_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id uuid NOT NULL REFERENCES forms(id),
  emotion text NOT NULL,
  answers jsonb NOT NULL,
  submitted_at timestamptz DEFAULT now(),
  anonymous boolean DEFAULT true
);

-- Enable RLS
ALTER TABLE forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_responses ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users can create their own forms" ON forms;
DROP POLICY IF EXISTS "Users can view their own forms" ON forms;
DROP POLICY IF EXISTS "Users can update their own forms" ON forms;
DROP POLICY IF EXISTS "Anyone can submit responses" ON feedback_responses;
DROP POLICY IF EXISTS "Users can view responses to their forms" ON feedback_responses;

-- Create policies for forms table
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

-- Create policies for feedback_responses table
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

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS increment_response_count ON feedback_responses;

-- Create trigger to automatically increment response count
CREATE TRIGGER increment_response_count
  AFTER INSERT ON feedback_responses
  FOR EACH ROW
  EXECUTE FUNCTION increment_form_response_count();