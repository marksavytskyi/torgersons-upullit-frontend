import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_COOKIE = 'site_access';
const PASSWORD         = process.env.SITE_PASSWORD ?? 'upullit2024';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the password gate, API routes, and static assets
  if (
    pathname.startsWith('/enter') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(PROTECTED_COOKIE);
  if (cookie?.value === PASSWORD) {
    return NextResponse.next();
  }

  // Redirect to gate, preserving destination
  const url = request.nextUrl.clone();
  url.pathname = '/enter';
  url.searchParams.set('from', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
