// Rate limiting manager for contact form
// This approach uses in-memory storage which works for serverless functions
// with limited concurrency, but for high traffic sites, use Redis or similar

export interface RateLimitStore {
  [ip: string]: {
    count: number;
    lastReset: number;
  };
}

// Global rate limit store (persists between serverless function invocations)
let rateLimitStore: RateLimitStore = {};

// Rate limit settings
const RATE_LIMIT = 5; // Max number of emails per time window
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  
  // Initialize entry for new IP addresses
  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = { count: 0, lastReset: now };
    return false;
  }
  
  // Reset counter if time window has passed
  if (now - rateLimitStore[ip].lastReset > RATE_LIMIT_WINDOW) {
    rateLimitStore[ip] = { count: 0, lastReset: now };
    return false;
  }
  
  // Check if rate limit has been exceeded
  return rateLimitStore[ip].count >= RATE_LIMIT;
}

export function incrementRateLimit(ip: string): void {
  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = { count: 0, lastReset: Date.now() };
  }
  
  rateLimitStore[ip].count += 1;
}

export function getRateLimitRemaining(ip: string): number {
  if (!rateLimitStore[ip]) {
    return RATE_LIMIT;
  }
  
  // Reset counter if time window has passed
  const now = Date.now();
  if (now - rateLimitStore[ip].lastReset > RATE_LIMIT_WINDOW) {
    rateLimitStore[ip] = { count: 0, lastReset: now };
    return RATE_LIMIT;
  }
  
  return Math.max(0, RATE_LIMIT - rateLimitStore[ip].count);
}

export function getRateLimitResetTime(ip: string): number {
  if (!rateLimitStore[ip]) {
    return 0;
  }
  
  const resetTime = rateLimitStore[ip].lastReset + RATE_LIMIT_WINDOW;
  return Math.max(0, resetTime - Date.now());
} 