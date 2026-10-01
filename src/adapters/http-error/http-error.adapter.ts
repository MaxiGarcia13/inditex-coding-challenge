import type { HttpError } from '@/domain/http';
import { isHttpError } from '@/utils/http';

export function mapHttpError(error: unknown): HttpError {
  if (isHttpError(error)) {
    return error;
  }

  return {
    error: 'unknown',
    message: error instanceof Error ? error.message : 'An unknown error occurred',
  } as HttpError;
}
