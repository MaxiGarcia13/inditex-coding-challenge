import type { HttpError } from '@/domain/http';
import { describe, expect, it } from 'vitest';
import { mapHttpError } from './http-error.adapter';

describe('http error adapter', () => {
  it('should map a http error', () => {
    const error: HttpError = {
      error: 'unknown',
      message: 'An unknown error occurred',
    };

    const mappedError = mapHttpError(error);

    expect(mappedError).toEqual(error);
  });

  it('should map a unknown error', () => {
    const error = new Error('An unknown error occurred');

    const mappedError = mapHttpError(error);

    expect(mappedError).toEqual({
      error: 'unknown',
      message: 'An unknown error occurred',
    });
  });
});
