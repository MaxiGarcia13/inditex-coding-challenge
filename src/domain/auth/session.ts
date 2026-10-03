import { Buffer } from 'node:buffer';
import { createHmac, timingSafeEqual } from 'node:crypto';
import process from 'node:process';

export const SESSION_COOKIE = 'app_session';
export const INTERNAL_SESSION_HEADER = 'x-internal-session';

const SESSION_TTL_MS = 60 * 60 * 1000; // 1 hour

export function getSessionSecret(): string {
  return process.env.SESSION_SECRET
    ?? (process.env.NODE_ENV === 'production' ? '' : 'dev-session-secret');
}

export function createSessionValue(now = Date.now()): string {
  const expiresAt = String(now + SESSION_TTL_MS);
  return `${expiresAt}.${sign(expiresAt)}`;
}

export function isValidSession(value: string | undefined | null): boolean {
  if (!value) {
    return false;
  }

  const [expiresAt, signature] = value.split('.');

  if (!expiresAt || !signature) {
    return false;
  }

  if (Number(expiresAt) < Date.now()) {
    return false;
  }

  return safeEqual(signature, sign(expiresAt));
}

export function isInternalSession(headerValue: string | null): boolean {
  const secret = getSessionSecret();

  if (!secret || !headerValue) {
    return false;
  }

  return safeEqual(headerValue, secret);
}

function sign(payload: string): string {
  return createHmac('sha256', getSessionSecret()).update(payload).digest('hex');
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}
