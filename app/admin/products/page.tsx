'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  AlertCircle,
  Loader2,
  RefreshCw,
  Eye,
  Search,
} from 'lucide-react';

interface ProductItem {
  _id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  discount: number;
  finalPrice: number;
  stock: number;
  imageUrl: string;
  isActive: boolean;
  isFeatured?: boolean;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products?all=true');
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (e) {
      console.error('Failed to fetch products', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Quick Toggle Active/Inactive
  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, isActive: !currentStatus } : p))
        );
        showToast(`Product is now ${!currentStatus ? 'Active' : 'Inactive'}`);
      }
    } catch (err) {
      console.error('Toggle status error', err);
    } finally {
      setActionLoading(null);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        setDeleteConfirmId(null);
        showToast('Product deleted successfully');
      }
    } catch (err) {
      console.error('Delete error', err);
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-sans text-xs font-bold shadow-2xl flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-ivory">Formulations Catalog</h2>
          <p className="font-sans text-xs text-cream-300">
            Total {products.length} products registered in database
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchProducts}
            className="p-2.5 rounded-xl bg-[#0D2117] hover:bg-[#122A1E] text-cream-200 border border-emerald-900/50 transition-all cursor-pointer"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-[#0A1611] font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-98"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Formulation</span>
          </Link>
        </div>
      </div>

      {/* Search Filter */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by formulation name or category..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1A13] border border-emerald-900/50 text-ivory placeholder:text-cream-400/60 text-xs outline-none focus:border-gold transition-all"
        />
      </div>

      {/* Table Container */}
      <div className="rounded-3xl bg-[#0C1E16] border border-emerald-900/40 overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
            <span className="text-xs font-sans text-cream-300">Loading catalog from MongoDB...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <p className="font-serif text-lg text-cream-200">No products found</p>
            <Link
              href="/admin/products/new"
              className="inline-block px-4 py-2 rounded-xl bg-gold text-[#0A1611] text-xs font-bold"
            >
              Add First Product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#081510] text-[10.5px] uppercase tracking-wider text-gold/90 font-bold border-b border-emerald-900/40">
                <tr>
                  <th className="py-3.5 px-4">Image</th>
                  <th className="py-3.5 px-4">Product Name</th>
                  <th className="py-3.5 px-4">Base Price</th>
                  <th className="py-3.5 px-4">Discount</th>
                  <th className="py-3.5 px-4">Sale Price</th>
                  <th className="py-3.5 px-4">Stock</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/20 text-cream-100">
                {filtered.map((prod) => (
                  <tr
                    key={prod._id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/40 border border-emerald-900/50 relative">
                        <Image
                          src={prod.imageUrl || '/images/waseer-product-bottle.jpg'}
                          alt={prod.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>

                    {/* Product Name */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-ivory leading-snug">{prod.name}</div>
                      <div className="text-[10px] text-cream-300 capitalize">{prod.category}</div>
                    </td>

                    {/* Base Price */}
                    <td className="py-3 px-4 font-mono font-medium text-cream-200">
                      Rs. {prod.price.toLocaleString('en-PK')}
                    </td>

                    {/* Discount */}
                    <td className="py-3 px-4">
                      {prod.discount > 0 ? (
                        <span className="px-2 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-800/50 text-[10px] font-bold">
                          {prod.discount}% OFF
                        </span>
                      ) : (
                        <span className="text-cream-400 text-[11px]">—</span>
                      )}
                    </td>

                    {/* Final Sale Price */}
                    <td className="py-3 px-4 font-mono font-bold text-gold">
                      Rs. {prod.finalPrice.toLocaleString('en-PK')}
                    </td>

                    {/* Stock */}
                    <td className="py-3 px-4">
                      {prod.stock === 0 ? (
                        <span className="px-2.5 py-1 rounded-full bg-rose-900/40 text-rose-300 text-[10.5px] font-bold">
                          Out of Stock
                        </span>
                      ) : prod.stock <= 5 ? (
                        <span className="px-2.5 py-1 rounded-full bg-amber-900/40 text-amber-300 text-[10.5px] font-bold">
                          {prod.stock} Left (Low)
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-900/40 text-emerald-300 text-[10.5px] font-bold">
                          {prod.stock} Units
                        </span>
                      )}
                    </td>

                    {/* Active/Inactive Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleActive(prod._id, prod.isActive)}
                        disabled={actionLoading === prod._id}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                          prod.isActive
                            ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30'
                            : 'bg-rose-950/40 text-rose-400 border border-rose-800/40 hover:bg-rose-950/60'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            prod.isActive ? 'bg-emerald-400' : 'bg-rose-400'
                          }`}
                        />
                        <span>{prod.isActive ? 'Active' : 'Inactive'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/product/${prod.slug || prod._id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-cream-300 hover:bg-white/5 hover:text-ivory transition-all"
                          title="View on Website"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <Link
                          href={`/admin/products/${prod._id}`}
                          className="p-1.5 rounded-lg text-gold hover:bg-gold/10 transition-all"
                          title="Edit Formulation"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => setDeleteConfirmId(prod._id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 transition-all cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0C1E16] border border-rose-800/50 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl animate-fade-in text-ivory">
            <div className="w-12 h-12 rounded-full bg-rose-950/80 text-rose-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-serif text-lg font-bold">Confirm Deletion</h3>
              <p className="text-xs text-cream-200">
                Are you sure you want to permanently delete this product? This will also remove the image from Cloudinary.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-cream-100 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirmId)}
                disabled={actionLoading === deleteConfirmId}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5"
              >
                {actionLoading === deleteConfirmId ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <span>Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
