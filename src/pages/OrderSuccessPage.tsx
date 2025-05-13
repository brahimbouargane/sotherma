// src/features/checkout/pages/OrderSuccessPage.tsx
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Check, ChevronRight, ShoppingBag } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";

export default function OrderSuccessPage() {
  const { clearCart } = useCartStore();
  const { customer } = useAuthStore();

  // Get the latest order directly from customer.orders
  const latestOrder = customer?.orders?.[0];

  // Clear cart on page load
  useEffect(() => {
    clearCart();

    // Play confetti animation
    try {
      const playConfetti = async () => {
        const confettiModule = await import("canvas-confetti");
        const confetti = confettiModule.default;

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      };

      playConfetti();
    } catch (err) {
      console.error("Failed to play confetti animation", err);
    }
  }, [clearCart]);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 mt-20">
      <Helmet>
        <title>Commande Confirmée | Eau Minérale Naturelle</title>
        <meta
          name="description"
          content="Votre commande a été confirmée avec succès. Merci pour votre achat!"
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-sm p-8 md:p-10 text-center"
      >
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 text-green-600 rounded-full mb-6">
          <Check className="h-12 w-12" />
        </div>

        <h1 className="text-3xl font-medium text-gray-900 mb-4">
          Commande confirmée !
        </h1>

        {latestOrder && (
          <div className="bg-blue-50 text-blue-800 font-medium px-4 py-2 rounded-3xl inline-block mb-4">
            Commande #{latestOrder.orderNumber}
          </div>
        )}

        <p className="text-gray-600 text-lg mb-6 max-w-lg mx-auto">
          Merci pour votre commande. Un email de confirmation a été envoyé à
          votre adresse email.
        </p>

        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-5 mb-8 max-w-md mx-auto">
          <div className="flex items-center justify-center text-blue-800 mb-2">
            <ShoppingBag className="h-5 w-5 mr-2" />
            <span className="font-medium">Détails de la commande</span>
          </div>

          <p className="text-gray-700 text-sm">
            Votre commande est en cours de préparation. Vous recevrez une
            notification lorsqu'elle sera en route pour la livraison.
          </p>
        </div>

        <div className="mt-8 space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4">
          <Link
            to="/account/orders"
            className="inline-flex items-center justify-center px-5 py-3 bg-primary-default text-white font-medium rounded-full hover:bg-blue-600 transition-colors w-full sm:w-auto"
          >
            Voir mes commandes
            <ChevronRight className="ml-2 w-4 h-4" />
          </Link>

          <Link
            to="/produits"
            className="inline-flex items-center justify-center px-5 py-3 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-colors w-full sm:w-auto"
          >
            Continuer mes achats
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
