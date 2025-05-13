// Enhanced Toast Notification Component
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check, X } from "lucide-react";

interface NotificationProps {
  message: string;
  visible: boolean;
  onClose: () => void;
  image?: string;
  quantity?: number;
}

const CartNotification = ({
  message,
  visible,
  onClose,
  image,
  quantity = 1,
}: NotificationProps) => {
  // Auto close toast after delay
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  const toastVariants = {
    initial: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.8,
      transition: {
        duration: 0.3,
        type: "tween",
      },
    },
  };
  const iconVariants = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      // Separate the rotate animation to use tween
      transition: {
        scale: {
          type: "spring",
          stiffness: 500,
          damping: 15,
          delay: 0.2,
        },
        opacity: {
          type: "tween",
          duration: 0.3,
          delay: 0.2,
        },
      },
    },
  };

  // Separate rotate animation using tween
  const iconRotateVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, 15, -15, 0], // Multiple keyframes need tween
      transition: {
        duration: 0.5,
        delay: 0.3,
        type: "tween", // This is the key fix
        ease: "easeInOut",
      },
    },
  };

  // Progress bar animation using tween
  const progressVariants = {
    initial: { width: "100%" },
    animate: {
      width: "0%",
      transition: {
        duration: 3,
        ease: "linear",
        type: "tween", // Explicitly set to tween
      },
    },
  };

  // Product image animation
  const imageVariants = {
    initial: {
      opacity: 0,
      scale: 0.5,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.1,
      },
    },
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          variants={toastVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed bottom-4 right-4 bg-blue-50 text-gray-800 rounded-xl shadow-lg z-50 overflow-hidden"
        >
          <div className="flex items-center p-4 pr-10">
            {/* Product Image (if provided) */}
            {image && (
              <motion.div
                className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0 bg-blue-50"
                variants={imageVariants}
                initial="initial"
                animate="animate"
              >
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </motion.div>
            )}

            {/* Success Icon - with fixed animations */}
            <motion.div
              className="mr-3 bg-green-50 rounded-full w-8 h-8 flex items-center justify-center text-green-500 flex-shrink-0"
              variants={iconVariants}
              initial="initial"
              animate="animate"
            >
              {/* Apply the rotation in a separate motion component */}
              <motion.div
                variants={iconRotateVariants}
                initial="initial"
                animate="animate"
              >
                <Check className="h-4 w-4" />
              </motion.div>
            </motion.div>

            {/* Message content */}
            <div className="flex-1">
              <p className="font-medium text-sm">{message}</p>
              <div className="flex items-center mt-1">
                <ShoppingCart className="h-3 w-3 text-blue-500 mr-1" />
                <p className="text-xs text-gray-500">
                  {quantity > 1
                    ? `${quantity} unités ajoutées`
                    : "Ajouté au panier"}
                </p>
              </div>
            </div>

            {/* Close button */}
            <motion.button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Progress bar that times the auto-close */}
          <motion.div
            className="h-1 bg-blue-500"
            variants={progressVariants}
            initial="initial"
            animate="animate"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartNotification;
