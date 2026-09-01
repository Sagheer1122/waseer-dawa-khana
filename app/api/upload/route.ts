import { NextRequest } from 'next/server';
import { uploadImageToCloudinary } from '@/backend/services/uploadService';
import { verifyAdminToken } from '@/backend/middleware/verifyAdmin';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';

export async function POST(req: NextRequest) {
  try {
    const admin = verifyAdminToken(req);
    if (!admin) {
      return errorResponse('Unauthorized: Admin access required', 401);
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return errorResponse('No image file provided', 400);
    }

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      return errorResponse('Invalid file type. Please upload JPEG, PNG, or WebP image.', 400);
    }

    // Validate size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      return errorResponse('File size exceeds 8MB limit.', 400);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await uploadImageToCloudinary(buffer);

    return successResponse(result, 201, { message: 'Image uploaded successfully to Cloudinary' });
  } catch (error: any) {
    return errorResponse(error.message || 'Image upload failed', 500);
  }
}
