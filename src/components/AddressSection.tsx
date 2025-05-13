// src/features/checkout/components/AddressSelection.tsx
import { motion, AnimatePresence } from "framer-motion";
import { Edit } from "lucide-react";
import AddressForm from "./forms/AddressForm";

interface AddressSelectionProps {
  addresses: any[];
  selectedAddressId: number | null;
  onAddressSelect: (addressId: number) => void;
  isCreatingAddress: boolean;
  onCreateAddress: () => void;
  onCancelCreate: () => void;
  regions?: any[]; // Assuming regions is an array of regions
  onAddressCreated: (address: any) => void;
  isLoading: boolean;
}

export default function AddressSelection({
  addresses,
  selectedAddressId,
  onAddressSelect,
  isCreatingAddress,
  onCreateAddress,
  onCancelCreate,
  regions,
  isLoading,
  onAddressCreated,
}: AddressSelectionProps) {
  const selectedAddress = addresses.find(
    (address) => address.id === selectedAddressId
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Adresse de livraison</h2>

        {!isCreatingAddress && !isLoading && (
          <button
            className="text-primary-default hover:text-blue-700 font-medium text-sm flex items-center"
            onClick={onCreateAddress}
          >
            <Edit className="w-4 h-4 mr-1" />
            Modifier l'adresse
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isCreatingAddress ? (
          <motion.div
            key="address-form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <AddressForm
              address={selectedAddress}
              onCancel={onCancelCreate}
              onSuccess={onAddressCreated}
              regions={regions} // Pass regions from parent component
            />
          </motion.div>
        ) : (
          <motion.div
            key="address-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {isLoading ? (
              <motion.div
                key="loading-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-8 text-center"
              >
                <div className="animate-spin h-8 w-8 border-4 border-primary-default border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-500">Chargement des adresses...</p>
              </motion.div>
            ) : addresses.length === 0 ? (
              <div className="py-8 text-center">
                <Edit className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">
                  Vous n'avez pas encore d'adresses enregistrées
                </p>
                <button
                  className="bg-primary-default text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
                  onClick={onCreateAddress}
                >
                  Modifier l'adresse
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* {addresses.map((address) => ( */}
                <div
                  key={addresses[0].id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedAddressId === addresses[0].id
                      ? "border-primary-default bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => onAddressSelect(addresses[0].id)}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id={`address-${addresses[0].id}`}
                      name="delivery-address"
                      className="mt-1"
                      checked={selectedAddressId === addresses[0].id}
                      onChange={() => onAddressSelect(addresses[0].id)}
                    />
                    <div className="ml-3 flex-1">
                      <p className="font-medium text-gray-900">
                        {addresses[0].addressType}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        {addresses[0].street}
                        {addresses[0].houseNumber && (
                          <span>, {addresses[0].houseNumber}</span>
                        )}
                        <br />
                        {addresses[0].zone?.name}, {addresses[0].city?.name}
                        <br />
                        {addresses[0].region?.name}
                      </p>
                    </div>
                  </div>
                </div>
                {/* ))} */}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
