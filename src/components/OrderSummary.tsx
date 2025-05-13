// src/features/checkout/components/OrderSummary.tsx
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { CartItem } from "../store/cartStore";
import { useCartStore } from "../store/cartStore";

interface OrderSummaryProps {
  items: CartItem[];
  totalPrice: number;
  isProcessing: boolean;
  onPlaceOrder: () => void;
}

export default function OrderSummary({
  items,
  totalPrice,
  isProcessing,
  onPlaceOrder,
}: OrderSummaryProps) {
  const { formatPrice } = useCartStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-xl shadow-sm p-6 h-fit"
    >
      <h2 className="text-xl font-medium mb-6">Résumé de la commande</h2>

      <ul className="divide-y divide-gray-100 mb-6">
        {items.map((item) => (
          <li key={item.id} className="py-3 flex items-center">
            <div className="w-10 h-10 relative flex-shrink-0 mr-3">
              <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-primary-default text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {item.quantity}
              </div>
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{item.name}</p>
              {item.pack && (
                <p className="text-xs text-gray-500">{item.pack}</p>
              )}
            </div>
            <div className="text-sm font-medium">
              {formatPrice(item.price * item.quantity)}
            </div>
          </li>
        ))}
      </ul>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Sous-total</span>
          <span className="font-medium">{formatPrice(totalPrice)}</span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-gray-600">Livraison</span>
          <span className="font-medium">Gratuit</span>
        </div>

        <div className="border-t border-gray-100 my-3" />

        <div className="flex justify-between py-2">
          <span className="font-bold text-lg">Total</span>
          <span className="font-bold text-lg text-primary-default">
            {formatPrice(totalPrice)}
          </span>
        </div>
      </div>

      <button
        onClick={onPlaceOrder}
        disabled={isProcessing}
        className="w-full bg-primary-default hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-3 px-6 rounded-full transition-colors flex items-center justify-center"
      >
        {isProcessing ? (
          "Traitement..."
        ) : (
          <>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Confirmer la commande
          </>
        )}
      </button>
    </motion.div>
  );
}
