# MR NEWS — Daily Executive Intelligence Platform

> **High-Signal Morning Intelligence for Operators, Founders, and Investors.**  
> Built with Next.js 14 (App Router), TypeScript, Supabase, Nodemailer, and a Multi-Provider AI Synthesis Engine.

---

## 🏛️ System Architecture

MR NEWS is an automated publication platform designed around a linear, high-reliability pipeline:

```
[ 8 Tier-1 Wire Desks & RSS Feeds ]
                │
                ▼
      [ 1. Crawl & Ingest ]
      (rss-parser, 8s timeout, browser headers)
                │
                ▼
      [ 2. Deduplicate ]
      (Jaccard text similarity >0.6 + SHA-256 URL hash check vs Supabase)
                │
                ▼
      [ 3. Multi-AI Failover Engine ]
      Primary:   Google Gemini 2.5 Flash (JSON mode, ~1.5s)
      Secondary: Groq Qwen 27B / GPT-OSS (<1.0s sub-second fallback)
      Tertiary:  OpenRouter Llama 3.1 8B (multi-model fallback)
                │
                ▼
      [ 4. Executive Editorial Output ]
      (7 curated stories with headlines, 2-sentence summaries & strategic impact)
                │
                ▼
      [ 5. Storage & Dispatch ]
      - Persist issue & seen hashes into Supabase
      - Render responsive HTML email
      - Dispatch via Gmail SMTP (Nodemailer)
```

---

## 📁 Codebase Directory Structure

```
mr-news/
├── app/
│   ├── api/
│   │   ├── auth/                # NextAuth session routes (Google OAuth)
│   │   ├── send-briefing/       # Scheduled pipeline trigger (Cron / Admin dispatch)
│   │   ├── subscribe/           # Public subscriber registration & preference save
│   │   └── unsubscribe/         # Cryptographic HMAC token unsubscribe handler
│   ├── admin/                   # Secure Command Center desk (metrics, manual dispatch)
│   ├── archive/                 # Public archive browser for previous daily editions
│   ├── login/                   # Onboarding flow (topic selection & delivery hour)
│   ├── components/              # Interactive UI modules (ClockSelector, Wire Desk demo)
│   ├── layout.tsx               # Root layout, metadata, SEO & Schema.org JSON-LD
│   └── page.tsx                 # Front page (hero, pillars, features, delivery)
│
├── lib/
│   ├── rss.ts                   # RSS crawler (verified tier-1 tech & frontier feeds)
│   ├── dedup.ts                 # Jaccard string similarity & cross-day URL hash deduplication
│   ├── gemini.ts                # Multi-provider AI synthesis engine (Gemini, Groq, OpenRouter)
│   ├── email.ts                 # Nodemailer Gmail SMTP transporter & HTML email builders
│   ├── supabase.ts              # Public & Service-Role Supabase database clients
│   ├── auth-admin.ts            # Security barrier (session check, passkey token, x-admin-key)
│   └── crypto.ts                # HMAC-SHA256 signature generation & timing-safe validation
│
├── supabase/
│   └── schema.sql               # PostgreSQL tables (subscribers, briefings, articles_seen)
│
├── styles/
│   ├── style.css                # Primary typography, dark-mode ink palette, layout
│   └── login.css                # Authentication and onboarding screen styling
│
├── .env.example                 # Template for required environment variables
└── README.md                    # System documentation
```

---

## ⚡ Key Modules Explained

### 1. Multi-AI Failover Engine (`lib/gemini.ts`)
Ensures 100% daily dispatch reliability through automated provider cascades:
* **Gemini 2.5 Flash**: Default primary. Returns structured JSON in 1.5 seconds.
* **Groq**: Sub-second fallback (<1s) running high-throughput open models.
* **OpenRouter**: Third-tier fallback for resilience against localized API outages.
* **Anti-Slop Editorial Directives**: The system prompt enforces journalistic voice (Matt Levine / Financial Times style), banning formulaic AI phrases (*"The incident highlights the need for..."*, *"Serves as a reminder..."*, *"In today's rapidly changing world..."*).

### 2. Algorithmic Deduplication (`lib/dedup.ts`)
* Computes mathematical **Jaccard Similarity** across candidate headlines (similarity > 0.6 flagged as duplicate).
* Generates **SHA-256 URL hashes** and queries Supabase's `articles_seen` table to prevent repeating stories across days.

### 3. Email Delivery Engine (`lib/email.ts`)
* Uses standard **Gmail SMTP** via Nodemailer with Google App Passwords.
* Inlines CSS for universal email client compatibility (Apple Mail, Gmail, Outlook).
* Automatically injects personalized HMAC unsubscribe links.

---

## 🚀 Getting Started

### Prerequisites
* Node.js 18+ (tested on Node 20 / 24)
* A free Supabase project
* At least one AI API key (Google Gemini, Groq, or OpenRouter)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/XY-COMBINATOR/mr-news.git
   cd mr-news
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your values:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

   # AI Providers
   GEMINI_API_KEY=your-gemini-key
   GROQ_API_KEY=your-groq-key
   OPENROUTER_API_KEY=your-openrouter-key

   # Email
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-google-app-password
   EMAIL_FROM="MR News <your-email@gmail.com>"

   # Security
   ADMIN_EMAIL=your-email@gmail.com
   ADMIN_SECRET=your-secure-admin-passkey
   CRON_SECRET=your-cron-secret
   NEXTAUTH_SECRET=your-nextauth-secret
   ```

4. **Initialize Database**:
   Execute `supabase/schema.sql` inside your Supabase SQL Editor.

5. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing the Pipeline

You can trigger a dry-run or a single test email without waiting for the daily cron:

```bash
# Dry run (crawl + dedup + AI synthesis — prints 7 stories to JSON)
curl -X POST http://localhost:3000/api/send-briefing \
  -H "Content-Type: application/json" \
  -H "x-admin-key: YOUR_ADMIN_SECRET" \
  -d '{"dryRun": true, "targetEmail": "your-email@gmail.com"}'

# Live test dispatch (sends actual email to targetEmail only)
curl -X POST http://localhost:3000/api/send-briefing \
  -H "Content-Type: application/json" \
  -H "x-admin-key: YOUR_ADMIN_SECRET" \
  -d '{"dryRun": false, "targetEmail": "your-email@gmail.com"}'
```

---

## 🛡️ License & Standards
Developed for high signal-to-noise executive reporting. Zero tracking pixels. Zero telemetry sell-offs.
<!-- MR NEWS: Verified high-signal editorial intelligence -->
