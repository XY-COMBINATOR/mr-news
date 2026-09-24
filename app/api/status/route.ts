import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const CRON_SECRET = process.env.CRON_SECRET || '';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let dbConnected = false;
  let activeSubscribersCount = 0;

  try {
    const { count, error } = await supabaseAdmin
      .from('subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    if (!error) {
      dbConnected = true;
      activeSubscribersCount = count || 0;
    }
  } catch (err) {
    console.error('[STATUS_API] Supabase connection test failed:', err);
  }

  return NextResponse.json({
    status: 'healthy',
    system: 'MR NEWS Pipeline Engine',
    timestamp: new Date().toISOString(),
    environment: {
      hasSupabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      hasSupabaseKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      hasResendApiKey: Boolean(process.env.RESEND_API_KEY),
      hasGeminiApiKey: Boolean(process.env.GEMINI_API_KEY),
      hasCronSecret: Boolean(process.env.CRON_SECRET),
    },
    database: {
      connected: dbConnected,
      activeSubscribers: activeSubscribersCount,
    },
  });
}
// MR NEWS — Executive Morning Intelligence Platform
