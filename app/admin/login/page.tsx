'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Loader2,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export default function AdminLoginPage() {
  const [mode, setMode] = useState<'login' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot Password / PIN States
  const [forgotEmail, setForgotEmail] = useState('waseerdawakhana@gmail.com');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState<string | null>(null);

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

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess(null);
    setForgotLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail.trim(), type: 'password' }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to send recovery email. Please check your email.');
      }

      setForgotSuccess(
        `A 6-digit verification code and reset link has been dispatched to ${forgotEmail}. Check your inbox or spam folder.`
      );
    } catch (err: any) {
      setForgotError(err.message || 'Failed to initiate password reset.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[#06110C] via-[#0A1A12] to-[#040A07]">
      <div className="w-full max-w-md">
        {/* Brand Card */}
        <div className="rounded-3xl border border-gold/30 bg-[#0C1E16]/90 backdrop-blur-xl shadow-2xl p-6 sm:p-8 space-y-6 text-ivory">
          {mode === 'login' ? (
            <>
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
                <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-600/50 text-rose-200 text-xs font-sans text-center flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
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
                      placeholder="admin@waseerdawakhana.com"
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
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (email) setForgotEmail(email);
                        setMode('forgot');
                        setError('');
                      }}
                      className="text-[11px] text-gold hover:text-gold-light hover:underline transition-colors cursor-pointer"
                    >
                      Forgot Password?
                    </button>
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
            </>
          ) : (
            /* Forgot Password Flow */
            <>
              {/* Header */}
              <div className="text-center space-y-2">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gold/15 border border-gold/40 flex items-center justify-center shadow-inner">
                  <KeyRound className="w-7 h-7 text-gold" />
                </div>
                <span className="inline-block text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-gold/90">
                  SECURITY &amp; RECOVERY
                </span>
                <h2 className="font-serif text-2xl font-bold tracking-tight text-ivory">
                  Reset Password
                </h2>
                <p className="font-sans text-xs text-cream-200/80">
                  Enter your admin email. A 6-digit recovery code and secure reset link will be sent to your inbox.
                </p>
              </div>

              {/* Feedback messages */}
              {forgotError && (
                <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-600/50 text-rose-200 text-xs font-sans flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{forgotError}</span>
                </div>
              )}

              {forgotSuccess ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs font-sans space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Recovery Code Dispatched!</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-emerald-100/90">
                      {forgotSuccess}
                    </p>
                  </div>

                  <Link
                    href={`/admin/reset-password?email=${encodeURIComponent(forgotEmail)}`}
                    className="w-full py-3.5 rounded-xl bg-gold hover:bg-gold-light active:scale-98 text-[#0A1611] font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Enter 6-Digit Code to Reset Password</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </Link>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-xs text-cream-400 hover:text-gold transition-colors cursor-pointer"
                    >
                      &larr; Back to Sign In
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-cream-200">
                      Admin Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-400" />
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="waseerdawakhana@gmail.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#06120D] border border-emerald-800/60 focus:border-gold text-ivory placeholder:text-cream-400/50 text-xs outline-none transition-all shadow-inner"
                      />
                    </div>
                    <p className="text-[10px] text-cream-400/70">
                      We will deliver the recovery code directly to this email address.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full py-3.5 rounded-xl bg-gold hover:bg-gold-light active:scale-98 text-[#0A1611] font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {forgotLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Recovery Code...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Password Reset Code</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </>
                    )}
                  </button>

                  <div className="pt-2 flex items-center justify-between text-xs text-cream-400 border-t border-emerald-900/60">
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="hover:text-gold transition-colors cursor-pointer"
                    >
                      &larr; Back to Sign In
                    </button>
                    <Link
                      href={`/admin/reset-password?email=${encodeURIComponent(forgotEmail)}`}
                      className="text-gold/90 hover:text-gold hover:underline"
                    >
                      Already have code?
                    </Link>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
