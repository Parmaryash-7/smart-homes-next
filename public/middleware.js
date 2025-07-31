import { NextResponse } from 'next/server';
export function middleware(request) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  // ✅ Strip query params only on /mulberry-park
  if (pathname === '/mulberry-park' && url.search) {
    url.search = ''; // Remove all query parameters
    return NextResponse.redirect(url, 301);
  }
  // ✅ Redirect /dholera-SIR → /dholera-sir
  if (pathname === '/dholera-SIR') {
    console.log("middle");
    url.pathname = '/dholera-sir';
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}
// ✅ Apply only to relevant paths
export const config = {
  matcher: ['/mulberry-park', '/dholera-SIR'],
};