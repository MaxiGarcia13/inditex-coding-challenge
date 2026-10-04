import type { NextRequest } from 'next/server';
import process from 'node:process';
import { NextResponse } from 'next/server';
import {
  ACCESS_TOKEN_COOKIE,
  createAccessTokenValue,
  isValidAccessToken,
} from '@/domain/auth';

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const isApiRequest = request.nextUrl.pathname.startsWith('/api/');

  if (isApiRequest) {
    if (!isValidAccessToken(accessToken)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.next();
  }

  const response = NextResponse.next();

  if (!isValidAccessToken(accessToken)) {
    response.cookies.set(ACCESS_TOKEN_COOKIE, createAccessTokenValue(), {
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
