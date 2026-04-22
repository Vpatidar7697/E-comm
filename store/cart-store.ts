"use client";

import { create } from "zustand";

export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type CheckoutRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  total: number;
  createdAt: string;
};

type CartState = {
  isCartOpen: boolean;
  isFilterOpen: boolean;
  isWishlistOpen: boolean;
  isProfileOpen: boolean;
  searchQuery: string;
  items: CartItem[];
  wishlistIds: string[];
  records: CheckoutRecord[];
  openCart: () => void;
  closeCart: () => void;
  openFilter: () => void;
  closeFilter: () => void;
  openWishlist: () => void;
  closeWishlist: () => void;
  openProfile: () => void;
  closeProfile: () => void;
  setSearchQuery: (query: string) => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  decreaseItem: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  submitRecord: (payload: Omit<CheckoutRecord, "id" | "createdAt">) => void;
};

export const useCartStore = create<CartState>((set) => ({
  isCartOpen: false,
  isFilterOpen: false,
  isWishlistOpen: false,
  isProfileOpen: false,
  searchQuery: "",
  items: [],
  wishlistIds: [],
  records: [],
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  openFilter: () => set({ isFilterOpen: true }),
  closeFilter: () => set({ isFilterOpen: false }),
  openWishlist: () => set({ isWishlistOpen: true }),
  closeWishlist: () => set({ isWishlistOpen: false }),
  openProfile: () => set({ isProfileOpen: true }),
  closeProfile: () => set({ isProfileOpen: false }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
          isCartOpen: true,
        };
      }

      return {
        items: [...state.items, { ...product, quantity: 1 }],
        isCartOpen: true,
      };
    }),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),
  decreaseItem: (productId) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
        )
        .filter((item) => item.quantity > 0),
    })),
  clearCart: () => set({ items: [] }),
  toggleWishlist: (productId) =>
    set((state) => ({
      wishlistIds: state.wishlistIds.includes(productId)
        ? state.wishlistIds.filter((id) => id !== productId)
        : [...state.wishlistIds, productId],
    })),
  submitRecord: (payload) =>
    set((state) => ({
      records: [
        {
          ...payload,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        },
        ...state.records,
      ],
      items: [],
      isCartOpen: false,
    })),
}));
