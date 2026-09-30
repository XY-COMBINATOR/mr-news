import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { ProcessedStory } from './gemini';
import { generateUnsubscribeToken } from './crypto';

const emailUser = process.env.EMAIL_USER || '';
const emailPass = process.env.EMAIL_PASS || '';
const emailFrom = process.env.EMAIL_FROM || (emailUser ? `"MR News" <${emailUser}>` : '"MR News" <mrnewsbrief@gmail.com>');
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

const transporter = (emailUser && emailPass)
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    })
  : null;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Dispatches the daily 22:00 briefing email to a subscriber via Gmail SMTP.
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

  const htmlContent = generateBriefingEmailHtml({
    email: toEmail,
    recipientName: recipientName || 'Reader',
    stories,
    unsubscribeUrl,
  });

  if (!transporter) {
    console.warn(`[EMAIL] EMAIL_USER/EMAIL_PASS not configured. Mock dispatch to ${toEmail}.`);
    return { success: true, mock: true };
  }

  const textContent = [
    `MR NEWS: Nightly Intelligence Briefing (${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})`,
    `The 22:00 intelligence briefing for ${recipientName || 'Reader'}\n`,
    ...stories.map((s, i) => `${i + 1}. ${s.headline}\n${s.summary}\nStrategic Impact: ${s.strategicImpact}\nSource: ${s.source} (${s.url})\n`),
    `\nMR NEWS: Delivered nightly at 22:00 IST.`,
    `Visit: ${appUrl}`,
    `Unsubscribe: ${unsubscribeUrl}`,
  ].join('\n');

  try {
    const info = await transporter.sendMail({
      from: emailFrom,
      to: toEmail,
      replyTo: emailUser || 'mrnewsbrief@gmail.com',
      subject: `MR NEWS: Nightly Intelligence Briefing (${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`,
      text: textContent,
      html: htmlContent,
      headers: {
        'List-Unsubscribe': `<${unsubscribeUrl}>, <mailto:${emailUser || 'mrnewsbrief@gmail.com'}?subject=unsubscribe>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        'X-Mailer': 'MR NEWS Dispatch Engine',
      },
    });

    console.log(`[EMAIL] Successfully dispatched briefing to ${toEmail} (ID: ${info.messageId})`);
    return { success: true, data: info };
  } catch (err) {
    console.error(`[EMAIL] Failed to send briefing to ${toEmail}:`, err);
    return { success: false, error: err };
  }
}

/**
 * Sends an immediate welcome confirmation email when a user subscribes.
 */
export async function sendWelcomeEmail({
  toEmail,
  recipientName,
}: {
  toEmail: string;
  recipientName?: string;
}) {
  if (!transporter) {
    console.warn(`[EMAIL] EMAIL_USER/EMAIL_PASS not configured. Mock welcome email to ${toEmail}.`);
    return { success: true, mock: true };
  }

  const token = generateUnsubscribeToken(toEmail);
  const unsubscribeUrl = `${appUrl}/api/unsubscribe?email=${encodeURIComponent(toEmail)}&token=${token}`;

  const safeName = escapeHtml(recipientName || 'Reader');
  const currentDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  let htmlContent = '';
  try {
    const templatePath = path.join(process.cwd(), 'welcome_email.html');
    if (fs.existsSync(templatePath)) {
      htmlContent = fs.readFileSync(templatePath, 'utf8')
        .replace(/{{RECIPIENT_NAME}}/g, safeName)
        .replace(/{{CURRENT_DATE}}/g, currentDateStr)
        .replace(/{{APP_URL}}/g, appUrl)
        .replace(/{{UNSUBSCRIBE_URL}}/g, unsubscribeUrl);
    }
  } catch (e) {
    console.warn('[EMAIL] Could not read welcome_email.html, using fallback:', e);
  }

  if (!htmlContent) {
    htmlContent = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #fdfbf7; border: 1px solid #e0d8cc; color: #1a1612;">
        <h1 style="color: #0f0e0b; letter-spacing: -1px;">MR<span style="color: #ff6500;">·</span>NEWS</h1>
        <p>Dear ${safeName},</p>
        <p>You are officially subscribed to <strong>MR NEWS Executive Intelligence</strong>.</p>
        <p>Your curated briefing will be dispatched every night at <strong>22:00 (10:00 PM)</strong> sharp.</p>
        <hr style="border: none; border-top: 1px solid #e0d8cc; margin: 20px 0;" />
        <p style="font-size: 12px; color: #666;"><a href="${unsubscribeUrl}" style="color: #ff6500;">One-click Unsubscribe</a></p>
      </div>
    `;
  }

  const plainTextWelcome = `Hello ${recipientName || 'Reader'},\n\nWelcome to MR NEWS. Your subscription has been confirmed.\n\nYou will receive your executive intelligence briefing every night at 22:00 IST covering the day's top 7 tech and AI developments.\n\nVisit Website: ${appUrl}\nOne-Click Unsubscribe: ${unsubscribeUrl}\n\nMR NEWS — Delivered nightly to your inbox.`;

  try {
    const info = await transporter.sendMail({
      from: emailFrom,
      to: toEmail,
      replyTo: emailUser || 'mrnewsbrief@gmail.com',
      subject: `Welcome to MR NEWS — Daily Briefing at 22:00`,
      text: plainTextWelcome,
      html: htmlContent,
      headers: {
        'List-Unsubscribe': `<${unsubscribeUrl}>, <mailto:${emailUser || 'mrnewsbrief@gmail.com'}?subject=unsubscribe>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        'X-Mailer': 'MR NEWS Dispatch Engine',
      },
    });
    console.log(`[EMAIL] Welcome email sent to ${toEmail} (ID: ${info.messageId})`);
    return { success: true, data: info };
  } catch (err) {
    console.error(`[EMAIL] Failed to send welcome email to ${toEmail}:`, err);
    return { success: false, error: err };
  }
}

function generateBriefingEmailHtml({
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
      <td style="padding: 18px 36px; border-bottom: 1px dotted #b0a88f;">
        <div style="font-family: 'Courier New', monospace; font-size: 10px; letter-spacing: 3px; color: #ff6500; text-transform: uppercase; margin-bottom: 6px;">
          ARTICLE ${i + 1} &nbsp;·&nbsp; ${s.category.toUpperCase()} &nbsp;·&nbsp; IMPACT ${s.impactScore}/100
        </div>
        <h2 style="margin: 0 0 8px; font-family: Georgia, serif; font-size: 20px; line-height: 1.25; color: #0f0e0b; font-weight: 700;">
          <a href="${s.url}" style="color: #0f0e0b; text-decoration: none;">${s.headline}</a>
        </h2>
        <p style="margin: 0 0 10px; font-family: Georgia, serif; font-size: 14px; line-height: 1.55; color: #25231d;">
          ${s.summary}
        </p>
        <div style="font-family: Georgia, serif; font-style: italic; font-size: 13px; color: #4a3f30; background-color: #e5deca; padding: 10px 14px; border-left: 3px solid #ff6500;">
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
<body style="margin:0;padding:0;background-color:#101012;font-family:Georgia,serif;color:#0f0e0b;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#101012" style="background-color:#101012;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="620" cellpadding="0" cellspacing="0" border="0" bgcolor="#f5f2e9" style="width:620px;max-width:620px;background-color:#f5f2e9;border:1px solid #2a2824;border-radius:4px;overflow:hidden;">
          
          <!-- TOP HEADER BANNER -->
          <tr>
            <td align="center" style="background-color:#1a1917;padding:12px 20px;border-bottom:2px solid #ff6500;">
              <span style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#d4b970;">
                ✦ &nbsp; EXECUTIVE NIGHTLY DISPATCH · 22:00 &nbsp; ✦
              </span>
            </td>
          </tr>

          <!-- MASTHEAD -->
          <tr>
            <td align="center" style="padding:28px 40px 18px;border-bottom:3px double #0f0e0b;">
              <div style="font-family:Georgia,serif;font-weight:900;font-size:42px;letter-spacing:-2px;text-transform:uppercase;color:#0f0e0b;">
                MR<span style="color:#ff6500;">·</span>NEWS
              </div>
              <div style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#ff6500;margin-top:6px;">
                THE 22:00 INTELLIGENCE BRIEFING FOR ${escapeHtml(recipientName || 'Reader').toUpperCase()}
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
            <td align="center" style="padding:20px 40px;background-color:#e8e2d2;border-top:3px double #0f0e0b;">
              <p style="margin:0 0 10px;font-family:Georgia,serif;font-size:11px;color:#4a463c;">
                MR NEWS: High-signal briefing read by machines, vetted for humans. Delivered nightly at 22:00.
              </p>
              <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;">
                <a href="${unsubscribeUrl}" style="color:#ff6500;text-decoration:underline;">One-Click Unsubscribe</a>
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
