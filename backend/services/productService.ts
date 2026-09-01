import connectDB from '../config/db';
import Product, { IProduct } from '../models/Product';
import { PRODUCTS as STATIC_PRODUCTS } from '@/data/products';
import { deleteImageFromCloudinary } from './uploadService';

/**
 * Auto-seeds initial catalog if MongoDB database collection is empty.
 */
export async function seedInitialProductsIfEmpty(): Promise<void> {
  const count = await Product.countDocuments();
  if (count === 0 && STATIC_PRODUCTS && STATIC_PRODUCTS.length > 0) {
    console.log('[ProductService] Seeding initial products from static catalog...');
    const seedData = STATIC_PRODUCTS.map((sp) => {
      const discount = sp.originalPrice && sp.originalPrice > sp.basePrice
        ? Math.round(((sp.originalPrice - sp.basePrice) / sp.originalPrice) * 100)
        : 0;

      return {
        name: sp.name,
        slug: sp.slug,
        description: sp.description,
        subtitle: sp.subtitle || '',
        price: sp.originalPrice || sp.basePrice,
        discount: discount,
        finalPrice: sp.basePrice,
        stock: 50,
        imageUrl: sp.images[0] || '/images/waseer-product-bottle.jpg',
        cloudinaryPublicId: '',
        images: sp.images,
        category: sp.category || 'growth',
        sizes: sp.sizes || [],
        benefits: sp.benefits || [],
        inStock: true,
        isActive: true,
        isFeatured: sp.isFeatured || false,
      };
    });

    await Product.insertMany(seedData);
    console.log(`[ProductService] Seeded ${seedData.length} products successfully.`);
  }
}

/**
 * Fetches all products. By default, public storefront only receives active products.
 */
export async function getAllProducts(includeInactive = false): Promise<IProduct[]> {
  const db = await connectDB();

  if (!db) {
    console.error('[ProductService] MongoDB connection unavailable.');
    return [];
  }

  await seedInitialProductsIfEmpty();

  const query = includeInactive ? {} : { isActive: true };
  return Product.find(query).sort({ isFeatured: -1, createdAt: -1 }).lean();
}

/**
 * Fetches a single product by ID or Slug.
 */
export async function getProductByIdOrSlug(idOrSlug: string): Promise<IProduct | null> {
  const db = await connectDB();

  if (!db) {
    console.error('[ProductService] MongoDB connection unavailable.');
    return null;
  }

  // Check if valid ObjectId
  let product: IProduct | null = null;
  if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    product = await Product.findById(idOrSlug).lean();
  }

  if (!product) {
    product = await Product.findOne({ slug: idOrSlug.toLowerCase() }).lean();
  }

  return product;
}

/**
 * Creates a new product.
 */
export async function createProduct(data: Partial<IProduct>): Promise<IProduct> {
  await connectDB();

  if (!data.name || !data.description || data.price === undefined || !data.imageUrl) {
    throw new Error('Name, description, price, and imageUrl are required');
  }

  // Generate unique slug
  let slug = (data.slug || data.name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const existingSlug = await Product.findOne({ slug });
  if (existingSlug) {
    slug = `${slug}-${Date.now().toString().slice(-4)}`;
  }

  const discount = Math.min(100, Math.max(0, Number(data.discount) || 0));
  const price = Math.max(0, Number(data.price));
  const finalPrice = Math.max(0, Math.round(price * (1 - discount / 100)));
  const stock = Math.max(0, Number(data.stock) || 0);

  const newProduct = new Product({
    ...data,
    slug,
    price,
    discount,
    finalPrice,
    stock,
    inStock: stock > 0,
    isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
    images: data.images && data.images.length > 0 ? data.images : [data.imageUrl],
    sizes: data.sizes && data.sizes.length > 0 ? data.sizes : [
      { size: '100ml', price: finalPrice, label: 'Standard Ritual', isPopular: true }
    ],
  });

  await newProduct.save();
  return newProduct;
}

/**
 * Updates an existing product.
 */
export async function updateProduct(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
  await connectDB();

  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Product not found');
  }

  // If image changed and old image has a Cloudinary public ID, cleanup old asset
  if (data.imageUrl && data.imageUrl !== product.imageUrl && product.cloudinaryPublicId) {
    await deleteImageFromCloudinary(product.cloudinaryPublicId);
  }

  // Recalculate price & discount if provided
  if (data.price !== undefined) {
    product.price = Math.max(0, Number(data.price));
  }
  if (data.discount !== undefined) {
    product.discount = Math.min(100, Math.max(0, Number(data.discount)));
  }
  product.finalPrice = Math.max(0, Math.round(product.price * (1 - product.discount / 100)));

  if (data.stock !== undefined) {
    product.stock = Math.max(0, Number(data.stock));
    product.inStock = product.stock > 0;
  }

  if (data.name) product.name = data.name;
  if (data.description) product.description = data.description;
  if (data.subtitle !== undefined) product.subtitle = data.subtitle;
  if (data.category) product.category = data.category;

  // Sync images array with updated imageUrl
  if (data.imageUrl) {
    product.imageUrl = data.imageUrl;
    product.images = [data.imageUrl];
    product.markModified('images');
  } else if (data.images && data.images.length > 0) {
    product.images = data.images;
    product.imageUrl = data.images[0];
    product.markModified('images');
  }

  if (data.cloudinaryPublicId !== undefined) product.cloudinaryPublicId = data.cloudinaryPublicId;
  if (data.isActive !== undefined) product.isActive = Boolean(data.isActive);
  if (data.isFeatured !== undefined) product.isFeatured = Boolean(data.isFeatured);

  // Sync bottle sizes & pricing
  if (data.sizes && Array.isArray(data.sizes) && data.sizes.length > 0) {
    product.sizes = data.sizes;
    product.markModified('sizes');
  } else if (product.sizes && product.sizes.length > 0 && (data.price !== undefined || data.discount !== undefined)) {
    // Automatically sync main/popular size to the updated finalPrice
    const popularIdx = product.sizes.findIndex((s) => s.isPopular);
    const targetIdx = popularIdx >= 0 ? popularIdx : 0;
    product.sizes[targetIdx].price = product.finalPrice;
    product.markModified('sizes');
  }

  if (data.benefits) product.benefits = data.benefits;

  await product.save();
  return product;
}

/**
 * Deletes a product and cleans up its Cloudinary asset.
 */
export async function deleteProduct(id: string): Promise<boolean> {
  await connectDB();

  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Product not found');
  }

  if (product.cloudinaryPublicId) {
    await deleteImageFromCloudinary(product.cloudinaryPublicId);
  }

  await Product.findByIdAndDelete(id);
  return true;
}
