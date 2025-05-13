// src/features/checkout/components/PaymentSelection.tsx
import { motion } from "framer-motion";
import { CreditCard, Wallet } from "lucide-react";

interface PaymentSelectionProps {
  selectedPayment: string;
  onSelectPayment: (method: string) => void;
}

export default function PaymentSelection({
  selectedPayment,
  onSelectPayment,
}: PaymentSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <h2 className="text-xl font-medium mb-6">Mode de paiement</h2>

      <div className="space-y-4">
        {/* Cash payment option */}
        <div
          className={`border rounded-lg p-4 cursor-pointer flex items-start transition-all ${
            selectedPayment === "cash"
              ? "border-primary-default bg-blue-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => onSelectPayment("cash")}
        >
          <input
            type="radio"
            id="payment-cash"
            name="payment-method"
            className="mt-1"
            checked={selectedPayment === "cash"}
            onChange={() => onSelectPayment("cash")}
          />
          <label htmlFor="payment-cash" className="ml-3 flex-1 cursor-pointer">
            <div className="flex items-center">
              <Wallet className="h-5 w-5 text-primary-default mr-2" />
              <span className="font-medium text-gray-900">
                Paiement à la livraison
              </span>
            </div>
            <span className="text-gray-500 text-sm block mt-1">
              Payez en espèces à la réception de votre commande
            </span>
          </label>
        </div>

        {/* Credit card option */}
        <div
          className={`border rounded-lg p-4 cursor-pointer flex items-start transition-all ${
            selectedPayment === "credit_card"
              ? "border-primary-default bg-blue-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => onSelectPayment("credit_card")}
        >
          <input
            type="radio"
            id="payment-card"
            name="payment-method"
            className="mt-1"
            checked={selectedPayment === "credit_card"}
            onChange={() => onSelectPayment("credit_card")}
          />
          <label htmlFor="payment-card" className="ml-3 flex-1 cursor-pointer">
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 text-primary-default mr-2" />
              <span className="font-medium text-gray-900">Carte bancaire</span>
            </div>
            <span className="text-gray-500 text-sm block mt-1">
              Paiement sécurisé par carte bancaire
            </span>
          </label>
        </div>
      </div>
    </motion.div>
  );
}
