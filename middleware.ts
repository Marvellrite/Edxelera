import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const AUTH_COOKIE_NAME = 'access_token';
const AUTH_PATH = '/auth';
const HOME_PATH = '/home';

function getPathWithSearch(request: NextRequest) {
  return `${request.nextUrl.pathname}${request.nextUrl.search}`;
}

export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const isAuthenticated = Boolean(request.cookies.get(AUTH_COOKIE_NAME)?.value);
  const isAuthRoute = nextUrl.pathname.startsWith(AUTH_PATH);
  const isHomeRoute = nextUrl.pathname.startsWith(HOME_PATH);

  if (isHomeRoute && !isAuthenticated) {
    const redirectUrl = nextUrl.clone();
    redirectUrl.pathname = AUTH_PATH;
    redirectUrl.search = '';
    redirectUrl.searchParams.set('next', getPathWithSearch(request));

    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthRoute && isAuthenticated) {
    const redirectUrl = nextUrl.clone();
    redirectUrl.pathname = HOME_PATH;
    redirectUrl.search = '';

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home/:path*', '/auth/:path*'],
};
