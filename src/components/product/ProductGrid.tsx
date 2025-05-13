// components/products/ProductGrid.tsx
import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { containerVariants } from "./animationVariants";
import { Product } from "../../lib/api/productService";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  checkIfInCart: (productId: string | number) => boolean;
  onResetFilters: () => void;
  fallbackImage: string;
  filterKey: string; // Key for animation triggers when filters change
}

export const ProductGrid = ({
  products,
  isLoading,
  error,
  onRetry,
  onAddToCart,
  checkIfInCart,
  onResetFilters,
  fallbackImage,
  filterKey,
}: ProductGridProps) => {
  if (isLoading) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Chargement des produits...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="text-center py-12 bg-white rounded-lg shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-red-500 mb-4">Une erreur est survenue: {error}</p>
        <button
          onClick={onRetry}
          className="bg-[#0F67B1] hover:bg-blue-600 text-white py-2 px-6 rounded-full"
        >
          Réessayer
        </button>
      </motion.div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        className="text-center py-12 bg-white rounded-lg shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-gray-500 mb-4">
          Aucun produit ne correspond à votre recherche.
        </p>
        <button
          onClick={onResetFilters}
          className="bg-[#0F67B1] hover:bg-blue-600 text-white py-2 px-6 rounded-full"
        >
          Réinitialiser les filtres
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      key={`products-${filterKey}`}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          isInCart={checkIfInCart(product.id)}
          fallbackImage={fallbackImage}
        />
      ))}
    </motion.div>
  );
};
