// src/features/checkout/pages/CheckoutPage.tsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import orderService from "../lib/api/orderService";
import AddressSelection from "../components/AddressSection";
import OrderSummary from "../components/OrderSummary";
import { useCartStore } from "../store/cartStore";
import { Helmet } from "react-helmet-async";
import banner from "../assets/images/mask-hero-seaction.webp";
import bannerMobile from "../assets/images/hero-original-image.webp";

const MINIMUM_ORDER_AMOUNT = 150;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { isAuthenticated, updateCustomer, customer } = useAuthStore();
  // const { items, getTotalPrice, clearCart } = useCart();
  const { items, getTotalPrice, clearCart } = useCartStore();

  const orderProcessedRef = useRef(false); // Flag to track if order was processed

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );

  const [customerAddresses, setCustomerAddresses] = useState<any[]>([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const [customerData, setCustomerData] = useState<any>(null);
  const [isCreatingAddress, setIsCreatingAddress] = useState(false);
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);
  const [regions, setRegions] = useState<any[]>([]);
  const [orderComment, setOrderComment] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [paymentMode, setPaymentMode] = useState("cash"); // Default to cash

  const [isMobile, setIsMobile] = useState<boolean>(false);

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

  // useEffect(() => {
  //   const totalPrice = getTotalPrice();

  //   if (!isAuthenticated) {
  //     navigate({ to: "/login", search: { redirect: "/checkout" } });
  //   } else if (items.length === 0) {
  //     navigate({ to: "/cart" });
  //   } else if (totalPrice < MINIMUM_ORDER_AMOUNT) {
  //     // Redirect to cart if total is less than minimum order amount
  //     navigate({
  //       to: "/cart",
  //       search: { error: "minimum_order" },
  //     });
  //   }
  // }, [isAuthenticated, items, getTotalPrice]);

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!customer?.id) return;

      try {
        setIsLoadingCustomer(true);
        setIsLoadingAddresses(true);
        setError(null);

        // Fetch customer details
        const data = await orderService.getCustomerDetails(customer.id);
        setCustomerData(data);

        // Fetch regions for address form
        const regionsData = await orderService.getRegions();
        setRegions(regionsData);

        // Set customer addresses and select the most recent one
        if (data.addresses && data.addresses.length > 0) {
          // Sort addresses by ID (assuming higher ID = more recent)
          const sortedAddresses = [...data.addresses].sort(
            (a, b) => b.id - a.id
          );

          // Find delivery addresses
          const deliveryAddresses = sortedAddresses.filter(
            (addr) => addr.addressType === "Livraison"
          );

          // Select the most recent delivery address, or just the most recent address
          if (deliveryAddresses.length > 0) {
            setSelectedAddressId(deliveryAddresses[0].id);
          } else {
            setSelectedAddressId(sortedAddresses[0].id);
          }

          setCustomerAddresses([data.addresses[0]]);
        }

        setIsLoadingCustomer(false);
        setIsLoadingAddresses(false);
      } catch (err) {
        console.error("Error loading customer data:", err);
        setError("Impossible de charger vos informations. Veuillez réessayer.");
        setIsLoadingCustomer(false);
        setIsLoadingAddresses(false);
      }
    };

    fetchCustomerData();
  }, [customer?.id]);

  const handleAddressSelect = (addressId: number) => {
    setSelectedAddressId(addressId);
  };

  // Update the handleAddressCreated function
  // const handleAddressCreated = async (newAddress: any) => {
  //   if (!customer?.id) return;

  //   try {
  //     setIsLoadingAddresses(true);

  //     console.log("New address created:", newAddress);

  //     // Refresh customer data to get updated addresses
  //     const updatedCustomerData = await orderService.getCustomerDetails(
  //       customer.id
  //     );
  //     console.log("Updated customer data:", updatedCustomerData);

  //     // Update the customer data in state
  //     setCustomerData(updatedCustomerData);

  //     // Make sure to update the customerAddresses state variable specifically
  //     if (
  //       updatedCustomerData.addresses &&
  //       updatedCustomerData.addresses.length > 0
  //     ) {
  //       setCustomerAddresses(updatedCustomerData.addresses);

  //       // Select the newly created address (it should be the last one)
  //       const newlyCreatedAddress =
  //         updatedCustomerData.addresses[
  //           updatedCustomerData.addresses.length - 1
  //         ];
  //       setSelectedAddressId(newlyCreatedAddress.id);
  //     }

  //     // Hide the address form
  //     setIsCreatingAddress(false);
  //   } catch (err) {
  //     console.error(
  //       "Error refreshing customer data after address creation:",
  //       err
  //     );
  //     setError(
  //       "Impossible de récupérer vos adresses mises à jour. Veuillez rafraîchir la page."
  //     );
  //   } finally {
  //     setIsLoadingAddresses(false);
  //   }
  // };

  const handleAddressCreated = async (newAddress: any) => {
    if (!customer?.id) return;

    try {
      setIsLoadingAddresses(true);
      setError(null);

      console.log("New address data:", newAddress);

      // Format the address data if needed
      const formattedAddress = {
        street: newAddress.street,
        houseNumber: newAddress.houseNumber || "",
        addressType: newAddress.addressType || "Livraison",
        region: { id: newAddress.region.id || newAddress.region },
        city: { id: newAddress.city.id || newAddress.city },
        zone: { id: newAddress.zone.id || newAddress.zone },
      };

      // Use the new updateSingleAddress method
      const updatedCustomerData = await orderService.updateSingleAddress(
        customer.id,
        formattedAddress
      );

      updateCustomer(updatedCustomerData);

      console.log("Updated customer data:", updatedCustomerData);

      // Update the customer data in state
      setCustomerData(updatedCustomerData);

      // Make sure to update the customerAddresses state variable
      if (
        updatedCustomerData.addresses &&
        updatedCustomerData.addresses.length > 0
      ) {
        setCustomerAddresses([updatedCustomerData.addresses[0]]);
        setSelectedAddressId(updatedCustomerData.addresses[0].id);
      } else {
        console.warn("No addresses found in updated customer data");
        // Create a temporary address list if needed
        setCustomerAddresses([formattedAddress]);
      }

      // Hide the address form
      setIsCreatingAddress(false);
    } catch (err) {
      console.error("Error updating address:", err);
      setError("Impossible de mettre à jour l'adresse. Veuillez réessayer.");
    } finally {
      setIsLoadingAddresses(false);
    }
  };
  // Complete handlePlaceOrder function with both cash and card payment handling
  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      setError("Veuillez sélectionner une adresse de livraison");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);

      // Get selected address
      const selectedAddress = customerData?.addresses?.find(
        (addr) => addr.id === selectedAddressId
      );

      if (!selectedAddress) {
        throw new Error("L'adresse sélectionnée est introuvable");
      }

      const addressLivraison = {
        street: selectedAddress.street,
        region: { id: selectedAddress.region.id },
        city: { id: selectedAddress.city.id },
        zone: { id: selectedAddress.zone.id },
      };

      // Prepare order items
      const orderItems = items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price * item.quantity,
      }));

      const orderData = {
        addressLivraison,
        comment: orderComment || "",
        orderItems,
        paymentMode,
        period: 0,
      };

      // For cash payment - create order immediately
      if (paymentMode === "cash") {
        // Create order immediately for cash payment
        const createdOrder = await orderService.createOrder(orderData);
        console.log("Cash order created:", createdOrder);

        // Update customer data
        if (customer?.id) {
          try {
            const updatedCustomerData = await orderService.getCustomerDetails(
              customer.id
            );
            useAuthStore.getState().updateCustomer(updatedCustomerData);
          } catch (updateError) {
            console.error("Error updating customer data:", updateError);
          }
        }

        // Navigate to success page
        navigate({
          to: "/order-success",
          search: {
            orderId: createdOrder.id,
            orderNumber: createdOrder.orderNumber,
            paymentMethod: "cash",
          },
        });

        // Clear cart after a short delay
        setTimeout(() => {
          clearCart();
        }, 100);

        return;
      }
      // For card payment - redirect to CMI first, create order later
      else if (paymentMode === "card") {
        try {
          console.log("Starting credit card payment process...");

          // Store order data in session storage to create after payment
          sessionStorage.setItem("pendingOrderData", JSON.stringify(orderData));
          sessionStorage.setItem("pendingCartItems", JSON.stringify(items));

          // Calculate total amount
          const totalAmount = Math.round(getTotalPrice() * 100);

          // Generate temporary order ID
          const tempOrderId = `TEMP-${Date.now()}-${Math.floor(
            Math.random() * 1000
          )}`;
          sessionStorage.setItem("tempOrderId", tempOrderId);

          // Get customer information
          const customerName =
            `${customer.firstName || ""} ${customer.lastName || ""}`.trim() ||
            "Client";
          const customerEmail = customer.email || "no-email@example.com";
          const customerPhone = customer.phoneNumber || "0000000000";

          // Prepare payment parameters
          const formParams = [
            { name: "clientid", value: "600002672" },
            { name: "amount", value: totalAmount },
            { name: "oid", value: tempOrderId },
            { name: "okUrl", value: `${window.location.origin}/order-success` },
            { name: "failUrl", value: `${window.location.origin}/checkout` },
            {
              name: "callbackUrl",
              value: `${window.location.origin}/api/payment/callback`,
            },
            { name: "storetype", value: "3D_PAY_HOSTING" },
            { name: "trantype", value: "PreAuth" },
            { name: "hashAlgorithm", value: "ver3" },
            { name: "lang", value: "fr" },
            { name: "currency", value: "504" },
            { name: "rnd", value: "asdf" },
            { name: "encoding", value: "UTF-8" },
            { name: "sessiontimeout", value: "" },
            { name: "BillToName", value: customerName },
            { name: "email", value: customerEmail },
            { name: "tel", value: customerPhone },
          ];

          console.log("Form params prepared:", formParams);

          // Get hash from backend
          const baseUrl = "https://sidiharazem.ma/api/payment/hash";
          console.log("Calling hash endpoint at:", baseUrl);

          const hashResponse = await fetch(baseUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
            },
            body: JSON.stringify({ input_valueArray: formParams }),
          });

          if (!hashResponse.ok) {
            const errorText = await hashResponse.text();
            console.error("Hash response error:", errorText);
            throw new Error(
              `Erreur lors de la génération du hash: ${hashResponse.status} ${errorText}`
            );
          }

          const hashValue = await hashResponse.text();
          console.log("Got hash from backend:", hashValue);

          if (!hashValue) {
            throw new Error(
              "Le hash est vide, impossible de procéder au paiement"
            );
          }

          // Create form for CMI
          console.log("Creating form for CMI submission...");
          const form = document.createElement("form");
          form.method = "POST";
          form.action = "https://payment.cmi.co.ma/fim/est3Dgate";

          // Add payment parameters to form
          formParams.forEach((param) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = param.name;
            input.value = param.value;
            form.appendChild(input);
          });

          // Add hash to form
          const hashInput = document.createElement("input");
          hashInput.type = "hidden";
          hashInput.name = "hash";
          hashInput.value = hashValue;
          form.appendChild(hashInput);

          // Prevent redirect loop
          orderProcessedRef.current = true;

          // Submit form to CMI
          console.log("Submitting form to CMI...");
          document.body.appendChild(form);
          form.submit();

          return;
        } catch (err) {
          console.error("Payment initialization error:", err);
          setError(
            err instanceof Error
              ? err.message
              : "Une erreur s'est produite lors de l'initialisation du paiement"
          );
          setIsProcessing(false);
          return;
        }
      } else {
        // Unrecognized payment method
        throw new Error("Mode de paiement non valide");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur s'est produite lors de la création de votre commande"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    // Skip navigation checks if we just processed an order
    if (orderProcessedRef.current) {
      return;
    }

    const totalPrice = getTotalPrice();

    if (!isAuthenticated) {
      navigate({ to: "/login", search: { redirect: "/checkout" } });
    } else if (items.length === 0) {
      navigate({ to: "/cart" });
    } else if (totalPrice < MINIMUM_ORDER_AMOUNT) {
      // Redirect to cart if total is less than minimum order amount
      navigate({
        to: "/cart",
        search: { error: "minimum_order" },
      });
    }
  }, [isAuthenticated, items, getTotalPrice, navigate]);

  return (
    <div className=" mx-auto py-16 px-4">
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
            Finaliser votre commande
          </motion.h1>
        </div>
      </motion.div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
        <div className="lg:col-span-2 space-y-8">
          {/* Address Section */}
          <AddressSelection
            addresses={customerAddresses}
            selectedAddressId={selectedAddressId}
            onAddressSelect={handleAddressSelect}
            isCreatingAddress={isCreatingAddress}
            onCreateAddress={() => setIsCreatingAddress(true)}
            onCancelCreate={() => setIsCreatingAddress(false)}
            onAddressCreated={handleAddressCreated}
            isLoading={isLoadingAddresses}
          />

          {/* Comment Section */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-xl font-medium mb-4">Commentaires</h2>
            <textarea
              value={orderComment}
              onChange={(e) => setOrderComment(e.target.value)}
              placeholder="Instructions spéciales pour la livraison ou autres commentaires..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-default focus:outline-none"
              rows={3}
            />
          </motion.div> */}

          {/* Payment Method Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-xl font-medium mb-6">Mode de paiement</h2>

            <div className="space-y-4">
              {/* Payment on delivery option */}
              <div
                className={`border rounded-lg p-4 flex items-start cursor-pointer transition-colors ${
                  paymentMode === "cash"
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => setPaymentMode("cash")}
              >
                <input
                  type="radio"
                  id="pay-cash"
                  name="payment-method"
                  className="mt-1"
                  checked={paymentMode === "cash"}
                  onChange={() => setPaymentMode("cash")}
                />
                <label htmlFor="pay-cash" className="ml-3 cursor-pointer">
                  <span className="block font-medium text-gray-900">
                    Paiement à la livraison
                  </span>
                  <span className="text-gray-500 text-sm">
                    Payez en espèces à la réception de votre commande
                  </span>
                </label>
              </div>

              {/* Credit card payment option */}
              <div
                className={`border rounded-lg p-4 flex items-start cursor-pointer transition-colors ${
                  paymentMode === "card"
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => setPaymentMode("card")}
              >
                <input
                  type="radio"
                  id="pay-card"
                  name="payment-method"
                  className="mt-1"
                  checked={paymentMode === "card"}
                  onChange={() => setPaymentMode("card")}
                />
                <label htmlFor="pay-card" className="ml-3 cursor-pointer">
                  <span className="block font-medium text-gray-900">
                    Paiement par carte bancaire
                  </span>
                  <span className="text-gray-500 text-sm">
                    Payez maintenant en toute sécurité
                  </span>
                </label>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Order Summary */}
        <OrderSummary
          items={items}
          totalPrice={getTotalPrice()}
          isProcessing={isProcessing}
          onPlaceOrder={handlePlaceOrder}
        />
      </div>
    </div>
  );
}
