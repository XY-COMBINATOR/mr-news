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

    // Return clean vintage confirmation HTML page
    const htmlResponse = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Unsubscribed — MR NEWS</title>
  <style>
    body { background: #b8a880; color: #1a1510; font-family: 'Times New Roman', serif; text-align: center; padding: 60px 20px; }
    .card { max-width: 500px; margin: 0 auto; background: #e8ddc2; border: 2px solid #1a1510; padding: 40px; box-shadow: 6px 6px 0 0 #1a1510; }
    h1 { font-size: 28px; text-transform: uppercase; margin-bottom: 12px; }
    p { font-size: 16px; line-height: 1.5; color: #4a3f30; }
    a { color: #7a2418; text-decoration: underline; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <h1>MR NEWS</h1>
    <p>You have been successfully unsubscribed from daily briefings.</p>
    <p>Email: <strong>${safeEmail}</strong></p>
    <p style="margin-top: 24px;"><a href="/">Return to Front Page</a></p>
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
// MR NEWS — Executive Morning Intelligence Platform
