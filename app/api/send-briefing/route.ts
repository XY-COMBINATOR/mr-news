import { NextResponse } from 'next/server';
import { fetchRawArticles } from '@/lib/rss';
import { deduplicateArticles, markArticlesSeen } from '@/lib/dedup';
import { synthesizeBriefingWithGemini } from '@/lib/gemini';
import { sendBriefingEmail } from '@/lib/email';
import { supabaseAdmin } from '@/lib/supabase';

const CRON_SECRET = process.env.CRON_SECRET || '';
const ADMIN_SECRET = process.env.ADMIN_SECRET || '';

export async function POST(req: Request) {
  // Authorization Check: Supports Bearer CRON_SECRET or x-admin-key
  const authHeader = req.headers.get('authorization');
  const adminKey = req.headers.get('x-admin-key');

  const isAuthorized =
    !CRON_SECRET ||
    authHeader === `Bearer ${CRON_SECRET}` ||
    (ADMIN_SECRET && adminKey === ADMIN_SECRET);

  if ((process.env.NODE_ENV === 'production' || CRON_SECRET) && !isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Database not configured.' }, { status: 503 });
    }

    const body = await req.json().catch(() => ({}));
    const { targetEmail, dryRun = false, force = false } = body;

    let activeSubs: Array<{ email: string; name?: string }> = [];

    if (targetEmail && typeof targetEmail === 'string') {
      activeSubs = [{ email: targetEmail.trim().toLowerCase(), name: 'Test Reader' }];
    } else {
      // Fixed 22:00 Nightly Dispatch: fetch all active subscribers
      const { data: subscribers, error: subError } = await supabaseAdmin
        .from('subscribers')
        .select('*')
        .eq('status', 'active');

      if (subError) {
        console.error('[BRIEFING_PIPELINE] Error fetching subscribers:', subError);
      }
      activeSubs = subscribers || [];
    }

    if (activeSubs.length === 0 && !dryRun) {
      return NextResponse.json({
        message: 'No active subscribers found. Pipeline completed without dispatch.',
        subscriberCount: 0,
      });
    }

    // 1. Fetch raw articles from RSS feeds
    console.log('[BRIEFING_PIPELINE] Fetching RSS articles...');
    const rawArticles = await fetchRawArticles();

    // 2. Deduplicate
    const uniqueArticles = await deduplicateArticles(rawArticles);
    console.log(`[BRIEFING_PIPELINE] Dedup complete. Found ${uniqueArticles.length} unique articles.`);

    // 3. Synthesize top 7 stories
    const synthesizedStories = await synthesizeBriefingWithGemini(uniqueArticles);
    console.log(`[BRIEFING_PIPELINE] Synthesized ${synthesizedStories.length} stories.`);

    // If dry run, return without persisting or sending emails
    if (dryRun) {
      return NextResponse.json({
        success: true,
        dryRun: true,
        subscriberCount: activeSubs.length,
        stories: synthesizedStories,
      });
    }

    // 4. Persist briefing issue and seen articles into Supabase
    const todayStr = new Date().toISOString().split('T')[0];
    await supabaseAdmin.from('briefings').insert({
      delivery_date: todayStr,
      delivery_hour: 22,
      content: { stories: synthesizedStories },
    });

    await markArticlesSeen(
      synthesizedStories.map((s) => ({ link: s.url, title: s.headline, source: s.source }))
    );

    // 5. Send email briefings via Gmail SMTP (Nodemailer)
    console.log(`[BRIEFING_PIPELINE] Sending emails to ${activeSubs.length} subscriber(s)...`);
    const emailResults = await Promise.allSettled(
      activeSubs.map((sub) =>
        sendBriefingEmail({
          toEmail: sub.email,
          recipientName: sub.name || 'Reader',
          stories: synthesizedStories,
        })
      )
    );

    const successCount = emailResults.filter((r) => r.status === 'fulfilled' && (r.value as any)?.success).length;

    return NextResponse.json({
      success: true,
      hour: 22,
      subscriberCount: activeSubs.length,
      emailsSent: successCount,
      storiesCount: synthesizedStories.length,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal Pipeline Error';
    console.error('[BRIEFING_PIPELINE] Pipeline Execution Error:', err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Support GET for Vercel Cron and test triggers
export async function GET(req: Request) {
  return POST(req);
}

