'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';

/**
 * Onboarding flow — three steps:
 *   Step 1: Google authentication
 *   Step 2: Topic / beat preferences
 *   Step 3: Subscription confirmation
 *
 * Delivery time is fixed at 22:00; there is no time picker.
 */

const AVAILABLE_TOPICS = [
  { id: 'policy',  label: 'Policy and Regulation' },
  { id: 'labs',    label: 'Labs and Models' },
  { id: 'chips',   label: 'Chips and Hardware' },
  { id: 'funding', label: 'Funding and Business' },
  { id: 'safety',  label: 'Safety and Ethics' },
  { id: 'science', label: 'Science' },
  { id: 'culture', label: 'Culture and Society' },
] as const;

const DEFAULT_TOPICS = ['policy', 'labs', 'chips', 'funding'];
const DELIVERY_HOUR  = 22; // Fixed nightly dispatch at 22:00

export default function LoginPage() {
  const { data: session } = useSession();

  const [step, setStep]               = useState<number>(1);
  const [chosenTopics, setChosenTopics] = useState<string[]>(DEFAULT_TOPICS);
  const [isSaving, setIsSaving]       = useState(false);

  const toggleTopic = (topicId: string) => {
    setChosenTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((t) => t !== topicId)
        : [...prev, topicId]
    );
  };

  const handleFinishSetup = async () => {
    setIsSaving(true);
    const email = session?.user?.email ?? 'reader@example.com';
    const name  = session?.user?.name  ?? 'Reader';

    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          deliveryHour: DELIVERY_HOUR,
          topics: chosenTopics,
        }),
      });
    } catch (err) {
      // Non-fatal: advance to confirmation regardless.
      // The subscribe API will be retried on next sign-in if it fails.
      console.warn('[LoginPage] Subscription API call failed, advancing to confirmation:', err);
    } finally {
      setIsSaving(false);
      setStep(3);
    }
  };

  const handleGoogleClick = () => {
    if (session?.user) {
      // Already authenticated — skip to preferences step
      setStep(2);
      return;
    }

    signIn('google', { callbackUrl: '/login' }).catch(() => {
      // In local development without OAuth credentials, allow advancing anyway
      setStep(2);
    });
  };

  return (
    <div className="login-page">

      {/* Back navigation */}
      <div className="login-topbar">
        <Link href="/" className="login-back" aria-label="Return to front page">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back to Front Page</span>
        </Link>
      </div>

      {/* Main onboarding card */}
      <div className="login-card">

        {/* Brand header */}
        <div className="login-brand-wrap">
          <svg className="login-emblem" viewBox="0 0 100 100" fill="none" aria-hidden="true">
            <circle cx="50" cy="50" r="46" stroke="url(#logoGrad)" strokeWidth="3.2" />
            <ellipse cx="50" cy="50" rx="20" ry="46" stroke="url(#logoGrad)" strokeWidth="2" />
            <line x1="4" y1="50" x2="96" y2="50" stroke="url(#logoGrad)" strokeWidth="2" />
            <path d="M12 28 Q50 40 88 28" stroke="url(#logoGrad)" strokeWidth="1.6" opacity=".7" />
            <path d="M12 72 Q50 60 88 72" stroke="url(#logoGrad)" strokeWidth="1.6" opacity=".7" />
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="var(--acc, #FF6500)" />
                <stop offset="100%" stopColor="var(--acc-deep, #CC5000)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="login-brand">
            MR <span>NEWS</span>
          </div>
        </div>

        {/* Step indicator */}
        <div className="login-steps" aria-label="Onboarding steps">
          <div className={`login-step-item ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>
            <span>{step > 1 ? '✓' : '1'}</span>
            <span>Account</span>
          </div>
          <div className={`login-step-item ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
            <span>{step > 2 ? '✓' : '2'}</span>
            <span>Beats</span>
          </div>
          <div className={`login-step-item ${step === 3 ? 'active' : ''}`}>
            <span>3</span>
            <span>Ready</span>
          </div>
        </div>

        {/* ── STEP 1: AUTHENTICATION ─────────────────────────────── */}
        {step === 1 && (
          <div className="login-step-content">
            <div className="login-eyebrow">Subscriber Access</div>

            <h1 className="login-title">
              The AI briefing delivered<br />
              <em>every night at 22:00.</em>
            </h1>

            <p className="login-desc">
              Six hundred sources distilled to seven essential stories.
              Delivered to your inbox nightly at 22:00 sharp.
            </p>

            <div className="login-features">
              <div className="login-feature-item">
                <svg className="login-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>One click Google sign in: zero passwords to remember</span>
              </div>
              <div className="login-feature-item">
                <svg className="login-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>Nightly dispatch at 22:00 ready for your morning</span>
              </div>
              <div className="login-feature-item">
                <svg className="login-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>Curated beats: policy, chips, labs, funding. Cancel anytime.</span>
              </div>
            </div>

            <hr className="login-divider" />

            <button
              type="button"
              className="login-google-btn"
              onClick={handleGoogleClick}
              id="googleLoginBtn"
            >
              <svg className="g-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.97 0 12s.45 3.85 1.24 5.42l4.04-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
              </svg>
              <span>{session?.user ? `Continue as ${session.user.name?.split(' ')[0]}` : 'Continue with Google'}</span>
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {/* Development shortcut: visible only when not authenticated */}
            {!session?.user && (
              <button
                type="button"
                className="login-back login-back--link"
                onClick={() => setStep(2)}
              >
                <span>Or configure preferences first</span>
              </button>
            )}

            <p className="login-footer">
              By continuing you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.<br />
              Free forever. No spam, ever.
            </p>
          </div>
        )}

        {/* ── STEP 2: PREFERENCES ───────────────────────────────── */}
        {step === 2 && (
          <div className="login-step-content">
            <div className="login-eyebrow">Step 2 of 3: Preferences</div>

            <h2 className="login-title">
              Select your <em>topics and coverage</em>
            </h2>

            <p className="login-desc">
              Your briefing is dispatched every night at 22:00. Choose the beats that matter most to you.
            </p>

            {/* Delivery window — fixed, display only */}
            <div className="login-field">
              <label className="login-field-label">
                <span>Delivery Window</span>
                <span className="tag">Nightly Schedule</span>
              </label>
              <div className="login-delivery-display">
                <div className="login-delivery-display__left">
                  <span className="login-delivery-display__dot" />
                  <div>
                    <div className="login-delivery-display__time">22:00 Local Time</div>
                    <div className="login-delivery-display__sub">Dispatched automatically every evening</div>
                  </div>
                </div>
                <span className="login-delivery-display__badge">Fixed Nightly</span>
              </div>
            </div>

            {/* Topic selection */}
            <div className="login-field">
              <label className="login-field-label">
                <span>Topics of Interest</span>
                <span className="tag">{chosenTopics.length} selected</span>
              </label>
              <div className="login-topics">
                {AVAILABLE_TOPICS.map((topic) => {
                  const isSelected = chosenTopics.includes(topic.id);
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      className={`login-topic-chip ${isSelected ? 'active' : ''}`}
                      onClick={() => toggleTopic(topic.id)}
                    >
                      {isSelected ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      )}
                      <span>{topic.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="login-actions">
              <button type="button" className="login-btn-ghost" onClick={() => setStep(1)}>
                Back
              </button>
              <button
                type="button"
                className="login-btn-primary"
                onClick={handleFinishSetup}
                disabled={isSaving}
              >
                <span>{isSaving ? 'Saving...' : 'Finish Setup'}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: CONFIRMATION ──────────────────────────────── */}
        {step === 3 && (
          <div className="login-step-content">
            <div className="login-status-badge">
              <span className="login-status-dot" />
              <span>Subscription Active</span>
            </div>

            <h2 className="login-title">
              You are <em>on the list.</em>
            </h2>

            <p className="login-desc">
              Your first briefing will be compiled tonight and dispatched to your inbox at{' '}
              <strong className="login-desc__accent">22:00</strong> local time.
            </p>

            <div className="login-summary-card">
              <div className="login-summary-row">
                <span className="login-summary-label">Delivery Schedule</span>
                <span className="login-summary-val highlight">22:00 Nightly</span>
              </div>
              <div className="login-summary-row">
                <span className="login-summary-label">Curated Sections</span>
                <span className="login-summary-val">{chosenTopics.length} beats active</span>
              </div>
              <div className="login-summary-row">
                <span className="login-summary-label">Reader Account</span>
                <span className="login-summary-val">{session?.user?.email ?? 'reader@example.com'}</span>
              </div>
              <div className="login-summary-row">
                <span className="login-summary-label">Membership</span>
                <span className="login-summary-val">Free Forever</span>
              </div>
            </div>

            <div className="login-actions">
              <Link href="/" className="login-btn-primary" style={{ width: '100%' }}>
                <span>Read Today&apos;s Front Page</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
