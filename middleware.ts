import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminToken = request.cookies.get('admin_token')?.value;

  // 1. Allow public admin reset-password page
  if (pathname === '/admin/reset-password') {
    return NextResponse.next();
  }

  // 2. Allow public admin login page
  if (pathname === '/admin/login') {
    // If already logged in, redirect to admin dashboard
    if (adminToken) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  // 3. Protect all other /admin routes (dashboard, products, orders, etc.)
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    if (!adminToken) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
