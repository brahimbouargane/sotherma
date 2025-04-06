import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define item type
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Define cart store state and actions
interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartItemsCount: number;
  totalPrice: number;
}

// Create cart store with persistence
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // Add item to cart or update quantity if already exists
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return { items: [...state.items, item] };
        }),

      // Remove item from cart
      removeFromCart: (itemId) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        })),

      // Update item quantity
      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === itemId ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        })),

      // Clear all items from cart
      clearCart: () => set({ items: [] }),

      // Calculate total items count
      get cartItemsCount() {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      // Calculate total price
      get totalPrice() {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "saiss-water-cart", // storage key
    }
  )
);
