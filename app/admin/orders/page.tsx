'use client';

import React, { useEffect, useState } from 'react';
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  MessageCircle,
  Phone,
  RefreshCw,
  Loader2,
  Search,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
  size?: string;
}

interface OrderRecord {
  _id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  customerEmail?: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (e) {
      console.error('Failed to load orders', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus as any } : o))
        );
      }
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = orders.filter((o) =>
    o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
    o.customerName.toLowerCase().includes(search.toLowerCase()) ||
    o.customerPhone.includes(search)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-ivory">Customer Orders &amp; WhatsApp Shipments</h2>
          <p className="font-sans text-xs text-cream-300">
            Total {orders.length} orders recorded in database
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0D2117] hover:bg-[#122A1E] text-cream-200 border border-emerald-900/50 text-xs font-semibold transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Orders</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Order #, Customer Name, or Phone..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1A13] border border-emerald-900/50 text-ivory placeholder:text-cream-400/60 text-xs outline-none focus:border-gold transition-all"
        />
      </div>

      {/* Orders List Table */}
      <div className="rounded-3xl bg-[#0C1E16] border border-emerald-900/40 overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
            <span className="text-xs font-sans text-cream-300">Loading orders from MongoDB...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center space-y-2">
            <ShoppingBag className="w-10 h-10 text-cream-400/40 mx-auto" />
            <p className="font-serif text-lg text-cream-200">No orders recorded yet</p>
            <p className="text-xs text-cream-400 max-w-sm mx-auto">
              When customers check out on your website and proceed to WhatsApp, their orders will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#081510] text-[10.5px] uppercase tracking-wider text-gold/90 font-bold border-b border-emerald-900/40">
                <tr>
                  <th className="py-3.5 px-4">Order #</th>
                  <th className="py-3.5 px-4">Customer Details</th>
                  <th className="py-3.5 px-4">Items</th>
                  <th className="py-3.5 px-4">Address</th>
                  <th className="py-3.5 px-4">Total Amount</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/20 text-cream-100">
                {filtered.map((ord) => {
                  const cleanPhone = ord.customerPhone.replace(/[^0-9]/g, '');
                  const waChatUrl = `https://wa.me/${cleanPhone.startsWith('0') ? '92' + cleanPhone.slice(1) : cleanPhone}`;

                  return (
                    <tr key={ord._id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Order # */}
                      <td className="py-3.5 px-4 font-mono font-bold text-gold">
                        {ord.orderNumber}
                      </td>

                      {/* Customer Info */}
                      <td className="py-3.5 px-4 space-y-1">
                        <div className="font-semibold text-ivory">{ord.customerName}</div>
                        <div className="flex items-center gap-2">
                          <a
                            href={waChatUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors"
                            title="Chat with customer on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{ord.customerPhone}</span>
                          </a>
                        </div>
                      </td>

                      {/* Items */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5 max-w-xs">
                          {ord.items.map((item, idx) => (
                            <div key={idx} className="text-[11px] text-cream-200">
                              • <span className="font-medium text-ivory">{item.productName}</span>
                              {item.size ? ` (${item.size})` : ''} x {item.quantity}
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Address */}
                      <td className="py-3.5 px-4 text-[11px] text-cream-300 max-w-xs truncate">
                        {ord.shippingAddress}
                      </td>

                      {/* Total */}
                      <td className="py-3.5 px-4 font-mono font-bold text-gold">
                        Rs. {ord.totalAmount.toLocaleString('en-PK')}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-[10.5px] text-cream-400 whitespace-nowrap">
                        {new Date(ord.createdAt).toLocaleDateString('en-PK', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="relative inline-block">
                          <select
                            value={ord.status}
                            disabled={updatingId === ord._id}
                            onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-[10.5px] font-bold tracking-wider uppercase border outline-none cursor-pointer transition-all ${
                              ord.status === 'delivered'
                                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600/50'
                                : ord.status === 'shipped'
                                ? 'bg-blue-950/60 text-blue-300 border-blue-600/50'
                                : ord.status === 'processing'
                                ? 'bg-purple-950/60 text-purple-300 border-purple-600/50'
                                : ord.status === 'cancelled'
                                ? 'bg-rose-950/60 text-rose-300 border-rose-600/50'
                                : 'bg-amber-950/60 text-amber-300 border-amber-600/50'
                            }`}
                          >
                            <option value="pending" className="bg-[#0A1611] text-amber-300">Pending</option>
                            <option value="processing" className="bg-[#0A1611] text-purple-300">Processing</option>
                            <option value="shipped" className="bg-[#0A1611] text-blue-300">Shipped</option>
                            <option value="delivered" className="bg-[#0A1611] text-emerald-300">Delivered</option>
                            <option value="cancelled" className="bg-[#0A1611] text-rose-300">Cancelled</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
