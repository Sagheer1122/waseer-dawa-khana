'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Badge } from '@/components/ui/Badge';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';
import { useUIStore } from '@/store/uiStore';
import { Mail, Phone, MapPin, CheckCircle2, Clock, Sparkles, Send } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name (min 2 characters).'),
  email: z.string().email('Please enter a valid email address.'),
  subject: z.string().min(3, 'Please specify a subject.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSent, setIsSent] = useState(false);
  const addToast = useUIStore((s) => s.addToast);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSent(true);
    reset();
    addToast({
      type: 'success',
      title: 'Message Sent Successfully',
      message: "We'll get back to you soon within 24 hours.",
    });
  };

  const faqItems: AccordionItem[] = [
    {
      id: 'shipping',
      title: 'How long does carbon-neutral shipping take?',
      content: 'Standard complimentary delivery on orders over $50 takes 2 to 4 business days within the United States. Priority courier options are also available at checkout.',
    },
    {
      id: 'returns',
      title: 'What is your 30-Day Ritual Return Guarantee?',
      content: 'We want you to experience genuine hair transformation. If you are not completely satisfied with our botanical formulas within 30 days of receipt, simply contact us for a complimentary full refund or exchange.',
    },
    {
      id: 'wholesale',
      title: 'Do you offer salon partnership or wholesale distribution?',
      content: 'Yes. We partner with select trichology clinics, holistic salons, and luxury spas worldwide. Please select "Wholesale & Partnerships" in the inquiry form.',
    },
  ];

  return (
    <div className="bg-ivory min-h-screen pb-24">
      
      {/* Header */}
      <div className="bg-cream-50 border-b border-cream-200 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-3">
          <Badge variant="forest">CLIENT CONCIERGE & FORMULATION STUDIO</Badge>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-forest">
            Connect With Our Studio
          </h1>
          <p className="font-sans text-sm sm:text-base text-earth-600 max-w-xl mx-auto">
            Have questions about custom hair oiling rituals, wholesale partnerships, or ingredient sourcing? Our team is here to assist.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 space-y-16">
        
        {/* 2-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-cream-50 rounded-3xl p-6 sm:p-10 border border-cream-300 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-forest mb-6">
              Send An Inquiry
            </h2>

            {isSent ? (
              <div className="p-8 rounded-2xl bg-forest text-ivory text-center space-y-3 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-sage flex items-center justify-center mx-auto text-ivory">
                  <CheckCircle2 className="w-6 h-6 text-cream-100" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-cream-100">
                  Message Sent Successfully.
                </h3>
                <p className="font-sans text-xs text-cream-200 max-w-xs mx-auto">
                  Thank you for reaching out. A botanical specialist will review your note and respond within 24 business hours.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-ivory text-forest font-sans text-xs font-bold uppercase tracking-wider hover:bg-gold transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-earth-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-ivory text-xs font-sans text-forest focus:outline-none focus:border-forest"
                  />
                  {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-earth-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="e.g. eleanor@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-ivory text-xs font-sans text-forest focus:outline-none focus:border-forest"
                  />
                  {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-earth-700 mb-1">
                    Subject / Department
                  </label>
                  <input
                    type="text"
                    {...register('subject')}
                    placeholder="e.g. Product Guidance / Routine Question"
                    className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-ivory text-xs font-sans text-forest focus:outline-none focus:border-forest"
                  />
                  {errors.subject && <p className="text-[11px] text-red-600 mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-earth-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    {...register('message')}
                    placeholder="Share your hair story or question with us..."
                    className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-ivory text-xs font-sans text-forest focus:outline-none focus:border-forest resize-none"
                  />
                  {errors.message && <p className="text-[11px] text-red-600 mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 px-8 rounded-full bg-forest text-ivory font-sans text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-forest-700 transition-all shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Dispatching Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Studio Locations & Concierge Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-cream-50 rounded-3xl p-6 sm:p-8 border border-cream-300 space-y-4">
              <h3 className="font-serif text-xl font-bold text-forest">
                Botanical Concierge Details
              </h3>

              <div className="space-y-3 font-sans text-xs text-earth-700">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-forest">Direct Email</strong>
                    <span>concierge@aurabotanica.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-forest">Client Support Line</strong>
                    <span>+1 (800) 492-AURA (Mon–Fri, 9am–6pm PST)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-forest">Formulation Studio & Apothecary</strong>
                    <span>8424 Melrose Avenue, West Hollywood, CA 90069</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Studio Hours */}
            <div className="p-6 rounded-2xl bg-forest text-ivory space-y-2">
              <div className="flex items-center gap-2 text-gold">
                <Clock className="w-4 h-4" />
                <span className="font-sans text-xs font-bold uppercase tracking-wider">Studio Hours</span>
              </div>
              <p className="font-serif text-lg font-semibold text-cream-100">
                Monday – Saturday: 10:00 AM – 7:00 PM PST
              </p>
              <p className="font-sans text-xs text-cream-300">
                Complimentary in-studio hair porosity consultations available by appointment.
              </p>
            </div>
          </div>

        </div>

        {/* Client FAQs Section */}
        <section id="faq" className="pt-8 border-t border-cream-200 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="sage">COMMON INQUIRIES</Badge>
            <h2 className="font-serif text-3xl font-bold text-forest">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion items={faqItems} defaultOpenId="shipping" />
          </div>
        </section>

      </div>
    </div>
  );
}
