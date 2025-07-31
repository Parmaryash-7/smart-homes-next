import { NextResponse } from 'next/server';

export function middleware(request) {
  // console.log("MIDDLE")
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  if (pathname === '/mulberry-park' && url.search) {
    url.search = '';
    return NextResponse.redirect(url, 301);
  }

  if (pathname === '/dholera-SIR') {
    url.pathname = '/dholera-sir';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/mulberry-park', '/dholera-SIR'],
};
