'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  UploadCloud,
  Check,
  Loader2,
  AlertCircle,
  X,
  ExternalLink,
} from 'lucide-react';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('growth');
  const [price, setPrice] = useState<number | ''>(0);
  const [discount, setDiscount] = useState<number | ''>(0);
  const [stock, setStock] = useState<number | ''>(0);
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  // Bottle Sizes
  const [sizes, setSizes] = useState<{ size: string; price: number; label: string; isPopular?: boolean }[]>([]);

  // Images
  const [imageUrl, setImageUrl] = useState('');
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch product on mount
  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${id}?t=${Date.now()}`);
        const data = await res.json();
        if (data.success && data.data) {
          const prod = data.data;
          setName(prod.name || '');
          setSlug(prod.slug || '');
          setSubtitle(prod.subtitle || '');
          setDescription(prod.description || '');
          setCategory(prod.category || 'growth');
          setPrice(prod.price ?? 0);
          setDiscount(prod.discount ?? 0);
          setStock(prod.stock ?? 0);
          setIsActive(prod.isActive ?? true);
          setIsFeatured(prod.isFeatured ?? false);
          setImageUrl(prod.imageUrl || '');
          setCloudinaryPublicId(prod.cloudinaryPublicId || '');
          setImagePreview(prod.imageUrl || '');
          setSizes(prod.sizes || []);
        } else {
          setError('Product not found');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    }

    if (id) loadProduct();
  }, [id]);

  const numPrice = typeof price === 'number' ? price : 0;
  const numDiscount = typeof discount === 'number' ? discount : 0;
  const finalPrice = Math.max(0, Math.round(numPrice * (1 - numDiscount / 100)));

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);
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

      setImageUrl(data.data.imageUrl);
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

    setSubmitting(true);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          subtitle: subtitle.trim(),
          description: description.trim(),
          category,
          price: numPrice,
          discount: numDiscount,
          stock: typeof stock === 'number' ? stock : 0,
          imageUrl: imageUrl || imagePreview,
          images: [imageUrl || imagePreview],
          sizes: sizes && sizes.length > 0 ? sizes : undefined,
          cloudinaryPublicId,
          isActive,
          isFeatured,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to update formulation');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to update formulation');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
        <span className="text-xs font-sans text-cream-300">Loading formulation data...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-cream-300 hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>

        {slug && (
          <Link
            href={`/product/${slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>View in Live Store</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      <div className="rounded-3xl bg-[#0C1E16] border border-emerald-900/40 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="border-b border-emerald-900/40 pb-4 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ivory">Edit Formulation</h2>
            <p className="font-sans text-xs text-cream-300">
              Update pricing, stock availability, discounts, or upload new imagery.
            </p>
          </div>
          <span className="text-[10.5px] font-mono px-3 py-1 rounded-full bg-black/40 border border-emerald-900/40 text-gold">
            ID: {id}
          </span>
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
                  Formulation Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#06120D] border border-emerald-800/60 focus:border-gold text-ivory text-xs outline-none transition-all"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#06120D] border border-emerald-800/60 focus:border-gold text-ivory text-xs outline-none transition-all"
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
                  rows={5}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#06120D] border border-emerald-800/60 focus:border-gold text-ivory text-xs outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* Right Column: Pricing & Image */}
            <div className="space-y-4">
              
              {/* Pricing Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-cream-200">
                    Base Price (Rs.) *
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

              {/* Calculated Final Price */}
              <div className="p-3.5 rounded-xl bg-[#071610] border border-gold/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-cream-300 font-bold block">
                    Customer Sale Price
                  </span>
                  <span className="text-xs text-cream-200">
                    After {numDiscount}% discount
                  </span>
                </div>
                <div className="font-mono text-lg font-bold text-gold">
                  Rs. {finalPrice.toLocaleString('en-PK')}
                </div>
              </div>

              {/* Bottle Sizes & Variant Prices */}
              {sizes.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#071610] border border-emerald-900/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-semibold text-cream-200 block">
                        Bottle Sizes &amp; Variant Prices
                      </label>
                      <span className="text-[10px] text-cream-400">
                        Edit individual bottle sizes and pricing shown on store
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const popIdx = sizes.findIndex((s) => s.isPopular);
                        const target = popIdx >= 0 ? popIdx : 0;
                        const next = [...sizes];
                        next[target] = { ...next[target], price: finalPrice };
                        setSizes(next);
                      }}
                      className="text-[10px] font-semibold text-gold hover:underline"
                    >
                      Sync Main to Sale Price
                    </button>
                  </div>
                  <div className="space-y-2">
                    {sizes.map((s, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-[#06120D] p-2.5 rounded-xl border border-emerald-800/40">
                        <div className="w-16">
                          <input
                            type="text"
                            value={s.size}
                            onChange={(e) => {
                              const next = [...sizes];
                              next[idx] = { ...next[idx], size: e.target.value };
                              setSizes(next);
                            }}
                            className="w-full bg-transparent text-ivory text-xs font-bold font-mono outline-none"
                            placeholder="100ml"
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={s.label}
                            onChange={(e) => {
                              const next = [...sizes];
                              next[idx] = { ...next[idx], label: e.target.value };
                              setSizes(next);
                            }}
                            className="w-full bg-transparent text-cream-300 text-[11px] outline-none"
                            placeholder="Label (e.g. Starter Bottle)"
                          />
                        </div>
                        <div className="w-24 flex items-center gap-1">
                          <span className="text-xs text-cream-400 font-mono">Rs.</span>
                          <input
                            type="number"
                            min="0"
                            value={s.price}
                            onChange={(e) => {
                              const next = [...sizes];
                              next[idx] = { ...next[idx], price: Number(e.target.value) };
                              setSizes(next);
                            }}
                            className="w-full bg-black/40 px-2 py-1 rounded text-gold text-xs font-mono font-bold outline-none border border-emerald-800/40"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const next = sizes.map((item, i) => ({ ...item, isPopular: i === idx }));
                            setSizes(next);
                          }}
                          className={`px-2 py-1 rounded text-[10px] font-semibold transition-colors ${
                            s.isPopular
                              ? 'bg-gold/20 text-gold border border-gold/40'
                              : 'text-cream-400 hover:text-ivory border border-transparent'
                          }`}
                        >
                          {s.isPopular ? '★ Main' : 'Make Main'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock */}
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

              {/* Cloudinary Image */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-cream-200">
                  Product Image
                </label>

                {imagePreview ? (
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-gold/40 bg-black/40 flex items-center justify-center">
                    <Image
                      src={imagePreview}
                      alt="Product Preview"
                      fill
                      className="object-cover"
                    />
                    {uploadingImage && (
                      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-2">
                        <Loader2 className="w-6 h-6 text-gold animate-spin" />
                        <span className="text-[11px] font-sans text-ivory">Uploading new image...</span>
                      </div>
                    )}
                    <label className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black text-ivory text-[11px] font-semibold border border-white/20 cursor-pointer shadow-lg">
                      <span>Change Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <label className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-emerald-800/60 hover:border-gold/60 rounded-2xl bg-[#06120D] cursor-pointer transition-all">
                    <UploadCloud className="w-8 h-8 text-gold mb-2" />
                    <span className="text-xs font-semibold text-cream-200">
                      Upload new image to Cloudinary
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

              {/* Toggles */}
              <div className="pt-2 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-cream-200">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="rounded text-gold focus:ring-gold"
                  />
                  <span>Active for Customers</span>
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

          {/* Actions */}
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
                  <span>Updating Formulation...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Update Formulation</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
