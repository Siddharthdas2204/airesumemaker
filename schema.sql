-- Supabase SQL Schema for AI Resume Maker
-- Run this in the Supabase SQL Editor

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Resumes table
CREATE TABLE IF NOT EXISTS resumes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'Untitled Resume',
  full_name TEXT NOT NULL,
  email TEXT,
  raw_input JSONB NOT NULL,
  generated_content TEXT NOT NULL,
  template TEXT DEFAULT 'classic',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_resumes_created_at ON resumes(created_at DESC);

-- Row Level Security (optional, enable if using auth)
-- ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Anyone can insert" ON resumes FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Anyone can read own" ON resumes FOR SELECT USING (true);
