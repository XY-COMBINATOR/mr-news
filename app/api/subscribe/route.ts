import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, deliveryHour, topics } = body;

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    const hour = parseInt(deliveryHour, 10);
    const validHour = isNaN(hour) ? 6 : Math.max(0, Math.min(23, hour));
    const validTopics = Array.isArray(topics) && topics.length > 0 ? topics : ['policy', 'labs', 'chips', 'funding'];

    const { data, error } = await supabaseAdmin
      .from('subscribers')
      .upsert(
        {
          email: email.trim().toLowerCase(),
          name: typeof name === 'string' ? name.trim() : '',
          delivery_hour: validHour,
          topics: validTopics,
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

    // Dispatch welcome confirmation email non-blockingly
    try {
      await sendWelcomeEmail({
        toEmail: email.trim().toLowerCase(),
        recipientName: typeof name === 'string' ? name.trim() : undefined,
        deliveryHour: validHour,
      });
    } catch (welcomeErr) {
      console.warn('[SUBSCRIBE_API] Welcome email dispatch non-blocking notice:', welcomeErr);
    }

    return NextResponse.json({ success: true, subscriber: data });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
    console.error('[SUBSCRIBE_API] Unexpected error:', err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
// MR NEWS — Executive Morning Intelligence Platform
