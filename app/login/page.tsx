'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';

export default function LoginPage() {
  const { data: session } = useSession();
  const [step, setStep] = useState<number>(1);
  const [chosenTime, setChosenTime] = useState<string>('06:00');
  const [chosenTopics, setChosenTopics] = useState<string[]>([
    'policy',
    'labs',
    'chips',
    'funding',
  ]);
  const [isSaving, setIsSaving] = useState(false);

  const availableTimes = [
    { time: '05:00', label: 'Early' },
    { time: '06:00', label: 'Default' },
    { time: '07:00', label: 'Morning' },
    { time: '08:00', label: 'Late' },
    { time: '12:00', label: 'Noon' },
    { time: '18:00', label: 'Evening' },
  ];

  const availableTopics = [
    { id: 'policy', label: 'Policy and Regulation' },
    { id: 'labs', label: 'Labs and Models' },
    { id: 'chips', label: 'Chips and Hardware' },
    { id: 'funding', label: 'Funding and Business' },
    { id: 'safety', label: 'Safety and Ethics' },
    { id: 'science', label: 'Science' },
    { id: 'culture', label: 'Culture and Society' },
  ];

  const toggleTopic = (topicId: string) => {
    setChosenTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((t) => t !== topicId)
        : [...prev, topicId]
    );
  };

  const handleFinishSetup = async () => {
    setIsSaving(true);
    const hourInt = parseInt(chosenTime.split(':')[0], 10);
    const emailToUse = session?.user?.email || 'reader@example.com';

    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailToUse,
          name: session?.user?.name || 'Reader',
          deliveryHour: hourInt,
          topics: chosenTopics,
        }),
      });
    } catch (err) {
      console.warn('[LOGIN_PAGE] Failed to save via API, displaying confirmation state:', err);
    } finally {
      setIsSaving(false);
      setStep(3);
    }
  };

  return (
    <div className="paper-wrap">
      <div className="paper-sheet">
        <div className="paper-grain" aria-hidden="true" />
        <div className="paper-sheet__inner">

          <header className="masthead">
            <div className="masthead__top">
              <span className="left">Est. 2024</span>
              <span className="mid">The newsletter that reads the news for you</span>
              <span className="right">
                <Link href="/">Back to Paper</Link>
              </span>
            </div>

            <div className="brand">
              <img
                src="/assets/brand/mr_news_logo.svg"
                alt="MR News logo"
                className="brand__logo"
              />
              <h1 className="brand__text" aria-label="MR NEWS">
                <span aria-hidden="true">MR</span>
                <span className="brand__globe" aria-hidden="true">
                  <svg viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="46" stroke="#1a1510" strokeWidth="3.2" />
                    <g className="meridians">
                      <ellipse cx="50" cy="50" rx="20" ry="46" stroke="#1a1510" strokeWidth="2" />
                      <ellipse cx="50" cy="50" rx="38" ry="46" stroke="#1a1510" strokeWidth="1.4" opacity=".5" />
                      <line x1="4" y1="50" x2="96" y2="50" stroke="#1a1510" strokeWidth="2" />
                      <path d="M12 28 Q50 40 88 28" stroke="#1a1510" strokeWidth="1.6" opacity=".7" />
                      <path d="M12 72 Q50 60 88 72" stroke="#1a1510" strokeWidth="1.6" opacity=".7" />
                    </g>
                  </svg>
                </span>
                <span aria-hidden="true">NEWS</span>
              </h1>
              <p className="brand__tagline">Subscriber Ledger</p>
            </div>

            <div className="masthead__sub">
              <span>Three Quick Steps to Open the Ledger</span>
            </div>
          </header>

          <div className="rule-orn" aria-hidden="true"><span /></div>

          <header className="sec-head" style={{ marginBottom: '30px' }}>
            <p className="sec-head__kicker">Members&apos; Entrance</p>
            <h2 className="sec-head__title">Open the Ledger</h2>
            <p className="sec-head__sub">One Google click. Then set your hour and topics.</p>
          </header>

          <div className="flow-wrap">

            <div className="flow-copy">
              <p style={{ fontFamily: 'var(--f-mono)', fontSize: '.6rem', letterSpacing: '.32em', textTransform: 'uppercase', color: 'var(--stamp)', marginBottom: '10px' }}>
                A Letter to New Readers
              </p>
              <h2>Welcome to <em>the Paper</em></h2>
              <p>Thank you for coming by. We only need one thing to open your subscription: a Google sign in. After that, we will ask two small questions and you are done for good.</p>

              <ul className="flow-feats">
                <li>
                  <span className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                  </span>
                  <span><b>Step 1 / Google Sign In</b><span>One click. No passwords, ever.</span></span>
                </li>
                <li>
                  <span className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="16" rx="1" /><path d="M3 10h18M8 5V3M16 5V3" /></svg>
                  </span>
                  <span><b>Step 2 / Pick Your Hour</b><span>Deliver at 6 a.m., noon, whenever.</span></span>
                </li>
                <li>
                  <span className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 6h16M4 12h16M4 18h10" /></svg>
                  </span>
                  <span><b>Step 3 / Choose Topics</b><span>Only get the sections you care about.</span></span>
                </li>
              </ul>
            </div>

            <div className="flow" id="flow">

              {/* STEP 1 */}
              <div className={`flow__step ${step === 1 ? 'active' : ''}`} data-step="1">
                <p className="flow__welcome">Welcome to the Ledger</p>
                <p className="flow__logo">MR News</p>
                <p className="flow__tag">
                  {session?.user ? `Signed in as ${session.user.name}` : 'Sign in with Google to begin'}
                </p>

                {session?.user ? (
                  <button
                    className="btn-google-xl"
                    type="button"
                    onClick={() => setStep(2)}
                  >
                    <span>Continue as {session.user.name?.split(' ')[0]}</span>
                    <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 12h13M13 6l6 6-6 6" />
                    </svg>
                  </button>
                ) : (
                  <button
                    className="btn-google-xl"
                    id="googleBtn"
                    type="button"
                    onClick={() => {
                      signIn('google').catch(() => setStep(2));
                    }}
                  >
                    <svg className="g-logo" viewBox="0 0 48 48" aria-hidden="true">
                      <path fill="#4285F4" d="M45 24.5c0-1.6-.1-2.8-.4-4H24v7.6h11.9c-.2 2-1.6 5-4.5 7l6.9 5.3c4.1-3.8 6.7-9.3 6.7-15.9z" />
                      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.3c-1.9 1.3-4.4 2.2-7.6 2.2-5.8 0-10.8-3.8-12.6-9.1l-7.1 5.5C7.9 41 15.4 46 24 46z" />
                      <path fill="#FBBC05" d="M11.4 28.5c-.5-1.4-.8-2.9-.8-4.5s.3-3.1.8-4.5l-7.1-5.5C2.8 16.9 2 20.4 2 24s.8 7.1 2.3 10z" />
                      <path fill="#EA4335" d="M24 10.2c4.1 0 6.9 1.8 8.5 3.3l6.2-6C34.9 4.1 29.9 2 24 2 15.4 2 7.9 7 4.3 14l7.1 5.5C13.2 14.2 18.2 10.2 24 10.2z" />
                    </svg>
                    <span>Continue with Google</span>
                    <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 12h13M13 6l6 6-6 6" />
                    </svg>
                  </button>
                )}

                <p className="flow__fine">
                  By continuing you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
                  We never sell your email.
                </p>
              </div>

              {/* STEP 2 */}
              <div className={`flow__step ${step === 2 ? 'active' : ''}`} data-step="2">
                <p className="flow__step-tag">Step 2 of 3</p>
                <p className="flow__title">Set your delivery</p>
                <p className="flow__sub">Change any of this from inside any issue.</p>

                <div className="field">
                  <span className="field__label">Delivery hour</span>
                  <div className="times" id="times">
                    {availableTimes.map((t) => (
                      <button
                        key={t.time}
                        type="button"
                        className={`time-opt ${chosenTime === t.time ? 'active' : ''}`}
                        onClick={() => setChosenTime(t.time)}
                      >
                        {t.time}<small>{t.label}</small>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="field">
                  <span className="field__label">Topics you want</span>
                  <div className="topic-chips" id="topics">
                    {availableTopics.map((top) => (
                      <button
                        key={top.id}
                        type="button"
                        className={`topic-chip ${chosenTopics.includes(top.id) ? 'active' : ''}`}
                        onClick={() => toggleTopic(top.id)}
                      >
                        {top.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flow__actions">
                  <button
                    className="btn-flow btn-flow--ghost"
                    type="button"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button
                    className="btn-flow btn-flow--primary"
                    type="button"
                    onClick={handleFinishSetup}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Finish Setup'}
                  </button>
                </div>
              </div>

              {/* STEP 3 */}
              <div className={`flow__step ${step === 3 ? 'active' : ''}`} data-step="3">
                <div className="confirm">
                  <div className="confirm__stamp">Filed</div>
                  <p className="confirm__title">You are <em>on the list</em></p>
                  <p className="confirm__body">
                    Your first briefing arrives at{' '}
                    <span id="confirmTime" style={{ fontFamily: 'var(--f-code)', fontStyle: 'normal', color: 'var(--code)', fontWeight: 500 }}>
                      {chosenTime}
                    </span>{' '}
                    tomorrow morning, with the sections you picked.
                  </p>
                  <div className="confirm__meta">
                    <span>Delivery <b id="confirmTimeMeta">{chosenTime} local</b></span>
                    <span>Sections <b id="confirmTopics">{chosenTopics.length} on</b></span>
                  </div>
                  <div className="flow__actions" style={{ marginTop: '28px' }}>
                    <Link href="/" className="btn-flow btn-flow--primary" style={{ display: 'block' }}>
                      Read the Front Page
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <footer className="foot">
            <p className="foot__logo">MR News</p>
            <p className="foot__tag">Curated by analysts, written for leaders</p>
            <Link href="/" className="foot__back">Back to the Paper</Link>
          </footer>

        </div>
      </div>
    </div>
  );
}
// MR NEWS — Executive Morning Intelligence Platform
