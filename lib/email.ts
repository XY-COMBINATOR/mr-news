import { Resend } from 'resend';
import { ProcessedStory } from './gemini';
import { generateUnsubscribeToken } from './crypto';

const resendApiKey = process.env.RESEND_API_KEY || '';
const resendFromEmail = process.env.RESEND_FROM_EMAIL || 'MR News <onboarding@resend.dev>';
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

const resend = resendApiKey ? new Resend(resendApiKey) : null;

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

  if (!resend) {
    console.warn(`[RESEND] RESEND_API_KEY not set. Mock email dispatch to ${toEmail}.`);
    return { success: true, mock: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: resendFromEmail,
      to: [toEmail],
      subject: `MR NEWS: Daily Briefing (${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`,
      html: htmlContent,
    });

    if (error) {
      console.error('[RESEND] Email send error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('[RESEND] Failed to send email via Resend:', err);
    return { success: false, error: err };
  }
}

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
      <td style="padding: 16px 36px 18px; border-bottom: 1px dotted #b0a88f;">
        <div style="font-family: 'Courier New', monospace; font-size: 10px; letter-spacing: 3px; color: #7a2418; text-transform: uppercase; margin-bottom: 6px;">
          ARTICLE ${i + 1} &nbsp;·&nbsp; ${s.category.toUpperCase()} &nbsp;·&nbsp; IMPACT ${s.impactScore}/100
        </div>
        <h2 style="margin: 0 0 8px; font-family: Georgia, serif; font-size: 20px; line-height: 1.25; color: #0f0e0b; font-weight: 700;">
          <a href="${s.url}" style="color: #0f0e0b; text-decoration: none;">${s.headline}</a>
        </h2>
        <p style="margin: 0 0 10px; font-family: Georgia, serif; font-size: 14px; line-height: 1.55; color: #25231d;">
          ${s.summary}
        </p>
        <div style="font-family: Georgia, serif; font-style: italic; font-size: 13px; color: #4a3f30; background-color: #e5deca; padding: 8px 12px; border-left: 3px solid #7a2418;">
          <strong>Strategic Impact:</strong> ${s.strategicImpact}
        </div>
        <div style="font-family: 'Courier New', monospace; font-size: 9px; letter-spacing: 1.5px; color: #6f6a5c; margin-top: 8px; text-transform: uppercase;">
          Source: ${s.source}
        </div>
      </td>
    </tr>
  `
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MR NEWS Briefing</title>
</head>
<body style="margin:0;padding:0;background-color:#1a1208;font-family:Georgia,serif;color:#0f0e0b;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#1a1208" style="background-color:#1a1208;padding:20px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="620" cellpadding="0" cellspacing="0" border="0" bgcolor="#f2efe6" style="width:620px;max-width:620px;background-color:#f2efe6;border:2px solid #0f0e0b;">
          
          <!-- MASTHEAD -->
          <tr>
            <td align="center" style="padding:24px 40px 16px;border-bottom:3px double #0f0e0b;">
              <div style="font-family:Georgia,serif;font-weight:900;font-size:42px;letter-spacing:-2px;text-transform:uppercase;color:#0f0e0b;">
                MR<span style="color:#7a2418;">·</span>NEWS
              </div>
              <div style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#7a2418;margin-top:6px;">
                THE DAILY BRIEFING FOR ${recipientName.toUpperCase()}
              </div>
              <div style="font-family:Georgia,serif;font-style:italic;font-size:11px;color:#4a463c;margin-top:6px;">
                ${currentDateStr}
              </div>
            </td>
          </tr>

          <!-- STORIES -->
          ${storyRows}

          <!-- FOOTER -->
          <tr>
            <td align="center" style="padding:20px 40px;background-color:#e5deca;border-top:3px double #0f0e0b;">
              <p style="margin:0 0 10px;font-family:Georgia,serif;font-size:11px;color:#6f6a5c;">
                MR NEWS: Written by machines, checked by people.
              </p>
              <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;">
                <a href="${unsubscribeUrl}" style="color:#7a2418;text-decoration:underline;">One-Click Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
