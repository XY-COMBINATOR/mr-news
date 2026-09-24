import { NextResponse } from 'next/server';
import { fetchRawArticles } from '@/lib/rss';
import { deduplicateArticles, markArticlesSeen } from '@/lib/dedup';
import { synthesizeBriefingWithGemini } from '@/lib/gemini';
import { sendBriefingEmail } from '@/lib/email';
import { supabaseAdmin } from '@/lib/supabase';
import { isAuthorizedAdmin } from '@/lib/auth-admin';

export async function POST(req: Request) {
  // Authorization Check — allows only mrnewsbrief@gmail.com session, admin key, or Vercel cron
  const auth = await isAuthorizedAdmin(req);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.reason || 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { targetEmail, forceAll = false, dryRun = false } = body;
    const currentHour = new Date().getUTCHours();

    let activeSubs: Array<{ email: string; name?: string }> = [];

    if (targetEmail && typeof targetEmail === 'string') {
      activeSubs = [{ email: targetEmail.trim().toLowerCase(), name: 'Admin Test' }];
    } else if (forceAll) {
      // 1a. Fetch ALL active subscribers regardless of delivery hour
      const { data: subscribers, error: subError } = await supabaseAdmin
        .from('subscribers')
        .select('*')
        .eq('status', 'active');

      if (subError) {
        console.error('[BRIEFING_PIPELINE] Error fetching all subscribers:', subError);
      }
      activeSubs = subscribers || [];
    } else {
      // 1b. Fetch active subscribers scheduled for this UTC hour
      const { data: subscribers, error: subError } = await supabaseAdmin
        .from('subscribers')
        .select('*')
        .eq('delivery_hour', currentHour)
        .eq('status', 'active');

      if (subError) {
        console.error('[BRIEFING_PIPELINE] Error fetching hourly subscribers:', subError);
      }
      activeSubs = subscribers || [];
    }

    // Abort early if no target subscribers
    if (activeSubs.length === 0) {
      return NextResponse.json({
        message: `No active subscribers found for this dispatch (Hour: ${currentHour} UTC). Pipeline aborted safely.`,
        subscriberCount: 0,
      });
    }

    // 2. Fetch raw articles from RSS feeds
    const rawArticles = await fetchRawArticles();

    // 3. Deduplicate (Jaccard similarity + URL hash check against database)
    const uniqueArticles = await deduplicateArticles(rawArticles);

    // 4. Synthesize top 7 stories using Google Gemini
    const synthesizedStories = await synthesizeBriefingWithGemini(uniqueArticles);

    if (dryRun) {
      return NextResponse.json({
        success: true,
        dryRun: true,
        targetSubscribers: activeSubs.length,
        storiesCount: synthesizedStories.length,
        stories: synthesizedStories,
      });
    }

    // 5. Persist briefing issue and seen articles into Supabase (if not a single test email)
    if (!targetEmail) {
      const todayStr = new Date().toISOString().split('T')[0];
      await supabaseAdmin.from('briefings').insert({
        delivery_date: todayStr,
        delivery_hour: currentHour,
        content: { stories: synthesizedStories },
      });

      await markArticlesSeen(
        synthesizedStories.map((s) => ({ link: s.url, title: s.headline, source: s.source }))
      );
    }

    // 6. Send email briefings via Gmail SMTP (Nodemailer)
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
// MR NEWS — Executive Morning Intelligence Platform
