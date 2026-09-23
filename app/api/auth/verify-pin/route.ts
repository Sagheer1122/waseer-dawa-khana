import { NextRequest } from 'next/server';
import connectDB from '@/backend/config/db';
import Admin from '@/backend/models/Admin';
import { comparePassword, ensureDefaultAdmin } from '@/backend/services/authService';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pin } = body;

    if (!pin || typeof pin !== 'string') {
      return errorResponse('Security PIN is required', 400);
    }

    const cleanPin = pin.trim();

    await connectDB();
    await ensureDefaultAdmin();

    const admin = await Admin.findOne({});

    let isValid = false;

    const defaultPin = process.env.ADMIN_GATEWAY_PIN || '6358';

    if (admin && admin.securityPin) {
      isValid = await comparePassword(cleanPin, admin.securityPin);
      // Fallback check if stored in plain text or equals default PIN
      if (!isValid && (cleanPin === admin.securityPin || cleanPin === defaultPin)) {
        isValid = true;
      }
    } else {
      // Default initial PIN
      if (cleanPin === defaultPin) {
        isValid = true;
      }
    }

    if (!isValid) {
      return errorResponse('Incorrect security passcode. Please try again.', 401);
    }

    return successResponse({ verified: true }, 200, { message: 'PIN verified successfully' });
  } catch (error: any) {
    console.error('[Verify PIN] Error:', error.message);
    // Graceful fallback for local development or connection issue
    return errorResponse(error.message || 'Passcode verification failed', 500);
  }
}
