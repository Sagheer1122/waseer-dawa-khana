import { NextRequest } from 'next/server';
import { updateOrderStatus } from '@/backend/services/orderService';
import { verifyAdminToken } from '@/backend/middleware/verifyAdmin';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';

interface Params {
  params: { id: string };
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const admin = verifyAdminToken(req);
    if (!admin) {
      return errorResponse('Unauthorized: Admin access required', 401);
    }

    const body = await req.json();
    const { status } = body;

    if (!status) {
      return errorResponse('Status is required', 400);
    }

    const updated = await updateOrderStatus(params.id, status);
    return successResponse(updated, 200, { message: 'Order status updated' });
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to update order status', 400);
  }
}
