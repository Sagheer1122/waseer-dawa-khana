'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid credentials');
      }

      // Hard navigation ensures the HTTP-only cookie is sent to middleware immediately
      window.location.href = '/admin';
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[#06110C] via-[#0A1A12] to-[#040A07]">
      <div className="w-full max-w-md">
        
        {/* Brand Card */}
        <div className="rounded-3xl border border-gold/30 bg-[#0C1E16]/90 backdrop-blur-xl shadow-2xl p-6 sm:p-8 space-y-6 text-ivory">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gold/15 border border-gold/40 flex items-center justify-center shadow-inner">
              <ShieldCheck className="w-7 h-7 text-gold" />
            </div>
            <span className="inline-block text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-gold/90">
              WASEER DAWA KHANA • OFFICIAL PORTAL
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-ivory">
              Owner Admin Portal
            </h1>
            <p className="font-sans text-xs text-cream-200/80">
              Sign in to manage herbal products, stock, prices &amp; orders.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-600/50 text-rose-200 text-xs font-sans text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-cream-200">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@waseerhairoil.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#06120D] border border-emerald-800/60 focus:border-gold text-ivory placeholder:text-cream-400/50 text-xs outline-none transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-cream-200">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#06120D] border border-emerald-800/60 focus:border-gold text-ivory placeholder:text-cream-400/50 text-xs outline-none transition-all shadow-inner"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gold hover:bg-gold-light active:scale-98 text-[#0A1611] font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
