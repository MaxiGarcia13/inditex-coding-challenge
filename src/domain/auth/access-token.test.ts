import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  createAccessTokenValue,
  isValidAccessToken,
} from './access-token';

describe('access-token', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
  });

  it('should create and validate an access token', () => {
    vi.stubEnv('SESSION_SECRET', 'test-secret');

    const value = createAccessTokenValue();

    expect(isValidAccessToken(value)).toBe(true);
  });

  it('should reject an expired access token', () => {
    vi.stubEnv('SESSION_SECRET', 'test-secret');
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));

    const value = createAccessTokenValue();

    vi.setSystemTime(new Date('2026-01-01T02:00:00.000Z'));

    expect(isValidAccessToken(value)).toBe(false);
  });

  it('should reject a tampered access token', () => {
    vi.stubEnv('SESSION_SECRET', 'test-secret');

    const value = createAccessTokenValue();
    const [expiresAt] = value.split('.');

    expect(isValidAccessToken(`${expiresAt}.deadbeef`)).toBe(false);
  });
});
