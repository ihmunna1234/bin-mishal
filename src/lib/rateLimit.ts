/**
 * Simple in-memory IP Rate Limiter (Sliding Window / Fixed Window hybrid)
 * Suitable for Next.js App Router API & Middleware rate limiting.
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Cleanup stale records periodically to avoid memory growth
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (now > record.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 60000); // Clean every minute
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

/**
 * Checks rate limit for a given key (e.g. IP address or IP+route)
 * @param key Unique key to limit (e.g., "login_192.168.1.1")
 * @param limit Max allowed requests within window
 * @param windowMs Time window in milliseconds (default: 60,000ms = 1 min)
 */
export function checkRateLimit(
  key: string,
  limit: number = 5,
  windowMs: number = 60000
): RateLimitResult {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    // Fresh window
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      allowed: true,
      limit,
      remaining: limit - 1,
      resetSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= limit) {
    // Limit exceeded
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetSeconds: Math.ceil((record.resetTime - now) / 1000),
    };
  }

  // Increment counter
  record.count += 1;
  return {
    allowed: true,
    limit,
    remaining: limit - record.count,
    resetSeconds: Math.ceil((record.resetTime - now) / 1000),
  };
}
