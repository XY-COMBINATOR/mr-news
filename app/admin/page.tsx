'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [passkeyError, setPasskeyError] = useState('');
  const [isVerifyingKey, setIsVerifyingKey] = useState(false);

  const [testEmail, setTestEmail] = useState('mrnewsbrief@gmail.com');
  const [testType, setTestType] = useState<'welcome' | 'briefing'>('briefing');
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null);

  const [dispatchMode, setDispatchMode] = useState<'all' | 'hourly'>('hourly');
  const [dryRun, setDryRun] = useState(false);
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchResult, setDispatchResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null);

  const [smtpOnline, setSmtpOnline] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/admin/auth')
      .then(r => r.json())
      .then(d => {
        setIsAuthorized(d.authorized);
        if (d.authorized) checkSmtp();
      })
      .catch(() => setIsAuthorized(false));
  }, []);

  const checkSmtp = async () => {
    try {
      const r = await fetch('/api/test-email');
      if (r.ok) {
        const d = await r.json();
        setSmtpOnline(d.connection?.success ?? false);
      }
    } catch { setSmtpOnline(false); }
  };

  const handlePasskeySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkeyInput.trim()) return;
    setIsVerifyingKey(true);
    setPasskeyError('');
    try {
      const r = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey: passkeyInput.trim() }),
      });
      const d = await r.json();
      if (r.ok && d.authorized) {
        setIsAuthorized(true);
        checkSmtp();
      } else {
        setPasskeyError(d.error || 'Incorrect key.');
      }
    } catch { setPasskeyError('Authentication failed.'); }
    finally { setIsVerifyingKey(false); }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setIsAuthorized(false);
    setPasskeyInput('');
  };

  const handleSendTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingTest(true);
    setTestResult(null);
    try {
      const r = await fetch('/api/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: testEmail, type: testType, recipientName: 'Reader', deliveryHour: 6 }),
      });
      setTestResult(await r.json());
    } catch (err: unknown) {
      setTestResult({ success: false, error: err instanceof Error ? err.message : 'Network error' });
    } finally { setIsSendingTest(false); }
  };

  const handleDispatch = async () => {
    const msg = dryRun
      ? 'Run a dry simulation — no emails will be sent. Continue?'
      : dispatchMode === 'all'
      ? 'This sends today\'s briefing to every active subscriber. Are you sure?'
      : 'Send today\'s briefing to subscribers in the current UTC hour?';
    if (!window.confirm(msg)) return;
    setIsDispatching(true);
    setDispatchResult(null);
    try {
      const r = await fetch('/api/send-briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forceAll: dispatchMode === 'all', dryRun }),
      });
      const d = await r.json();
      setDispatchResult(
        r.ok && d.success
          ? { success: true, message: dryRun ? `Simulation — ${d.storiesCount} stories, ${d.targetSubscribers} subscribers.` : `Sent to ${d.emailsSent} subscribers. ${d.storiesCount} stories.` }
          : { success: false, error: d.error || d.message || 'Dispatch failed.' }
      );
    } catch (err: unknown) {
      setDispatchResult({ success: false, error: err instanceof Error ? err.message : 'Request failed' });
    } finally { setIsDispatching(false); }
  };

  /* ─── LOADING ─── */
  if (isAuthorized === null) {
    return (
      <div style={styles.page}>
        <span style={{ color: '#78716c', fontSize: 13 }}>Authenticating...</span>
      </div>
    );
  }

  /* ─── LOGIN ─── */
  if (!isAuthorized) {
    return (
      <div style={styles.page}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          * { box-sizing: border-box; }
          input:-webkit-autofill { -webkit-box-shadow: 0 0 0 30px #111 inset !important; -webkit-text-fill-color: #faf8f5 !important; }
          .pk-btn:hover { background: #b8913a !important; }
          .pk-input:focus { border-color: #c29b38 !important; outline: none; }
        `}</style>

        <div style={styles.loginCard}>
          <div style={{ marginBottom: 32 }}>
            <div style={styles.wordmark}>MR<span style={{ color: '#8c1d18' }}>·</span>NEWS</div>
            <div style={styles.loginSub}>Editorial Administration</div>
          </div>

          <form onSubmit={handlePasskeySubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={styles.fieldLabel}>Security Key</label>
              <input
                className="pk-input"
                type="password"
                value={passkeyInput}
                onChange={e => setPasskeyInput(e.target.value)}
                placeholder="••••••••••••"
                autoFocus
                required
                style={styles.input}
              />
            </div>

            {passkeyError && (
              <div style={styles.errBadge}>{passkeyError}</div>
            )}

            <button
              className="pk-btn"
              type="submit"
              disabled={isVerifyingKey}
              style={{ ...styles.primaryBtn, opacity: isVerifyingKey ? 0.65 : 1 }}
            >
              {isVerifyingKey ? 'Verifying...' : 'Sign In'}
            </button>
          </form>

          <Link href="/" style={styles.backLink}>← Back to website</Link>
        </div>
      </div>
    );
  }

  /* ─── DASHBOARD ─── */
  return (
    <div style={styles.dashboard}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 30px #0d0a07 inset !important; -webkit-text-fill-color: #faf8f5 !important; }
        .action-btn:hover { opacity: 0.8; }
        .field-input:focus { border-color: #c29b38 !important; outline: none; }
        .toggle-btn:hover { border-color: #78716c !important; }
        .link-btn:hover { border-color: #78716c !important; }
        select option { background: #1c1917; }
      `}</style>

      {/* Top Bar */}
      <header style={styles.topBar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={styles.wordmarkDash}>MR<span style={{ color: '#8c1d18' }}>·</span>NEWS</div>
          <div style={styles.divider} />
          <span style={styles.pageTitle}>Admin</span>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
            backgroundColor: smtpOnline === true ? '#052e16' : smtpOnline === false ? '#450a0a' : '#1c1917',
            color: smtpOnline === true ? '#4ade80' : smtpOnline === false ? '#fca5a5' : '#78716c',
            border: `1px solid ${smtpOnline === true ? '#166534' : smtpOnline === false ? '#7f1d1d' : '#292524'}`,
            padding: '2px 8px', borderRadius: 3
          }}>
            {smtpOnline === true ? 'SMTP LIVE' : smtpOnline === false ? 'SMTP ERROR' : 'CHECKING'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/" className="link-btn" style={styles.ghostBtn}>View Site</Link>
          <button onClick={handleLogout} className="action-btn" style={styles.dangerBtn}>Sign Out</button>
        </div>
      </header>

      {/* Content */}
      <main style={styles.main}>
        <div style={styles.grid}>

          {/* ── Test Email ── */}
          <section style={styles.card}>
            <h2 style={styles.cardTitle}>Send Test Email</h2>
            <p style={styles.cardDesc}>Dispatch a live preview to any inbox to verify delivery.</p>

            <form onSubmit={handleSendTest} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}>
              <div>
                <label style={styles.fieldLabel}>Recipient Address</label>
                <input
                  className="field-input"
                  type="email"
                  value={testEmail}
                  onChange={e => setTestEmail(e.target.value)}
                  required
                  style={styles.fieldInput}
                />
              </div>

              <div>
                <label style={styles.fieldLabel}>Template</label>
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  {(['briefing', 'welcome'] as const).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTestType(t)}
                      className="toggle-btn"
                      style={{
                        ...styles.toggleBtn,
                        backgroundColor: testType === t ? '#c29b38' : 'transparent',
                        color: testType === t ? '#0d0a07' : '#a8a29e',
                        borderColor: testType === t ? '#c29b38' : '#292524',
                        fontWeight: testType === t ? 700 : 500,
                      }}
                    >
                      {t === 'briefing' ? 'Daily Briefing' : 'Welcome Email'}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="action-btn"
                type="submit"
                disabled={isSendingTest}
                style={{ ...styles.primaryBtn, marginTop: 4, opacity: isSendingTest ? 0.65 : 1 }}
              >
                {isSendingTest ? 'Sending...' : 'Send Now'}
              </button>
            </form>

            {testResult && (
              <div style={{ ...styles.resultBadge, borderColor: testResult.success ? '#166534' : '#7f1d1d', backgroundColor: testResult.success ? '#052e16' : '#1c0a0a' }}>
                <span style={{ color: testResult.success ? '#4ade80' : '#fca5a5', fontWeight: 600, fontSize: 12 }}>
                  {testResult.success ? '✓' : '✕'}
                </span>
                {' '}{testResult.message || testResult.error}
              </div>
            )}
          </section>

          {/* ── Manual Dispatch ── */}
          <section style={styles.card}>
            <h2 style={styles.cardTitle}>Dispatch Briefing</h2>
            <p style={styles.cardDesc}>Manually run the full pipeline: RSS feeds → AI synthesis → email delivery.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}>
              <div>
                <label style={styles.fieldLabel}>Audience</label>
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  {(['hourly', 'all'] as const).map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setDispatchMode(m)}
                      className="toggle-btn"
                      style={{
                        ...styles.toggleBtn,
                        backgroundColor: dispatchMode === m ? '#c29b38' : 'transparent',
                        color: dispatchMode === m ? '#0d0a07' : '#a8a29e',
                        borderColor: dispatchMode === m ? '#c29b38' : '#292524',
                        fontWeight: dispatchMode === m ? 700 : 500,
                      }}
                    >
                      {m === 'hourly' ? 'Current Hour' : 'All Subscribers'}
                    </button>
                  ))}
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}>
                <input
                  type="checkbox"
                  checked={dryRun}
                  onChange={e => setDryRun(e.target.checked)}
                  style={{ width: 15, height: 15, accentColor: '#c29b38', cursor: 'pointer' }}
                />
                <span style={{ fontSize: 13, color: '#a8a29e' }}>
                  Dry run <span style={{ color: '#57534e' }}>— synthesize only, no emails sent</span>
                </span>
              </label>

              <button
                className="action-btn"
                type="button"
                onClick={handleDispatch}
                disabled={isDispatching}
                style={{ ...styles.redBtn, opacity: isDispatching ? 0.65 : 1 }}
              >
                {isDispatching ? 'Running Pipeline...' : dryRun ? 'Run Simulation' : 'Send Briefing Now'}
              </button>
            </div>

            {dispatchResult && (
              <div style={{ ...styles.resultBadge, borderColor: dispatchResult.success ? '#166534' : '#7f1d1d', backgroundColor: dispatchResult.success ? '#052e16' : '#1c0a0a' }}>
                <span style={{ color: dispatchResult.success ? '#4ade80' : '#fca5a5', fontWeight: 600, fontSize: 12 }}>
                  {dispatchResult.success ? '✓' : '✕'}
                </span>
                {' '}{dispatchResult.message || dispatchResult.error}
              </div>
            )}
          </section>

        </div>
      </main>
    </div>
  );
}

/* ─── STYLES ─── */
const font = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#0a0807',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: font,
    padding: 24,
  },
  loginCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#111',
    border: '1px solid #222',
    borderRadius: 10,
    padding: '40px 36px',
    boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
  },
  wordmark: {
    fontFamily: "Georgia, serif",
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: '-1px',
    color: '#faf8f5',
    marginBottom: 4,
  },
  loginSub: {
    fontSize: 12,
    color: '#57534e',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    fontFamily: font,
  },
  fieldLabel: {
    display: 'block',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: '#57534e',
    marginBottom: 8,
    fontFamily: font,
  },
  input: {
    width: '100%',
    padding: '11px 14px',
    backgroundColor: '#0d0a07',
    border: '1px solid #2a2520',
    borderRadius: 6,
    color: '#faf8f5',
    fontSize: 14,
    fontFamily: font,
    transition: 'border-color 0.15s',
  },
  primaryBtn: {
    width: '100%',
    padding: '12px 0',
    backgroundColor: '#c29b38',
    color: '#0a0807',
    border: 'none',
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: '0.5px',
    cursor: 'pointer',
    fontFamily: font,
    transition: 'background 0.15s, opacity 0.15s',
  },
  errBadge: {
    fontSize: 12,
    color: '#fca5a5',
    backgroundColor: '#1c0a0a',
    border: '1px solid #7f1d1d',
    padding: '8px 12px',
    borderRadius: 5,
    fontFamily: font,
  },
  backLink: {
    display: 'block',
    textAlign: 'center',
    marginTop: 24,
    fontSize: 12,
    color: '#44403c',
    textDecoration: 'none',
    fontFamily: font,
  },
  dashboard: {
    minHeight: '100vh',
    backgroundColor: '#0a0807',
    color: '#faf8f5',
    fontFamily: font,
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    height: 56,
    borderBottom: '1px solid #1a1612',
    backgroundColor: '#0d0a07',
  },
  wordmarkDash: {
    fontFamily: "Georgia, serif",
    fontSize: 17,
    fontWeight: 900,
    letterSpacing: '-0.5px',
    color: '#faf8f5',
  },
  divider: {
    width: 1,
    height: 18,
    backgroundColor: '#2a2520',
  },
  pageTitle: {
    fontSize: 13,
    fontWeight: 500,
    color: '#a8a29e',
  },
  ghostBtn: {
    padding: '6px 14px',
    border: '1px solid #2a2520',
    borderRadius: 5,
    color: '#a8a29e',
    fontSize: 12,
    textDecoration: 'none',
    fontFamily: font,
    fontWeight: 500,
    transition: 'border-color 0.15s',
  },
  dangerBtn: {
    padding: '6px 14px',
    backgroundColor: 'transparent',
    border: '1px solid #3a1212',
    borderRadius: 5,
    color: '#9b4040',
    fontSize: 12,
    cursor: 'pointer',
    fontFamily: font,
    fontWeight: 500,
    transition: 'opacity 0.15s',
  },
  main: {
    maxWidth: 960,
    margin: '0 auto',
    padding: '40px 24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
    gap: 20,
  },
  card: {
    backgroundColor: '#0d0a07',
    border: '1px solid #1a1612',
    borderRadius: 10,
    padding: 28,
  },
  cardTitle: {
    margin: 0,
    fontFamily: "Georgia, serif",
    fontSize: 18,
    fontWeight: 700,
    color: '#faf8f5',
  },
  cardDesc: {
    margin: '6px 0 0',
    fontSize: 13,
    color: '#57534e',
    lineHeight: 1.6,
  },
  fieldInput: {
    width: '100%',
    padding: '10px 13px',
    backgroundColor: '#111',
    border: '1px solid #1e1a17',
    borderRadius: 6,
    color: '#faf8f5',
    fontSize: 13.5,
    fontFamily: font,
    transition: 'border-color 0.15s',
  },
  toggleBtn: {
    padding: '7px 14px',
    border: '1px solid',
    borderRadius: 5,
    fontSize: 12,
    fontFamily: font,
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  redBtn: {
    width: '100%',
    padding: '11px 0',
    backgroundColor: '#8c1d18',
    color: '#faf8f5',
    border: 'none',
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: font,
    transition: 'opacity 0.15s',
    letterSpacing: '0.3px',
  },
  resultBadge: {
    marginTop: 14,
    padding: '10px 14px',
    borderRadius: 6,
    border: '1px solid',
    fontSize: 12.5,
    lineHeight: 1.5,
    color: '#d6d3d1',
    fontFamily: font,
  },
};
// MR NEWS — Executive Morning Intelligence Platform
