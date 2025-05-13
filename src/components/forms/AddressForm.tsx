// src/features/checkout/components/AddressForm.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import orderService from "../../lib/api/orderService";
import { useAuthStore } from "../../store/authStore";

interface AddressFormProps {
  address?: any;
  onCancel: () => void;
  onSuccess: (address: any) => void;
  regions?: any[]; // Add this prop
}

export default function AddressForm({
  address,
  onCancel,
  onSuccess,
}: AddressFormProps) {
  const { customer } = useAuthStore();

  const [formData, setFormData] = useState<any>(
    address || {
      street: "",
      houseNumber: "",
      addressType: "Livraison",
      regionId: "",
      cityId: "",
      zoneId: "",
    }
  );

  const [regions, setRegions] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [zones, setZones] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch regions when component mounts
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        setIsLoading(true);
        const regionsData = await orderService.getRegions();
        setRegions(regionsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching regions:", error);
        setErrors((prev) => ({
          ...prev,
          api: "Impossible de charger les régions",
        }));
        setIsLoading(false);
      }
    };

    fetchRegions();
  }, []);

  // Update cities when region changes
  useEffect(() => {
    if (formData.regionId) {
      const selectedRegion = regions.find(
        (r) => r.id === parseInt(formData.regionId)
      );
      setCities(selectedRegion?.cities || []);
      setZones([]);

      // Clear city and zone if they don  't belong to the selected region
      if (
        formData.cityId &&
        !selectedRegion?.cities?.some(
          (c: any) => c.id === parseInt(formData.cityId)
        )
      ) {
        setFormData((prev: any) => ({ ...prev, cityId: "", zoneId: "" }));
      }
    }
  }, [formData.regionId, regions]);

  // Update zones when city changes
  useEffect(() => {
    if (formData.cityId) {
      const selectedCity = cities.find(
        (c) => c.id === parseInt(formData.cityId)
      );
      setZones(selectedCity?.zones || []);

      // Clear zone if it doesn't belong to the selected city
      if (
        formData.zoneId &&
        !selectedCity?.zones?.some(
          (z: any) => z.id === parseInt(formData.zoneId)
        )
      ) {
        setFormData((prev: any) => ({ ...prev, zoneId: "" }));
      }
    }
  }, [formData.cityId, cities]);

  // Set initial values if address is provided
  useEffect(() => {
    if (address) {
      setFormData({
        street: address.street || "",
        houseNumber: address.houseNumber || "",
        addressType: address.addressType || "Livraison",
        regionId: address.region?.id.toString() || "",
        cityId: address.city?.id.toString() || "",
        zoneId: address.zone?.id.toString() || "",
      });
    }
  }, [address, regions.length]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.street?.trim()) {
      newErrors.street = "L'adresse est requise";
    }

    if (!formData.regionId) {
      newErrors.regionId = "La région est requise";
    }

    if (!formData.cityId) {
      newErrors.cityId = "La ville est requise";
    }

    if (!formData.zoneId) {
      newErrors.zoneId = "La zone est requise";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Update the handleSubmit function in your AddressForm.tsx
  // Replace your current handleSubmit with this version:

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setIsSubmitting(true);

      // Transform data to match API expectations
      const addressData: any = {
        street: formData.street,
        houseNumber: formData.houseNumber || null,
        addressType: formData.addressType,
        region: {
          id: parseInt(formData.regionId),
        },
        city: {
          id: parseInt(formData.cityId),
        },
        zone: {
          id: parseInt(formData.zoneId),
        },
      };

      if (customer?.id) {
        console.log("Updating address for customer:", customer.id);
        console.log("Address data:", addressData);

        // Use updateSingleAddress instead of addAddress
        // This will either update the first address or create a new one if none exists
        const updatedCustomer = await orderService.updateSingleAddress(
          customer.id,
          addressData
        );
        console.log("Response from updating customer:", updatedCustomer);

        // Get the address from the updated customer data
        const updatedAddress =
          updatedCustomer.addresses && updatedCustomer.addresses.length > 0
            ? updatedCustomer.addresses[0]
            : addressData; // Fallback to the submitted data if no address in response

        // Call the success callback with the updated address
        onSuccess(updatedAddress);
      } else {
        setErrors({
          submit: "Impossible de mise à jour: aucun client connecté",
        });
      }
    } catch (error) {
      console.error("Error updating address:", error);
      setErrors({
        submit: "Une erreur s'est produite lors de la mise à jour de l'adresse",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-gray-200 rounded-lg p-6 text-center"
      >
        <div className="animate-spin w-8 h-8 border-2 border-primary-default border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-2 text-gray-500">Chargement des données...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-gray-200 rounded-lg p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Modifier l'adresse</h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {errors.submit && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
          {errors.submit}
        </div>
      )}

      {errors.api && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
          {errors.api}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type d'adresse
          </label>
          <select
            name="addressType"
            value={formData.addressType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-default focus:outline-none"
          >
            <option value="Livraison">Adresse de livraison</option>
            <option value="Facturation">Adresse de facturation</option>
          </select>
        </div> */}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adresse
          </label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-default focus:outline-none ${
              errors.street ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Rue, numéro, etc."
          />
          {errors.street && (
            <p className="text-red-500 text-xs mt-1">{errors.street}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Numéro d'appartement/maison (optionnel)
          </label>
          <input
            type="text"
            name="houseNumber"
            value={formData.houseNumber || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-default focus:outline-none"
            placeholder="Apt, étage, etc."
          />
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          {/* Region Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Région
            </label>
            <select
              name="regionId"
              value={formData.regionId || ""}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-default focus:outline-none ${
                errors.regionId ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Sélectionnez une région</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
            {errors.regionId && (
              <p className="text-red-500 text-xs mt-1">{errors.regionId}</p>
            )}
          </div>

          {/* City Dropdown - Only enabled if region is selected */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ville
            </label>
            <select
              name="cityId"
              value={formData.cityId || ""}
              onChange={handleChange}
              disabled={!formData.regionId || cities.length === 0}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-default focus:outline-none ${
                errors.cityId ? "border-red-500" : "border-gray-300"
              } ${
                !formData.regionId || cities.length === 0 ? "bg-gray-100" : ""
              }`}
            >
              <option value="">
                {cities.length === 0 && formData.regionId
                  ? "Aucune ville disponible"
                  : "Sélectionnez une ville"}
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.cityId && (
              <p className="text-red-500 text-xs mt-1">{errors.cityId}</p>
            )}
          </div>

          {/* Zone Dropdown - Only enabled if city is selected */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zone
            </label>
            <select
              name="zoneId"
              value={formData.zoneId || ""}
              onChange={handleChange}
              disabled={!formData.cityId || zones.length === 0}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-default focus:outline-none ${
                errors.zoneId ? "border-red-500" : "border-gray-300"
              } ${!formData.cityId || zones.length === 0 ? "bg-gray-100" : ""}`}
            >
              <option value="">
                {zones.length === 0 && formData.cityId
                  ? "Aucune zone disponible"
                  : "Sélectionnez une zone"}
              </option>
              {zones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.name}
                </option>
              ))}
            </select>
            {errors.zoneId && (
              <p className="text-red-500 text-xs mt-1">{errors.zoneId}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary-default text-white rounded-full hover:bg-blue-600 disabled:bg-blue-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enregistrement..." : "Mettre à jour"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
