import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString('en-PK')}`;
}

export function calculateFreeShippingProgress(subtotal: number, threshold = 3000): {
  progress: number;
  remaining: number;
  unlocked: boolean;
} {
  const remaining = Math.max(0, threshold - subtotal);
  const progress = Math.min(100, Math.round((subtotal / threshold) * 100));
  return {
    progress,
    remaining,
    unlocked: subtotal >= threshold,
  };
}
