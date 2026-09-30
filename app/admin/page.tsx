'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Metrics {
  totalSubscribers: number;
  activeSubscribers: number;
  unsubscribed: number;
  totalBriefingsSent: number;
}

interface SystemInfo {
  smtpConfigured: boolean;
  smtpUser: string;
  geminiConfigured: boolean;
  geminiModel: string;
  supabaseConfigured: boolean;
  deliverySchedule: string;
}

interface Subscriber {
  id: string;
  email: string;
  name: string;
  delivery_hour: number;
  topics: string[];
  status: string;
  created_at: string;
}

interface Briefing {
  id: string;
  delivery_date: string;
  delivery_hour: number;
  content: { stories: Array<{ headline: string; category: string }> };
  created_at: string;
}

export default function AdminPage() {
  const [passkey, setPasskey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [system, setSystem] = useState<SystemInfo | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [briefings, setBriefings] = useState<Briefing[]>([]);

  // Dispatch Controller State
  const [dryRun, setDryRun] = useState(true);
  const [testEmail, setTestEmail] = useState('');
  const [dispatchLoading, setDispatchLoading] = useState(false);
  const [dispatchResult, setDispatchResult] = useState<any>(null);

  // Check saved passkey on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('mrnews_admin_key');
    if (saved) {
      setPasskey(saved);
      loadAdminData(saved);
    }
  }, []);

  const loadAdminData = async (key: string) => {
    setLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/admin', {
        headers: { 'x-admin-key': key },
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || 'Authentication failed. Incorrect passkey.');
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
        sessionStorage.setItem('mrnews_admin_key', key);
        setMetrics(data.metrics);
        setSystem(data.system);
        setSubscribers(data.subscribers || []);
        setBriefings(data.briefings || []);
      }
    } catch (err: unknown) {
      setAuthError('Failed to connect to Admin API.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkey.trim()) return;
    loadAdminData(passkey.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem('mrnews_admin_key');
    setAuthenticated(false);
    setPasskey('');
  };

  const triggerDispatch = async (emailOverride?: string) => {
    setDispatchLoading(true);
    setDispatchResult(null);
    try {
      const payload: any = {
        dryRun: dryRun,
      };
      if (emailOverride) {
        payload.targetEmail = emailOverride;
        payload.dryRun = false;
      }

      const res = await fetch('/api/send-briefing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': passkey,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setDispatchResult(data);
      // Reload admin data after live dispatch
      loadAdminData(passkey);
    } catch (err: unknown) {
      setDispatchResult({ error: 'Dispatch failed to execute' });
    } finally {
      setDispatchLoading(false);
    }
  };

  const deleteSubscriber = async (email: string) => {
    if (!confirm(`Are you sure you want to remove ${email}?`)) return;
    try {
      const res = await fetch(`/api/admin?email=${encodeURIComponent(email)}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': passkey },
      });
      if (res.ok) {
        loadAdminData(passkey);
      }
    } catch (err) {
      alert('Failed to delete subscriber');
    }
  };

  // ── PASSKEY LOGIN MODAL ──────────────────────────────────────
  if (!authenticated) {
    return (
      <div className="admin-login-wrap">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <span className="admin-tag">SECURE COMMAND CENTER</span>
            <h1>MR <span>NEWS</span> DESK</h1>
            <p>Enter your executive authorization passkey to access operational controls.</p>
          </div>

          <form onSubmit={handleLogin} className="admin-login-form">
            <input
              type="password"
              placeholder="Admin Passkey"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              className="admin-input"
              autoFocus
              required
            />
            {authError && <div className="admin-error">{authError}</div>}
            <button type="submit" className="admin-btn-primary" disabled={loading}>
              {loading ? 'Authenticating...' : 'Unlock Desk →'}
            </button>
          </form>

          <div className="admin-login-footer">
            <Link href="/" className="admin-back-link">← Return to Front Page</Link>
          </div>
        </div>

        <style jsx>{`
          .admin-login-wrap {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            background: #0d0d0f;
            color: #ededed;
            font-family: ui-monospace, 'SF Mono', Menlo, monospace;
          }
          .admin-login-card {
            width: 100%;
            max-width: 440px;
            background: #141417;
            border: 1px solid #27272a;
            padding: 36px 32px;
            border-radius: 8px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
          }
          .admin-tag {
            display: inline-block;
            font-size: 0.65rem;
            color: #ff6500;
            letter-spacing: 0.15em;
            margin-bottom: 8px;
            border: 1px solid rgba(255, 101, 0, 0.3);
            padding: 2px 8px;
            border-radius: 3px;
          }
          .admin-login-header h1 {
            font-size: 1.5rem;
            margin: 6px 0 10px;
            color: #fff;
          }
          .admin-login-header h1 span { color: #ff6500; }
          .admin-login-header p {
            font-size: 0.8rem;
            color: #a1a1aa;
            line-height: 1.5;
            margin-bottom: 24px;
          }
          .admin-login-form {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }
          .admin-input {
            width: 100%;
            height: 46px;
            background: #09090b;
            border: 1px solid #3f3f46;
            color: #fff;
            padding: 0 14px;
            font-size: 0.9rem;
            font-family: inherit;
            border-radius: 4px;
          }
          .admin-input:focus {
            border-color: #ff6500;
            outline: none;
            box-shadow: 0 0 0 2px rgba(255, 101, 0, 0.2);
          }
          .admin-error {
            color: #ef4444;
            font-size: 0.75rem;
          }
          .admin-btn-primary {
            height: 46px;
            background: #ff6500;
            color: #000;
            border: none;
            font-weight: 700;
            font-size: 0.85rem;
            letter-spacing: 0.05em;
            cursor: pointer;
            border-radius: 4px;
            transition: background 0.15s ease;
          }
          .admin-btn-primary:hover { background: #e05500; }
          .admin-login-footer {
            margin-top: 24px;
            text-align: center;
          }
          .admin-back-link {
            color: #71717a;
            font-size: 0.75rem;
            text-decoration: none;
          }
          .admin-back-link:hover { color: #ff6500; }
        `}</style>
      </div>
    );
  }

  // ── MAIN COMMAND CENTER DESK ─────────────────────────────────
  return (
    <div className="admin-container">
      {/* Top Navbar */}
      <header className="admin-nav">
        <div className="admin-brand">
          <span className="dot-live" />
          <strong>MR NEWS</strong>
          <span className="badge">COMMAND DESK</span>
        </div>
        <div className="admin-nav-actions">
          <Link href="/" className="nav-btn">View Front Page ↗</Link>
          <button onClick={handleLogout} className="nav-btn nav-btn-danger">Lock Desk</button>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="admin-main">
        {/* System Bar */}
        <section className="status-ribbon">
          <div className="ribbon-item">
            <span className="label">Database</span>
            <span className="val success">● Supabase Live</span>
          </div>
          <div className="ribbon-item">
            <span className="label">SMTP Gateway</span>
            <span className="val success">● {system?.smtpUser}</span>
          </div>
          <div className="ribbon-item">
            <span className="label">AI Model</span>
            <span className="val highlight">● Gemini 2.5 Flash</span>
          </div>
          <div className="ribbon-item">
            <span className="label">Schedule</span>
            <span className="val">● 22:00 Nightly</span>
          </div>
        </section>

        {/* 4 Metrics Cards */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-label">ACTIVE SUBSCRIBERS</div>
            <div className="metric-val highlight">{metrics?.activeSubscribers ?? 0}</div>
            <div className="metric-sub">Receiving nightly 22:00 dispatch</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">TOTAL ALL-TIME</div>
            <div className="metric-val">{metrics?.totalSubscribers ?? 0}</div>
            <div className="metric-sub">Registered accounts in database</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">UNSUBSCRIBED</div>
            <div className="metric-val" style={{ color: '#71717a' }}>{metrics?.unsubscribed ?? 0}</div>
            <div className="metric-sub">Opted-out readers</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">ISSUES COMPILED</div>
            <div className="metric-val">{metrics?.totalBriefingsSent ?? 0}</div>
            <div className="metric-sub">Historical editions stored</div>
          </div>
        </div>

        {/* Operational Dispatch Controller */}
        <section className="panel dispatch-panel">
          <div className="panel-header">
            <h3>⚡ PIPELINE DISPATCH CONTROLLER</h3>
            <span className="panel-badge">Manual Override</span>
          </div>
          <div className="panel-body dispatch-controls">
            <div className="dispatch-left">
              <p className="desc">
                Trigger the live pipeline: fetch feeds, deduplicate stories, synthesize with Gemini 2.5 Flash, and dispatch via Gmail SMTP.
              </p>

              <div className="dry-run-toggle">
                <label>
                  <input
                    type="checkbox"
                    checked={dryRun}
                    onChange={(e) => setDryRun(e.target.checked)}
                  />
                  <span>Dry Run Mode (Preview synthesis without dispatching emails)</span>
                </label>
              </div>

              <div className="action-buttons">
                <button
                  className="btn-trigger"
                  onClick={() => triggerDispatch()}
                  disabled={dispatchLoading}
                >
                  {dispatchLoading ? 'Executing Pipeline...' : dryRun ? 'Run Synthesis Preview (Dry Run)' : '🚨 DISPATCH TO ALL ACTIVE SUBSCRIBERS'}
                </button>
              </div>
            </div>

            <div className="dispatch-right">
              <h4>Direct Test Dispatch</h4>
              <p className="sub-desc">Send an immediate real briefing to a single email address for testing.</p>
              <div className="test-email-box">
                <input
                  type="email"
                  placeholder="test@yourcompany.com"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="test-input"
                />
                <button
                  className="btn-test"
                  onClick={() => {
                    if (!testEmail) return alert('Please enter an email');
                    triggerDispatch(testEmail);
                  }}
                  disabled={dispatchLoading}
                >
                  Send Test Briefing
                </button>
              </div>
            </div>
          </div>

          {/* Live Output Log */}
          {dispatchResult && (
            <div className="dispatch-output">
              <div className="output-header">Execution Result:</div>
              <pre>{JSON.stringify(dispatchResult, null, 2)}</pre>
            </div>
          )}
        </section>

        {/* Subscribers Table */}
        <section className="panel">
          <div className="panel-header">
            <h3>📋 SUBSCRIBER REGISTRY ({subscribers.length})</h3>
            <button className="refresh-btn" onClick={() => loadAdminData(passkey)}>Refresh Data</button>
          </div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Subscriber Email</th>
                  <th>Name</th>
                  <th>Delivery</th>
                  <th>Beats / Topics</th>
                  <th>Status</th>
                  <th>Joined Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="empty-row">No subscribers registered yet.</td>
                  </tr>
                ) : (
                  subscribers.map((sub) => (
                    <tr key={sub.id}>
                      <td className="font-mono text-bold">{sub.email}</td>
                      <td>{sub.name || '—'}</td>
                      <td><span className="hour-badge">22:00</span></td>
                      <td>
                        <div className="topic-tags">
                          {sub.topics?.map((t) => (
                            <span key={t} className="tag-chip">{t}</span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <span className={`status-pill ${sub.status}`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="text-muted">
                        {sub.created_at ? new Date(sub.created_at).toLocaleDateString() : '—'}
                      </td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => deleteSubscriber(sub.email)}
                          title="Delete subscriber"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Styled JSX */}
      <style jsx>{`
        .admin-container {
          min-height: 100vh;
          background: #09090b;
          color: #ededed;
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          padding-bottom: 60px;
        }
        .admin-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 28px;
          border-bottom: 1px solid #27272a;
          background: #101012;
        }
        .admin-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.1rem;
          color: #fff;
        }
        .dot-live {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 8px #22c55e;
        }
        .badge {
          background: rgba(255, 101, 0, 0.15);
          color: #ff6500;
          font-size: 0.65rem;
          padding: 2px 8px;
          border: 1px solid rgba(255, 101, 0, 0.3);
          border-radius: 3px;
        }
        .admin-nav-actions {
          display: flex;
          gap: 12px;
        }
        .nav-btn {
          font-size: 0.75rem;
          padding: 6px 12px;
          background: #18181b;
          border: 1px solid #3f3f46;
          color: #ededed;
          border-radius: 4px;
          text-decoration: none;
          cursor: pointer;
        }
        .nav-btn:hover { border-color: #ff6500; }
        .nav-btn-danger:hover { border-color: #ef4444; color: #ef4444; }

        .admin-main {
          max-width: 1200px;
          margin: 28px auto;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .status-ribbon {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          padding: 14px 20px;
          background: #141417;
          border: 1px solid #27272a;
          border-radius: 6px;
        }
        .ribbon-item {
          display: flex;
          gap: 8px;
          font-size: 0.78rem;
        }
        .ribbon-item .label { color: #71717a; }
        .ribbon-item .val.success { color: #22c55e; font-weight: bold; }
        .ribbon-item .val.highlight { color: #ff6500; font-weight: bold; }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }
        .metric-card {
          background: #141417;
          border: 1px solid #27272a;
          padding: 20px;
          border-radius: 6px;
        }
        .metric-label {
          font-size: 0.68rem;
          color: #71717a;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }
        .metric-val {
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }
        .metric-val.highlight { color: #ff6500; }
        .metric-sub {
          font-size: 0.72rem;
          color: #a1a1aa;
          margin-top: 8px;
        }

        .panel {
          background: #141417;
          border: 1px solid #27272a;
          border-radius: 6px;
          overflow: hidden;
        }
        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #27272a;
          background: #18181b;
        }
        .panel-header h3 {
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          margin: 0;
          color: #fff;
        }
        .panel-badge {
          font-size: 0.65rem;
          color: #ff6500;
          border: 1px solid rgba(255, 101, 0, 0.3);
          padding: 2px 6px;
          border-radius: 3px;
        }
        .refresh-btn {
          background: transparent;
          border: 1px solid #3f3f46;
          color: #a1a1aa;
          font-size: 0.72rem;
          padding: 4px 10px;
          border-radius: 3px;
          cursor: pointer;
        }
        .refresh-btn:hover { color: #fff; border-color: #ff6500; }

        .dispatch-controls {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          padding: 24px;
        }
        @media (max-width: 768px) {
          .dispatch-controls { grid-template-columns: 1fr; }
        }
        .dispatch-left p.desc {
          font-size: 0.8rem;
          color: #a1a1aa;
          line-height: 1.6;
          margin-bottom: 16px;
        }
        .dry-run-toggle label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          color: #e4e4e7;
          cursor: pointer;
          margin-bottom: 18px;
        }
        .btn-trigger {
          padding: 12px 20px;
          background: #ff6500;
          color: #000;
          font-weight: 700;
          font-size: 0.82rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          letter-spacing: 0.05em;
        }
        .btn-trigger:hover { background: #e05500; }

        .dispatch-right h4 {
          font-size: 0.85rem;
          margin: 0 0 6px;
        }
        .sub-desc {
          font-size: 0.75rem;
          color: #71717a;
          margin-bottom: 14px;
        }
        .test-email-box {
          display: flex;
          gap: 8px;
        }
        .test-input {
          flex: 1;
          height: 40px;
          background: #09090b;
          border: 1px solid #3f3f46;
          color: #fff;
          padding: 0 12px;
          font-family: inherit;
          font-size: 0.8rem;
          border-radius: 4px;
        }
        .btn-test {
          height: 40px;
          padding: 0 16px;
          background: #27272a;
          color: #fff;
          border: 1px solid #3f3f46;
          font-size: 0.78rem;
          border-radius: 4px;
          cursor: pointer;
          font-family: inherit;
        }
        .btn-test:hover { border-color: #ff6500; }

        .dispatch-output {
          padding: 16px 24px;
          background: #09090b;
          border-top: 1px solid #27272a;
        }
        .output-header {
          font-size: 0.72rem;
          color: #22c55e;
          margin-bottom: 6px;
        }
        .dispatch-output pre {
          font-size: 0.72rem;
          color: #a1a1aa;
          overflow-x: auto;
          max-height: 250px;
        }

        .table-responsive { overflow-x: auto; }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.78rem;
          text-align: left;
        }
        .admin-table th {
          background: #18181b;
          padding: 12px 16px;
          color: #71717a;
          font-weight: 500;
          border-bottom: 1px solid #27272a;
        }
        .admin-table td {
          padding: 14px 16px;
          border-bottom: 1px solid #1f1f23;
        }
        .font-mono { font-family: inherit; }
        .text-bold { font-weight: 600; color: #fff; }
        .text-muted { color: #71717a; }
        .hour-badge {
          background: rgba(255, 101, 0, 0.12);
          color: #ff6500;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 0.7rem;
        }
        .topic-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .tag-chip {
          background: #27272a;
          color: #d4d4d8;
          font-size: 0.65rem;
          padding: 2px 6px;
          border-radius: 2px;
        }
        .status-pill {
          padding: 2px 8px;
          border-radius: 999px;
          font-size: 0.68rem;
          font-weight: 600;
          text-transform: capitalize;
        }
        .status-pill.active {
          background: rgba(34, 197, 94, 0.15);
          color: #22c55e;
        }
        .status-pill.unsubscribed {
          background: rgba(239, 68, 68, 0.15);
          color: #ef4444;
        }
        .btn-delete {
          background: transparent;
          border: 1px solid #3f3f46;
          color: #ef4444;
          font-size: 0.68rem;
          padding: 3px 8px;
          border-radius: 3px;
          cursor: pointer;
        }
        .btn-delete:hover {
          background: #ef4444;
          color: #fff;
        }
        .empty-row {
          text-align: center;
          padding: 30px;
          color: #71717a;
        }
      `}</style>
    </div>
  );
}
