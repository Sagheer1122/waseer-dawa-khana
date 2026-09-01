import { NextRequest } from 'next/server';
import { createOrder, getAllOrders } from '@/backend/services/orderService';
import { verifyAdminToken } from '@/backend/middleware/verifyAdmin';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { order, whatsappUrl } = await createOrder(body);

    return successResponse(
      {
        orderNumber: order.orderNumber,
        orderId: order._id,
        whatsappUrl,
        totalAmount: order.totalAmount,
      },
      201,
      { message: 'Order registered successfully' }
    );
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to place order', 400);
  }
}

export async function GET(req: NextRequest) {
  try {
    const admin = verifyAdminToken(req);
    if (!admin) {
      return errorResponse('Unauthorized: Admin access required', 401);
    }

    const orders = await getAllOrders();
    return successResponse(orders, 200, { count: orders.length });
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch orders', 500);
  }
}
