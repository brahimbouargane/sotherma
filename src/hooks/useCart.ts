// src/features/cart/hooks/useCart.ts
import { useCartStore } from "../store/cartStore";

export const useCart = () => {
  const {
    items,
    addToCart: addToCartStore,
    removeFromCart,
    updateQuantity,
    clearCart,
    hasItem: hasItemStore, // Get the hasItem function from the store
    getTotalItems,
    getTotalPrice,
    formatPrice,
  } = useCartStore();

  // Helper function to add a product to the cart with optional pack type
  const addToCart = (product: any, quantity = 1, pack?: string) => {
    // Map your product structure to the CartItem structure
    const productToAdd = {
      id: product.id,
      name:
        product.nameFrench ||
        product.nameEnglish ||
        product.nameArabic ||
        "Produit sans nom",
      price: product.price || 0,
      image: product.images?.[0]?.content
        ? product.images[0].content.startsWith("data:")
          ? product.images[0].content
          : `data:image/jpeg;base64,${product.images[0].content}`
        : product.images?.[0]?.id
        ? `${import.meta.env.VITE_API_URL || ""}/images/${product.images[0].id}`
        : undefined,
      productId: product.id,
    };

    addToCartStore(productToAdd, quantity, pack);
  };

  // Helper function to check if a product is in the cart
  const hasItem = (productId: number, pack?: string) => {
    return hasItemStore(productId, pack);
  };

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    hasItem, // Expose the hasItem function
    getTotalItems,
    getTotalPrice,
    formatPrice,
  };
};
