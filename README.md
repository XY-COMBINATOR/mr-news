# 📰 MR NEWS — The AI Newsletter That Reads Itself

> **600+ Sources. 7 Stories. 5 Minutes.**  
> An autonomous, hyper-curated daily intelligence briefing delivered to your inbox every night at 22:00 IST.

[![Live Demo](https://img.shields.io/badge/Demo-mr--news--ashy.vercel.app-blue?style=for-the-badge&logo=vercel)](https://mr-news-ashy.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Gemini](https://img.shields.io/badge/AI-Google_Gemini-orange?style=for-the-badge&logo=google)](https://ai.google.dev/)

---

## ⚡ Live Links
- **🌐 Live Production Website:** [https://mr-news-ashy.vercel.app](https://mr-news-ashy.vercel.app)
- **🔐 Admin Control Desk:** [https://mr-news-ashy.vercel.app/admin](https://mr-news-ashy.vercel.app/admin)
- **📂 GitHub Repository:** [https://github.com/XY-COMBINATOR/mr-news](https://github.com/XY-COMBINATOR/mr-news)

---

## 💡 The Problem
In an era of infinite scroll and notification fatigue, readers are inundated with thousands of sensationalized articles daily. Most newsletters are either manually compiled (slow, biased) or simple RSS dumps (noisy, redundant).

## 🚀 The Solution: MR NEWS
**MR NEWS** is a fully automated autonomous news pipeline designed to save readers 3+ hours daily:
1. **Aggregates** top global RSS feeds across technology, AI labs, policy, chips, science, and funding.
2. **Deduplicates** cross-source stories using SHA-256 content hashing to ensure zero repetitive coverage.
3. **Synthesizes** the day's top 7 most impactful stories using **Multi-AI Fallback Engine** into clean, objective executive takeaways with strategic impact scores.
4. **Delivers** an editorial-grade briefing directly to each subscriber's inbox every night at exactly **22:00 IST**.

---

## 🏗️ Architecture & Pipeline Flow

```
[ Top RSS Feeds ] (TechCrunch, AP, Reuters, Verge, arXiv)
         │
         ▼
[ Ingestion & Normalization ]
         │
         ▼
[ SHA-256 Deduplication Engine ] ──► (Filters repeated stories & noise)
         │
         ▼
[ Multi-AI Synthesis Engine ] ──► Multi-Provider Fallback:
         │                        1. OpenRouter (Primary)
         │                        2. Google Gemini 2.5 Flash
         │                        3. Groq Fast Inference
         │
         ▼
[ Supabase PostgreSQL ] ──► Stores curated editions & subscriber preferences
         │
         ▼
[ Automated Vercel Cron ] (Daily 16:30 UTC / 22:00 IST)
         │
         ▼
[ Gmail SMTP Delivery Engine ] ──► Sends personalized, responsive HTML newsletter
```

---

## ✨ Key Features

### 1. 🛡️ Resilient Multi-AI Failover Architecture
Never misses an edition. If one AI model experiences a rate limit or downtime, the pipeline automatically falls back in milliseconds:
- **Primary:** OpenRouter Free Models
- **Fallback 1:** Google Gemini 2.5 Flash
- **Fallback 2:** Groq Fast Llama-3-70B

### 2. 🎯 Personalized Topic Curation
Subscribers choose the exact verticals that matter to them:
- `policy` — AI Regulation & Governance
- `labs` — Breakthrough AI Lab Research
- `chips` — Semiconductor & Hardware Supply Chains
- `funding` — Venture Capital & Seed Rounds
- `safety` — Alignment & Red-teaming
- `culture` — Societal Impact

### 3. ⏰ Guaranteed 22:00 Nightly Delivery
Built with Vercel Cron triggers (`vercel.json`) running serverless jobs at exactly `16:30 UTC` (22:00 IST) every single night.

### 4. 🔒 Enterprise-Grade Security
- **Timing-Safe Authentication:** Admin passkey comparisons use cryptographic constant-time buffers to prevent timing attacks.
- **Brute-Force Shield:** IP tracking locks out repeated invalid passkey attempts for 15 minutes.
- **Bot Honeytraps & IP Rate Limiting:** Prevents automated form spam on subscription endpoints.
- **Fail-Closed Secrets:** All sensitive operations reject execution if environment variables are missing.

### 5. 📊 Real-Time Admin Control Desk
Includes a protected dashboard to monitor:
- Total & Active subscriber counts
- Live pipeline health & database latency
- Historical briefings sent with stories and impact metrics
- One-click subscriber management

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 18, TypeScript, Vanilla CSS |
| **Backend & APIs** | Next.js Serverless Edge Routes, Vercel Cron Jobs |
| **Database** | Supabase (PostgreSQL with Row Level Security) |
| **AI / LLM** | Google Gemini Generative AI, OpenRouter API, Groq |
| **Email Delivery** | Nodemailer (Gmail SMTP with App Passwords) |
| **Deployment** | Vercel Serverless Platform |

---

## 🚦 API Reference

| Endpoint | Method | Description | Auth Required |
|---|---|---|---|
| `/` | `GET` | Landing page & subscriber onboarding | No |
| `/login` | `GET` | User & Admin login portal | No |
| `/admin` | `GET` | Real-time Admin Control Desk | Passkey |
| `/api/subscribe` | `POST` | Create new subscriber & send welcome email | Rate-Limited |
| `/api/send-briefing` | `POST` | Trigger pipeline ingestion, synthesis & dispatch | `Bearer CRON_SECRET` |
| `/api/cron` | `GET` | Automated cron trigger from Vercel | Vercel Cron |
| `/api/status` | `GET` | System & database health probe | `Bearer CRON_SECRET` |
| `/api/unsubscribe` | `GET` | One-click instant unsubscribe | Cryptographic Token |

---

## 🏃 Local Setup & Development

### 1. Clone Repository
```bash
git clone https://github.com/XY-COMBINATOR/mr-news.git
cd mr-news
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local` and add your keys:
```bash
cp .env.example .env.local
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👥 Hackathon Team & Credits
- **Project:** MR NEWS
- **Team / Organization:** [XY-COMBINATOR](https://github.com/XY-COMBINATOR)
- **Built for:** AI & Automation Track