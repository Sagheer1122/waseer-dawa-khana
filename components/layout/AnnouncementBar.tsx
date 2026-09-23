'use client';

import React, { useState, useEffect } from 'react';
import { X, PhoneCall, Truck, ShieldCheck, Sparkles, Mail } from 'lucide-react';

const WhatsAppIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className = 'w-4 h-4',
  ...props
}) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413Z" />
  </svg>
);

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contactIndex, setContactIndex] = useState(0);

  const contactItems = [
    {
      id: 'phone',
      icon: PhoneCall,
      label: 'Helpline:',
      value: '0323-9009042',
      href: 'tel:+923239009042',
      valueClass: 'text-gold',
    },
    {
      id: 'email',
      icon: Mail,
      label: 'Email:',
      value: 'waseerdawakhana@gmail.com',
      href: 'mailto:waseerdawakhana@gmail.com',
      valueClass: 'text-gold font-medium lowercase',
    },
  ];

  const announcements = [
    {
      icon: PhoneCall,
      text: 'CALL / WHATSAPP: 0323-9009042 FOR FREE HAIR CONSULTATION',
      highlight: 'FREE HAIR CONSULTATION',
      href: 'https://wa.me/923239009042?text=Hello%20WASEER%20Dawa%20Khana,%20I%20need%20hair%20consultation',
    },
    {
      icon: Truck,
      text: 'FREE SHIPPING NATIONWIDE ON ORDERS OVER RS. 2,990 • CASH ON DELIVERY (COD)',
      highlight: 'FREE SHIPPING NATIONWIDE',
      href: '/shop',
    },
    {
      icon: ShieldCheck,
      text: '100% PURE UNANI HERBAL FORMULA • WASEER DAWA KHANA',
      highlight: '100% PURE UNANI HERBAL',
      href: '/ingredients',
    },
  ];

  // Auto rotate announcements every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  // Flip helpline phone and email every 4 seconds
  useEffect(() => {
    const contactTimer = setInterval(() => {
      setContactIndex((prev) => (prev + 1) % contactItems.length);
    }, 4000);
    return () => clearInterval(contactTimer);
  }, [contactItems.length]);

  if (!isVisible) return null;

  const current = announcements[currentIndex];
  const IconComponent = current.icon;

  const currentContact = contactItems[contactIndex];
  const ContactIcon = currentContact.icon;

  return (
    <div
      suppressHydrationWarning
      className="bg-forest-900 border-b border-forest-800 text-cream-100 text-xs py-2 px-3 sm:px-6 relative z-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4" suppressHydrationWarning>
        
        {/* Left: Flipping Helpline Phone & Email Ticker */}
        <div
          className="hidden md:flex items-center text-gold flex-shrink-0 text-[11px] font-semibold tracking-wider h-5 overflow-hidden min-w-[220px]"
          suppressHydrationWarning
        >
          <a
            key={currentContact.id}
            href={currentContact.href}
            className="inline-flex items-center gap-1.5 hover:underline text-cream-100 truncate transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
          >
            <ContactIcon className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            <span>{currentContact.label}</span>
            <span className={currentContact.valueClass}>{currentContact.value}</span>
          </a>
        </div>

        {/* Center: Rotating Announcement Slider */}
        <div className="flex-1 text-center flex items-center justify-center min-w-0 overflow-hidden px-2 relative h-5" suppressHydrationWarning>
          <a
            key={currentIndex}
            href={current.href}
            className="inline-flex items-center justify-center gap-2 text-[11px] sm:text-xs font-medium tracking-wide text-cream-100 hover:text-white transition-all duration-300 truncate max-w-full animate-in fade-in slide-in-from-bottom-2"
          >
            <IconComponent className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            <span className="truncate">
              {current.text}
            </span>
          </a>
        </div>

        {/* Right: WhatsApp Link & Close button */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href="https://wa.me/923239009042?text=Hello%20WASEER%20Dawa%20Khana"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold tracking-wider"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => setIsVisible(false)}
            className="text-cream-400 hover:text-ivory p-1 transition-colors flex-shrink-0"
            aria-label="Close announcement bar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
