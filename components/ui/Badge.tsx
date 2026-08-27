import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'forest' | 'sage' | 'olive' | 'gold' | 'outline' | 'cream';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'forest',
  className,
}) => {
  const variants = {
    forest: 'bg-forest text-ivory border-forest',
    sage: 'bg-sage text-ivory border-sage',
    olive: 'bg-olive text-ivory border-olive',
    gold: 'bg-gold text-forest border-gold',
    outline: 'bg-transparent text-earth border-earth-300',
    cream: 'bg-cream text-earth border-cream-300',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold tracking-widest uppercase border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
