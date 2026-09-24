import { NextResponse } from 'next/server';
import {
  sendWelcomeEmail,
  sendBriefingEmail,
  verifySmtpConnection,
  getEmailConfigStatus,
} from '@/lib/email';
import { getFallbackStories } from '@/lib/gemini';
import { isAuthorizedAdmin } from '@/lib/auth-admin';

export async function GET(req: Request) {
  const auth = await isAuthorizedAdmin(req);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.reason || 'Unauthorized' }, { status: 401 });
  }

  const status = getEmailConfigStatus();
  const connection = status.configured
    ? await verifySmtpConnection()
    : { success: false, message: 'EMAIL_USER or EMAIL_PASS not set in .env.local yet.' };

  return NextResponse.json({
    status,
    connection,
    adminEmail: auth.email,
  });
}

export async function POST(req: Request) {
  const auth = await isAuthorizedAdmin(req);
  if (!auth.authorized) {
    return NextResponse.json({ success: false, error: auth.reason || 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { to, type = 'welcome', recipientName = 'Subscriber', deliveryHour = 6 } = body;

    if (!to || typeof to !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid destination email address (e.g. yourname@gmail.com).' },
        { status: 400 }
      );
    }

    const targetEmail = to.trim().toLowerCase();

    if (type === 'briefing') {
      const stories = getFallbackStories();
      const result = await sendBriefingEmail({
        toEmail: targetEmail,
        recipientName: typeof recipientName === 'string' ? recipientName.trim() : 'Reader',
        stories,
      });

      if (!result.success) {
        return NextResponse.json(
          {
            success: false,
            error: result.error || 'Failed to dispatch test briefing.',
            to: targetEmail,
            type,
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `Morning Briefing test email dispatched successfully to ${targetEmail}!`,
        messageId: result.messageId,
        to: targetEmail,
        type: 'briefing',
      });
    }

    // Default to 'welcome'
    const result = await sendWelcomeEmail({
      toEmail: targetEmail,
      recipientName: typeof recipientName === 'string' ? recipientName.trim() : 'Reader',
      deliveryHour: Number(deliveryHour) || 6,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to dispatch welcome email.',
          to: targetEmail,
          type,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Welcome email test dispatched successfully to ${targetEmail}!`,
      messageId: result.messageId,
      to: targetEmail,
      type: 'welcome',
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
    console.error('[TEST_EMAIL_API] Error:', err);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
// MR NEWS — Executive Morning Intelligence Platform
