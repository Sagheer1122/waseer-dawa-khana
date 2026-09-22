'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Leaf, Lock, X, ArrowRight, ShieldCheck, AlertCircle, KeyRound, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const [isGatewayOpen, setIsGatewayOpen] = useState(false);
  const [step, setStep] = useState<'pin' | 'login'>('pin');
  
  // Step 1: PIN
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  
  // Step 2: Login Credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenGateway = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep('pin');
    setPin('');
    setPinError('');
    setEmail('');
    setPassword('');
    setLoginError('');
    setIsGatewayOpen(true);
  };

  const handleCloseGateway = () => {
    setIsGatewayOpen(false);
    setStep('pin');
    setPin('');
    setPinError('');
    setPassword('');
    setLoginError('');
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === '6358') {
      setPinError('');
      setStep('login');
    } else {
      setPinError('Incorrect Passcode');
      setPin('');
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setLoginError('Email and password are required');
      return;
    }

    setIsLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        window.location.href = '/admin';
      } else {
        setLoginError(data.message || 'Invalid credentials');
      }
    } catch {
      setLoginError('Connection failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <footer className="bg-forest text-ivory border-t border-forest-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Brand Info Column */}
            <div className="md:col-span-6 space-y-4">
              <Link href="/" className="inline-flex items-center gap-3">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src="/images/waseer-emblem.png"
                    alt="WASEER Logo"
                    fill
                    sizes="48px"
                    className="object-contain drop-shadow-md"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1 leading-none">
                    <span className="font-serif text-2xl font-bold tracking-widest text-ivory">
                      WASEER
                    </span>
                    <span className="text-[10px] font-sans font-bold text-gold -mt-1">®</span>
                  </div>
                  <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold font-bold mt-0.5">
                    HERBAL HAIR OIL
                  </span>
                  <span className="font-sans text-[9.5px] tracking-wider uppercase text-cream-200 font-semibold mt-1">
                    A Product of WASEER Dawa Khana
                  </span>
                </div>
              </Link>
              <p className="font-sans text-xs text-cream-300 leading-relaxed max-w-sm font-normal">
                Pure botanical formulation handcrafted by WASEER Dawa Khana. Nature&apos;s care to nourish hair, strengthen roots, promote growth, and restore healthy shine.
              </p>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-gold block">
                Herbal Philosophy
              </span>
              <ul className="space-y-1.5 font-sans text-xs text-cream-300">
                <li><Link href="/about" className="hover:text-ivory transition-colors">Our Heritage &amp; Unani Roots</Link></li>
                <li><Link href="/ingredients" className="hover:text-ivory transition-colors">Botanical Ingredients</Link></li>
                <li><Link href="/hair-guide" className="hover:text-ivory transition-colors">Usage Ritual Guide</Link></li>
                <li><Link href="/journal" className="hover:text-ivory transition-colors">Ayurvedic Journal</Link></li>
              </ul>
            </div>

            {/* Customer Care */}
            <div className="md:col-span-3 space-y-3">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-gold block">
                Customer Care
              </span>
              <ul className="space-y-1.5 font-sans text-xs text-cream-300">
                <li><Link href="/contact" className="hover:text-ivory transition-colors">Contact Us</Link></li>
                <li><Link href="/shop" className="hover:text-ivory transition-colors">Shop Catalog</Link></li>
                <li><Link href="/wishlist" className="hover:text-ivory transition-colors">Wishlist</Link></li>
                <li><Link href="/cart" className="hover:text-ivory transition-colors">Ritual Bag</Link></li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright Strip */}
          <div className="mt-6 pt-4 border-t border-forest-700/40 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans text-xs text-cream-300">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <Leaf className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span>A Product of WASEER Dawa Khana • 100% Herbal &amp; Pure</span>
            </div>
            <div>
              <p suppressHydrationWarning className="flex items-center gap-1">
                {/* Secret Gateway Trigger on © */}
                <button
                  type="button"
                  onClick={handleOpenGateway}
                  aria-label="Copyright Notice"
                  className="hover:text-gold transition-colors focus:outline-none cursor-default font-normal"
                >
                  ©
                </button>
                <span>{new Date().getFullYear()} WASEER HERBAL HAIR OIL. All Rights Reserved.</span>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Secret Admin Portal Modal */}
      {isGatewayOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-forest-950/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-3xl bg-forest-900 border border-forest-700/60 p-6 sm:p-8 shadow-2xl text-ivory space-y-6">
            
            {/* Close button */}
            <button
              onClick={handleCloseGateway}
              className="absolute top-4 right-4 p-2 rounded-full text-cream-400 hover:text-ivory hover:bg-forest-800/80 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* STEP 1: Master PIN Verification */}
            {step === 'pin' && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-gold/15 text-gold flex items-center justify-center mx-auto border border-gold/30">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold tracking-wide text-ivory">
                    Security Passcode
                  </h3>
                  <p className="font-sans text-xs text-cream-300">
                    Enter master PIN to unlock management portal
                  </p>
                </div>

                <form onSubmit={handleVerifyPin} className="space-y-4">
                  <div className="space-y-1">
                    <input
                      type="password"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      autoFocus
                      value={pin}
                      onChange={(e) => {
                        setPin(e.target.value);
                        setPinError('');
                      }}
                      placeholder="••••"
                      className="w-full text-center text-2xl font-mono tracking-[0.5em] py-3.5 px-4 rounded-2xl bg-forest-950/70 border border-forest-700 text-gold placeholder-cream-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                    />
                  </div>

                  {pinError && (
                    <div className="flex items-center gap-1.5 text-xs text-red-400 justify-center font-sans">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{pinError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!pin.trim()}
                    className="w-full py-3.5 px-6 rounded-full bg-gold text-forest font-sans text-xs font-bold uppercase tracking-widest hover:bg-gold-400 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Verify Passcode</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* STEP 2: Admin Login Form (Revealed ONLY after PIN 6358) */}
            {step === 'login' && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-gold/15 text-gold flex items-center justify-center mx-auto border border-gold/30">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold tracking-wide text-ivory">
                    Owner Admin Login
                  </h3>
                  <p className="font-sans text-xs text-cream-300">
                    Sign in to access products, orders &amp; settings
                  </p>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-cream-300">
                      Admin Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cream-400" />
                      <input
                        type="email"
                        required
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                        className="w-full text-xs font-sans py-3 pl-10 pr-4 rounded-xl bg-forest-950/70 border border-forest-700 text-ivory placeholder-cream-600 focus:outline-none focus:border-gold transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-cream-300">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cream-400" />
                      <input
                        type="password"
                        required
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full text-xs font-sans py-3 pl-10 pr-4 rounded-xl bg-forest-950/70 border border-forest-700 text-ivory placeholder-cream-600 focus:outline-none focus:border-gold transition-all"
                      />
                    </div>
                  </div>

                  {loginError && (
                    <div className="flex items-center gap-1.5 text-xs text-red-400 justify-center font-sans pt-1">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || !password}
                    className="w-full py-3.5 px-6 rounded-full bg-gold text-forest font-sans text-xs font-bold uppercase tracking-widest hover:bg-gold-400 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    {isLoading ? (
                      <span>Signing in...</span>
                    ) : (
                      <>
                        <span>Enter Dashboard</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            <p className="text-[10px] text-center font-sans text-cream-400 opacity-60">
              Authorized WASEER Management Only
            </p>
          </div>
        </div>
      )}
    </>
  );
};
