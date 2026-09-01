import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductSize {
  size: string;
  price: number;
  label?: string;
  isPopular?: boolean;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  subtitle?: string;
  price: number;
  discount: number;
  finalPrice: number;
  stock: number;
  imageUrl: string;
  cloudinaryPublicId?: string;
  images: string[];
  category: string;
  sizes: IProductSize[];
  benefits: string[];
  inStock: boolean;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSizeSchema = new Schema<IProductSize>(
  {
    size: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    label: { type: String, default: '' },
    isPopular: { type: Boolean, default: false },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      default: '',
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Base price is required'],
      min: [0, 'Price cannot be negative'],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative'],
      max: [100, 'Discount cannot exceed 100%'],
    },
    finalPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    stock: {
      type: Number,
      default: 10,
      min: [0, 'Stock cannot be negative'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Primary image URL is required'],
    },
    cloudinaryPublicId: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: 'growth',
      trim: true,
    },
    sizes: {
      type: [ProductSizeSchema],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Pre-save hook: compute finalPrice and inStock boolean automatically
ProductSchema.pre('save', function () {
  const discountRate = (this.discount || 0) / 100;
  this.finalPrice = Math.max(0, Math.round(this.price * (1 - discountRate)));
  this.inStock = (this.stock || 0) > 0;

  // Sync images array if empty
  if (!this.images || this.images.length === 0) {
    this.images = [this.imageUrl];
  } else if (!this.images.includes(this.imageUrl)) {
    this.images.unshift(this.imageUrl);
  }
});

// Avoid re-compiling model in Next.js hot-reload
export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
