import { NextRequest } from 'next/server';
import {
  getProductByIdOrSlug,
  updateProduct,
  deleteProduct,
} from '@/backend/services/productService';
import { verifyAdminToken } from '@/backend/middleware/verifyAdmin';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';

interface Params {
  params: { id: string };
}

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const product = await getProductByIdOrSlug(params.id);
    if (!product) {
      return errorResponse('Product not found', 404);
    }
    return successResponse(product);
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to get product', 500);
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const admin = verifyAdminToken(req);
    if (!admin) {
      return errorResponse('Unauthorized: Admin access required', 401);
    }

    const body = await req.json();
    const updated = await updateProduct(params.id, body);

    if (!updated) {
      return errorResponse('Product not found', 404);
    }

    return successResponse(updated, 200, { message: 'Product updated successfully' });
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to update product', 400);
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const admin = verifyAdminToken(req);
    if (!admin) {
      return errorResponse('Unauthorized: Admin access required', 401);
    }

    await deleteProduct(params.id);
    return successResponse({ deleted: true }, 200, {
      message: 'Product deleted successfully',
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to delete product', 400);
  }
}
