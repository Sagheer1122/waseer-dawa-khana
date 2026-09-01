'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Package,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ShoppingBag,
  Clock,
  TrendingUp,
  Plus,
  ArrowUpRight,
  RefreshCw,
  Loader2,
} from 'lucide-react';

interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  outOfStock: number;
  lowStock: number;
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  totalRevenue: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (e) {
      console.error('Failed to load dashboard stats', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0F261C] via-[#0E2018] to-[#0A1611] border border-gold/30 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1.5">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gold">
            Overview &amp; Analytics
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
            WASEER Dawa Khana Admin
          </h2>
          <p className="font-sans text-xs sm:text-sm text-cream-200/80 max-w-xl leading-relaxed">
            Manage your 100% pure herbal hair oil formulations, monitor stock levels, and fulfill incoming WhatsApp customer orders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-cream-100 text-xs font-semibold border border-white/10 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-[#0A1611] text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-98"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Formulation</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      {loading && !stats ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-gold animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1: Total Products */}
          <div className="rounded-2xl bg-[#0D2117] border border-emerald-900/50 p-5 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans font-semibold text-cream-300">Total Products</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-800/40 text-emerald-300 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-3xl font-bold text-ivory">
                {stats?.totalProducts ?? 0}
              </span>
              <span className="text-[11px] font-sans text-emerald-400 font-semibold">
                {stats?.activeProducts ?? 0} Active
              </span>
            </div>
          </div>

          {/* Card 2: Out of Stock */}
          <div className="rounded-2xl bg-[#0D2117] border border-emerald-900/50 p-5 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans font-semibold text-cream-300">Out of Stock</span>
              <div className="w-8 h-8 rounded-lg bg-rose-900/30 text-rose-400 flex items-center justify-center">
                <XCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-3xl font-bold text-ivory">
                {stats?.outOfStock ?? 0}
              </span>
              <span className="text-[11px] font-sans text-amber-400 font-semibold">
                {stats?.lowStock ?? 0} Low Stock
              </span>
            </div>
          </div>

          {/* Card 3: Total Orders */}
          <div className="rounded-2xl bg-[#0D2117] border border-emerald-900/50 p-5 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans font-semibold text-cream-300">Total Orders</span>
              <div className="w-8 h-8 rounded-lg bg-gold/15 text-gold flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-3xl font-bold text-ivory">
                {stats?.totalOrders ?? 0}
              </span>
              <span className="text-[11px] font-sans text-gold font-semibold">
                {stats?.pendingOrders ?? 0} Pending
              </span>
            </div>
          </div>

          {/* Card 4: Total Revenue */}
          <div className="rounded-2xl bg-[#0D2117] border border-emerald-900/50 p-5 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans font-semibold text-cream-300">Total Revenue</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-gold">
                Rs. {(stats?.totalRevenue ?? 0).toLocaleString('en-PK')}
              </span>
            </div>
          </div>

        </div>
      )}

      {/* Quick Navigation Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Panel 1: Products Quick Control */}
        <div className="rounded-3xl bg-[#0C1E16] border border-emerald-900/40 p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-serif text-lg font-bold text-ivory">Product Inventory</h3>
              <p className="text-xs text-cream-300">Manage formulations, update discounts and live stock</p>
            </div>
            <Link
              href="/admin/products"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gold transition-all"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-2">
            <Link
              href="/admin/products"
              className="flex items-center justify-between p-3.5 rounded-xl bg-[#07150F] hover:bg-[#0A1D15] border border-emerald-900/30 transition-all text-xs font-semibold text-cream-100"
            >
              <span>View &amp; Edit All Formulations</span>
              <span className="text-gold text-[11px] font-mono font-bold">
                {stats?.totalProducts ?? 0} Items
              </span>
            </Link>
            <Link
              href="/admin/products/new"
              className="flex items-center justify-between p-3.5 rounded-xl bg-[#07150F] hover:bg-[#0A1D15] border border-emerald-900/30 transition-all text-xs font-semibold text-cream-100"
            >
              <span>Upload New Product with Cloudinary Image</span>
              <Plus className="w-4 h-4 text-emerald-400" />
            </Link>
          </div>
        </div>

        {/* Panel 2: WhatsApp Orders Quick Control */}
        <div className="rounded-3xl bg-[#0C1E16] border border-emerald-900/40 p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-serif text-lg font-bold text-ivory">WhatsApp Orders</h3>
              <p className="text-xs text-cream-300">Track and update customer order statuses</p>
            </div>
            <Link
              href="/admin/orders"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gold transition-all"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-2">
            <Link
              href="/admin/orders"
              className="flex items-center justify-between p-3.5 rounded-xl bg-[#07150F] hover:bg-[#0A1D15] border border-emerald-900/30 transition-all text-xs font-semibold text-cream-100"
            >
              <span>Manage Pending Orders</span>
              <span className="text-amber-400 text-[11px] font-mono font-bold">
                {stats?.pendingOrders ?? 0} Pending
              </span>
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center justify-between p-3.5 rounded-xl bg-[#07150F] hover:bg-[#0A1D15] border border-emerald-900/30 transition-all text-xs font-semibold text-cream-100"
            >
              <span>View All Past Shipments</span>
              <span className="text-emerald-400 text-[11px] font-mono font-bold">
                {stats?.totalOrders ?? 0} Total
              </span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
