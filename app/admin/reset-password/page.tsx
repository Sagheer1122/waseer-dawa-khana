'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Lock,
  KeyRound,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPin, setNewPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get('email');
    const tokenParam = searchParams.get('token');
    const pinParam = searchParams.get('pin');

    if (emailParam) setEmail(emailParam);
    if (tokenParam) setToken(tokenParam);
    if (pinParam) setPin(pinParam);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please provide your admin email.');
      return;
    }

    if (!pin && !token) {
      setError('Please enter the 6-digit verification PIN from your email.');
      return;
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    if (newPin && (newPin.length < 4 || newPin.length > 8)) {
      setError('Security PIN must be between 4 and 8 digits.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          pin: pin.trim(),
          token: token.trim(),
          newPassword,
          newPin: newPin ? newPin.trim() : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to reset password. Please verify your PIN.');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred while resetting your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl border border-gold/30 bg-[#0C1E16]/95 backdrop-blur-xl shadow-2xl p-6 sm:p-8 space-y-6 text-ivory">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gold/15 border border-gold/40 flex items-center justify-center shadow-inner">
            <KeyRound className="w-7 h-7 text-gold" />
          </div>
          <span className="inline-block text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-gold/90">
            WASEER DAWA KHANA • CREDENTIAL RECOVERY
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-ivory">
            Set New Password &amp; PIN
          </h1>
          <p className="font-sans text-xs text-cream-200/80">
            Enter the 6-digit recovery PIN sent to your email to update your admin credentials.
          </p>
        </div>

        {/* Success State */}
        {success ? (
          <div className="p-6 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-cream-100">
                Credentials Updated Successfully!
              </h3>
              <p className="text-xs text-emerald-200/80">
                Your new admin password and security PIN are now active in the system.
              </p>
            </div>
            <Link
              href="/admin/login"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gold hover:bg-gold-light text-[#0A1611] font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-lg"
            >
              <span>Sign In with New Password</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        ) : (
          <>
            {/* Error Message */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-600/50 text-rose-200 text-xs font-sans flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Admin Email */}
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
                    placeholder="waseerdawakhana@gmail.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#06120D] border border-emerald-800/60 focus:border-gold text-ivory placeholder:text-cream-400/50 text-xs outline-none transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* 6-Digit PIN */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-cream-200">
                    6-Digit Verification PIN
                  </label>
                  {token && (
                    <span className="text-[10px] text-emerald-400 font-medium">
                      ✓ Verified via Secure Link
                    </span>
                  )}
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-400" />
                  <input
                    type="text"
                    required={!token}
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 583921"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#06120D] border border-emerald-800/60 focus:border-gold text-gold font-mono font-bold tracking-widest placeholder:tracking-normal placeholder:font-sans placeholder:font-normal placeholder:text-cream-400/50 text-base outline-none transition-all shadow-inner"
                  />
                </div>
                <p className="text-[10px] text-cream-400/70">
                  Check waseerdawakhana@gmail.com inbox for this 6-digit PIN.
                </p>
              </div>

              {/* New Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-cream-200">
                  New Password (min 8 chars)
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new strong password"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#06120D] border border-emerald-800/60 focus:border-gold text-ivory placeholder:text-cream-400/50 text-xs outline-none transition-all shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-400 hover:text-gold"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-cream-200">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-type new password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#06120D] border border-emerald-800/60 focus:border-gold text-ivory placeholder:text-cream-400/50 text-xs outline-none transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Optional Security PIN */}
              <div className="space-y-1.5 pt-1">
                <label className="block text-xs font-semibold text-cream-200">
                  Admin Security PIN <span className="text-cream-400 text-[10px] font-normal">(Optional 4-6 digits)</span>
                </label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-400" />
                  <input
                    type="password"
                    maxLength={8}
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 2358"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#06120D] border border-emerald-800/60 focus:border-gold text-ivory placeholder:text-cream-400/50 text-xs outline-none transition-all shadow-inner"
                  />
                </div>
                <p className="text-[10px] text-cream-400/70">
                  Optional quick PIN for sensitive admin actions.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 rounded-xl bg-gold hover:bg-gold-light active:scale-98 text-[#0A1611] font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Updating Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Reset Password &amp; PIN</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 text-center border-t border-emerald-900/60">
              <Link
                href="/admin/login"
                className="text-xs text-gold/90 hover:text-gold hover:underline inline-flex items-center gap-1.5 transition-colors"
              >
                &larr; Return to Admin Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function AdminResetPasswordPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[#06110C] via-[#0A1A12] to-[#040A07]">
      <Suspense
        fallback={
          <div className="text-gold flex items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading recovery portal...</span>
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
