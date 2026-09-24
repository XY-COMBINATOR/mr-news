import nodemailer from 'nodemailer';
import { ProcessedStory } from './gemini';
import { generateUnsubscribeToken } from './crypto';

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

/**
 * Creates or retrieves a Nodemailer Gmail SMTP transporter using active environment variables.
 * Free tier: 500 emails/day from any standard Gmail account using a Google App Password.
 */
function getTransporter() {
  const user = process.env.EMAIL_USER?.trim() || '';
  const pass = process.env.EMAIL_PASS?.trim() || '';

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Check configuration status of the Gmail email engine.
 */
export function getEmailConfigStatus() {
  const user = process.env.EMAIL_USER?.trim() || '';
  const pass = process.env.EMAIL_PASS?.trim() || '';

  return {
    configured: Boolean(user && pass),
    emailUser: user ? user.replace(/(?<=^.).*(?=@)/, '***') : null,
    provider: 'Gmail SMTP (Nodemailer)',
  };
}

/**
 * Test SMTP connection to Gmail servers to verify credentials.
 */
export async function verifySmtpConnection(): Promise<{ success: boolean; message: string }> {
  const transporter = getTransporter();
  if (!transporter) {
    return {
      success: false,
      message: 'EMAIL_USER or EMAIL_PASS is not configured in .env.local',
    };
  }

  try {
    await transporter.verify();
    return {
      success: true,
      message: 'Gmail SMTP connection verified successfully.',
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      message: `Gmail SMTP authentication failed: ${errorMsg}`,
    };
  }
}

/**
 * Format 24-hour integer into human-friendly time string (e.g. 6 -> "6:00 AM UTC")
 */
function formatDeliveryHour(hour: number): string {
  const safeHour = isNaN(hour) ? 6 : Math.max(0, Math.min(23, hour));
  const period = safeHour >= 12 ? 'PM' : 'AM';
  const displayHour = safeHour % 12 === 0 ? 12 : safeHour % 12;
  return `${displayHour}:00 ${period} UTC`;
}

/**
 * Internal helper — sends an email via Gmail SMTP using Nodemailer.
 */
async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ success: boolean; messageId?: string; error?: string; mock?: boolean }> {
  const transporter = getTransporter();
  const emailUser = process.env.EMAIL_USER?.trim() || '';
  const fromAddress = process.env.EMAIL_FROM?.trim() || `MR News <${emailUser}>`;

  if (!transporter) {
    console.warn(`[EMAIL] EMAIL_USER or EMAIL_PASS not set. Mock dispatch to ${to}.`);
    return {
      success: false,
      mock: true,
      error: 'Gmail credentials not configured. Please add EMAIL_USER and EMAIL_PASS to your .env.local file.',
    };
  }

  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      to,
      subject,
      html,
    });

    console.log(`[EMAIL] Sent to ${to} — MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error(`[EMAIL] Failed to send to ${to}:`, errorMsg);
    return { success: false, error: errorMsg };
  }
}

/**
 * Dispatches the daily morning briefing email with the top 7 stories.
 */
export async function sendBriefingEmail({
  toEmail,
  recipientName,
  stories,
}: {
  toEmail: string;
  recipientName?: string;
  stories: ProcessedStory[];
}) {
  const token = generateUnsubscribeToken(toEmail);
  const unsubscribeUrl = `${appUrl}/api/unsubscribe?email=${encodeURIComponent(toEmail)}&token=${token}`;

  const htmlContent = generateVintageEmailHtml({
    email: toEmail,
    recipientName: recipientName || 'Reader',
    stories,
    unsubscribeUrl,
  });

  const formattedDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return sendEmail({
    to: toEmail,
    subject: `MR NEWS — Daily Briefing (${formattedDate})`,
    html: htmlContent,
  });
}

/**
 * Dispatches the welcome confirmation email immediately upon subscription.
 */
export async function sendWelcomeEmail({
  toEmail,
  recipientName,
  deliveryHour,
}: {
  toEmail: string;
  recipientName?: string;
  deliveryHour: number;
}) {
  const token = generateUnsubscribeToken(toEmail);
  const unsubscribeUrl = `${appUrl}/api/unsubscribe?email=${encodeURIComponent(toEmail)}&token=${token}`;

  const htmlContent = generateWelcomeEmailHtml({
    email: toEmail,
    recipientName: recipientName || 'Reader',
    deliveryHour,
    unsubscribeUrl,
    appUrl,
  });

  return sendEmail({
    to: toEmail,
    subject: `Welcome to MR NEWS — Your Morning Briefing is Confirmed`,
    html: htmlContent,
  });
}

/**
 * Renders the daily briefing email with flawless alignment, responsive tables,
 * and natural, high-signal editorial journalism (no AI slop).
 */
function generateVintageEmailHtml({
  recipientName,
  stories,
  unsubscribeUrl,
}: {
  email: string;
  recipientName: string;
  stories: ProcessedStory[];
  unsubscribeUrl: string;
}): string {
  const currentDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const storyRows = stories
    .map(
      (s, i) => `
    <tr>
      <td style="padding: 24px 32px; border-bottom: 1px solid #e7e2d9;">
        <!-- Tag & Score line -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 8px;">
          <tr>
            <td align="left">
              <span style="display: inline-block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #8c1d18; background-color: #f7ede8; padding: 3px 8px; border-radius: 3px;">
                ${s.category.toUpperCase()}
              </span>
              <span style="font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #78716c; margin-left: 8px;">
                ITEM ${i + 1} OF ${stories.length}
              </span>
            </td>
            <td align="right">
              <span style="font-family: 'Courier New', Courier, monospace; font-size: 10px; letter-spacing: 1px; color: #78716c; text-transform: uppercase;">
                SIGNAL ${s.impactScore}/100
              </span>
            </td>
          </tr>
        </table>

        <!-- Headline -->
        <h2 style="margin: 0 0 10px; font-family: Georgia, 'Times New Roman', serif; font-size: 21px; line-height: 1.3; color: #1c1917; font-weight: 700;">
          <a href="${s.url}" style="color: #1c1917; text-decoration: none;" target="_blank" rel="noopener noreferrer">
            ${s.headline}
          </a>
        </h2>

        <!-- 2-Sentence Plain Summary -->
        <p style="margin: 0 0 12px; font-family: Georgia, 'Times New Roman', serif; font-size: 15px; line-height: 1.6; color: #292524;">
          ${s.summary}
        </p>

        <!-- Why It Matters (Strategic Impact) -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f1ea; border-left: 3px solid #8c1d18; border-radius: 0 4px 4px 0; margin-bottom: 10px;">
          <tr>
            <td style="padding: 10px 14px;">
              <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #8c1d18; display: inline-block; margin-right: 4px;">
                Why it matters:
              </span>
              <span style="font-family: Georgia, serif; font-size: 13.5px; line-height: 1.5; color: #44403c;">
                ${s.strategicImpact}
              </span>
            </td>
          </tr>
        </table>

        <!-- Source & Deep Link -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="left">
              <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; color: #78716c;">
                Source: <strong style="color: #44403c;">${s.source}</strong>
              </span>
            </td>
            <td align="right">
              <a href="${s.url}" target="_blank" rel="noopener noreferrer" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 600; color: #8c1d18; text-decoration: none;">
                Read full report &rarr;
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>MR NEWS — Morning Briefing</title>
  <style>
    body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table { border-collapse: collapse !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; outline: none; text-decoration: none; }
    @media screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .mobile-padding { padding-left: 18px !important; padding-right: 18px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #14100c; font-family: Georgia, 'Times New Roman', serif; color: #1c1917;">

  <!-- Outer background table -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#14100c" style="background-color: #14100c; padding: 24px 10px;">
    <tr>
      <td align="center">

        <!-- Main Card Container -->
        <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#faf8f5" style="width: 600px; max-width: 600px; background-color: #faf8f5; border: 1px solid #292524; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.35);">
          
          <!-- Top Accent Gold Line -->
          <tr>
            <td style="height: 4px; background-color: #c29b38; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Masthead Header -->
          <tr>
            <td align="center" style="padding: 28px 32px 20px; border-bottom: 2px solid #1c1917; background-color: #f7f4ee;">
              
              <!-- Brand Name -->
              <div style="font-family: Georgia, 'Times New Roman', serif; font-weight: 900; font-size: 38px; line-height: 1; letter-spacing: -1.5px; text-transform: uppercase; color: #1c1917;">
                MR<span style="color: #8c1d18;">·</span>NEWS
              </div>

              <!-- Tagline -->
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #8c1d18; margin-top: 8px;">
                MORNING INTELLIGENCE &bull; SEVEN STORIES THAT MATTER
              </div>

              <!-- Date & Subscriber Dateline -->
              <div style="font-family: Georgia, serif; font-style: italic; font-size: 12px; color: #57534e; margin-top: 6px;">
                ${currentDateStr} &bull; Prepared for ${recipientName}
              </div>
            </td>
          </tr>

          <!-- Editorial Lead Note -->
          <tr>
            <td style="padding: 16px 32px; background-color: #ebe5d8; border-bottom: 1px solid #d6cfbe;">
              <p style="margin: 0; font-family: Georgia, serif; font-style: italic; font-size: 13.5px; line-height: 1.5; color: #44403c; text-align: center;">
                Over 600 global wires, research repositories, and regulatory filings monitored overnight. Disinformation and PR fluff stripped. Here is your 5-minute executive briefing.
              </p>
            </td>
          </tr>

          <!-- Story List -->
          ${storyRows}

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 26px 32px; background-color: #f2ede4; border-top: 2px solid #1c1917;">
              <div style="font-family: Georgia, serif; font-size: 13px; color: #57534e; margin-bottom: 10px;">
                <strong>MR NEWS Editorial Desk</strong> &mdash; Direct signal. Zero clickbait.
              </div>
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; line-height: 1.6; color: #78716c; max-width: 480px; margin: 0 auto 14px;">
                You received this daily digest because you requested morning updates. If your schedule changes, you can adjust settings or opt out anytime below.
              </div>
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                <a href="${unsubscribeUrl}" style="color: #8c1d18; text-decoration: underline;" target="_blank" rel="noopener noreferrer">
                  One-Click Unsubscribe
                </a>
              </div>
            </td>
          </tr>

        </table>
        <!-- End Main Card -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}

/**
 * Renders the welcome confirmation email with humanized, authentic editorial language
 * and clean responsive layout (no placeholder links, no AI buzzwords).
 */
function generateWelcomeEmailHtml({
  recipientName,
  deliveryHour,
  unsubscribeUrl,
  appUrl,
}: {
  email: string;
  recipientName: string;
  deliveryHour: number;
  unsubscribeUrl: string;
  appUrl: string;
}): string {
  const deliveryTimeStr = formatDeliveryHour(deliveryHour);
  const currentDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Welcome to MR NEWS</title>
  <style>
    body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table { border-collapse: collapse !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; outline: none; text-decoration: none; }
    @media screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .stack-col { display: block !important; width: 100% !important; border-right: 0 !important; border-bottom: 1px solid #d6cfbe !important; }
      .stack-col:last-child { border-bottom: 0 !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #14100c; font-family: Georgia, 'Times New Roman', serif; color: #1c1917;">

  <!-- Outer background -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#14100c" style="background-color: #14100c; padding: 24px 10px;">
    <tr>
      <td align="center">

        <!-- Card Container -->
        <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#faf8f5" style="width: 600px; max-width: 600px; background-color: #faf8f5; border: 1px solid #292524; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.35);">
          
          <!-- Top Accent Gold Line -->
          <tr>
            <td style="height: 4px; background-color: #c29b38; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Top Banner -->
          <tr>
            <td align="center" style="background-color: #0d0a07; padding: 12px 20px;">
              <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: #d4b970; font-weight: 700;">
                ✦ &nbsp; MORNING EDITION &nbsp; ✦
              </span>
              <span style="font-family: Georgia, serif; font-style: italic; font-size: 11px; color: #a89c82; margin-left: 10px;">
                ${currentDateStr}
              </span>
            </td>
          </tr>

          <!-- Masthead Header -->
          <tr>
            <td align="center" style="padding: 30px 32px 20px; border-bottom: 2px solid #1c1917; background-color: #f7f4ee;">
              <div style="font-family: Georgia, 'Times New Roman', serif; font-weight: 900; font-size: 44px; line-height: 1; letter-spacing: -2px; text-transform: uppercase; color: #1c1917;">
                MR<span style="color: #8c1d18;">·</span>NEWS
              </div>
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #8c1d18; margin-top: 8px;">
                HIGH-SIGNAL MORNING INTELLIGENCE
              </div>
            </td>
          </tr>

          <!-- Confirmed Stamp & Headline -->
          <tr>
            <td align="center" style="padding: 28px 36px 16px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom: 16px;">
                <tr>
                  <td align="center" bgcolor="#8c1d18" style="background-color: #8c1d18; border-radius: 3px; padding: 4px 14px;">
                    <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #faf8f5;">
                      ✓ &nbsp; SUBSCRIPTION CONFIRMED
                    </span>
                  </td>
                </tr>
              </table>

              <h1 style="margin: 0 0 12px; font-family: Georgia, serif; font-size: 28px; line-height: 1.25; color: #1c1917; font-weight: 700;">
                You're on the wire, ${recipientName}.
              </h1>
              <p style="margin: 0; font-family: Georgia, serif; font-size: 15px; line-height: 1.6; color: #44403c; max-width: 480px;">
                Your subscription is active. Starting tomorrow morning, your daily briefing will arrive promptly at <strong>${deliveryTimeStr}</strong>.
              </p>
            </td>
          </tr>

          <!-- Receipt Details Strip -->
          <tr>
            <td style="padding: 12px 32px 20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f0ebe0; border: 1px solid #d6cfbe; border-radius: 4px;">
                <tr>
                  <td class="stack-col" width="33.33%" valign="top" style="padding: 16px 12px; border-right: 1px solid #d6cfbe; text-align: center;">
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #78716c; margin-bottom: 4px;">
                      SCHEDULE
                    </div>
                    <div style="font-family: Georgia, serif; font-size: 15px; font-weight: 700; color: #1c1917;">
                      Daily
                    </div>
                    <div style="font-family: Georgia, serif; font-size: 11.5px; color: #57534e; margin-top: 2px;">
                      ${deliveryTimeStr}
                    </div>
                  </td>
                  <td class="stack-col" width="33.33%" valign="top" style="padding: 16px 12px; border-right: 1px solid #d6cfbe; text-align: center;">
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #78716c; margin-bottom: 4px;">
                      FORMAT
                    </div>
                    <div style="font-family: Georgia, serif; font-size: 15px; font-weight: 700; color: #1c1917;">
                      Top 7 Stories
                    </div>
                    <div style="font-family: Georgia, serif; font-size: 11.5px; color: #57534e; margin-top: 2px;">
                      5-minute read
                    </div>
                  </td>
                  <td class="stack-col" width="33.33%" valign="top" style="padding: 16px 12px; text-align: center;">
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #78716c; margin-bottom: 4px;">
                      MEMBERSHIP
                    </div>
                    <div style="font-family: Georgia, serif; font-size: 15px; font-weight: 700; color: #1c1917;">
                      Complimentary
                    </div>
                    <div style="font-family: Georgia, serif; font-size: 11.5px; color: #57534e; margin-top: 2px;">
                      Zero paywalls
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Editorial Manifesto Quote -->
          <tr>
            <td style="padding: 0 36px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-left: 3px solid #8c1d18; background-color: #f7f4ee; padding: 14px 18px;">
                <tr>
                  <td>
                    <p style="margin: 0; font-family: Georgia, serif; font-style: italic; font-size: 14px; line-height: 1.6; color: #44403c;">
                      "MR NEWS was founded on an exacting standard: high-signal international intelligence, verified and stripped of editorial static. Seven decisive briefings delivered directly to your inbox every morning."
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Primary CTA Button -->
          <tr>
            <td align="center" style="padding: 6px 36px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                <tr>
                  <td align="center" bgcolor="#1c1917" style="background-color: #1c1917; border-radius: 4px;">
                    <a href="${appUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 14px 28px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #faf8f5; text-decoration: none;">
                      Explore Live Edition &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <div style="font-family: Georgia, serif; font-style: italic; font-size: 12px; color: #78716c; margin-top: 12px;">
                First edition hits your inbox tomorrow at ${deliveryTimeStr}.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 22px 32px; background-color: #f0ebe0; border-top: 2px solid #1c1917;">
              <div style="font-family: Georgia, serif; font-size: 12px; color: #57534e; margin-bottom: 8px;">
                <strong>MR NEWS Editorial</strong> &bull; Printed digitally daily.
              </div>
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; line-height: 1.5; color: #78716c; margin-bottom: 12px;">
                You are receiving this because you subscribed at <a href="${appUrl}" style="color: #44403c; text-decoration: underline;" target="_blank">${appUrl.replace(/^https?:\/\//, '')}</a>.
              </div>
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                <a href="${unsubscribeUrl}" style="color: #8c1d18; text-decoration: underline;" target="_blank" rel="noopener noreferrer">
                  One-Click Unsubscribe
                </a>
              </div>
            </td>
          </tr>

        </table>
        <!-- End Card Container -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}
// MR NEWS — Executive Morning Intelligence Platform
