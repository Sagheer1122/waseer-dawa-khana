import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  promoCode: string | null;
  discountAmount: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, size: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotal: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      promoCode: null,
      discountAmount: 0,

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      addItem: (product: Product, size: string, quantity = 1) => {
        const sizeObj = product.sizes.find((s) => s.size === size) || product.sizes[0];
        const price = sizeObj ? sizeObj.price : product.basePrice;
        const itemId = `${product.id}-${size}`;

        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.id === itemId);

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += quantity;
            return { items: updatedItems, isCartOpen: true };
          } else {
            const newItem: CartItem = {
              id: itemId,
              productId: product.id,
              slug: product.slug,
              name: product.name,
              subtitle: product.subtitle,
              size: size,
              price: price,
              image: product.images[0],
              quantity: quantity,
            };
            return { items: [...state.items, newItem], isCartOpen: true };
          }
        });
      },

      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      applyPromoCode: (code: string) => {
        const clean = code.trim().toUpperCase();
        if (clean === 'BOTANICA15' || clean === 'RITUAL15' || clean === 'WELCOME10') {
          const discountPct = clean === 'WELCOME10' ? 0.10 : 0.15;
          set({ promoCode: clean, discountAmount: discountPct });
          return { success: true, message: `Promo code ${clean} applied! (${Math.round(discountPct * 100)}% off)` };
        }
        return { success: false, message: 'Invalid promo code. Try BOTANICA15' };
      },

      removePromoCode: () => set({ promoCode: null, discountAmount: 0 }),

      clearCart: () => set({ items: [], promoCode: null, discountAmount: 0 }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = subtotal * get().discountAmount;
        const shipping = subtotal >= 3000 || subtotal === 0 ? 0 : 250;
        return Math.max(0, subtotal - discount + shipping);
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'aura-botanica-cart-storage',
      partialize: (state) => ({ items: state.items, promoCode: state.promoCode, discountAmount: state.discountAmount }),
    }
  )
);
