import { useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart } from "../hooks/useCart";

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
  const {
    items: cart,
    removeFromCart,
    updateQuantity,
    formatPrice,
  } = useCart();

  // Calculate total price directly inside the component
  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);
  console.log(cart);

  const cartRef = useRef<HTMLDivElement>(null);

  // Close cart when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="relative" ref={cartRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25 }}
            className="absolute -right-14 md:-right-36 lg:-right-40 mt-2 w-[22rem] md:w-[28rem] bg-[#f5fafa] rounded-3xl px-2.5 py-1.5 shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-800">Panier</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6 text-[#0F67B1]" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {cart.length === 0 ? (
                <div className="p-4 text-center text-gray-500 py-8">
                  Votre panier est vide
                </div>
              ) : (
                <div className="pr-6 py-4 space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-3 pb-4 "
                    >
                      <div className="w-24 h-24 relative flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-900 text-sm">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Display pack info if available */}
                        {item.pack && (
                          <p className="text-gray-500 text-xs">{item.pack}</p>
                        )}

                        <div className="flex items-center mt-2">
                          <div className="flex items-center">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="mx-2 w-6 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        <p className="font-bold text-sm mt-2">
                          {item.price.toFixed(2)}{" "}
                          <span className="text-xs font-normal">Dh</span>
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 mx-4 border-t border-[#C4C4C4]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-medium">Total</h3>
                  <p className="text-lg font-bold text-[#0F67B1]">
                    {formatPrice(totalPrice)}
                  </p>
                </div>

                <div className="flex gap-2">
                  {/* <Link
                    to="/cart"
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-full flex items-center justify-center font-medium transition-colors text-sm"
                    onClick={onClose}
                  >
                    Voir panier
                  </Link> */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-[#0F67B1] hover:bg-blue-600 text-white py-2 px-4 rounded-full flex items-center justify-center font-medium transition-colors text-sm"
                    onClick={() => {
                      alert("Redirection vers la page de paiement...");
                      onClose();
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Commander
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
