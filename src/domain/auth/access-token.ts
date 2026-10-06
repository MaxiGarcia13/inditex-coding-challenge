import process from 'node:process';
import { accessToken } from '@maxigarcia/access-token';

export const ACCESS_TOKEN_COOKIE = 'app_access_token';

const ACCESS_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

export function getAccessTokenSecret(): string {
  return process.env.SESSION_SECRET
    ?? (process.env.NODE_ENV === 'production' ? '' : 'dev-access-token-secret');
}

export function createAccessTokenValue(now = Date.now()): string {
  return getAccessTokenManager().create({
    now,
  });
}

export function isValidAccessToken(value: string | undefined | null): boolean {
  return getAccessTokenManager().isValid(value);
}

function getAccessTokenManager() {
  return accessToken(getAccessTokenSecret(), {
    ttlMs: ACCESS_TOKEN_TTL_MS,
  });
}
