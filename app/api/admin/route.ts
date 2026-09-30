import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { timingSafeEqualString } from '@/lib/crypto';

const ADMIN_SECRET = process.env.ADMIN_SECRET || '';

// Brute-force Lockout Tracker: IP -> { attempts, lockedUntil }
interface FailedLoginRecord {
  attempts: number;
  lockedUntil: number;
}
const failedAttemptsMap = new Map<string, FailedLoginRecord>();

function getClientIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    '127.0.0.1'
  );
}

function verifyAdminWithSecurity(req: Request): { authorized: boolean; locked?: boolean; minutesRemaining?: number } {
  const ip = getClientIp(req);
  const now = Date.now();
  const record = failedAttemptsMap.get(ip);

  // 1. Fail-closed: block if secret is missing
  if (!ADMIN_SECRET) {
    console.error('[SECURITY ALERT] ADMIN_SECRET is not configured on server.');
    return { authorized: false };
  }

  const adminKey = req.headers.get('x-admin-key') || '';
  const authHeader = req.headers.get('authorization') || '';
  const bearerKey = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';

  // 2. Cryptographic timing-safe comparison
  const isValid =
    (adminKey && timingSafeEqualString(adminKey, ADMIN_SECRET)) ||
    (bearerKey && timingSafeEqualString(bearerKey, ADMIN_SECRET));

  // If credentials are valid, clear any lockouts and grant access immediately
  if (isValid) {
    failedAttemptsMap.delete(ip);
    return { authorized: true };
  }

  // 3. If invalid, check if IP is currently locked out
  if (record && record.lockedUntil > now) {
    const minutesRemaining = Math.ceil((record.lockedUntil - now) / 60000);
    return { authorized: false, locked: true, minutesRemaining };
  }

  // 4. Increment failed attempts
  const currentAttempts = (record ? record.attempts : 0) + 1;
  const maxAllowedAttempts = 5;

  if (currentAttempts >= maxAllowedAttempts) {
    const lockoutDurationMs = 15 * 60 * 1000; // 15 mins lock
    failedAttemptsMap.set(ip, {
      attempts: currentAttempts,
      lockedUntil: now + lockoutDurationMs,
    });
    console.warn(`[SECURITY ALERT] IP ${ip} locked out for 15 minutes due to repeated invalid passkey attempts.`);
    return { authorized: false, locked: true, minutesRemaining: 15 };
  }

  failedAttemptsMap.set(ip, {
    attempts: currentAttempts,
    lockedUntil: 0,
  });

  console.warn(`[SECURITY] Invalid passkey attempt from IP ${ip} (${currentAttempts}/${maxAllowedAttempts})`);
  return { authorized: false };
}

export async function GET(req: Request) {
  const check = verifyAdminWithSecurity(req);
  if (!check.authorized) {
    if (check.locked) {
      return NextResponse.json(
        { error: `Access locked due to multiple failed passkey attempts. Try again in ${check.minutesRemaining} minute(s).` },
        { status: 429 }
      );
    }
    return NextResponse.json({ error: 'Unauthorized: Invalid Admin Passkey' }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  try {
    // 1. Fetch subscribers count & list
    const { data: subscribers, error: subError } = await supabaseAdmin
      .from('subscribers')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (subError) {
      console.error('[ADMIN_API] Error fetching subscribers:', subError);
    }

    // 2. Fetch briefings history
    const { data: briefings, error: briefError } = await supabaseAdmin
      .from('briefings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (briefError) {
      console.error('[ADMIN_API] Error fetching briefings:', briefError);
    }

    // Calculate metrics
    const allSubs = subscribers || [];
    const activeCount = allSubs.filter((s) => s.status === 'active').length;
    const unsubCount = allSubs.filter((s) => s.status === 'unsubscribed').length;

    return NextResponse.json({
      success: true,
      metrics: {
        totalSubscribers: allSubs.length,
        activeSubscribers: activeCount,
        unsubscribed: unsubCount,
        totalBriefingsSent: briefings ? briefings.length : 0,
      },
      system: {
        smtpConfigured: Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS),
        smtpUser: process.env.EMAIL_USER || 'Not set',
        geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
        geminiModel: 'gemini-2.5-flash',
        supabaseConfigured: true,
        deliverySchedule: '22:00 Nightly (Fixed)',
      },
      subscribers: allSubs,
      briefings: briefings || [],
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const check = verifyAdminWithSecurity(req);
  if (!check.authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('subscribers')
      .delete()
      .eq('email', email.trim().toLowerCase());

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: `Subscriber ${email} deleted.` });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
