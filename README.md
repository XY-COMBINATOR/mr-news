# MR NEWS

The AI Newsletter That Reads Itself

Six hundred sources. Seven stories. Five minutes. MR NEWS is an autonomous intelligence pipeline that reads the world news so you do not have to, delivering a high signal briefing straight to subscriber inboxes every evening at 22:00 IST.

[![Live Demo](https://img.shields.io/badge/Demo-mr--news--ashy.vercel.app-blue?style=for-the-badge&logo=vercel)](https://mr-news-ashy.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Gemini](https://img.shields.io/badge/AI-Google_Gemini-orange?style=for-the-badge&logo=google)](https://ai.google.dev/)

## Live Links

1. Live Production Website: [https://mr-news-ashy.vercel.app](https://mr-news-ashy.vercel.app)
2. Admin Control Desk: [https://mr-news-ashy.vercel.app/admin](https://mr-news-ashy.vercel.app/admin)
3. GitHub Repository: [https://github.com/XY-COMBINATOR/mr-news](https://github.com/XY-COMBINATOR/mr-news)

## The Problem

Staying informed in technology and artificial intelligence has become exhausting. Between clickbait headlines, repetitive syndications across rival publishers, and breathless social media commentary, readers waste hours sorting signal from noise. Most newsletters are either manually compiled and slow, or simple RSS dumps that are noisy and redundant.

## The Solution

MR NEWS is a fully autonomous editorial desk that does the heavy reading for you:

1. Aggregates top global RSS feeds across technology, AI labs, policy, chips, science, and funding.
2. Deduplicates cross source stories using SHA256 content hashing and Jaccard similarity to ensure zero repetitive coverage.
3. Synthesizes the day's top seven most impactful stories using the Google Gemini 1.5 Flash model into clean factual executive takeaways with strategic impact scores.
4. Delivers an editorial grade briefing directly to each subscriber's inbox every night at exactly 22:00 IST.

## Architecture and Pipeline Flow

```
[ Top RSS Feeds ] (Reuters, AP, BBC, WSJ, TechCrunch, Ars Technica, MIT Tech Review)
         |
         v
[ Ingestion and Normalization ]
         |
         v
[ SHA256 and Jaccard Deduplication Engine ] => Filters repeated stories and noise
         |
         v
[ Google Gemini Chief AI Editor ] => Selects top 7 stories, writes summaries and impact analysis
         |
         v
[ Supabase PostgreSQL ] => Stores curated editions and subscriber preferences
         |
         v
[ Automated Vercel Cron ] (Daily 22:00 IST)
         |
         v
[ Resend Email Delivery ] => Sends personalized responsive HTML briefing to all active subscribers
```

## Key Features

1. Mathematical Deduplication: Candidate articles are filtered with SHA256 URL hashing and word level Jaccard similarity before reaching the AI model. Stories covering the same event from different outlets are automatically collapsed into one canonical story.
2. Gemini Chief AI Editor: Google Gemini 1.5 Flash is prompted with strict schema constraints. Every story gets a two sentence factual summary, one sentence of strategic industry impact, a category tag from seven verticals, and an impact score between 60 and 99.
3. Guaranteed Nightly Delivery: Vercel Cron triggers the pipeline endpoint every evening at 22:00 IST without any manual intervention.
4. Enterprise Grade Security: Admin access uses timing safe HMAC comparisons. Unsubscribe links use cryptographic SHA256 tokens. Subscription endpoints are rate limited and protected against bot spam.
5. Real Time Admin Control Desk: A protected dashboard shows active subscriber counts, pipeline health, database latency, and historical briefing archives.
6. Privacy First: No tracking cookies, no advertising, no data sold. One click unsubscribe is always available via cryptographically signed tokens embedded in every email.

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 App Router, React 18, TypeScript, Vanilla CSS |
| Backend and APIs | Next.js Serverless Routes, Vercel Cron Jobs |
| Database | Supabase PostgreSQL with Row Level Security |
| AI | Google Gemini 1.5 Flash via the Generative AI SDK |
| Email Delivery | Resend API with custom responsive HTML templates |
| Deployment | Vercel Serverless Platform |

## API Reference

| Endpoint | Method | Description | Auth |
|---|---|---|---|
| `/` | GET | Landing page and subscriber onboarding | None |
| `/login` | GET | Subscriber access portal | None |
| `/admin` | GET | Real time Admin Control Desk | Passkey |
| `/api/subscribe` | POST | Create new subscriber and send welcome email | Rate limited |
| `/api/send-briefing` | POST | Trigger full pipeline ingestion, synthesis, and dispatch | Bearer CRON_SECRET |
| `/api/cron` | GET | Automated cron trigger from Vercel | Vercel Cron |
| `/api/status` | GET | System and database health probe | Bearer CRON_SECRET |
| `/api/unsubscribe` | GET | One click instant unsubscribe | Cryptographic token |

## Repository Structure

1. app: Next.js App Router pages, layouts, and API routes
2. app/api/cron: Nightly automated briefing generation and dispatch endpoint
3. app/api/subscribe: Public subscriber intake endpoint
4. app/api/unsubscribe: HMAC verified one click unsubscription handler
5. app/admin: Protected admin dashboard interface
6. app/components: UI components including the signature analog delivery clock
7. lib/gemini.ts: Gemini Chief AI Editor synthesis and structured JSON output
8. lib/dedup.ts: SHA256 hashing and Jaccard similarity deduplication algorithms
9. lib/rss.ts: Feed crawling and article normalization across global newsrooms
10. lib/email.ts: Responsive HTML newsletter generation and Resend dispatch
11. lib/supabase.ts: Database client and administrative query helpers
12. lib/crypto.ts: Cryptographic token generation and HMAC verification
13. supabase/schema.sql: PostgreSQL schema for subscribers, seen articles, and briefings

## Environment Variables

Create a file named .env.local in the root directory using .env.example as the template:

```
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
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/XY-COMBINATOR/mr-news.git
cd mr-news
```

2. Install dependencies:

```bash
npm install
```

3. Set up the database:
Open the SQL Editor in your Supabase project dashboard and execute the queries in supabase/schema.sql to initialize the subscribers, articles seen, and briefings tables.

4. Configure environment variables:
Copy .env.example to .env.local and fill in your keys for Supabase, Resend, and Google Gemini.

5. Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Production Deployment

The project is configured for zero touch deployment on Vercel:

1. Import the repository into your Vercel dashboard.
2. Add all environment variables from .env.local into Vercel project settings.
3. The nightly cron schedule in vercel.json automatically fires the pipeline endpoint every evening at 22:00 IST.

## AI Usage Disclosure

AI coding assistants (Google Antigravity and Gemini) were used as pair programming tools for brainstorming architecture, drafting boilerplate type definitions, debugging Turbopack build issues, and optimizing HTML email layouts. The overall product vision, system architecture, prompt engineering, database schema design, and security defenses were fully designed, verified, and owned by the team.

## Open Source Credits

1. Framework and Runtime: [Next.js](https://nextjs.org/) by Vercel, [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
2. Data and Ingestion: [rss-parser](https://github.com/rbren/rss-parser) for feed consumption, [Supabase](https://supabase.com/) for PostgreSQL
3. AI Models: [Google Generative AI SDK](https://ai.google.dev/) for Gemini
4. Email Delivery: [Resend](https://resend.com/) for transactional email

## What We Learned

1. Math before AI: Running Jaccard similarity and SHA256 hashing before calling the LLM drastically cut token usage and kept the briefing sharp. Simple algorithms do heavy lifting that language models should not be wasted on.
2. Prompt constraints over prompting creativity: Telling Gemini what not to say mattered far more than giving it creative latitude. Every buzzword we banned from the output made the briefing noticeably sharper.
3. Email deliverability is an art form: Getting past spam filters required multipart MIME, RFC 8058 list unsubscribe headers, cryptographic tokens, and pure inline CSS. Modern web CSS is practically useless inside email clients.

## Team

Project: MR NEWS
Organization: [XY-COMBINATOR](https://github.com/XY-COMBINATOR)
Built for: First Commit Hackathon

## License

MIT License. Open for community contributions.