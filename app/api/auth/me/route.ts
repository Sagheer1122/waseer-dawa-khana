import { NextRequest } from 'next/server';
import { verifyAdminToken } from '@/backend/middleware/verifyAdmin';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';

export async function GET(req: NextRequest) {
  const admin = verifyAdminToken(req);
  if (!admin) {
    return errorResponse('Unauthorized', 401);
  }

  return successResponse({ admin });
}
