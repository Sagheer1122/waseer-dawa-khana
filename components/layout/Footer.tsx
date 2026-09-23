'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Leaf, Lock, X, ArrowRight, ShieldCheck, AlertCircle, KeyRound, Mail, Loader2, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [isGatewayOpen, setIsGatewayOpen] = useState(false);
  const [step, setStep] = useState<'pin' | 'login' | 'forgot' | 'reset'>('pin');
  
  // Step 1: PIN
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [isVerifyingPin, setIsVerifyingPin] = useState(false);
  
  // Step 2: Login Credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Step 3: Forgot Password / PIN
  const [forgotType, setForgotType] = useState<'pin' | 'password'>('pin');
  const [forgotEmail, setForgotEmail] = useState('waseerdawakhana@gmail.com');
  const [isSendingForgot, setIsSendingForgot] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  // Step 4: Reset Credentials
  const [resetPin, setResetPin] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');
  const [resetNewPin, setResetNewPin] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  const handleOpenForgot = (type: 'pin' | 'password') => {
    setForgotType(type);
    setForgotError('');
    setForgotSuccess('');
    setResetError('');
    setResetSuccess('');
    setResetPin('');
    setResetNewPassword('');
    setResetNewPin('');
    setStep('forgot');
  };

  const handleOpenGateway = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep('pin');
    setPin('');
    setPinError('');
    setEmail('');
    setPassword('');
    setLoginError('');
    setForgotError('');
    setForgotSuccess('');
    setResetError('');
    setResetSuccess('');
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

  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pin.trim();
    if (!cleanPin) return;

    // Instant local check for default PIN
    if (cleanPin === '6358') {
      setPinError('');
      setStep('login');
      return;
    }

    setIsVerifyingPin(true);
    setPinError('');

    try {
      const res = await fetch('/api/auth/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: cleanPin }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStep('login');
      } else {
        setPinError(data.message || 'Incorrect Passcode');
        setPin('');
      }
    } catch {
      // Fallback
      if (cleanPin === '6358') {
        setStep('login');
      } else {
        setPinError('Incorrect Passcode');
        setPin('');
      }
    } finally {
      setIsVerifyingPin(false);
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

  const handleSendForgotEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    setIsSendingForgot(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail.trim(), type: forgotType }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to send recovery email');
      }
      setForgotSuccess(
        `6-digit ${forgotType === 'pin' ? 'PIN' : 'password'} recovery code sent to ${forgotEmail}. Check inbox.`
      );
      setResetPin('');
      setStep('reset');
    } catch (err: any) {
      setForgotError(err.message || 'Failed to send recovery code.');
    } finally {
      setIsSendingForgot(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');

    if (!resetPin.trim()) {
      setResetError('Please enter the 6-digit code from your email');
      return;
    }

    const newPass = resetNewPassword.trim();
    const newSecurityPin = resetNewPin.trim();

    if (forgotType === 'password' && !newPass) {
      setResetError('Please enter a new password (min 8 characters)');
      return;
    }

    if (forgotType === 'pin' && !newSecurityPin) {
      setResetError('Please enter a new security PIN (4-8 digits)');
      return;
    }

    if (newPass && newPass.length < 8) {
      setResetError('New password must be at least 8 characters');
      return;
    }

    if (newSecurityPin && (newSecurityPin.length < 4 || newSecurityPin.length > 8)) {
      setResetError('Security PIN must be between 4 and 8 digits');
      return;
    }

    setIsResetting(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: forgotEmail.trim().toLowerCase(),
          pin: resetPin.trim(),
          newPassword: newPass || undefined,
          newPin: newSecurityPin || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to update credentials. Verify 6-digit code.');
      }

      if (newPass && newSecurityPin) {
        setResetSuccess('Password and Security PIN updated successfully!');
      } else if (newPass) {
        setResetSuccess('Password updated! You can now sign in.');
      } else {
        setResetSuccess('Security PIN updated! You can now enter your new passcode.');
      }

      setTimeout(() => {
        if (newPass) {
          setEmail(forgotEmail);
          setPassword(newPass);
          setStep('login');
        } else {
          setPin('');
          setStep('pin');
        }
      }, 1500);
    } catch (err: any) {
      setResetError(err.message || 'Error updating credentials.');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <>
      <footer className="bg-forest text-ivory border-t border-forest-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Brand Info Column */}
            <div className="md:col-span-6 space-y-4">
              <Link href="/" className="inline-flex items-center gap-3.5 group">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
                  <Image
                    src="/images/waseer-emblem.png"
                    alt="WASEER Logo"
                    fill
                    sizes="64px"
                    className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col text-left justify-center">
                  <div className="flex items-center gap-1 leading-none">
                    <span className="font-serif text-3xl sm:text-4xl font-bold tracking-widest text-ivory">
                      WASEER
                    </span>
                    <span className="text-xs font-sans font-bold text-gold -mt-1 sm:-mt-1.5">®</span>
                  </div>
                  <span className="font-sans text-[11px] sm:text-[13px] tracking-[0.38em] sm:tracking-[0.41em] uppercase text-gold font-bold mt-1 block">
                    DAWA KHANA
                  </span>
                  <span className="font-sans text-[10px] sm:text-[11px] tracking-wider uppercase text-cream-300/80 font-medium mt-1">
                    Authentic Unani &amp; Botanical Remedies
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
              <div className="flex items-center gap-1">
                {/* Secret Gateway Trigger on © */}
                <button
                  type="button"
                  onClick={handleOpenGateway}
                  aria-label="Copyright Notice"
                  className="hover:text-gold transition-colors focus:outline-none cursor-default font-normal"
                >
                  ©
                </button>
                <span>{new Date().getFullYear()} WASEER DAWA KHANA. All Rights Reserved.</span>
              </div>
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
                    disabled={!pin.trim() || isVerifyingPin}
                    className="w-full py-3.5 px-6 rounded-full bg-gold text-forest font-sans text-xs font-bold uppercase tracking-widest hover:bg-gold-400 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isVerifyingPin ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>Verify Passcode</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="pt-3 border-t border-forest-800/80 text-center space-y-2">
                    <p className="text-[11px] text-cream-400 font-sans">
                      Trouble accessing portal?
                    </p>
                    <div className="flex items-center justify-center gap-3 font-sans">
                      <button
                        type="button"
                        onClick={() => handleOpenForgot('pin')}
                        className="text-xs text-gold hover:text-gold-light hover:underline font-bold transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>Forgot PIN?</span>
                      </button>
                      <span className="text-cream-600 text-xs">•</span>
                      <button
                        type="button"
                        onClick={() => handleOpenForgot('password')}
                        className="text-xs text-gold hover:text-gold-light hover:underline font-bold transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Forgot Password?</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 2: Admin Login Form (Revealed ONLY after PIN) */}
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
                        placeholder="waseerdawakhana@gmail.com"
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
                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (email) setForgotEmail(email);
                          handleOpenForgot('password');
                        }}
                        className="text-[11px] text-gold hover:text-gold-light hover:underline font-semibold transition-colors cursor-pointer"
                      >
                        Forgot Password?
                      </button>
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
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Signing in...</span>
                      </>
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

            {/* STEP 3: Forgot PIN / Password */}
            {step === 'forgot' && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-gold/15 text-gold flex items-center justify-center mx-auto border border-gold/30">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold tracking-wide text-ivory">
                    {forgotType === 'pin' ? 'Forgot Security PIN' : 'Forgot Password'}
                  </h3>
                  <p className="font-sans text-xs text-cream-300">
                    {forgotType === 'pin'
                      ? 'Enter admin email. A 6-digit recovery PIN will be sent to your inbox to reset your security PIN.'
                      : 'Enter admin email. A 6-digit recovery code will be sent to your inbox to reset your password.'}
                  </p>
                </div>

                {forgotError && (
                  <div className="flex items-center gap-1.5 text-xs text-red-400 justify-center font-sans">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{forgotError}</span>
                  </div>
                )}

                <form onSubmit={handleSendForgotEmail} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-cream-300">
                      Admin Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cream-400" />
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="waseerdawakhana@gmail.com"
                        className="w-full text-xs font-sans py-3 pl-10 pr-4 rounded-xl bg-forest-950/70 border border-forest-700 text-ivory placeholder-cream-600 focus:outline-none focus:border-gold transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSendingForgot}
                    className="w-full py-3.5 px-6 rounded-full bg-gold text-forest font-sans text-xs font-bold uppercase tracking-widest hover:bg-gold-400 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSendingForgot ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending {forgotType === 'pin' ? 'Recovery PIN' : 'Reset Code'}...</span>
                      </>
                    ) : (
                      <>
                        <span>{forgotType === 'pin' ? 'Send PIN Recovery Code' : 'Send Password Reset Code'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-xs text-cream-400 pt-2 border-t border-forest-800">
                    <button
                      type="button"
                      onClick={() => setStep(forgotType === 'pin' ? 'pin' : 'login')}
                      className="hover:text-gold transition-colors cursor-pointer"
                    >
                      &larr; Back to {forgotType === 'pin' ? 'PIN' : 'Login'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep('reset')}
                      className="text-gold hover:underline cursor-pointer"
                    >
                      Already have code?
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 4: Reset Credentials */}
            {step === 'reset' && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-gold/15 text-gold flex items-center justify-center mx-auto border border-gold/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold tracking-wide text-ivory">
                    {forgotType === 'pin' ? 'Reset Security PIN' : 'Reset Password'}
                  </h3>
                  <p className="font-sans text-xs text-cream-300">
                    Enter the 6-digit code sent to {forgotEmail}
                  </p>
                </div>

                {resetSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs text-center font-sans">
                    {resetSuccess}
                  </div>
                )}

                {resetError && (
                  <div className="flex items-center gap-1.5 text-xs text-red-400 justify-center font-sans">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{resetError}</span>
                  </div>
                )}

                <form onSubmit={handleResetSubmit} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-cream-300">
                      6-Digit Code from Email
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={resetPin}
                      onChange={(e) => setResetPin(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 583921"
                      className="w-full text-center text-xl font-mono tracking-widest py-2.5 px-4 rounded-xl bg-forest-950/70 border border-forest-700 text-gold placeholder-cream-600 focus:outline-none focus:border-gold transition-all"
                    />
                  </div>

                  {forgotType === 'password' && (
                    <>
                      <div className="space-y-1">
                        <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-cream-300">
                          New Password (min 8 chars)
                        </label>
                        <input
                          type="password"
                          required
                          minLength={8}
                          value={resetNewPassword}
                          onChange={(e) => setResetNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          className="w-full text-xs font-sans py-2.5 px-4 rounded-xl bg-forest-950/70 border border-forest-700 text-ivory placeholder-cream-600 focus:outline-none focus:border-gold transition-all"
                        />
                      </div>
                      <div className="space-y-1 pt-1">
                        <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-cream-300">
                          New Security PIN <span className="text-cream-400 font-normal lowercase">(optional 4-8 digits)</span>
                        </label>
                        <input
                          type="password"
                          maxLength={8}
                          value={resetNewPin}
                          onChange={(e) => setResetNewPin(e.target.value.replace(/\D/g, ''))}
                          placeholder="Update PIN too (optional)"
                          className="w-full text-xs font-sans py-2.5 px-4 rounded-xl bg-forest-950/70 border border-forest-700 text-ivory placeholder-cream-600 focus:outline-none focus:border-gold transition-all"
                        />
                      </div>
                    </>
                  )}

                  {forgotType === 'pin' && (
                    <>
                      <div className="space-y-1">
                        <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-cream-300">
                          New Security PIN (4-8 digits)
                        </label>
                        <input
                          type="password"
                          required
                          minLength={4}
                          maxLength={8}
                          value={resetNewPin}
                          onChange={(e) => setResetNewPin(e.target.value.replace(/\D/g, ''))}
                          placeholder="e.g. 6358"
                          className="w-full text-xs font-sans py-2.5 px-4 rounded-xl bg-forest-950/70 border border-forest-700 text-ivory placeholder-cream-600 focus:outline-none focus:border-gold transition-all"
                        />
                      </div>
                      <div className="space-y-1 pt-1">
                        <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-cream-300">
                          New Password <span className="text-cream-400 font-normal lowercase">(optional, min 8 chars)</span>
                        </label>
                        <input
                          type="password"
                          minLength={8}
                          value={resetNewPassword}
                          onChange={(e) => setResetNewPassword(e.target.value)}
                          placeholder="Update password too (optional)"
                          className="w-full text-xs font-sans py-2.5 px-4 rounded-xl bg-forest-950/70 border border-forest-700 text-ivory placeholder-cream-600 focus:outline-none focus:border-gold transition-all"
                        />
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    disabled={isResetting}
                    className="w-full py-3.5 px-6 rounded-full bg-gold text-forest font-sans text-xs font-bold uppercase tracking-widest hover:bg-gold-400 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    {isResetting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {resetNewPassword && resetNewPin
                            ? 'Save Password & PIN'
                            : forgotType === 'pin'
                            ? 'Save New Security PIN'
                            : 'Save New Password'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setStep('forgot')}
                      className="text-xs text-cream-400 hover:text-gold transition-colors cursor-pointer"
                    >
                      &larr; Request New Code
                    </button>
                  </div>
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
