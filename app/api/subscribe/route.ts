import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendWelcomeEmail } from '@/lib/email';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database not configured.' }, { status: 503 });
  }

  // 1. IP-based Rate Limiting (Max 5 subscribe requests per 10 mins per IP)
  const clientIp =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    '127.0.0.1';

  const rateCheck = checkRateLimit(clientIp, 5, 10 * 60 * 1000);
  if (!rateCheck.allowed) {
    const minutesLeft = Math.ceil(rateCheck.resetMs / (60 * 1000));
    return NextResponse.json(
      { error: `Too many requests from your IP. Please try again in ${minutesLeft} minute(s).` },
      { status: 429 }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { email, name, deliveryHour, topics, botTrap } = body;

    // 2. Honeypot Bot Trap: Automated bots fill hidden inputs
    if (botTrap && typeof botTrap === 'string' && botTrap.trim().length > 0) {
      console.warn(`[SECURITY] Bot detected and silently dropped (IP: ${clientIp})`);
      // Return fake success so the bot believes it succeeded without performing any actions
      return NextResponse.json({ success: true, message: 'Subscription processed' });
    }

    // 3. Email Sanitization & Length Limits
    if (
      !email ||
      typeof email !== 'string' ||
      email.length > 100 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
    ) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 4. Sanitize Name (limit 50 chars, strip potential HTML/script tags)
    let cleanName = typeof name === 'string' ? name.trim().slice(0, 50) : '';
    cleanName = cleanName.replace(/[<>]/g, '');
    if (!cleanName) cleanName = cleanEmail.split('@')[0];

    const hour = parseInt(deliveryHour, 10);
    const validHour = isNaN(hour) ? 22 : Math.max(0, Math.min(23, hour));

    // Whitelist valid topics only
    const allowedTopics = ['policy', 'labs', 'chips', 'funding', 'safety', 'science', 'culture'];
    const validTopics = Array.isArray(topics)
      ? topics.filter((t): t is string => typeof t === 'string' && allowedTopics.includes(t))
      : ['policy', 'labs', 'chips', 'funding'];

    // 5. Anti-Bombing: Check if subscriber is ALREADY active in database
    const { data: existingSub } = await supabaseAdmin
      .from('subscribers')
      .select('id, status')
      .eq('email', cleanEmail)
      .maybeSingle();

    const isNewSubscriber = !existingSub || existingSub.status !== 'active';

    // 6. Upsert into Supabase
    const { data, error } = await supabaseAdmin
      .from('subscribers')
      .upsert(
        {
          email: cleanEmail,
          name: cleanName,
          delivery_hour: validHour,
          topics: validTopics.length > 0 ? validTopics : ['policy', 'labs', 'chips', 'funding'],
          status: 'active',
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'email' }
      )
      .select()
      .single();

    if (error) {
      console.error('[SUBSCRIBE_API] Supabase error:', error);
      return NextResponse.json({ error: 'Failed to process subscription. Please try again later.' }, { status: 500 });
    }

    // 7. Send Welcome Email ONLY to brand new subscribers
    // If the email is already subscribed, do NOT spam them with another welcome email
    if (isNewSubscriber) {
      try {
        await sendWelcomeEmail({ toEmail: cleanEmail, recipientName: cleanName });
      } catch (emailErr) {
        console.error('[SUBSCRIBE_API] Welcome email error:', emailErr);
      }
    }

    return NextResponse.json({ success: true, subscriber: data });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
    console.error('[SUBSCRIBE_API] Unexpected error:', err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
