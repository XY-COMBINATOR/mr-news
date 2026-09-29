import { NextResponse } from 'next/server';
import { fetchRawArticles } from '@/lib/rss';
import { deduplicateArticles, markArticlesSeen } from '@/lib/dedup';
import { synthesizeBriefingWithGemini } from '@/lib/gemini';
import { sendBriefingEmail } from '@/lib/email';
import { supabaseAdmin } from '@/lib/supabase';

const CRON_SECRET = process.env.CRON_SECRET || '';

export async function POST(req: Request) {
  // Authorization Check
  const authHeader = req.headers.get('authorization');
  if (process.env.NODE_ENV === 'production' || CRON_SECRET) {
    if (!CRON_SECRET || authHeader !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Database not configured.' }, { status: 503 });
    }

    const currentHour = new Date().getUTCHours();

    // 1. Fetch active subscribers scheduled for this UTC hour
    const { data: subscribers, error: subError } = await supabaseAdmin
      .from('subscribers')
      .select('*')
      .eq('delivery_hour', currentHour)
      .eq('status', 'active');

    if (subError) {
      console.error('[BRIEFING_PIPELINE] Error fetching subscribers:', subError);
    }

    const activeSubs = subscribers || [];

    // Cost optimization: if no subscribers are scheduled for this hour, abort early ($0 API cost)
    if (activeSubs.length === 0) {
      return NextResponse.json({
        message: `No active subscribers scheduled for UTC hour ${currentHour}. Pipeline aborted safely.`,
        subscriberCount: 0,
      });
    }

    // 2. Fetch raw articles from RSS feeds
    const rawArticles = await fetchRawArticles();

    // 3. Deduplicate (Jaccard similarity + URL hash check against database)
    const uniqueArticles = await deduplicateArticles(rawArticles);

    // 4. Synthesize top 7 stories using Google Gemini 2.0 Flash
    const synthesizedStories = await synthesizeBriefingWithGemini(uniqueArticles);

    // 5. Persist briefing issue and seen articles into Supabase
    const todayStr = new Date().toISOString().split('T')[0];
    await supabaseAdmin.from('briefings').insert({
      delivery_date: todayStr,
      delivery_hour: currentHour,
      content: { stories: synthesizedStories },
    });

    await markArticlesSeen(
      synthesizedStories.map((s) => ({ link: s.url, title: s.headline, source: s.source }))
    );

    // 6. Send email briefings via Resend
    const emailResults = await Promise.allSettled(
      activeSubs.map((sub) =>
        sendBriefingEmail({
          toEmail: sub.email,
          recipientName: sub.name || 'Reader',
          stories: synthesizedStories,
        })
      )
    );

    const successCount = emailResults.filter((r) => r.status === 'fulfilled').length;

    return NextResponse.json({
      success: true,
      hour: currentHour,
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
