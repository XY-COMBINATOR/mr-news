/**
 * In-memory sliding window rate limiter for public API endpoints.
 * Defends against spam, automated bots, and email-bombing attacks.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Clean up stale entries every 10 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  for (const [key, record] of rateLimitMap.entries()) {
    const valid = record.timestamps.filter((t) => now - t < windowMs);
    if (valid.length === 0) {
      rateLimitMap.delete(key);
    } else {
      record.timestamps = valid;
    }
  }
}, 10 * 60 * 1000);

export function checkRateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 10 * 60 * 1000
): { allowed: boolean; remaining: number; resetMs: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { timestamps: [] };

  // Keep only timestamps within the sliding window
  const recentTimestamps = record.timestamps.filter((t) => now - t < windowMs);

  if (recentTimestamps.length >= limit) {
    const oldestTimestamp = recentTimestamps[0];
    const resetMs = Math.max(0, oldestTimestamp + windowMs - now);
    return { allowed: false, remaining: 0, resetMs };
  }

  recentTimestamps.push(now);
  rateLimitMap.set(ip, { timestamps: recentTimestamps });

  return {
    allowed: true,
    remaining: limit - recentTimestamps.length,
    resetMs: windowMs,
  };
}
