-- MR NEWS / XanthraHorizon Database Schema
-- Run this script in your Supabase SQL Editor

-- 1. Subscribers Table
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    delivery_hour INT NOT NULL DEFAULT 6,
    topics TEXT[] DEFAULT ARRAY['policy', 'labs', 'chips', 'funding'],
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'unsubscribed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for cron lookup by hour and status
CREATE INDEX IF NOT EXISTS idx_subscribers_hour_status ON public.subscribers (delivery_hour, status);

-- 2. Articles Seen Table (Deduplication)
CREATE TABLE IF NOT EXISTS public.articles_seen (
    url_hash TEXT PRIMARY KEY,
    url TEXT NOT NULL,
    headline TEXT NOT NULL,
    source TEXT NOT NULL,
    seen_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for cleaning up old articles after 30 days
CREATE INDEX IF NOT EXISTS idx_articles_seen_at ON public.articles_seen (seen_at);

-- 3. Briefings Table (Generated Daily Issues)
CREATE TABLE IF NOT EXISTS public.briefings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    delivery_date DATE NOT NULL DEFAULT CURRENT_DATE,
    delivery_hour INT NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for querying briefings by date and hour
CREATE INDEX IF NOT EXISTS idx_briefings_date_hour ON public.briefings (delivery_date, delivery_hour);

-- Enable Row Level Security (RLS)
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles_seen ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.briefings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active briefing issues
CREATE POLICY "Public briefings read policy" ON public.briefings
    FOR SELECT USING (true);

-- Allow service_role key full control over subscribers, articles_seen, and briefings
CREATE POLICY "Service Role Full Access Subscribers" ON public.subscribers
    USING (auth.role() = 'service_role');

CREATE POLICY "Service Role Full Access Articles" ON public.articles_seen
    USING (auth.role() = 'service_role');

CREATE POLICY "Service Role Full Access Briefings" ON public.briefings
    USING (auth.role() = 'service_role');
-- MR NEWS: PostgreSQL Schemas & Indexes
