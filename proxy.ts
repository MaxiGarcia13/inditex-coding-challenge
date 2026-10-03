import type { NextRequest } from 'next/server';
import process from 'node:process';
import { NextResponse } from 'next/server';
import {
  createSessionValue,
  INTERNAL_SESSION_HEADER,
  isInternalSession,
  isValidSession,
  SESSION_COOKIE,
} from '@/domain/auth';

export function proxy(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE)?.value;
  const isApiRequest = request.nextUrl.pathname.startsWith('/api/');

  if (isApiRequest) {
    const hasSession = isValidSession(session);
    const hasInternalAccess = isInternalSession(
      request.headers.get(INTERNAL_SESSION_HEADER),
    );

    if (!hasSession && !hasInternalAccess) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.next();
  }

  const response = NextResponse.next();

  if (!isValidSession(session)) {
    response.cookies.set(SESSION_COOKIE, createSessionValue(), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60,
    });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
