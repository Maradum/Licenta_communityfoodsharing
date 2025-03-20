import { NextRequest, NextResponse } from 'next/server';

// Rutele care necesită autentificare
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/admin',
  '/add-listing',
  '/my-listings',
  '/messages'
];

export async function middleware(request: NextRequest) {
  // Verifică dacă utilizatorul este autentificat pentru rutele protejate
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;
  
  // Verifică dacă utilizatorul încearcă să acceseze o rută protejată
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Dacă este o rută protejată și nu există token, redirecționează către pagina de login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
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