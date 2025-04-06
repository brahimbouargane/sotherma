// src/features/cart/hooks/useCart.ts
import { useCartStore } from "../cartStore";

export const useCart = () => {
  const {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartItemsCount,
    totalPrice,
  } = useCartStore();

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartItemsCount,
    totalPrice,

    // Additional helper methods
    hasItems: items.length > 0,

    // Find item by ID
    getItem: (id: string) => items.find((item) => item.id === id),

    // Check if item exists in cart
    hasItem: (id: string) => items.some((item) => item.id === id),

    // Format price with currency
    formatPrice: (price: number) => `${price.toFixed(2)} DH`,
  };
};
