import { NextRequest } from 'next/server';
import { generatePasswordReset } from '@/backend/services/authService';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, type = 'password' } = body;

    if (!email || typeof email !== 'string') {
      return errorResponse('Valid admin email is required', 400);
    }

    const resetType = type === 'pin' ? 'pin' : 'password';
    const origin = req.nextUrl.origin || process.env.NEXT_PUBLIC_SITE_URL;
    const result = await generatePasswordReset(email, origin, resetType);

    return successResponse(
      {
        email: result.email,
        expiresAt: result.expiresAt,
        type: resetType,
      },
      200,
      {
        message: `A 6-digit recovery code has been sent to ${result.email}. Valid for 15 minutes.`,
      }
    );
  } catch (error: any) {
    console.error('[API Forgot Password] Error:', error.message);
    return errorResponse(
      error.message || 'Failed to process password reset request. Please check your credentials and try again.',
      400
    );
  }
}
