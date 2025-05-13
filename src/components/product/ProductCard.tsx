// components/products/ProductCard.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Minus, Plus } from "lucide-react";
import { Product } from "../../lib/api/productService";
import {
  getImageSrc,
  getProductName,
  getProductDescription,
} from "./productUtils";
import {
  itemVariants,
  imageVariants,
  buttonVariants,
} from "./animationVariants";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  isInCart?: boolean;
  fallbackImage: string;
}

export const ProductCard = ({
  product,
  onAddToCart,
  isInCart = false,
  fallbackImage,
}: ProductCardProps) => {
  const [showAdded, setShowAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const productName = getProductName(product);
  const productDescription = getProductDescription(product);

  // Handle image loading and error states
  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Combined handleAddToCart function
  const handleAddToCart = () => {
    // Add to cart with the current quantity
    onAddToCart(product, quantity);

    // Reset quantity
    setQuantity(1);

    // Show added animation
    setShowAdded(true);

    // Reset after 1 second
    setTimeout(() => {
      setShowAdded(false);
    }, 1000);
  };

  return (
    <motion.div
      className="p-4 flex flex-col items-center h-full rounded-3xl hover:shadow-md transition-shadow duration-300"
      variants={itemVariants}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative w-full h-48 lg:h-64 flex items-center justify-center overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse w-16 h-16 rounded-full bg-blue-100"></div>
          </div>
        )}

        <motion.img
          src={getImageSrc(product, fallbackImage)}
          alt={productName}
          className={`max-h-full max-w-full object-contain ${
            !imageLoaded && !imageError ? "opacity-0" : "opacity-100"
          }`}
          variants={imageVariants}
          animate={isHovered ? "hover" : "idle"}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>

      <div className="flex-1 text-center font-sans mt-10 w-full">
        <motion.h3
          className="text-blue-700 font-semibold text-base uppercase"
          animate={isHovered ? { color: "#1d4ed8" } : { color: "#1e40af" }}
          transition={{ duration: 0.3 }}
        >
          {productName}
        </motion.h3>
        <p className="text-gray-500 text-xs mt-1">{productDescription}</p>
      </div>

      {/* Quantity selector */}
      {isHovered && (
        <motion.div
          className="flex items-center mt-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={decrementQuantity}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100"
            disabled={quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="mx-3 w-5 text-center">{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100"
          >
            <Plus className="h-3 w-3" />
          </button>
        </motion.div>
      )}

      {/* Price & Add Button */}
      <div className="w-full mt-auto text-center pt-4">
        <p className="text-gray-900 font-medium mb-4 text-lg">
          {product.price?.toFixed(2) ?? "0.00"}{" "}
          <span className="text-xs">DH</span>
        </p>
        <motion.button
          className="w-full md:w-2/5 cursor-pointer text-white text-base py-2 px-0 rounded-full"
          initial={{ backgroundColor: "#3b82f6" }} // bg-blue-500
          variants={buttonVariants}
          animate={showAdded ? "added" : "idle"}
          whileHover="hover"
          whileTap="tap"
          onClick={handleAddToCart}
        >
          <AnimatePresence mode="wait">
            {showAdded ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-center"
              >
                Ajouté
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    damping: 10,
                    stiffness: 300,
                    delay: 0.1,
                  }}
                  className="ml-1"
                >
                  <Check size={16} />
                </motion.span>
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center justify-center"
              >
                Ajouter
                <motion.span
                  className="ml-1"
                  animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                  transition={{
                    repeat: isHovered ? Infinity : 0,
                    repeatDelay: 1,
                    duration: 0.5,
                  }}
                >
                  <Plus size={16} />
                </motion.span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};
