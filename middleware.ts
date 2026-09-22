import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminToken = request.cookies.get('admin_token')?.value;

  // 1. Direct /admin/login is permanently 404 (disabled from URL access)
  if (pathname === '/admin/login') {
    return NextResponse.rewrite(new URL('/not-found', request.url), {
      status: 404,
    });
  }

  // 2. Protect all /admin dashboard routes
  if (pathname.startsWith('/admin')) {
    // If not authenticated, return 404 (hides the dashboard's existence completely)
    if (!adminToken) {
      return NextResponse.rewrite(new URL('/not-found', request.url), {
        status: 404,
      });
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
