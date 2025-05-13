// src/features/cart/pages/CartPage.tsx
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import banner from "../assets/images/mask-hero-seaction.webp";
import bannerMobile from "../assets/images/hero-original-image.webp";
import { Helmet } from "react-helmet-async";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

const MINIMUM_ORDER_AMOUNT = 150;

export default function CartPage() {
  const { isAuthenticated } = useAuthStore();
  const { items, removeFromCart, updateQuantity, getTotalPrice, formatPrice } =
    useCartStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Get the total price
  const totalPrice = getTotalPrice();

  // Check if the total meets the minimum order amount
  const isMinimumMet = totalPrice >= MINIMUM_ORDER_AMOUNT;

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Consider < 768px as mobile
    };

    // Initial checks
    checkIfMobile();

    // Add event listeners
    window.addEventListener("resize", checkIfMobile);

    // Clean up event listeners
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Helper for quantity update with animation
  const handleQuantityUpdate = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setIsUpdating(true);
    setTimeout(() => {
      updateQuantity(id, newQuantity);
      setIsUpdating(false);
    }, 150);
  };

  return (
    <div className="mx-auto py-16 px-4">
      <Helmet>
        <title>Ain Saiss | Eau Minérale Naturelle</title>
        <meta
          name="description"
          content="Eau minérale naturelle pour une meilleure récupération pendant et après l'effort."
        />
        <link rel="preload" as="image" href={banner} />
        <link rel="preload" as="image" href={bannerMobile} />
      </Helmet>

      <motion.div
        className="relative py-6 sm:py-8 md:py-12 h-[25vh] overflow-hidden rounded-3xl sm:rounded-2xl md:rounded-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute h-full  w-full top-0 left-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img
            src={isMobile ? bannerMobile : banner}
            alt="Mountain landscape"
            className="w-full h-full object-cover object-top rounded-3xl"
            fetchPriority="high"
          />
        </motion.div>
        <div className="container flex flex-col justify-center items-center h-full mx-auto px-4 relative z-10">
          <motion.h1
            className="text-xl sm:text-3xl md:text-5xl lg:text-7xl text-[#0F67B1] font-normal text-center "
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Mon Panier
          </motion.h1>
        </div>
      </motion.div>
      <div className="mt-4">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="flex justify-center mb-6">
              <ShoppingCart className="w-20 h-20 text-gray-300" />
            </div>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">
              Votre panier est vide
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Vous n'avez ajouté aucun article à votre panier. Parcourez nos
              produits et commencez vos achats.
            </p>
            <Link
              to="/produits"
              className="inline-flex items-center justify-center bg-primary-default hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-full transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continuer les achats
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-3xl shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-medium">
                    Articles ({items.length})
                  </h2>
                </div>

                <ul className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      variants={itemVariants}
                      className="p-6 flex flex-col sm:flex-row sm:items-center"
                    >
                      <div className="flex-shrink-0 w-24 h-24 mr-6 mb-4 sm:mb-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {item.name}
                        </h3>

                        {item.pack && (
                          <p className="text-gray-500 text-sm mb-2">
                            {item.pack}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                          <div className="flex items-center border border-gray-200 rounded-full">
                            <button
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-50"
                              onClick={() =>
                                handleQuantityUpdate(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1 || isUpdating}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-10 text-center">
                              {item.quantity}
                            </span>
                            <button
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-50"
                              onClick={() =>
                                handleQuantityUpdate(item.id, item.quantity + 1)
                              }
                              disabled={isUpdating}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="flex items-center">
                            <p className="font-bold">
                              {formatPrice(item.price * item.quantity)}
                            </p>

                            <button
                              className="ml-6 text-gray-400 hover:text-red-500"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <div className="mt-6">
                <Link
                  to="/produits"
                  className="inline-flex items-center text-primary-default hover:text-blue-700 font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continuer les achats
                </Link>
              </div>
            </div>

            {/* Cart Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl shadow-sm p-6"
              >
                <h2 className="text-xl font-medium mb-6">
                  Résumé de la commande
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-medium">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>

                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Livraison</span>
                    <span className="font-medium">Gratuit</span>
                  </div>

                  <div className="border-t border-gray-100 my-4" />

                  <div className="flex justify-between py-2">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg text-primary-default">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>

                  {/* Minimum order notification */}
                  {!isMinimumMet && (
                    <div className="flex items-start gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg mt-2">
                      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">
                        Commande minimale de {formatPrice(MINIMUM_ORDER_AMOUNT)}
                        . Il vous manque{" "}
                        {formatPrice(MINIMUM_ORDER_AMOUNT - totalPrice)} pour
                        passer votre commande.
                      </p>
                    </div>
                  )}
                </div>

                <Link
                  to={
                    isAuthenticated && isMinimumMet
                      ? "/checkout"
                      : isMinimumMet
                      ? "/login?redirect=/checkout"
                      : "#"
                  }
                  className={`w-full font-medium py-3 px-6 rounded-full flex items-center justify-center ${
                    isMinimumMet
                      ? "bg-primary-default hover:bg-blue-600 text-white transition-colors"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={(e: any) => !isMinimumMet && e.preventDefault()}
                  aria-disabled={!isMinimumMet}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {isAuthenticated
                    ? isMinimumMet
                      ? "Passer la commande"
                      : "Commande minimale de 150 MAD"
                    : isMinimumMet
                    ? "Se connecter pour commander"
                    : "Commande minimale de 150 MAD"}
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
