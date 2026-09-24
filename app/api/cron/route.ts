import { NextResponse } from 'next/server';

const CRON_SECRET = process.env.CRON_SECRET || '';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function GET(req: Request) {
  // Security: Verify Bearer secret or Vercel Cron header
  const authHeader = req.headers.get('authorization');
  const isVercelCron = req.headers.get('user-agent')?.includes('vercel-cron');

  if (process.env.NODE_ENV === 'production' || CRON_SECRET) {
    if (!CRON_SECRET || (authHeader !== `Bearer ${CRON_SECRET}` && !isVercelCron)) {
      return NextResponse.json({ error: 'Unauthorized cron request' }, { status: 401 });
    }
  }

  try {
    // Trigger internal send-briefing pipeline
    const briefingRes = await fetch(`${APP_URL}/api/send-briefing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CRON_SECRET}`,
      },
    });

    const data = await briefingRes.json();
    return NextResponse.json({ cronExecuted: true, timestamp: new Date().toISOString(), result: data });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Cron execution failed';
    console.error('[CRON_API] Execution Error:', err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
// MR NEWS — Executive Morning Intelligence Platform
