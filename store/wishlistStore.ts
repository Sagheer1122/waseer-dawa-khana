import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, WishlistItem } from '@/types';

interface WishlistState {
  items: WishlistItem[];
  toggleWishlist: (product: Product) => boolean; // returns true if added, false if removed
  isInWishlist: (productId: string) => boolean;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (product: Product) => {
        const exists = get().items.some((item) => item.id === product.id);

        if (exists) {
          set((state) => ({
            items: state.items.filter((item) => item.id !== product.id),
          }));
          return false;
        } else {
          const newItem: WishlistItem = {
            id: product.id,
            slug: product.slug,
            name: product.name,
            subtitle: product.subtitle,
            price: product.basePrice,
            image: product.images[0],
            rating: product.rating,
            category: product.category,
          };
          set((state) => ({
            items: [...state.items, newItem],
          }));
          return true;
        }
      },

      isInWishlist: (productId: string) => {
        return get().items.some((item) => item.id === productId);
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'aura-botanica-wishlist-storage',
    }
  )
);
