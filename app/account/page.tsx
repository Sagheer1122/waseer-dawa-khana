'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'settings'>('profile');
  const wishlistCount = useWishlistStore((s) => s.items.length);

  // Mock Orders Data
  const mockOrders = [
    {
      id: 'ORD-10482',
      date: 'August 14, 2025',
      status: 'Delivered',
      total: 77.99,
      items: [
        { name: 'Organic Botanical Scalp & Hair Growth Elixir', size: '100ml', qty: 1, price: 48.00, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80' },
        { name: 'Pure Single-Origin Sonoran Golden Jojoba Oil', size: '50ml', qty: 1, price: 29.99, img: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=400&q=80' },
      ],
      tracking: 'USPS-9400111899562810334812',
    },
    {
      id: 'ORD-09821',
      date: 'June 22, 2025',
      status: 'Delivered',
      total: 99.00,
      items: [
        { name: 'The Complete Botanical Hair Ritual Trio', size: '100ml Trio', qty: 1, price: 99.00, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80' },
      ],
      tracking: 'FEDEX-782910384910',
    },
  ];

  return (
    <div className="bg-ivory min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 space-y-1 border-b border-cream-200 pb-6">
          <Badge variant="forest">MOCK CLIENT DASHBOARD</Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest">
            Welcome, Sarah
          </h1>
          <p className="font-sans text-xs sm:text-sm text-earth-600">
            Aura Botanica Ritualist Member since January 2025 • 240 Ritual Reward Points
          </p>
        </div>

        {/* 2-Column Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-3 bg-cream-50 rounded-2xl p-2.5 sm:p-4 border border-cream-200 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-1.5 sm:gap-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-center sm:justify-start gap-2.5 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-colors text-left ${
                activeTab === 'profile'
                  ? 'bg-forest text-ivory shadow-xs'
                  : 'text-earth-700 hover:bg-cream-100 hover:text-forest'
              }`}
            >
              <User className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-colors text-left ${
                activeTab === 'orders'
                  ? 'bg-forest text-ivory shadow-xs'
                  : 'text-earth-700 hover:bg-cream-100 hover:text-forest'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Package className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Orders</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cream-200 text-forest font-bold hidden sm:inline-block">2</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-center sm:justify-start gap-2.5 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-colors text-left ${
                activeTab === 'addresses'
                  ? 'bg-forest text-ivory shadow-xs'
                  : 'text-earth-700 hover:bg-cream-100 hover:text-forest'
              }`}
            >
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-center sm:justify-start gap-2.5 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-colors text-left ${
                activeTab === 'settings'
                  ? 'bg-forest text-ivory shadow-xs'
                  : 'text-earth-700 hover:bg-cream-100 hover:text-forest'
              }`}
            >
              <Settings className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Preferences</span>
            </button>
            
            <div className="hidden lg:block pt-4 border-t border-cream-200">
              <button
                onClick={() => alert('Mock Sign Out Completed.')}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-sans text-red-600 hover:bg-red-50 transition-colors text-left font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-9 bg-cream-50/60 rounded-3xl p-6 sm:p-10 border border-cream-300 shadow-sm">
            
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-cream-200">
                  <h2 className="font-serif text-2xl font-bold text-forest">Profile Information</h2>
                  <Badge variant="sage">Active Ritualist</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="p-4 bg-ivory rounded-2xl border border-cream-200 space-y-1">
                    <span className="text-earth-500 uppercase tracking-wider text-[10px] font-bold">Full Name</span>
                    <p className="font-serif text-base font-bold text-forest">Sarah Jenkins</p>
                  </div>
                  <div className="p-4 bg-ivory rounded-2xl border border-cream-200 space-y-1">
                    <span className="text-earth-500 uppercase tracking-wider text-[10px] font-bold">Email Address</span>
                    <p className="font-serif text-base font-bold text-forest">sarah.jenkins@example.com</p>
                  </div>
                  <div className="p-4 bg-ivory rounded-2xl border border-cream-200 space-y-1">
                    <span className="text-earth-500 uppercase tracking-wider text-[10px] font-bold">Phone</span>
                    <p className="font-serif text-base font-bold text-forest">+1 (555) 382-9910</p>
                  </div>
                  <div className="p-4 bg-ivory rounded-2xl border border-cream-200 space-y-1">
                    <span className="text-earth-500 uppercase tracking-wider text-[10px] font-bold">Hair Profile</span>
                    <p className="font-serif text-base font-bold text-forest">3B Curly • Medium Porosity • Growth Goal</p>
                  </div>
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-serif text-2xl font-bold text-forest pb-4 border-b border-cream-200">
                  Order History & Tracking
                </h2>

                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="p-6 bg-ivory rounded-2xl border border-cream-200 shadow-xs space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-cream-200 text-xs font-sans">
                        <div>
                          <span className="font-bold text-forest font-mono">{order.id}</span>
                          <span className="text-earth-500 ml-3">Placed on {order.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-forest/10 text-forest font-bold text-[10px]">
                            {order.status}
                          </span>
                          <span className="font-bold text-forest">{formatPrice(order.total)}</span>
                        </div>
                      </div>

                      <div className="divide-y divide-cream-100">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="py-2.5 flex items-center justify-between text-xs font-sans">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-cream-100">
                                <Image src={it.img} alt={it.name} fill className="object-cover" />
                              </div>
                              <div>
                                <p className="font-serif font-bold text-forest">{it.name}</p>
                                <p className="text-earth-500 text-[11px]">Vol: {it.size} • Qty: {it.qty}</p>
                              </div>
                            </div>
                            <span className="font-bold text-forest">{formatPrice(it.price)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 text-[11px] font-sans text-earth-500 flex items-center justify-between">
                        <span>Tracking: <strong className="font-mono text-forest">{order.tracking}</strong></span>
                        <button
                          onClick={() => alert(`Tracking info for ${order.tracking}: Package successfully delivered.`)}
                          className="text-forest hover:underline font-bold"
                        >
                          Track Package &rarr;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-cream-200">
                  <h2 className="font-serif text-2xl font-bold text-forest">Saved Addresses</h2>
                  <button className="px-4 py-2 rounded-xl bg-forest text-ivory text-xs font-sans font-bold uppercase">
                    + Add New
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="p-5 bg-ivory rounded-2xl border-2 border-forest space-y-2 relative">
                    <span className="absolute top-4 right-4 text-[10px] font-bold text-forest uppercase bg-forest/10 px-2 py-0.5 rounded-full">
                      Primary Default
                    </span>
                    <p className="font-serif text-base font-bold text-forest">Sarah Jenkins</p>
                    <p className="text-earth-700">742 Evergreen Terrace</p>
                    <p className="text-earth-700">Los Angeles, CA 90028, United States</p>
                    <p className="text-earth-500 pt-1">+1 (555) 382-9910</p>
                  </div>
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="font-serif text-2xl font-bold text-forest pb-4 border-b border-cream-200">
                  Ritual & Communication Preferences
                </h2>

                <div className="space-y-4 text-xs font-sans text-earth-800">
                  <label className="flex items-center gap-3 p-4 bg-ivory rounded-2xl border border-cream-200 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-forest w-4 h-4" />
                    <div>
                      <strong className="block text-forest">Botanical Seasonal Harvest Notifications</strong>
                      <span className="text-earth-600">Receive private alerts when single-origin small batch pressings are released.</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 bg-ivory rounded-2xl border border-cream-200 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-forest w-4 h-4" />
                    <div>
                      <strong className="block text-forest">SMS Ritual Reminders & Order Tracking</strong>
                      <span className="text-earth-600">Receive real-time courier updates on all carbon-neutral deliveries.</span>
                    </div>
                  </label>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
