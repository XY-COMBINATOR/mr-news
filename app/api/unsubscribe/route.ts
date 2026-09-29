import { NextResponse } from 'next/server';
import { verifyUnsubscribeToken } from '@/lib/crypto';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  if (!email || !token) {
    return new NextResponse('Invalid unsubscribe link: Email and token required.', { status: 400 });
  }

  // Cryptographic Security Check: Verify HMAC-SHA256 signature
  const isValidToken = verifyUnsubscribeToken(email, token);
  if (!isValidToken) {
    return new NextResponse('Unauthorized: Invalid or tampered unsubscribe token.', { status: 403 });
  }

  if (!supabaseAdmin) {
    return new NextResponse('Database not configured.', { status: 503 });
  }

  try {
    const { error } = await supabaseAdmin
      .from('subscribers')
      .update({ status: 'unsubscribed', updated_at: new Date().toISOString() })
      .eq('email', email.trim().toLowerCase());

    if (error) {
      console.error('[UNSUBSCRIBE_API] Error updating subscriber in database:', error);
      return new NextResponse('Failed to update subscription status.', { status: 500 });
    }

    const safeEmail = email.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m] || m));

    // Return clean confirmation HTML page styled to match MR NEWS dark aesthetic
    const htmlResponse = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unsubscribed | MR NEWS</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #000000;
      color: #ededed;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .card {
      width: 100%;
      max-width: 460px;
      background: #0a0a0a;
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 40px 32px;
      text-align: center;
    }
    .brand {
      font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-bottom: 24px;
      color: #ededed;
    }
    .brand span { color: #ff4500; }
    h1 {
      font-size: 1.35rem;
      font-weight: 600;
      letter-spacing: -0.01em;
      margin-bottom: 12px;
      color: #ededed;
    }
    p {
      font-size: 0.9rem;
      line-height: 1.6;
      color: #888888;
      margin-bottom: 8px;
    }
    .email-chip {
      display: inline-block;
      font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
      font-size: 0.8rem;
      color: #ff4500;
      background: rgba(255, 69, 0, 0.08);
      border: 1px solid rgba(255, 69, 0, 0.2);
      padding: 4px 12px;
      margin: 12px 0 24px;
    }
    .return-link {
      display: inline-block;
      font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
      font-size: 0.8rem;
      letter-spacing: 0.05em;
      color: #ededed;
      text-decoration: none;
      padding: 10px 20px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: #111111;
      transition: border-color 0.15s ease, background 0.15s ease;
    }
    .return-link:hover {
      border-color: #ff4500;
      background: #161616;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="brand">MR<span>.</span>NEWS</div>
    <h1>Subscription Cancelled</h1>
    <p>You have been unsubscribed from the nightly 22:00 intelligence briefing.</p>
    <div class="email-chip">${safeEmail}</div>
    <div>
      <a href="/" class="return-link">Return to Home</a>
    </div>
  </div>
</body>
</html>`;

    return new NextResponse(htmlResponse, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (err) {
    console.error('[UNSUBSCRIBE_API] Server Error:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
