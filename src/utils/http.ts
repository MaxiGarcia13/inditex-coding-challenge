import type { HttpError } from '@/domain/http';

export function isHttpError(error: unknown): error is HttpError {
  return typeof error === 'object' && error !== null && 'status' in error;
}
