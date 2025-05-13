// src/features/account/pages/AccountPage.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "@tanstack/react-router";
import {
  User,
  Phone,
  Mail,
  Calendar,
  Edit,
  AlertCircle,
  Home,
  Check,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";

import { Helmet } from "react-helmet-async";
import AccountSidebar from "../components/AccountSidebar";
import banner from "../assets/images/mask-hero-seaction.webp";
import bannerMobile from "../assets/images/hero-original-image.webp";
import orderService from "../lib/api/orderService";
import AddressForm from "../components/forms/AddressForm";

export default function AccountPage() {
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  const { customer, updateCustomer } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: customer?.firstName || "",
    lastName: customer?.lastName || "",
    email: customer?.email || "",
    phoneNumber: customer?.phoneNumber || "",
    civility: customer?.civility || "Mr.", // Default to Monsieur
    birthDate: customer?.birthDate || "", // Add birthDate
    adresse: customer?.address || "", // Add adresse
  });
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressSuccess, setAddressSuccess] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);

  // Set max date for birthday (must be at least 18 years old)
  const calculateMaxDate = (): string => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date.toISOString().split("T")[0];
  };

  const maxDate = calculateMaxDate();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
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

  // Update profile data when customer data changes
  useEffect(() => {
    if (customer) {
      setProfileData({
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        email: customer.email || "",
        phoneNumber: customer.phoneNumber || "",
        civility: customer.civility || "Mr.",
        birthDate: customer.birthDate || "",
        adresse: customer.address || "",
      });
    }
  }, [customer]);

  // Format dates for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Non renseigné";

    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // In your handleProfileUpdate function:
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customer?.id) {
      setError("Informations client manquantes");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      // Create the customer update DTO
      const customerData = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber,
        civility: profileData.civility,
        birthDate: profileData.birthDate,
        originWebsite: customer.originWebsite || "AIN_SAISS",
        address: profileData.adresse,
      };

      // Call the service to update the customer - only once
      const updatedCustomer = await orderService.updateCustomer(
        customer.id,
        customerData
      );

      // Create a merged object with all existing properties preserved
      const mergedCustomer = {
        ...customer, // Keep all existing properties
        ...updatedCustomer, // Update with any returned properties
        // Explicitly ensure these are updated
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber,
        civility: profileData.civility,
        birthDate: profileData.birthDate,
        address: profileData.adresse,
      };

      // Update the store with the merged data
      updateCustomer(mergedCustomer);

      setSuccess("Vos informations ont été mises à jour avec succès");
      setShowEditForm(false);
      setIsLoading(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de la mise à jour du profil"
      );
      setIsLoading(false);
    }
  };

  const handleAddressCreated = async (newAddress: any) => {
    if (!customer?.id) return;

    try {
      setIsLoading(true);
      setAddressError(null);

      // Use updateSingleAddress to update or create a single address
      const updatedCustomerData = await orderService.updateSingleAddress(
        customer.id,
        newAddress
      );

      // Update the global customer state
      updateCustomer(updatedCustomerData);

      // Show success message
      setAddressSuccess("Adresse mise à jour avec succès");

      // Hide the address form
      setShowAddressForm(false);
    } catch (err) {
      console.error("Error updating address:", err);
      setAddressError(
        "Impossible de mettre à jour l'adresse. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
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
        className="relative py-6 sm:py-8 md:py-12 h-[25vh] overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute h-full w-full top-0 left-0 z-0"
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
            className="text-xl sm:text-3xl md:text-5xl lg:text-7xl text-[#0F67B1] font-normal text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Mon compte
          </motion.h1>
        </div>
      </motion.div>
      <div className="flex flex-col md:flex-row md:items-start gap-8 mt-4">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-64 shrink-0"
        >
          <AccountSidebar currentPath={currentPath} />
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1"
        >
          <div className="bg-white rounded-3xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">Informations personnelles</h2>

              {!showEditForm && (
                <button
                  onClick={() => {
                    setShowEditForm(true);
                    setSuccess(null);
                  }}
                  className="text-primary-default flex items-center"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Modifier
                </button>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-3xl mb-6 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-3xl mb-6 flex items-center">
                <Check className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {showEditForm ? (
              <form onSubmit={handleProfileUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Civility Radio Buttons */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Civilité
                    </label>
                    <div className="flex space-x-4 mt-1">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="civility"
                          value="Mr."
                          checked={profileData.civility === "Mr."}
                          onChange={() =>
                            setProfileData({
                              ...profileData,
                              civility: "Mr.",
                            })
                          }
                          className="form-radio h-4 w-4 text-primary-default"
                        />
                        <span className="ml-2">Monsieur</span>
                      </label>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="civility"
                          value="Mme."
                          checked={profileData.civility === "Mme."}
                          onChange={() =>
                            setProfileData({
                              ...profileData,
                              civility: "Mme.",
                            })
                          }
                          className="form-radio h-4 w-4 text-primary-default"
                        />
                        <span className="ml-2">Madame</span>
                      </label>
                    </div>
                  </div>

                  {/* Birth Date with age validation */}
                  <div>
                    <label
                      htmlFor="birthDate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date de naissance (18+ ans)
                    </label>
                    <input
                      type="date"
                      id="birthDate"
                      max={maxDate}
                      value={profileData.birthDate}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          birthDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-default focus:border-primary-default"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Vous devez avoir au moins 18 ans.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Prénom
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          firstName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-default focus:border-primary-default"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nom
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          lastName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-default focus:border-primary-default"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-default focus:border-primary-default"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={profileData.phoneNumber}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phoneNumber: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-default focus:border-primary-default"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="adresse"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Adresse
                    </label>
                    <input
                      type="text"
                      id="adresse"
                      value={profileData.adresse}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          adresse: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-default focus:border-primary-default"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowEditForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-default text-white rounded-md hover:bg-blue-600 flex items-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Enregistrement...
                      </>
                    ) : (
                      "Enregistrer"
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Civilité</p>
                  <p className="font-medium">
                    {customer?.civility === "Mr."
                      ? "Monsieur"
                      : customer?.civility === "Mme."
                      ? "Madame"
                      : "Non renseigné"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Date de naissance
                  </p>
                  <p className="font-medium">
                    {customer?.birthDate
                      ? formatDate(customer.birthDate)
                      : "Non renseignée"}
                  </p>
                </div>

                <div className="flex items-start">
                  <User className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Nom complet</p>
                    <p className="font-medium">
                      {customer?.firstName} {customer?.lastName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-medium">{customer?.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Téléphone</p>
                    <p className="font-medium">
                      {customer?.phoneNumber || "Non renseigné"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Inscrit depuis</p>
                    <p className="font-medium">
                      {customer?.createdAt
                        ? formatDate(customer.createdAt)
                        : "Non renseigné"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Addresses Section */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">Adresse</h2>

              {!showAddressForm && (
                <button
                  onClick={() => {
                    setShowAddressForm(true);
                    setAddressSuccess(null);
                  }}
                  className="text-primary-default flex items-center"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Modifier l'adresse
                </button>
              )}
            </div>

            {addressError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-3xl mb-6 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{addressError}</span>
              </div>
            )}

            {addressSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-3xl mb-6 flex items-center">
                <Check className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{addressSuccess}</span>
              </div>
            )}

            {showAddressForm ? (
              <AddressForm
                address={
                  customer?.addresses && customer.addresses.length > 0
                    ? customer.addresses[0]
                    : undefined
                }
                onCancel={() => setShowAddressForm(false)}
                onSuccess={handleAddressCreated}
              />
            ) : (
              <>
                {customer?.addresses && customer.addresses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* {customer.addresses.map((address) => ( */}
                    <div
                      key={customer.addresses[0].id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-primary-default rounded-full">
                          {customer.addresses[0].addressType}
                        </span>
                      </div>

                      <p className="font-medium mb-1">
                        {customer.addresses[0].street}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {customer.addresses[0].zone.name},{" "}
                        {customer.addresses[0].city.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {customer.addresses[0].region.name}
                      </p>
                    </div>
                    {/* ))} */}
                  </div>
                ) : (
                  <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                    <Home className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 mb-4">
                      Vous n'avez pas encore d'adresse enregistrée
                    </p>
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="bg-primary-default hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full inline-flex items-center"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Ajouter une adresse
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
