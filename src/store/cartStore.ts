// src/features/cart/cartStore.ts
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { Product } from "../lib/api/productService";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  pack?: string;
  productId: number; // Reference to the original product
}

interface CartState {
  // State
  items: CartItem[];
  isLoading: boolean;

  // Actions
  addToCart: (product: Product, quantity?: number, pack?: string) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;

  // Queries
  hasItem: (productId: number, pack?: string) => boolean; // Added this function

  // Calculations
  getTotalItems: () => number;
  getTotalPrice: () => number;
  formatPrice: (price: number) => string;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        items: [],
        isLoading: false,

        // Add to cart (or update if already exists)
        addToCart: (product, quantity = 1, pack) => {
          set((state) => {
            // Check if the item (with the same pack if applicable) already exists in cart
            const existingItemIndex = state.items.findIndex(
              (item) => item.productId === product.id && item.pack === pack
            );

            if (existingItemIndex > -1) {
              // Update existing item quantity
              const updatedItems = [...state.items];
              updatedItems[existingItemIndex].quantity += quantity;
              return { items: updatedItems };
            } else {
              // Add new item to cart
              const newItem: CartItem = {
                id: Date.now(), // Generate a unique cart item ID
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity,
                pack,
              };
              return { items: [...state.items, newItem] };
            }
          });
        },

        // Remove from cart
        removeFromCart: (id) => {
          set((state) => ({
            items: state.items.filter((item) => item.id !== id),
          }));
        },

        // Update quantity
        updateQuantity: (id, quantity) => {
          set((state) => {
            if (quantity < 1) {
              // Remove item if quantity is less than 1
              return {
                items: state.items.filter((item) => item.id !== id),
              };
            }

            // Update quantity
            return {
              items: state.items.map((item) =>
                item.id === id ? { ...item, quantity } : item
              ),
            };
          });
        },

        // Clear cart
        clearCart: () => {
          set({ items: [] });
        },

        // Check if item exists in cart
        hasItem: (productId, pack) => {
          return get().items.some(
            (item) =>
              item.productId === productId &&
              (pack === undefined || item.pack === pack)
          );
        },

        // Get total items
        getTotalItems: () => {
          return get().items.reduce((total, item) => total + item.quantity, 0);
        },

        // Get total price
        getTotalPrice: () => {
          return get().items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
        },

        // Format price
        formatPrice: (price) => {
          return `${price.toFixed(2)} Dh`;
        },
      }),
      {
        name: "cart-storage", // localStorage key
        // Only store the items in localStorage
        partialize: (state) => ({ items: state.items }),
      }
    )
  )
);

export default useCartStore;
