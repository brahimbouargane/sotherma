// src/features/cart/hooks/useCart.ts
import { useCartStore } from "../cartStore";
import { useEffect, useState } from "react";

export const useCart = () => {
  const store = useCartStore();

  // Local state to ensure reactivity
  const [count, setCount] = useState(0);

  // Update count whenever items change
  useEffect(() => {
    const itemsCount = store.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCount(itemsCount);
  }, [store.items]);

  return {
    items: store.items,
    addToCart: store.addToCart,
    removeFromCart: store.removeFromCart,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    cartItemsCount: count,
    totalPrice: store.totalPrice,

    // Additional helper methods
    hasItems: store.items.length > 0,

    // Find item by ID
    getItem: (id: string) => store.items.find((item) => item.id === id),

    // Check if item exists in cart
    hasItem: (id: string) => store.items.some((item) => item.id === id),

    // Format price with currency
    formatPrice: (price: number) => `${price.toFixed(2)} DH`,
  };
};
