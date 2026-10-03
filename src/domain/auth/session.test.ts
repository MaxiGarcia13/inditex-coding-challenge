import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  createSessionValue,
  isInternalSession,
  isValidSession,
} from './session';

describe('session', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
  });

  it('should create and validate a session value', () => {
    vi.stubEnv('SESSION_SECRET', 'test-secret');

    const value = createSessionValue();

    expect(isValidSession(value)).toBe(true);
  });

  it('should reject an expired session', () => {
    vi.stubEnv('SESSION_SECRET', 'test-secret');
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'));

    const value = createSessionValue();

    vi.setSystemTime(new Date('2026-01-01T02:00:00.000Z'));

    expect(isValidSession(value)).toBe(false);
  });

  it('should reject a tampered session', () => {
    vi.stubEnv('SESSION_SECRET', 'test-secret');

    const value = createSessionValue();
    const [expiresAt] = value.split('.');

    expect(isValidSession(`${expiresAt}.deadbeef`)).toBe(false);
  });

  it('should accept the internal session header', () => {
    vi.stubEnv('SESSION_SECRET', 'test-secret');

    expect(isInternalSession('test-secret')).toBe(true);
    expect(isInternalSession('wrong')).toBe(false);
  });
});
