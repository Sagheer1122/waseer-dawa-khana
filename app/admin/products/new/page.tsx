'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  UploadCloud,
  Check,
  Loader2,
  Sparkles,
  AlertCircle,
  X,
} from 'lucide-react';

export default function NewProductPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('growth');
  const [price, setPrice] = useState<number | ''>(2450);
  const [discount, setDiscount] = useState<number | ''>(15);
  const [stock, setStock] = useState<number | ''>(50);
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  // Image Upload State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Calculate live final sale price
  const numPrice = typeof price === 'number' ? price : 0;
  const numDiscount = typeof discount === 'number' ? discount : 0;
  const finalPrice = Math.max(0, Math.round(numPrice * (1 - numDiscount / 100)));

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);
    setError('');
    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Image upload failed');
      }

      setUploadedUrl(data.data.imageUrl);
      setCloudinaryPublicId(data.data.cloudinaryPublicId);
    } catch (err: any) {
      setError(`Image Upload: ${err.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide a formulation name');
      return;
    }
    if (!description.trim()) {
      setError('Please provide a description');
      return;
    }
    if (price === '' || price < 0) {
      setError('Please enter a valid price');
      return;
    }

    const primaryImage = uploadedUrl || imagePreview || '/images/waseer-product-bottle.jpg';

    setSubmitting(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          subtitle: subtitle.trim(),
          description: description.trim(),
          category,
          price: numPrice,
          discount: numDiscount,
          stock: typeof stock === 'number' ? stock : 10,
          imageUrl: primaryImage,
          cloudinaryPublicId,
          isActive,
          isFeatured,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to create formulation');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to save formulation');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-cream-300 hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>

      <div className="rounded-3xl bg-[#0C1E16] border border-emerald-900/40 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="border-b border-emerald-900/40 pb-4">
          <h2 className="font-serif text-2xl font-bold text-ivory">Add New Herbal Formulation</h2>
          <p className="font-sans text-xs text-cream-300">
            Create a new product with live pricing, discount calculations, and Cloudinary media.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-600/50 text-rose-200 text-xs font-sans flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Column: Details */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-cream-200">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. WASEER Herbal Hair Oil"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#06120D] border border-emerald-800/60 focus:border-gold text-ivory placeholder:text-cream-400/50 text-xs outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-cream-200">
                  Subtitle / Brand Attribution
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. By the product of WASEER Dawa Khana"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#06120D] border border-emerald-800/60 focus:border-gold text-ivory placeholder:text-cream-400/50 text-xs outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-cream-200">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#06120D] border border-emerald-800/60 focus:border-gold text-ivory text-xs outline-none transition-all cursor-pointer"
                >
                  <option value="growth">Hair Growth &amp; Root Strengthening</option>
                  <option value="repair">Dry &amp; Damaged Repair</option>
                  <option value="scalp">Scalp Health &amp; Dandruff Defense</option>
                  <option value="daily">Daily Gloss &amp; Softness</option>
                  <option value="bundles">Ritual Bundles (Sets)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-cream-200">
                  Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the botanical ingredients, unani formula, and hair care benefits..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#06120D] border border-emerald-800/60 focus:border-gold text-ivory placeholder:text-cream-400/50 text-xs outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* Right Column: Pricing & Image Upload */}
            <div className="space-y-4">
              
              {/* Pricing Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-cream-200">
                    Original Price (Rs.) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#06120D] border border-emerald-800/60 focus:border-gold text-ivory font-mono text-xs outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-cream-200">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#06120D] border border-emerald-800/60 focus:border-gold text-ivory font-mono text-xs outline-none"
                  />
                </div>
              </div>

              {/* Calculated Final Price Pill */}
              <div className="p-3.5 rounded-xl bg-[#071610] border border-gold/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-cream-300 font-bold block">
                    Calculated Customer Price
                  </span>
                  <span className="text-xs text-cream-200">
                    After {numDiscount}% discount
                  </span>
                </div>
                <div className="font-mono text-lg font-bold text-gold">
                  Rs. {finalPrice.toLocaleString('en-PK')}
                </div>
              </div>

              {/* Stock Quantity */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-cream-200">
                  Stock Units Available *
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#06120D] border border-emerald-800/60 focus:border-gold text-ivory font-mono text-xs outline-none"
                />
              </div>

              {/* Cloudinary Image Upload */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-cream-200">
                  Product Image (Cloudinary Upload)
                </label>

                {imagePreview ? (
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-gold/40 bg-black/40 flex items-center justify-center group">
                    <Image
                      src={imagePreview}
                      alt="Upload Preview"
                      fill
                      className="object-cover"
                    />
                    {uploadingImage && (
                      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-2">
                        <Loader2 className="w-6 h-6 text-gold animate-spin" />
                        <span className="text-[11px] font-sans text-ivory">Uploading to Cloudinary...</span>
                      </div>
                    )}
                    {!uploadingImage && (
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview('');
                          setUploadedUrl('');
                          setCloudinaryPublicId('');
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-600/90 text-white hover:bg-rose-500 shadow-md"
                        title="Remove Image"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ) : (
                  <label className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-emerald-800/60 hover:border-gold/60 rounded-2xl bg-[#06120D] cursor-pointer transition-all">
                    <UploadCloud className="w-8 h-8 text-gold mb-2" />
                    <span className="text-xs font-semibold text-cream-200">
                      Click to upload image
                    </span>
                    <span className="text-[10px] text-cream-400 mt-1">
                      PNG, JPG, or WebP up to 8MB
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Status Toggles */}
              <div className="pt-2 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-cream-200">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="rounded text-gold focus:ring-gold"
                  />
                  <span>Active for Customers (Live in Store)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-cream-200">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded text-gold focus:ring-gold"
                  />
                  <span>Featured Product</span>
                </label>
              </div>

            </div>

          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-emerald-900/40 flex items-center justify-end gap-3">
            <Link
              href="/admin/products"
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-cream-200 text-xs font-semibold transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting || uploadingImage}
              className="px-6 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-[#0A1611] font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-98 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Formulation...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Save Formulation</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
