# MR NEWS

The AI Newsletter That Reads Itself

Six hundred sources. Seven stories. Five minutes. MR NEWS is an autonomous intelligence pipeline that reads the world news so you do not have to, delivering a high signal briefing straight to subscriber inboxes every evening at 22:00.

## Overview

Staying informed in technology and artificial intelligence has become exhausting. Between clickbait headlines, repetitive syndications across rival publishers, and breathless social media commentary, readers waste hours sorting signal from noise.

MR NEWS solves this with an autonomous editorial desk. The system continuously tracks premier global newsrooms, mathematically removes duplicate coverage, employs Google Gemini as Chief AI Editor, and formats the top seven developments into a concise briefing that takes under five minutes to read.

## Key Features

1. Autonomous Multi Feed Ingestion: Continuously monitors wire services and premier journalism outlets including Reuters, Associated Press, BBC World News, Wall Street Journal, TechCrunch, Ars Technica, and MIT Technology Review.
2. Mathematical Deduplication: Filters candidate articles using SHA256 URL hashing and token based Jaccard similarity. Stories covering the exact same event across multiple outlets are collapsed before reaching the AI model, saving tokens and eliminating repetitive coverage.
3. Gemini Chief AI Editor: Leverages Google Gemini 1.5 Flash with structured schema prompting. Every selected story receives a two sentence factual summary, a single sentence explaining its strategic industry impact, a category tag, and an impact score from 60 to 99.
4. Clean Nightly Dispatch: Sends a responsive dark mode executive email to subscribers every night at 22:00 via Resend. The briefing uses pure inline styles and table layouts tested for rendering fidelity across Apple Mail, Gmail, and Outlook.
5. Interactive Web Experience: Built with Next.js App Router featuring an analog delivery clock dial, live issue archives, and subscription forms.
6. Privacy First Security: User unsubscribes use cryptographically signed HMAC SHA256 tokens for tamper proof one click unsubscription without tracking cookies.

## System Architecture

1. Collection: The crawler collects articles across configured tier one and tier two RSS feeds.
2. Deduplication: In batch deduplication compares article titles with word level Jaccard similarity. Articles seen in the last 30 days are cross referenced against the Supabase database.
3. Editorial Synthesis: The filtered candidate pool is forwarded to Google Gemini. Gemini selects the seven highest impact stories and returns strictly structured JSON data.
4. Storage: Briefing content, delivery logs, and seen article hashes are stored in PostgreSQL via Supabase.
5. Delivery: Resend compiles the responsive HTML email template and dispatches to active subscribers scheduled for the delivery window.

## Technology Stack

1. Framework: Next.js App Router with React 18 and TypeScript
2. Styling: Pure Vanilla CSS with sleek dark mode aesthetics
3. Artificial Intelligence: Google Gemini API with gemini 1.5 flash
4. Database and Backend: Supabase PostgreSQL with Row Level Security
5. Email Delivery: Resend API with custom responsive HTML templates
6. Scheduling: Vercel Cron triggering secured API routes

## Repository Structure

1. app: Next.js App Router pages, layouts, and API routes
2. app/api/cron: Nightly automated briefing generation and dispatch endpoint
3. app/api/subscribe: Public subscriber intake endpoint
4. app/api/unsubscribe: HMAC verified one click unsubscription handler
5. app/components: UI components including the signature analog delivery clock
6. lib/gemini.ts: Gemini Chief AI Editor synthesis and fallback handlers
7. lib/dedup.ts: SHA256 hashing and Jaccard similarity deduplication algorithms
8. lib/rss.ts: Feed crawling and normalization across global newsrooms
9. lib/email.ts: Responsive HTML newsletter generation and Resend delivery logic
10. lib/supabase.ts: Database client and administrative queries
11. lib/crypto.ts: Cryptographic token generation and verification
12. supabase/schema.sql: PostgreSQL schema for subscribers, seen articles, and briefings

## Environment Variables

Create a file named .env.local in the root directory with the following variables:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=your_verified_sender_email
GEMINI_API_KEY=your_gemini_api_key
CRON_SECRET=your_secret_cron_passcode
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_string

## Getting Started

1. Install dependencies:
npm install

2. Set up the database:
Open the SQL Editor in your Supabase project dashboard and execute the SQL queries found in supabase/schema.sql to initialize the subscribers, articles seen, and briefings tables.

3. Configure environment variables:
Copy .env.example to .env.local and populate the keys for Supabase, Resend, and Google Gemini.

4. Start the development server:
npm run dev

5. Open the application:
Visit http://localhost:3000 in your browser to view the interface.

## Production Deployment

The project is configured for deployment on Vercel:

1. Import the repository into your Vercel dashboard.
2. Add all environment variables from .env.local into the Vercel project settings.
3. Configure the nightly cron trigger in vercel.json to call the cron endpoint every evening at 22:00 UTC.

## License

MIT License. Open for community contributions.