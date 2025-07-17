/*
  # Create feedback tables

  1. New Tables
    - `forms` - Stores feedback forms created by users
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `emotion` (text) - Type of feedback form
      - `form_url` (text) - URL to the Google Form
      - `questions` (jsonb) - Array of questions in the form
      - `created_at` (timestamp)
      - `response_count` (integer)
    
    - `feedback_responses` - Stores responses to feedback forms
      - `id` (uuid, primary key)
      - `form_id` (uuid, foreign key to forms)
      - `emotion` (text)
      - `answers` (jsonb) - Array of question/answer pairs
      - `submitted_at` (timestamp)
      - `anonymous` (boolean)
  
  2. Security
    - Enable RLS on both tables
    - Add policies for form creation and viewing
    - Add policies for response submission and viewing
    
  3. Triggers
    - Add trigger to increment response count when a new response is submitted
*/

-- Create forms table
CREATE TABLE IF NOT EXISTS forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  emotion text NOT NULL,
  form_url text NOT NULL,
  questions jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  response_count integer DEFAULT 0
);

-- Create feedback_responses table
CREATE TABLE IF NOT EXISTS feedback_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id uuid NOT NULL REFERENCES forms(id),
  emotion text NOT NULL,
  answers jsonb NOT NULL,
  submitted_at timestamptz DEFAULT now(),
  anonymous boolean DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_responses ENABLE ROW LEVEL SECURITY;

-- Create policies for forms
CREATE POLICY "Users can create their own forms"
  ON forms FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own forms"
  ON forms FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own forms"
  ON forms FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for feedback_responses
CREATE POLICY "Anyone can submit responses"
  ON feedback_responses FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view responses to their forms"
  ON feedback_responses FOR SELECT
  TO authenticated
  USING (form_id IN (
    SELECT forms.id
    FROM forms
    WHERE forms.user_id = auth.uid()
  ));

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

-- Create trigger to increment response count
CREATE TRIGGER increment_response_count
AFTER INSERT ON feedback_responses
FOR EACH ROW
EXECUTE FUNCTION increment_form_response_count();