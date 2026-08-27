import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price);
}

export function calculateFreeShippingProgress(subtotal: number, threshold = 50): {
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
