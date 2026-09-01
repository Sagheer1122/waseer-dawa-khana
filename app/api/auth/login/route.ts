import { NextRequest } from 'next/server';
import { loginAdmin } from '@/backend/services/authService';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return errorResponse('Email and password are required', 400);
    }

    const { admin, token } = await loginAdmin(email, password);

    const response = successResponse(
      { admin },
      200,
      { message: 'Login successful' }
    );

    // Set secure HTTP-only cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    return errorResponse(error.message || 'Login failed', 401);
  }
}
