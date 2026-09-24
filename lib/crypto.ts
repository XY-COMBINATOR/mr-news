import crypto from 'crypto';

const SECRET = process.env.CRON_SECRET || 'mr-news-default-secret-key-2026';

/**
 * Generates an HMAC-SHA256 signature token for a subscriber email.
 */
export function generateUnsubscribeToken(email: string): string {
  return crypto
    .createHmac('sha256', SECRET)
    .update(email.toLowerCase().trim())
    .digest('hex');
}

/**
 * Validates an HMAC-SHA256 signature token for a subscriber email.
 */
export function verifyUnsubscribeToken(email: string, token: string): boolean {
  if (!email || !token) return false;
  const expectedToken = generateUnsubscribeToken(email);
  const buf1 = Buffer.from(token);
  const buf2 = Buffer.from(expectedToken);
  if (buf1.length !== buf2.length) return false;
  return crypto.timingSafeEqual(buf1, buf2);
}
// MR NEWS — Executive Morning Intelligence Platform
