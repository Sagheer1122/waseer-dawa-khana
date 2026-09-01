import { NextRequest } from 'next/server';
import { successResponse } from '@/backend/utils/apiResponse';

export async function POST(_req: NextRequest) {
  const response = successResponse({ loggedOut: true }, 200, {
    message: 'Logged out successfully',
  });

  // Clear cookie
  response.cookies.set('admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}
