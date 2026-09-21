import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, deliveryHour, topics } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const hour = parseInt(deliveryHour, 10);
    const validHour = isNaN(hour) ? 6 : Math.max(0, Math.min(23, hour));
    const validTopics = Array.isArray(topics) && topics.length > 0 ? topics : ['policy', 'labs', 'chips', 'funding'];

    const { data, error } = await supabaseAdmin
      .from('subscribers')
      .upsert(
        {
          email: email.trim().toLowerCase(),
          name: name || '',
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
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, subscriber: data });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
    console.error('[SUBSCRIBE_API] Unexpected error:', err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
