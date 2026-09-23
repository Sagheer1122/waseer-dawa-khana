import { NextRequest } from 'next/server';
import { verifyAndResetPassword } from '@/backend/services/authService';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, pin, token, newPassword, newPin } = body;

    if (!email) {
      return errorResponse('Admin email is required.', 400);
    }

    if (!pin && !token) {
      return errorResponse('Please provide the 6-digit PIN from your email or use the reset link.', 400);
    }

    if (!newPassword && !newPin) {
      return errorResponse('Please provide a new password or a new security PIN.', 400);
    }

    if (newPassword && (typeof newPassword !== 'string' || newPassword.length < 8)) {
      return errorResponse('New password must be at least 8 characters long.', 400);
    }

    if (newPin && (typeof newPin !== 'string' || newPin.length < 4 || newPin.length > 8)) {
      return errorResponse('Security PIN must be between 4 and 8 digits.', 400);
    }

    const result = await verifyAndResetPassword({
      emailInput: email,
      pinInput: pin,
      tokenInput: token,
      newPassword,
      newPin,
    });

    return successResponse(
      {
        email: result.email,
      },
      200,
      {
        message: 'Password and security PIN updated successfully! You can now log in with your new credentials.',
      }
    );
  } catch (error: any) {
    console.error('[API Reset Password] Error:', error.message);
    return errorResponse(
      error.message || 'Failed to reset password. Please verify your PIN or request a new code.',
      400
    );
  }
}
