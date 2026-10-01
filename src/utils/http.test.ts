import type { HttpError } from '@/domain/http';
import { describe, expect, it } from 'vitest';
import { isHttpError } from './http';

describe('isHttpError', () => {
  it('should return true if the error is an HttpError', () => {
    const error: HttpError = {
      error: 'test',
      status: 500,
      message: 'test',
    };

    expect(isHttpError(error)).toBe(true);
  });

  it('should return false if the error is not an HttpError', () => {
    const error = new Error('test');
    expect(isHttpError(error)).toBe(false);
  });

  it('should return false if the error is undefined', () => {
    const error: unknown = undefined;
    expect(isHttpError(error)).toBe(false);
  });
});
