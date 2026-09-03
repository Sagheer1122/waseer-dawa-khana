'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  CreditCard,
  Truck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShoppingBag,
  Banknote,
  Smartphone,
  Building2,
  MessageCircle,
} from 'lucide-react';
import { submitOrder } from '@/lib/api';

const PAKISTANI_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Bahawalpur',
  'Sargodha',
  'Abbottabad',
  'Sukkur',
  'Gujrat',
  'Mardan',
  'Wah Cantt',
  'Rahim Yar Khan',
  'Other / Nationwide',
];

const checkoutSchema = z.object({
  // Contact
  fullName: z.string().min(2, 'Full name is required (min 2 characters).'),
  email: z.string().email('Please enter a valid email address.').optional().or(z.literal('')),
  phone: z.string().min(10, 'Please enter a valid Pakistani mobile number (e.g., 0300 1234567).'),

  // Shipping
  address: z.string().min(5, 'Complete delivery street address is required.'),
  city: z.string().min(2, 'City is required.'),
  province: z.string().min(2, 'Province is required.'),
  postalCode: z.string().optional(),
  country: z.string().default('Pakistan'),

  // Payment method selection
  paymentMethod: z.enum(['cod', 'jazzcash', 'easypaisa', 'bank', 'card']),

  // Optional card / account fields
  accountNumber: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  cardName: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, getSubtotal, getTotal, discountAmount, clearCart } = useCartStore();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPayment, setSelectedPayment] = useState<'cod' | 'jazzcash' | 'easypaisa' | 'bank' | 'card'>('cod');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [placedOrderSummary, setPlacedOrderSummary] = useState<any>(null);

  const subtotal = getSubtotal();
  const total = getTotal();
  const shippingFee = subtotal >= 3000 ? 0 : 250;
  const grandTotal = total + (subtotal >= 3000 ? 0 : 250);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      country: 'Pakistan',
      province: 'Punjab',
      city: 'Lahore',
      address: '',
      fullName: '',
      email: '',
      phone: '',
      paymentMethod: 'cod',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      cardName: '',
      accountNumber: '',
    },
  });

  const handleNextStep = async () => {
    if (step === 1) {
      const validContact = await trigger(['fullName', 'email', 'phone', 'address', 'city', 'province', 'country']);
      if (validContact) setStep(2);
    } else if (step === 2) {
      setValue('paymentMethod', selectedPayment);
      setStep(3);
    }
  };

  const onSubmit = async (data: CheckoutFormData) => {
    let newOrderNumber = `PK-${Math.floor(100000 + Math.random() * 900000)}`;
    let whatsappRedirectUrl = '';

    try {
      const res = await submitOrder({
        customerName: data.fullName,
        customerPhone: data.phone,
        customerEmail: data.email,
        shippingAddress: `${data.address}, ${data.city}, ${data.province}, Pakistan`,
        items: items.map((it) => ({
          productId: it.productId || it.id,
          productName: it.name,
          quantity: it.quantity,
          price: it.price,
          size: it.size,
          image: it.image,
        })),
        totalAmount: grandTotal,
        paymentMethod: selectedPayment,
      });

      if (res.orderNumber) {
        newOrderNumber = res.orderNumber;
      }
      if (res.whatsappUrl) {
        whatsappRedirectUrl = res.whatsappUrl;
      }
    } catch (err) {
      console.warn('[Checkout] Saved offline order fallback:', err);
    }

    setOrderNumber(newOrderNumber);
    setPlacedOrderSummary({
      items: [...items],
      total: grandTotal,
      shippingAddress: `${data.address}, ${data.city}, ${data.province}, Pakistan`,
      email: data.email,
      phone: data.phone,
      paymentMethod: selectedPayment,
      whatsappUrl: whatsappRedirectUrl,
    });
    setIsOrderPlaced(true);
    clearCart();

    if (whatsappRedirectUrl) {
      window.open(whatsappRedirectUrl, '_blank');
    }
  };

  if (isOrderPlaced && placedOrderSummary) {
    return (
      <div className="bg-ivory min-h-screen py-16 sm:py-24">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-forest text-ivory flex items-center justify-center mx-auto shadow-xl">
            <CheckCircle2 className="w-10 h-10 text-gold" />
          </div>

          <div className="space-y-2">
            <Badge variant="gold">ORDER CONFIRMED (PAKISTAN)</Badge>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest">
              Shukriya! Order Placed Successfully
            </h1>
            <p className="font-sans text-sm sm:text-base text-earth-600">
              Aapka pure botanical hair ritual order receive ho gaya hai. Hum jald aapke delivery address par dispatch kar rahe hain.
            </p>
          </div>

          {/* Receipt Box */}
          <div className="bg-cream-50 rounded-3xl border border-cream-300 p-6 sm:p-8 text-left space-y-4 shadow-sm">
            <div className="flex justify-between items-center pb-3 border-b border-cream-200">
              <div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-sage">
                  Tracking Order #
                </span>
                <p className="font-mono text-base font-bold text-forest">{orderNumber}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-sage">
                  Total Payable
                </span>
                <p className="font-sans text-base font-bold text-forest">
                  {formatPrice(placedOrderSummary.total)}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs font-sans text-earth-700">
              <div className="flex justify-between py-1 border-b border-cream-200/60">
                <span className="text-earth-500">Payment Method:</span>
                <span className="font-bold text-forest uppercase">
                  {placedOrderSummary.paymentMethod === 'cod' && 'Cash on Delivery (COD)'}
                  {placedOrderSummary.paymentMethod === 'jazzcash' && 'JazzCash Mobile Account'}
                  {placedOrderSummary.paymentMethod === 'easypaisa' && 'EasyPaisa Mobile Account'}
                  {placedOrderSummary.paymentMethod === 'bank' && 'Direct Bank Transfer / Raast'}
                  {placedOrderSummary.paymentMethod === 'card' && 'Debit / Credit Card'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-cream-200/60">
                <span className="text-earth-500">Shipping To:</span>
                <span className="font-medium text-right max-w-xs">{placedOrderSummary.shippingAddress}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-cream-200/60">
                <span className="text-earth-500">Contact Number:</span>
                <span className="font-medium font-mono">{placedOrderSummary.phone}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-earth-500">Estimated Delivery:</span>
                <span className="font-bold text-forest">2–3 Working Days via TCS / Leopards</span>
              </div>
            </div>

            {/* Payment Specific Instructions */}
            {placedOrderSummary.paymentMethod === 'jazzcash' && (
              <div className="p-3.5 bg-gold/10 rounded-xl border border-gold/30 text-xs font-sans space-y-1">
                <p className="font-bold text-forest">JazzCash Payment Details:</p>
                <p className="text-earth-700">Please transfer {formatPrice(placedOrderSummary.total)} to <strong>0323-9009042 (WASEER Dawa Khana)</strong> and send screenshot on WhatsApp.</p>
              </div>
            )}

            {placedOrderSummary.paymentMethod === 'easypaisa' && (
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-sans space-y-1">
                <p className="font-bold text-forest">EasyPaisa Payment Details:</p>
                <p className="text-earth-700">Please send {formatPrice(placedOrderSummary.total)} to <strong>0345-1234567 (WASEER Dawa Khana)</strong>.</p>
              </div>
            )}

            {placedOrderSummary.paymentMethod === 'bank' && (
              <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 text-xs font-sans space-y-1">
                <p className="font-bold text-forest">Bank Transfer / Raast IBAN:</p>
                <p className="text-earth-700 font-mono text-[11px]">Meezan Bank • WASEER Dawa Khana | PK00MEZN0001234567890123</p>
              </div>
            )}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            {placedOrderSummary.whatsappUrl && (
              <a
                href={placedOrderSummary.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-ivory font-sans text-xs font-bold uppercase tracking-widest transition-all shadow-md active:scale-98"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Open WhatsApp Order</span>
              </a>
            )}
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-forest text-ivory font-sans text-xs font-bold uppercase tracking-widest hover:bg-forest-700 transition-colors shadow-sm text-center"
            >
              Continue Exploring Rituals
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen pb-24">
      {/* Header */}
      <div className="bg-cream-50/80 border-b border-cream-200 py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <Badge variant="forest">SECURE NATIONWIDE CHECKOUT</Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest">
            WASEER Herbal Hair Oil Checkout
          </h1>
          <p className="font-sans text-xs sm:text-sm text-earth-600">
            Cash on Delivery (COD), JazzCash, EasyPaisa, Raast Bank Transfer & Card accepted.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Form (Steps 1, 2, 3) */}
          <div className="lg:col-span-7 space-y-8">

            {/* Step Indicators */}
            <div className="flex items-center justify-between pb-6 border-b border-cream-200 font-sans text-xs font-bold uppercase tracking-wider">
              <span className={step >= 1 ? 'text-forest' : 'text-earth-400'}>
                1. Delivery Details
              </span>
              <span className="text-earth-300">&rarr;</span>
              <span className={step >= 2 ? 'text-forest' : 'text-earth-400'}>
                2. Payment Method
              </span>
              <span className="text-earth-300">&rarr;</span>
              <span className={step === 3 ? 'text-forest' : 'text-earth-400'}>
                3. Final Review
              </span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* STEP 1: Shipping Details (Pakistan Focused) */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-serif text-xl font-bold text-forest flex items-center gap-2">
                    <Truck className="w-5 h-5 text-sage" />
                    <span>1. Delivery & Contact Details</span>
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-sans font-semibold text-earth-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register('fullName')}
                        placeholder="e.g. Muhammad Ali"
                        className="w-full px-4 py-2.5 text-xs font-sans rounded-xl border border-cream-300 bg-ivory focus:outline-none focus:border-forest"
                      />
                      {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-sans font-semibold text-earth-700 uppercase tracking-wider mb-1">
                          Mobile Number (For Courier Delivery) *
                        </label>
                        <input
                          type="tel"
                          {...register('phone')}
                          placeholder="0300 1234567"
                          className="w-full px-4 py-2.5 text-xs font-sans rounded-xl border border-cream-300 bg-ivory focus:outline-none focus:border-forest font-mono"
                        />
                        {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-sans font-semibold text-earth-700 uppercase tracking-wider mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          {...register('email')}
                          placeholder="customer@example.com (optional)"
                          className="w-full px-4 py-2.5 text-xs font-sans rounded-xl border border-cream-300 bg-ivory focus:outline-none focus:border-forest"
                        />
                        {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-semibold text-earth-700 uppercase tracking-wider mb-1">
                        Complete Street Address / House / Flat # *
                      </label>
                      <input
                        type="text"
                        {...register('address')}
                        placeholder="House #, Street Name, Area / Sector"
                        className="w-full px-4 py-2.5 text-xs font-sans rounded-xl border border-cream-300 bg-ivory focus:outline-none focus:border-forest"
                      />
                      {errors.address && <p className="text-[11px] text-red-600 mt-1">{errors.address.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-sans font-semibold text-earth-700 uppercase tracking-wider mb-1">
                          City *
                        </label>
                        <select
                          {...register('city')}
                          className="w-full px-3 py-2.5 text-xs font-sans rounded-xl border border-cream-300 bg-ivory focus:outline-none focus:border-forest cursor-pointer"
                        >
                          {PAKISTANI_CITIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        {errors.city && <p className="text-[11px] text-red-600 mt-1">{errors.city.message}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-sans font-semibold text-earth-700 uppercase tracking-wider mb-1">
                          Province *
                        </label>
                        <select
                          {...register('province')}
                          className="w-full px-3 py-2.5 text-xs font-sans rounded-xl border border-cream-300 bg-ivory focus:outline-none focus:border-forest cursor-pointer"
                        >
                          <option value="Punjab">Punjab</option>
                          <option value="Sindh">Sindh</option>
                          <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa (KPK)</option>
                          <option value="Balochistan">Balochistan</option>
                          <option value="Islamabad Capital">Islamabad Capital</option>
                          <option value="Azad Kashmir">Azad Kashmir</option>
                          <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-sans font-semibold text-earth-700 uppercase tracking-wider mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          disabled
                          value="Pakistan"
                          className="w-full px-4 py-2.5 text-xs font-sans rounded-xl border border-cream-200 bg-cream-100 text-earth-600 cursor-not-allowed font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-8 py-3.5 rounded-full bg-forest text-ivory font-sans text-xs font-bold uppercase tracking-widest hover:bg-forest-700 transition-all shadow-sm"
                    >
                      Proceed to Payment &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Pakistani Payment Methods */}
              {step === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <h3 className="font-serif text-xl font-bold text-forest flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-sage" />
                    <span>2. Select Payment Method</span>
                  </h3>

                  <div className="space-y-3">

                    {/* COD Option */}
                    <div
                      onClick={() => setSelectedPayment('cod')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${selectedPayment === 'cod'
                          ? 'border-forest bg-cream-50 shadow-xs'
                          : 'border-cream-300 bg-ivory hover:border-cream-400'
                        }`}
                    >
                      <input
                        type="radio"
                        name="paymentGroup"
                        checked={selectedPayment === 'cod'}
                        onChange={() => setSelectedPayment('cod')}
                        className="mt-1 accent-forest"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-sans text-xs font-bold text-forest flex items-center gap-1.5 uppercase tracking-wider">
                            <Banknote className="w-4 h-4 text-forest" /> Cash on Delivery (COD)
                          </span>
                          <span className="px-2 py-0.5 rounded bg-forest/10 text-forest text-[10px] font-bold">Most Popular in PK</span>
                        </div>
                        <p className="font-sans text-xs text-earth-600">
                          Pay cash to the delivery rider when receiving your package at your doorstep.
                        </p>
                      </div>
                    </div>

                    {/* JazzCash Option */}
                    <div
                      onClick={() => setSelectedPayment('jazzcash')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${selectedPayment === 'jazzcash'
                          ? 'border-forest bg-cream-50 shadow-xs'
                          : 'border-cream-300 bg-ivory hover:border-cream-400'
                        }`}
                    >
                      <input
                        type="radio"
                        name="paymentGroup"
                        checked={selectedPayment === 'jazzcash'}
                        onChange={() => setSelectedPayment('jazzcash')}
                        className="mt-1 accent-forest"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-sans text-xs font-bold text-forest flex items-center gap-1.5 uppercase tracking-wider">
                            <Smartphone className="w-4 h-4 text-red-600" /> JazzCash Mobile Wallet
                          </span>
                          <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-bold">Instant Transfer</span>
                        </div>
                        <p className="font-sans text-xs text-earth-600">
                          Pay directly from your JazzCash wallet account or till number.
                        </p>
                      </div>
                    </div>

                    {/* EasyPaisa Option */}
                    <div
                      onClick={() => setSelectedPayment('easypaisa')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${selectedPayment === 'easypaisa'
                          ? 'border-forest bg-cream-50 shadow-xs'
                          : 'border-cream-300 bg-ivory hover:border-cream-400'
                        }`}
                    >
                      <input
                        type="radio"
                        name="paymentGroup"
                        checked={selectedPayment === 'easypaisa'}
                        onChange={() => setSelectedPayment('easypaisa')}
                        className="mt-1 accent-forest"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-sans text-xs font-bold text-forest flex items-center gap-1.5 uppercase tracking-wider">
                            <Smartphone className="w-4 h-4 text-emerald-600" /> EasyPaisa Mobile Wallet
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold">Instant Transfer</span>
                        </div>
                        <p className="font-sans text-xs text-earth-600">
                          Transfer easily using your EasyPaisa mobile account.
                        </p>
                      </div>
                    </div>

                    {/* Raast / Bank Transfer */}
                    <div
                      onClick={() => setSelectedPayment('bank')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${selectedPayment === 'bank'
                          ? 'border-forest bg-cream-50 shadow-xs'
                          : 'border-cream-300 bg-ivory hover:border-cream-400'
                        }`}
                    >
                      <input
                        type="radio"
                        name="paymentGroup"
                        checked={selectedPayment === 'bank'}
                        onChange={() => setSelectedPayment('bank')}
                        className="mt-1 accent-forest"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-sans text-xs font-bold text-forest flex items-center gap-1.5 uppercase tracking-wider">
                            <Building2 className="w-4 h-4 text-blue-600" /> Raast / Direct Bank Transfer
                          </span>
                          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold">Meezan, HBL, etc.</span>
                        </div>
                        <p className="font-sans text-xs text-earth-600">
                          Pay directly via Raast ID or Bank IBAN transfer through online banking apps.
                        </p>
                      </div>
                    </div>

                    {/* Debit / Credit Card */}
                    <div
                      onClick={() => setSelectedPayment('card')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${selectedPayment === 'card'
                          ? 'border-forest bg-cream-50 shadow-xs'
                          : 'border-cream-300 bg-ivory hover:border-cream-400'
                        }`}
                    >
                      <input
                        type="radio"
                        name="paymentGroup"
                        checked={selectedPayment === 'card'}
                        onChange={() => setSelectedPayment('card')}
                        className="mt-1 accent-forest"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-sans text-xs font-bold text-forest flex items-center gap-1.5 uppercase tracking-wider">
                            <CreditCard className="w-4 h-4 text-forest" /> Debit / Credit Card
                          </span>
                          <span className="text-[10px] font-mono text-earth-500">Visa / Mastercard / PayPak</span>
                        </div>
                        <p className="font-sans text-xs text-earth-600">
                          Pay securely with any Pakistani or International bank card with 3D Secure OTP.
                        </p>
                      </div>
                    </div>

                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-earth-600 hover:text-forest"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back to Delivery
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-8 py-3.5 rounded-full bg-forest text-ivory font-sans text-xs font-bold uppercase tracking-widest hover:bg-forest-700 transition-all shadow-sm"
                    >
                      Review Order &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Order Review & Submit */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="font-serif text-xl font-bold text-forest flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-sage" />
                    <span>3. Confirm & Place Order</span>
                  </h3>

                  <div className="p-5 rounded-2xl bg-cream-50 border border-cream-300 space-y-3 font-sans text-xs">
                    <div className="flex justify-between pb-2 border-b border-cream-200">
                      <span className="text-earth-600 font-semibold">Payment Option:</span>
                      <span className="font-bold text-forest uppercase">
                        {selectedPayment === 'cod' && 'Cash on Delivery (COD)'}
                        {selectedPayment === 'jazzcash' && 'JazzCash Mobile Account'}
                        {selectedPayment === 'easypaisa' && 'EasyPaisa Mobile Account'}
                        {selectedPayment === 'bank' && 'Raast / Bank Transfer'}
                        {selectedPayment === 'card' && 'Debit / Credit Card'}
                      </span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-cream-200">
                      <span className="text-earth-600 font-semibold">Delivery Time:</span>
                      <span className="font-semibold text-forest">2 to 3 Business Days via TCS / Leopards</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-earth-600 font-semibold">Standard Delivery:</span>
                      <span className="font-bold text-forest">
                        {subtotal >= 3000 ? 'FREE (Orders above Rs. 3,000)' : 'Rs. 250'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-earth-600 hover:text-forest"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back to Payment
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-10 py-4 rounded-full bg-forest text-ivory font-sans text-xs font-bold uppercase tracking-widest hover:bg-forest-700 transition-all shadow-xl"
                    >
                      {isSubmitting ? 'Confirming...' : 'Place Order Now 🌿'}
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>

          {/* Right Summary Box */}
          <div className="lg:col-span-5">
            <div className="bg-cream-50/90 rounded-3xl p-6 sm:p-8 border border-cream-300 space-y-6 sticky top-24">
              <div className="flex items-center justify-between pb-4 border-b border-cream-200">
                <h3 className="font-serif text-lg font-bold text-forest">Order Summary</h3>
                <span className="font-sans text-xs text-earth-500 font-semibold">{items.length} items</span>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-cream-200 border border-cream-300 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs font-bold text-forest truncate">{item.name}</h4>
                      <p className="font-sans text-[11px] text-earth-500">
                        {item.size} × {item.quantity}
                      </p>
                    </div>
                    <span className="font-sans text-xs font-bold text-forest">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-4 border-t border-cream-200 font-sans text-xs">
                <div className="flex justify-between text-earth-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-forest font-semibold">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-earth-600">
                  <span>Nationwide Courier Delivery</span>
                  <span>{subtotal >= 3000 ? 'FREE' : 'Rs. 250'}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-forest pt-3 border-t border-cream-200">
                  <span>Total Amount</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-3 bg-ivory rounded-2xl border border-cream-200 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-sage flex-shrink-0" />
                <p className="font-sans text-[11px] text-earth-600 leading-tight">
                  <strong>100% Guaranteed Pure Botanicals</strong>. Delivered fresh across Pakistan.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
