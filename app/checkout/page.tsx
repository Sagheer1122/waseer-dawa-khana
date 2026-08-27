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
  ShoppingBag
} from 'lucide-react';

const checkoutSchema = z.object({
  // Contact
  fullName: z.string().min(2, 'Full name is required (min 2 characters).'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().min(8, 'Phone number is required.'),

  // Shipping
  address: z.string().min(5, 'Street address is required.'),
  city: z.string().min(2, 'City is required.'),
  state: z.string().min(2, 'State or Province is required.'),
  postalCode: z.string().min(3, 'Postal code is required.'),
  country: z.string().min(2, 'Country is required.'),

  // Payment
  cardNumber: z.string().min(15, 'Please enter a valid 16-digit card number.'),
  cardExpiry: z.string().min(4, 'MM/YY required.'),
  cardCvc: z.string().min(3, '3 or 4-digit CVC required.'),
  cardName: z.string().min(2, 'Name on card is required.'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, getSubtotal, getTotal, discountAmount, clearCart } = useCartStore();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [placedOrderSummary, setPlacedOrderSummary] = useState<any>(null);

  const subtotal = getSubtotal();
  const total = getTotal();
  const shippingFee = subtotal >= 50 ? 0 : 4.95;

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      country: 'United States',
      state: 'California',
      city: 'Los Angeles',
      address: '742 Evergreen Terrace',
      fullName: 'Sarah Jenkins',
      email: 'sarah.jenkins@example.com',
      phone: '+1 (555) 382-9910',
      cardNumber: '4242 •••• •••• 4242',
      cardExpiry: '12/28',
      cardCvc: '882',
      cardName: 'Sarah Jenkins',
    },
  });

  const handleNextStep = async () => {
    if (step === 1) {
      const validContact = await trigger(['fullName', 'email', 'phone', 'address', 'city', 'state', 'postalCode', 'country']);
      if (validContact) setStep(2);
    } else if (step === 2) {
      const validPayment = await trigger(['cardNumber', 'cardExpiry', 'cardCvc', 'cardName']);
      if (validPayment) setStep(3);
    }
  };

  const onSubmit = async (data: CheckoutFormData) => {
    // Simulate order placement
    await new Promise((resolve) => setTimeout(resolve, 800));
    const randomOrderNum = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderNumber(randomOrderNum);
    setPlacedOrderSummary({
      items: [...items],
      total,
      shippingAddress: `${data.address}, ${data.city}, ${data.state} ${data.postalCode}`,
      email: data.email,
    });
    setIsOrderPlaced(true);
    clearCart();
  };

  if (isOrderPlaced && placedOrderSummary) {
    return (
      <div className="bg-ivory min-h-screen py-16 sm:py-24">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-forest text-ivory flex items-center justify-center mx-auto shadow-xl">
            <CheckCircle2 className="w-10 h-10 text-gold" />
          </div>

          <div className="space-y-2">
            <Badge variant="gold">MOCK CHECKOUT CONFIRMED</Badge>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest">
              Order Confirmed
            </h1>
            <p className="font-sans text-sm sm:text-base text-earth-600">
              Thank you for your order. Your cold-pressed botanical ritual is being prepared with care.
            </p>
          </div>

          {/* Receipt Box */}
          <div className="bg-cream-50 rounded-3xl border border-cream-300 p-6 sm:p-8 text-left space-y-4 shadow-sm">
            <div className="flex justify-between items-center pb-3 border-b border-cream-200">
              <div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-sage">
                  Order Number
                </span>
                <p className="font-mono text-base font-bold text-forest">{orderNumber}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-sage">
                  Estimated Total
                </span>
                <p className="font-sans text-base font-bold text-forest">
                  {formatPrice(placedOrderSummary.total)}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-earth-700">
                Purchased Botanical Rituals:
              </span>
              <div className="divide-y divide-cream-200">
                {placedOrderSummary.items.map((item: any) => (
                  <div key={item.id} className="py-2 flex items-center justify-between text-xs font-sans">
                    <span className="font-medium text-forest">
                      {item.name} ({item.size}) x {item.quantity}
                    </span>
                    <span className="font-bold text-forest">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-cream-200 text-xs font-sans text-earth-600 space-y-1">
              <p><strong>Confirmation Sent To:</strong> {placedOrderSummary.email}</p>
              <p><strong>Shipping To:</strong> {placedOrderSummary.shippingAddress}</p>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-block px-8 py-3.5 rounded-full bg-forest text-ivory font-sans text-xs font-bold uppercase tracking-widest hover:bg-forest-700 transition-all shadow-md"
            >
              Continue Exploring
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-4 bg-ivory">
        <ShoppingBag className="w-12 h-12 text-earth-400" />
        <h1 className="font-serif text-3xl font-bold text-forest">Your Ritual Bag is Empty</h1>
        <p className="font-sans text-xs text-earth-600">Please add items to your cart before proceeding to checkout.</p>
        <Link href="/shop" className="px-6 py-2.5 rounded-full bg-forest text-ivory text-xs font-sans font-bold uppercase">
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <Badge variant="forest">SECURE BOTANICAL CHECKOUT</Badge>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
            Complete Your Ritual Order
          </h1>
          <p className="font-sans text-xs text-earth-600">
            Frontend demonstration checkout. Zero actual card charges.
          </p>
        </div>

        {/* Checkout Steps Progress Strip */}
        <div className="max-w-3xl mx-auto mb-10 flex items-center justify-between text-xs font-sans border-b border-cream-200 pb-4">
          <div className={`flex items-center gap-1.5 sm:gap-2 font-bold ${step >= 1 ? 'text-forest' : 'text-earth-400'}`}>
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-forest text-ivory flex items-center justify-center text-[10px] sm:text-xs">1</span>
            <span className="text-[11px] sm:text-xs">Shipping<span className="hidden sm:inline"> & Contact</span></span>
          </div>
          <span className="text-cream-300 text-xs">—</span>
          <div className={`flex items-center gap-1.5 sm:gap-2 font-bold ${step >= 2 ? 'text-forest' : 'text-earth-400'}`}>
            <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs ${step >= 2 ? 'bg-forest text-ivory' : 'bg-cream-200 text-earth-600'}`}>2</span>
            <span className="text-[11px] sm:text-xs">Payment<span className="hidden sm:inline"> Method</span></span>
          </div>
          <span className="text-cream-300 text-xs">—</span>
          <div className={`flex items-center gap-1.5 sm:gap-2 font-bold ${step >= 3 ? 'text-forest' : 'text-earth-400'}`}>
            <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs ${step >= 3 ? 'bg-forest text-ivory' : 'bg-cream-200 text-earth-600'}`}>3</span>
            <span className="text-[11px] sm:text-xs">Review<span className="hidden sm:inline"> & Place</span></span>
          </div>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Form Column */}
          <div className="lg:col-span-7 bg-cream-50 rounded-3xl p-6 sm:p-10 border border-cream-300 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* STEP 1: Contact & Shipping */}
              {step === 1 && (
                <div className="space-y-5 animate-fade-in">
                  <h3 className="font-serif text-xl font-bold text-forest flex items-center gap-2">
                    <Truck className="w-5 h-5 text-sage" />
                    <span>1. Contact & Delivery Address</span>
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-sans font-semibold text-earth-700 uppercase tracking-wider mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        {...register('fullName')}
                        className="w-full px-4 py-2.5 text-xs font-sans rounded-xl border border-cream-300 bg-ivory focus:outline-none focus:border-forest"
                      />
                      {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-sans font-semibold text-earth-700 uppercase tracking-wider mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          {...register('email')}
                          className="w-full px-4 py-2.5 text-xs font-sans rounded-xl border border-cream-300 bg-ivory focus:outline-none focus:border-forest"
                        />
                        {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-sans font-semibold text-earth-700 uppercase tracking-wider mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          {...register('phone')}
                          className="w-full px-4 py-2.5 text-xs font-sans rounded-xl border border-cream-300 bg-ivory focus:outline-none focus:border-forest"
                        />
                        {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-semibold text-earth-700 uppercase tracking-wider mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        {...register('address')}
                        className="w-full px-4 py-2.5 text-xs font-sans rounded-xl border border-cream-300 bg-ivory focus:outline-none focus:border-forest"
                      />
                      {errors.address && <p className="text-[11px] text-red-600 mt-1">{errors.address.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-sans font-semibold text-earth-700 uppercase tracking-wider mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          {...register('city')}
                          className="w-full px-4 py-2.5 text-xs font-sans rounded-xl border border-cream-300 bg-ivory focus:outline-none focus:border-forest"
                        />
                        {errors.city && <p className="text-[11px] text-red-600 mt-1">{errors.city.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-sans font-semibold text-earth-700 uppercase tracking-wider mb-1">
                          State / Prov
                        </label>
                        <input
                          type="text"
                          {...register('state')}
                          className="w-full px-4 py-2.5 text-xs font-sans rounded-xl border border-cream-300 bg-ivory focus:outline-none focus:border-forest"
                        />
                        {errors.state && <p className="text-[11px] text-red-600 mt-1">{errors.state.message}</p>}
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-sans font-semibold text-earth-700 uppercase tracking-wider mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          {...register('postalCode')}
                          className="w-full px-4 py-2.5 text-xs font-sans rounded-xl border border-cream-300 bg-ivory focus:outline-none focus:border-forest"
                        />
                        {errors.postalCode && <p className="text-[11px] text-red-600 mt-1">{errors.postalCode.message}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-8 py-3.5 rounded-full bg-forest text-ivory font-sans text-xs font-bold uppercase tracking-widest hover:bg-forest-700 transition-all shadow-sm"
                    >
                      Continue to Payment &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Payment Method */}
              {step === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <h3 className="font-serif text-xl font-bold text-forest flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-sage" />
                    <span>2. Payment Details</span>
                  </h3>

                  <div className="p-4 rounded-2xl bg-ivory border border-cream-300 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-cream-200">
                      <span className="text-xs font-sans font-bold text-forest flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-sage" /> 256-Bit SSL Encrypted
                      </span>
                      <span className="text-[11px] font-mono text-earth-500">Visa / MC / Amex / Apple Pay</span>
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-semibold text-earth-700 uppercase tracking-wider mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        {...register('cardNumber')}
                        className="w-full px-4 py-2.5 text-xs font-sans rounded-xl border border-cream-300 bg-cream-50 focus:outline-none focus:border-forest font-mono"
                      />
                      {errors.cardNumber && <p className="text-[11px] text-red-600 mt-1">{errors.cardNumber.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-sans font-semibold text-earth-700 uppercase tracking-wider mb-1">
                          Expiration (MM/YY)
                        </label>
                        <input
                          type="text"
                          {...register('cardExpiry')}
                          className="w-full px-4 py-2.5 text-xs font-sans rounded-xl border border-cream-300 bg-cream-50 focus:outline-none focus:border-forest font-mono"
                        />
                        {errors.cardExpiry && <p className="text-[11px] text-red-600 mt-1">{errors.cardExpiry.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-sans font-semibold text-earth-700 uppercase tracking-wider mb-1">
                          Security CVC
                        </label>
                        <input
                          type="text"
                          {...register('cardCvc')}
                          className="w-full px-4 py-2.5 text-xs font-sans rounded-xl border border-cream-300 bg-cream-50 focus:outline-none focus:border-forest font-mono"
                        />
                        {errors.cardCvc && <p className="text-[11px] text-red-600 mt-1">{errors.cardCvc.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-semibold text-earth-700 uppercase tracking-wider mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        {...register('cardName')}
                        className="w-full px-4 py-2.5 text-xs font-sans rounded-xl border border-cream-300 bg-cream-50 focus:outline-none focus:border-forest"
                      />
                      {errors.cardName && <p className="text-[11px] text-red-600 mt-1">{errors.cardName.message}</p>}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs font-sans font-semibold uppercase tracking-wider text-earth-600 hover:text-forest"
                    >
                      &larr; Back to Shipping
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

              {/* STEP 3: Review & Place Order */}
              {step === 3 && (
                <div className="space-y-5 animate-fade-in">
                  <h3 className="font-serif text-xl font-bold text-forest flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-sage" />
                    <span>3. Final Review & Place Order</span>
                  </h3>

                  <div className="p-4 rounded-2xl bg-ivory border border-cream-300 text-xs font-sans text-earth-700 space-y-2">
                    <p><strong>Ready to place order for:</strong> {items.length} items ({formatPrice(total)})</p>
                    <p><strong>Complimentary Delivery:</strong> Standard Carbon-Neutral (2–4 Business Days)</p>
                    <p className="italic text-earth-500">By placing this order, you agree to our terms and 30-day ritual return policy.</p>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs font-sans font-semibold uppercase tracking-wider text-earth-600 hover:text-forest"
                    >
                      &larr; Back to Payment
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-10 py-4 rounded-full bg-forest text-ivory font-sans text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-forest-700 transition-all shadow-lg flex items-center gap-2"
                    >
                      <span>{isSubmitting ? 'Securing Ritual...' : 'Place Order Now'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5 bg-cream-50 rounded-3xl p-6 sm:p-8 border border-cream-300 space-y-4 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-forest pb-2 border-b border-cream-200">
              Items in Bag ({items.length})
            </h3>

            <div className="divide-y divide-cream-200 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="py-3 flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-cream-100 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-xs font-bold text-forest truncate">{item.name}</p>
                    <p className="font-sans text-[11px] text-earth-500">Vol: {item.size} • Qty: {item.quantity}</p>
                  </div>
                  <span className="font-sans text-xs font-bold text-forest">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-3 border-t border-cream-200 font-sans text-xs text-earth-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-sage-700">
                  <span>Botanical Savings</span>
                  <span>-{formatPrice(subtotal * discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-forest">FREE</strong> : formatPrice(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-forest pt-2 border-t border-cream-200">
                <span>Total Due</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
