import { NextRequest } from 'next/server';
import { getAllProducts, createProduct } from '@/backend/services/productService';
import { verifyAdminToken } from '@/backend/middleware/verifyAdmin';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const includeInactive = searchParams.get('all') === 'true';

    // If requesting inactive products, verify admin authentication
    if (includeInactive) {
      const admin = verifyAdminToken(req);
      if (!admin) {
        return errorResponse('Admin authentication required to view inactive products', 401);
      }
    }

    const products = await getAllProducts(includeInactive);
    return successResponse(products, 200, { count: products.length });
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch products', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = verifyAdminToken(req);
    if (!admin) {
      return errorResponse('Unauthorized: Admin access required', 401);
    }

    const body = await req.json();
    const product = await createProduct(body);

    return successResponse(product, 201, { message: 'Product created successfully' });
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to create product', 400);
  }
}
