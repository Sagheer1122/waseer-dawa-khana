import cloudinary from '../config/cloudinary';

export interface UploadResult {
  imageUrl: string;
  cloudinaryPublicId: string;
}

/**
 * Uploads a base64 or buffer image file to Cloudinary in the 'waseer-products' folder.
 */
export async function uploadImageToCloudinary(
  fileBuffer: Buffer | string,
  folder = 'waseer-products'
): Promise<UploadResult> {
  // If buffer, convert to base64 data URI
  let fileData = fileBuffer;
  if (Buffer.isBuffer(fileBuffer)) {
    fileData = `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;
  }

  // Ensure Cloudinary is configured
  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.warn('[Cloudinary] Missing API credentials, returning fallback mock upload result');
    return {
      imageUrl: typeof fileData === 'string' && fileData.startsWith('http') ? fileData : '/images/waseer-product-bottle.jpg',
      cloudinaryPublicId: `local-mock-${Date.now()}`,
    };
  }

  const result = await cloudinary.uploader.upload(fileData as string, {
    folder,
    resource_type: 'image',
    transformation: [
      { width: 1200, height: 1200, crop: 'limit', quality: 'auto:good', fetch_format: 'auto' },
    ],
  });

  return {
    imageUrl: result.secure_url,
    cloudinaryPublicId: result.public_id,
  };
}

/**
 * Deletes an image from Cloudinary by its public ID.
 */
export async function deleteImageFromCloudinary(publicId: string): Promise<boolean> {
  if (!publicId || publicId.startsWith('local-mock-')) {
    return true;
  }

  try {
    const res = await cloudinary.uploader.destroy(publicId);
    return res.result === 'ok';
  } catch (error) {
    console.error('[Cloudinary] Failed to delete asset:', publicId, error);
    return false;
  }
}
