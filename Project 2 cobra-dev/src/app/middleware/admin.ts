import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

const adminEmails = ['icodelife307@gmail.com']

export function middleware(req: NextRequest) {
  const { userId } = getAuth(req);

  // If the user is not logged in, redirect to login page
  if (!userId) {
    return NextResponse.redirect('/login');
  }

  // Fetch user details
  const user = getAuth(req);

  // Check if the user email is in the list of admin emails
  if (!adminEmails.includes(user.emailAddresses[0].emailAddress)) {
    return NextResponse.redirect('/');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
