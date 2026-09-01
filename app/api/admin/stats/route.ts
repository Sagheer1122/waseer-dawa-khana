import { NextRequest } from 'next/server';
import { getDashboardStats } from '@/backend/services/orderService';
import { verifyAdminToken } from '@/backend/middleware/verifyAdmin';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const admin = verifyAdminToken(req);
    if (!admin) {
      return errorResponse('Unauthorized: Admin access required', 401);
    }

    const stats = await getDashboardStats();
    return successResponse(stats);
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch dashboard stats', 500);
  }
}
