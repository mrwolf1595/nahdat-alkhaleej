// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import createIntlMiddleware from 'next-intl/middleware';

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed' // Allows URLs without locale prefix to default to 'en'
});

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Handle admin protected routes first
  const isAdminProtected = pathname.startsWith('/admin') && pathname !== '/admin/login';
  
  if (isAdminProtected) {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // استخدام dynamic import للحصول على secret من env (آمن)
    const { getJwtSecret } = await import('@/lib/jwt-secret');
    const secret = await getJwtSecret();

    try {
      await jwtVerify(token, secret);
      // Continue with normal flow
    } catch (err) {
      console.error('❌ Invalid token in middleware', err);

      // في حالة التوكن بايظة أو منتهية: نحذف الكوكي تلقائيًا
      const res = NextResponse.redirect(new URL('/admin/login', request.url));
      res.cookies.set('admin_token', '', { maxAge: 0, path: '/' });
      return res;
    }
  }
  
  // For all other routes, use the internationalization middleware
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - static files (e.g. files in the public folder)
  // - filenames with an extension (e.g. favicon.ico)
  // - api routes
  matcher: ['/((?!api|_next|.*\\..*).*)', '/admin/:path*']
};