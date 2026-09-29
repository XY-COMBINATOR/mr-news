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
  return timingSafeEqualString(token, expectedToken);
}

/**
 * Cryptographically timing-safe string comparison to protect against side-channel timing attacks.
 */
export function timingSafeEqualString(a: string, b: string): boolean {
  if (!a || !b) return false;
  const hashA = crypto.createHash('sha256').update(a).digest();
  const hashB = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}
