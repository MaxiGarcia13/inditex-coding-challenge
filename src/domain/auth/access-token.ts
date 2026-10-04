import process from 'node:process';
import { createAccessToken } from '@maxigarcia/access-token';

export const ACCESS_TOKEN_COOKIE = 'app_access_token';

const ACCESS_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

export function getAccessTokenSecret(): string {
  return process.env.SESSION_SECRET
    ?? (process.env.NODE_ENV === 'production' ? '' : 'dev-access-token-secret');
}

export function createAccessTokenValue(now = Date.now()): string {
  return getToken().create({
    now,
  });
}

export function isValidAccessToken(value: string | undefined | null): boolean {
  return getToken().isValid(value);
}

function getToken() {
  return createAccessToken(getAccessTokenSecret(), {
    ttlMs: ACCESS_TOKEN_TTL_MS,
  });
}
