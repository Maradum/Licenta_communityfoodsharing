import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Array of paths that require authentication
const protectedPaths = [
  '/add-listing',
  '/profile',
  '/my-listings',
  '/dashboard',
  '/messages',
];

// Array of paths that require admin authentication
const adminPaths = [
  '/admin/dashboard',
  '/admin/users',
];

// Array of paths that are only accessible to non-authenticated users
const authPaths = [
  '/login',
  '/signup',
];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  // Check if the path requires authentication
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  const isAdminPath = adminPaths.some(path => pathname.startsWith(path));
  const isAuthPath = authPaths.some(path => pathname.startsWith(path));
  const isAdminLoginPath = pathname.startsWith('/admin/login');

  try {
    if (token) {
      // Verify the token
      const verified = await jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      const payload = verified.payload as { role?: string };
      const isAdmin = payload.role === 'admin';

      // Handle authenticated users trying to access login pages
      if (isAuthPath || isAdminLoginPath) {
        // If admin user tries to access admin login, redirect to admin dashboard
        if (isAdminLoginPath && isAdmin) {
          return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
        // If regular user tries to access regular login, redirect to dashboard
        if (isAuthPath && !isAdminLoginPath) {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        // If non-admin tries to access admin login, redirect to dashboard
        if (isAdminLoginPath && !isAdmin) {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
      }

      // Handle admin path access
      if (isAdminPath) {
        // Allow admin users to access admin paths
        if (isAdmin) {
          return NextResponse.next();
        }
        // Redirect non-admin users to dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Allow authenticated users to access protected paths
      if (isProtectedPath) {
        return NextResponse.next();
      }
    } else {
      // Handle non-authenticated users
      if (isProtectedPath) {
        // Redirect to login if trying to access protected routes
        const url = new URL('/login', request.url);
        url.searchParams.set('from', pathname);
        return NextResponse.redirect(url);
      }

      if (isAdminPath) {
        // Redirect to admin login if trying to access admin paths
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      // Allow access to login pages for non-authenticated users
      if (isAuthPath || isAdminLoginPath) {
        return NextResponse.next();
      }
    }
  } catch (error) {
    // Handle invalid tokens
    if (isProtectedPath) {
      const url = new URL('/login', request.url);
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }

    if (isAdminPath) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Clear invalid token
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete('token');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 