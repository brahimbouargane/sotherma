// // src/features/account/pages/OrdersPage.tsx
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Link, useNavigate, useRouter } from "@tanstack/react-router";
// import {
//   ChevronDown,
//   ChevronRight,
//   Clock,
//   Calendar,
//   FileText,
//   MapPin,
//   AlertCircle,
//   Package,
// } from "lucide-react";
// import { useAuthStore } from "../store/authStore";
// import AccountSidebar from "../components/AccountSidebar";
// import banner from "../assets/images/mask-hero-seaction.webp";
// import bannerMobile from "../assets/images/hero-original-image.webp";
// import { Helmet } from "react-helmet-async";

// // Define order-related types
// interface OrderItem {
//   productId: number | null;
//   product: {
//     id: number;
//     nameFrench?: string;
//     nameEnglish?: string;
//     nameArabic?: string;
//   };
//   quantity: number;
//   price: number;
// }

// export default function OrdersPage() {
//   const { customer } = useAuthStore();
//   const navigate = useNavigate();
//   const router = useRouter();
//   const currentPath = router.state.location.pathname;

//   const [isLoading, setIsLoading] = useState(false);
//   const [orders, setOrders] = useState<any[]>(customer?.orders || []);
//   const [error, setError] = useState<string | null>(null);
//   const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
//   const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
//   const [isMobile, setIsMobile] = useState<boolean>(false);

//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768); // Consider < 768px as mobile
//     };

//     // Initial checks
//     checkIfMobile();

//     // Add event listeners
//     window.addEventListener("resize", checkIfMobile);

//     // Clean up event listeners
//     return () => {
//       window.removeEventListener("resize", checkIfMobile);
//     };
//   }, []);
//   // Fetch orders from API or use orders from customer data
//   useEffect(() => {
//     if (customer?.orders) {
//       setOrders(customer.orders);
//     } else {
//       fetchOrders();
//     }
//   }, [customer]);

//   // Fetch orders from API
//   const fetchOrders = async () => {
//     if (!customer?.id) return;

//     try {
//       setIsLoading(true);
//       setError(null);

//       // In a real implementation, you would fetch orders from your API
//       // const response = await orderService.getUserOrders();
//       // setOrders(response.data);

//       // For now, we'll just use the orders from customer data
//       if (customer.orders) {
//         setOrders(customer.orders);
//       }

//       setIsLoading(false);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Erreur lors du chargement des commandes"
//       );
//       setIsLoading(false);
//     }
//   };

//   // Format date for display
//   const formatDate = (dateString?: string) => {
//     if (!dateString) return "";

//     return new Date(dateString).toLocaleDateString("fr-FR", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   // Format time for display
//   const formatTime = (dateString?: string) => {
//     if (!dateString) return "";

//     return new Date(dateString).toLocaleTimeString("fr-FR", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // Calculate order total
//   const calculateOrderTotal = (items: OrderItem[]) => {
//     return items.reduce((total, item) => total + item.price, 0).toFixed(2);
//   };

//   // Toggle order details
//   const toggleOrderDetails = (orderId: number) => {
//     setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
//   };

//   // Filter orders by status
//   const filteredOrders = selectedStatus
//     ? orders.filter((order) => order.status === selectedStatus)
//     : orders;

//   // Get unique statuses for filter
//   const uniqueStatuses = [...new Set(orders.map((order) => order.status))];

//   return (
//     <div className="mx-auto py-16 px-4">
//       <Helmet>
//         <title>Ain Saiss | Eau Minérale Naturelle</title>
//         <meta
//           name="description"
//           content="Eau minérale naturelle pour une meilleure récupération pendant et après l'effort."
//         />
//         <link rel="preload" as="image" href={banner} />
//         <link rel="preload" as="image" href={bannerMobile} />
//       </Helmet>

//       {/* Hero Section */}

//       <motion.div
//         className="relative py-6 sm:py-8 md:py-12 h-[25vh] overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//       >
//         <motion.div
//           className="absolute h-full w-full top-0 left-0 z-0"
//           initial={{ scale: 1.1 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 1.2, ease: "easeOut" }}
//         >
//           <img
//             src={isMobile ? bannerMobile : banner}
//             alt="Mountain landscape"
//             className="w-full h-full object-cover object-top rounded-3xl"
//             fetchPriority="high"
//           />
//         </motion.div>
//         <div className="container flex flex-col justify-center items-center h-full mx-auto px-4 relative z-10">
//           <motion.h1
//             className="text-xl sm:text-3xl md:text-5xl lg:text-7xl text-[#0F67B1] font-normal text-center "
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//           >
//             Mes commandes
//           </motion.h1>
//           {/* <motion.p
//                   className={`text-center ${
//                     isMobile ? "text-[#fff]" : "text-[#012645]"
//                   } font-normal text-sm sm:text-base md:text-lg lg:text-xl`}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.6, delay: 0.5 }}
//                 >
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                 </motion.p> */}
//         </div>
//       </motion.div>
//       <div className="flex flex-col md:flex-row md:items-start gap-8 mt-4">
//         {/* Sidebar */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="w-full md:w-64 shrink-0"
//         >
//           <AccountSidebar currentPath={currentPath} />
//         </motion.div>

//         {/* Main Content */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex-1"
//         >
//           <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//               <h2 className="text-xl font-medium mb-4 md:mb-0">
//                 Mes commandes
//               </h2>

//               {/* Status Filter */}
//               {/* {uniqueStatuses.length > 0 && (
//                 <div className="w-full md:w-auto">
//                   <select
//                     value={selectedStatus || ""}
//                     onChange={(e) => setSelectedStatus(e.target.value || null)}
//                     className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-default focus:border-primary-default"
//                   >
//                     <option value="">Tous les statuts</option>
//                     {uniqueStatuses.map((status) => (
//                       <option key={status} value={status}>
//                         {status}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )} */}
//             </div>

//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
//                 <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
//                 <span>{error}</span>
//               </div>
//             )}

//             {isLoading ? (
//               <div className="text-center py-12">
//                 <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
//                 <p className="text-gray-600">Chargement des commandes...</p>
//               </div>
//             ) : filteredOrders.length > 0 ? (
//               <div className="space-y-4">
//                 {filteredOrders.map((order) => (
//                   <div
//                     key={order.id}
//                     className="border border-gray-200 rounded-lg overflow-hidden"
//                   >
//                     {/* Order Header */}
//                     <div
//                       className="flex flex-col md:flex-row justify-between p-4 cursor-pointer hover:bg-gray-50"
//                       onClick={() => toggleOrderDetails(order.id)}
//                     >
//                       <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
//                         <div>
//                           <span className="text-sm text-gray-500">
//                             Commande
//                           </span>
//                           <p className="font-medium">{order.orderNumber}</p>
//                         </div>

//                         <div>
//                           <span className="text-sm text-gray-500">Date</span>
//                           <p className="font-medium">
//                             {order.history && order.history.length > 0
//                               ? formatDate(order.history[0].date)
//                               : "N/A"}
//                           </p>
//                         </div>

//                         <div>
//                           <span className="text-sm text-gray-500">Statut</span>
//                           <div
//                             className={`inline-block px-2 py-1 text-xs font-medium rounded-full
//                             ${
//                               order.status === "Livré"
//                                 ? "bg-green-100 text-green-800"
//                                 : order.status === "En cours"
//                                 ? "bg-blue-100 text-blue-800"
//                                 : order.status === "Annulé"
//                                 ? "bg-red-100 text-red-800"
//                                 : "bg-yellow-100 text-yellow-800"
//                             }`}
//                           >
//                             {order.status}
//                           </div>
//                         </div>

//                         <div>
//                           <span className="text-sm text-gray-500">Total</span>
//                           <p className="font-medium">
//                             {calculateOrderTotal(order.orderItems)} Dh
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center mt-4 md:mt-0">
//                         <button className="text-primary-default flex items-center">
//                           Détails
//                           {expandedOrderId === order.id ? (
//                             <ChevronDown className="h-5 w-5 ml-1" />
//                           ) : (
//                             <ChevronRight className="h-5 w-5 ml-1" />
//                           )}
//                         </button>
//                       </div>
//                     </div>

//                     {/* Order Details (Expanded) */}
//                     {expandedOrderId === order.id && (
//                       <div className="p-4 border-t border-gray-200 bg-gray-50">
//                         {/* Order Information */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                           <div>
//                             <h3 className="text-lg font-medium mb-2">
//                               Détails de la commande
//                             </h3>

//                             <div className="flex items-start mb-3">
//                               <Calendar className="h-5 w-5 text-gray-400 mr-2" />
//                               <div>
//                                 <p className="text-sm text-gray-500">
//                                   Date de commande
//                                 </p>
//                                 <p className="font-medium">
//                                   {order.history && order.history.length > 0
//                                     ? `${formatDate(
//                                         order.history[0].date
//                                       )} à ${formatTime(order.history[0].date)}`
//                                     : "N/A"}
//                                 </p>
//                               </div>
//                             </div>

//                             <div className="flex items-start mb-3">
//                               <FileText className="h-5 w-5 text-gray-400 mr-2" />
//                               <div>
//                                 <p className="text-sm text-gray-500">
//                                   Numéro de commande
//                                 </p>
//                                 <p className="font-medium">
//                                   {order.orderNumber}
//                                 </p>
//                               </div>
//                             </div>

//                             <div className="flex items-start mb-3">
//                               <Clock className="h-5 w-5 text-gray-400 mr-2" />
//                               <div>
//                                 <p className="text-sm text-gray-500">Statut</p>
//                                 <p className="font-medium">{order.status}</p>
//                               </div>
//                             </div>

//                             <div className="flex items-start">
//                               <MapPin className="h-5 w-5 text-gray-400 mr-2" />
//                               <div>
//                                 <p className="text-sm text-gray-500">
//                                   Adresse de livraison
//                                 </p>
//                                 {order.addressLivraison ? (
//                                   <div>
//                                     <p className="font-medium">
//                                       {order.addressLivraison.street}
//                                     </p>
//                                     <p className="text-sm text-gray-600">
//                                       {order.addressLivraison.zone?.name},
//                                       {order.addressLivraison.city?.name},
//                                       {order.addressLivraison.region?.name}
//                                     </p>
//                                   </div>
//                                 ) : (
//                                   <p className="font-medium">Non définie</p>
//                                 )}
//                               </div>
//                             </div>
//                           </div>

//                           {/* Payment Information */}
//                           <div>
//                             <h3 className="text-lg font-medium mb-2">
//                               Informations de paiement
//                             </h3>

//                             <div className="bg-gray-100 rounded-lg p-4 mb-3">
//                               <p className="text-sm text-gray-500">
//                                 Mode de paiement
//                               </p>
//                               <p className="font-medium">
//                                 {order.paymentMode === "cash"
//                                   ? "Paiement à la livraison"
//                                   : order.paymentMode}
//                               </p>
//                             </div>

//                             <div className="bg-gray-100 rounded-lg p-4">
//                               <div className="flex justify-between mb-2">
//                                 <span className="text-gray-600">
//                                   Sous-total
//                                 </span>
//                                 <span>
//                                   {calculateOrderTotal(order.orderItems)} Dh
//                                 </span>
//                               </div>
//                               <div className="flex justify-between mb-2">
//                                 <span className="text-gray-600">Livraison</span>
//                                 <span>Gratuit</span>
//                               </div>
//                               <div className="border-t border-gray-200 my-2 pt-2 flex justify-between">
//                                 <span className="font-medium">Total</span>
//                                 <span className="font-medium text-primary-default">
//                                   {calculateOrderTotal(order.orderItems)} Dh
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Order Items */}
//                         <div className="mb-6">
//                           <h3 className="text-lg font-medium mb-4">
//                             Articles commandés
//                           </h3>

//                           <div className="overflow-x-auto">
//                             <table className="min-w-full">
//                               <thead className="bg-gray-100">
//                                 <tr>
//                                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Article
//                                   </th>
//                                   <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Quantité
//                                   </th>
//                                   <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Prix unitaire
//                                   </th>
//                                   <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     Total
//                                   </th>
//                                 </tr>
//                               </thead>
//                               <tbody className="divide-y divide-gray-200">
//                                 {order.orderItems.map((item: any, idx: any) => (
//                                   <tr key={idx}>
//                                     <td className="px-4 py-4 whitespace-nowrap">
//                                       <div className="font-medium text-gray-900">
//                                         {item.product?.nameFrench ||
//                                           item.product?.nameEnglish ||
//                                           item.product?.nameArabic ||
//                                           `Produit #${item.product?.id}`}
//                                       </div>
//                                     </td>
//                                     <td className="px-4 py-4 whitespace-nowrap text-right text-gray-500">
//                                       {item.quantity}
//                                     </td>
//                                     <td className="px-4 py-4 whitespace-nowrap text-right text-gray-500">
//                                       {(item.price / item.quantity).toFixed(2)}{" "}
//                                       Dh
//                                     </td>
//                                     <td className="px-4 py-4 whitespace-nowrap text-right font-medium">
//                                       {item.price.toFixed(2)} Dh
//                                     </td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         </div>

//                         {/* Order History */}
//                         {order.history && order.history.length > 0 && (
//                           <div>
//                             <h3 className="text-lg font-medium mb-4">
//                               Historique de la commande
//                             </h3>

//                             <div className="space-y-4">
//                               {order.history.map((entry: any) => (
//                                 <div key={entry.id} className="flex">
//                                   <div className="mr-3 flex flex-col items-center">
//                                     <div className="h-4 w-4 rounded-full bg-primary-default"></div>
//                                     {/* Line connecting the dots */}
//                                     <div className="h-full w-0.5 bg-gray-200"></div>
//                                   </div>
//                                   <div className="pb-6">
//                                     <p className="text-sm text-gray-500">
//                                       {formatDate(entry.date)} à{" "}
//                                       {formatTime(entry.date)}
//                                     </p>
//                                     <div
//                                       className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 mb-2
//                                       ${
//                                         entry.status === "Livré"
//                                           ? "bg-green-100 text-green-800"
//                                           : entry.status === "En cours"
//                                           ? "bg-blue-100 text-blue-800"
//                                           : entry.status === "Annulé"
//                                           ? "bg-red-100 text-red-800"
//                                           : "bg-yellow-100 text-yellow-800"
//                                       }`}
//                                     >
//                                       {entry.status}
//                                     </div>
//                                     <p className="text-gray-700">
//                                       {entry.comment}
//                                     </p>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         )}

//                         {/* Actions */}
//                         <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200"></div>
//                         <div className="flex justify-end gap-2 ml-auto">
//                           <button
//                             className="px-4 py-2 border cursor-pointer border-gray-300 rounded-full text-gray-700 hover:bg-gray-50"
//                             onClick={() => navigate({ to: "/produits" })}
//                           >
//                             Acheter à nouveau
//                           </button>

//                           <button className="px-4 py-2 bg-primary-default text-white rounded-full hover:bg-blue-600 ">
//                             <Link to={`/contact`}>
//                               Contacter le service client
//                             </Link>
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
//                 <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//                 <p className="text-gray-500 mb-4">
//                   Vous n'avez pas encore de commande
//                 </p>
//                 <Link
//                   to="/produits"
//                   className="bg-primary-default hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full inline-flex items-center"
//                 >
//                   Découvrir nos produits
//                 </Link>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// src/features/account/pages/OrdersPage.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronRight,
  Clock,
  Calendar,
  FileText,
  MapPin,
  AlertCircle,
  Package,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import AccountSidebar from "../components/AccountSidebar";
import banner from "../assets/images/mask-hero-seaction.webp";
import bannerMobile from "../assets/images/hero-original-image.webp";
import { Helmet } from "react-helmet-async";

// Define order-related types
interface OrderItem {
  productId: number | null;
  product: {
    id: number;
    nameFrench?: string;
    nameEnglish?: string;
    nameArabic?: string;
  };
  quantity: number;
  price: number;
}

export default function OrdersPage() {
  const { customer } = useAuthStore();
  const navigate = useNavigate();
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>(customer?.orders || []);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);

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
  // Fetch orders from API or use orders from customer data
  useEffect(() => {
    if (customer?.orders) {
      setOrders(customer.orders);
    } else {
      fetchOrders();
    }
  }, [customer]);

  // Fetch orders from API
  const fetchOrders = async () => {
    if (!customer?.id) return;

    try {
      setIsLoading(true);
      setError(null);

      // In a real implementation, you would fetch orders from your API
      // const response = await orderService.getUserOrders();
      // setOrders(response.data);

      // For now, we'll just use the orders from customer data
      if (customer.orders) {
        setOrders(customer.orders);
      }

      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors du chargement des commandes"
      );
      setIsLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";

    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Format time for display
  const formatTime = (dateString?: string) => {
    if (!dateString) return "";

    return new Date(dateString).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate order total
  const calculateOrderTotal = (items: OrderItem[]) => {
    return items.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  // Toggle order details
  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // Filter orders by status
  const filteredOrders = selectedStatus
    ? orders.filter((order) => order.status === selectedStatus)
    : orders;

  // Get unique statuses for filter
  const uniqueStatuses = [...new Set(orders.map((order) => order.status))];

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Close any expanded orders when changing pages
    setExpandedOrderId(null);
    // Scroll to top of the order list
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
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

      {/* Hero Section */}

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
            className="text-xl sm:text-3xl md:text-5xl lg:text-7xl text-[#0F67B1] font-normal text-center "
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Mes commandes
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
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-xl font-medium mb-4 md:mb-0">
                Mes commandes
              </h2>

              {/* Status Filter */}
              {/* {uniqueStatuses.length > 0 && (
                <div className="w-full md:w-auto">
                  <select
                    value={selectedStatus || ""}
                    onChange={(e) => {
                      setSelectedStatus(e.target.value || null);
                      setCurrentPage(1); // Reset to first page when filter changes
                    }}
                    className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-default focus:border-primary-default"
                  >
                    <option value="">Tous les statuts</option>
                    {uniqueStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              )} */}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-600">Chargement des commandes...</p>
              </div>
            ) : filteredOrders.length > 0 ? (
              <div className="space-y-4">
                {currentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    {/* Order Header */}
                    <div
                      className="flex flex-col md:flex-row justify-between p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleOrderDetails(order.id)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                        <div>
                          <span className="text-sm text-gray-500">
                            Commande
                          </span>
                          <p className="font-medium">{order.orderNumber}</p>
                        </div>

                        <div>
                          <span className="text-sm text-gray-500">Date</span>
                          <p className="font-medium">
                            {order.history && order.history.length > 0
                              ? formatDate(order.history[0].date)
                              : "N/A"}
                          </p>
                        </div>

                        <div>
                          <span className="text-sm text-gray-500">Statut</span>
                          <div
                            className={`inline-block px-2 py-1 text-xs font-medium rounded-full
                            ${
                              order.status === "Livré"
                                ? "bg-green-100 text-green-800"
                                : order.status === "En cours"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "Annulé"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </div>
                        </div>

                        <div>
                          <span className="text-sm text-gray-500">Total</span>
                          <p className="font-medium">
                            {calculateOrderTotal(order.orderItems)} Dh
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center mt-4 md:mt-0">
                        <button className="text-primary-default flex items-center">
                          Détails
                          {expandedOrderId === order.id ? (
                            <ChevronDown className="h-5 w-5 ml-1" />
                          ) : (
                            <ChevronRight className="h-5 w-5 ml-1" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Order Details (Expanded) */}
                    {expandedOrderId === order.id && (
                      <div className="p-4 border-t border-gray-200 bg-gray-50">
                        {/* Order Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <h3 className="text-lg font-medium mb-2">
                              Détails de la commande
                            </h3>

                            <div className="flex items-start mb-3">
                              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                              <div>
                                <p className="text-sm text-gray-500">
                                  Date de commande
                                </p>
                                <p className="font-medium">
                                  {order.history && order.history.length > 0
                                    ? `${formatDate(
                                        order.history[0].date
                                      )} à ${formatTime(order.history[0].date)}`
                                    : "N/A"}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start mb-3">
                              <FileText className="h-5 w-5 text-gray-400 mr-2" />
                              <div>
                                <p className="text-sm text-gray-500">
                                  Numéro de commande
                                </p>
                                <p className="font-medium">
                                  {order.orderNumber}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start mb-3">
                              <Clock className="h-5 w-5 text-gray-400 mr-2" />
                              <div>
                                <p className="text-sm text-gray-500">Statut</p>
                                <p className="font-medium">{order.status}</p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                              <div>
                                <p className="text-sm text-gray-500">
                                  Adresse de livraison
                                </p>
                                {order.addressLivraison ? (
                                  <div>
                                    <p className="font-medium">
                                      {order.addressLivraison.street}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {order.addressLivraison.zone?.name},
                                      {order.addressLivraison.city?.name},
                                      {order.addressLivraison.region?.name}
                                    </p>
                                  </div>
                                ) : (
                                  <p className="font-medium">Non définie</p>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Payment Information */}
                          <div>
                            <h3 className="text-lg font-medium mb-2">
                              Informations de paiement
                            </h3>

                            <div className="bg-gray-100 rounded-lg p-4 mb-3">
                              <p className="text-sm text-gray-500">
                                Mode de paiement
                              </p>
                              <p className="font-medium">
                                {order.paymentMode === "cash"
                                  ? "Paiement à la livraison"
                                  : "Paiement par carte"}
                              </p>
                            </div>

                            <div className="bg-gray-100 rounded-lg p-4">
                              <div className="flex justify-between mb-2">
                                <span className="text-gray-600">
                                  Sous-total
                                </span>
                                <span>
                                  {calculateOrderTotal(order.orderItems)} Dh
                                </span>
                              </div>
                              <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Livraison</span>
                                <span>Gratuit</span>
                              </div>
                              <div className="border-t border-gray-200 my-2 pt-2 flex justify-between">
                                <span className="font-medium">Total</span>
                                <span className="font-medium text-primary-default">
                                  {calculateOrderTotal(order.orderItems)} Dh
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="mb-6">
                          <h3 className="text-lg font-medium mb-4">
                            Articles commandés
                          </h3>

                          <div className="overflow-x-auto">
                            <table className="min-w-full">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Article
                                  </th>
                                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Quantité
                                  </th>
                                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Prix unitaire
                                  </th>
                                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {order.orderItems.map((item: any, idx: any) => (
                                  <tr key={idx}>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                      <div className="font-medium text-gray-900">
                                        {item.product?.nameFrench ||
                                          item.product?.nameEnglish ||
                                          item.product?.nameArabic ||
                                          `Produit #${item.product?.id}`}
                                      </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-right text-gray-500">
                                      {item.quantity}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-right text-gray-500">
                                      {(item.price / item.quantity).toFixed(2)}{" "}
                                      Dh
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-right font-medium">
                                      {item.price.toFixed(2)} Dh
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Order History */}
                        {order.history && order.history.length > 0 && (
                          <div>
                            <h3 className="text-lg font-medium mb-4">
                              Historique de la commande
                            </h3>

                            <div className="space-y-4">
                              {order.history.map((entry: any) => (
                                <div key={entry.id} className="flex">
                                  <div className="mr-3 flex flex-col items-center">
                                    <div className="h-4 w-4 rounded-full bg-primary-default"></div>
                                    {/* Line connecting the dots */}
                                    <div className="h-full w-0.5 bg-gray-200"></div>
                                  </div>
                                  <div className="pb-6">
                                    <p className="text-sm text-gray-500">
                                      {formatDate(entry.date)} à{" "}
                                      {formatTime(entry.date)}
                                    </p>
                                    <div
                                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 mb-2
                                      ${
                                        entry.status === "Livré"
                                          ? "bg-green-100 text-green-800"
                                          : entry.status === "En cours"
                                          ? "bg-blue-100 text-blue-800"
                                          : entry.status === "Annulé"
                                          ? "bg-red-100 text-red-800"
                                          : "bg-yellow-100 text-yellow-800"
                                      }`}
                                    >
                                      {entry.status}
                                    </div>
                                    <p className="text-gray-700">
                                      {entry.comment}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200"></div>
                        <div className="flex justify-end gap-2 ml-auto">
                          <button
                            className="px-4 py-2 border cursor-pointer border-gray-300 rounded-full text-gray-700 hover:bg-gray-50"
                            onClick={() => navigate({ to: "/produits" })}
                          >
                            Acheter à nouveau
                          </button>

                          <button className="px-4 py-2 bg-primary-default text-white rounded-full hover:bg-blue-600 ">
                            <Link to={`/contact`}>
                              Contacter le service client
                            </Link>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-8 space-x-2">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className={`flex items-center justify-center w-10 h-10 rounded-full border ${
                        currentPage === 1
                          ? "text-gray-400 border-gray-200 cursor-not-allowed"
                          : "text-gray-600 border-gray-300 hover:bg-gray-50"
                      }`}
                      aria-label="Page précédente"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }, (_, i) => {
                      const pageNumber = i + 1;
                      // Show current page, first page, last page, and one page before and after current
                      const showPageNumber =
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        Math.abs(pageNumber - currentPage) <= 1;

                      // Show dots only once between gaps
                      const showDots =
                        (pageNumber === 2 && currentPage > 3) ||
                        (pageNumber === totalPages - 1 &&
                          currentPage < totalPages - 2);

                      if (showPageNumber) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => paginate(pageNumber)}
                            className={`flex items-center justify-center w-10 h-10 rounded-full ${
                              currentPage === pageNumber
                                ? "bg-primary-default text-white"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (showDots) {
                        return (
                          <span
                            key={`dots-${pageNumber}`}
                            className="flex items-center justify-center w-10 h-10"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}

                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={`flex items-center justify-center w-10 h-10 rounded-full border ${
                        currentPage === totalPages
                          ? "text-gray-400 border-gray-200 cursor-not-allowed"
                          : "text-gray-600 border-gray-300 hover:bg-gray-50"
                      }`}
                      aria-label="Page suivante"
                    >
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
                <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">
                  Vous n'avez pas encore de commande
                </p>
                <Link
                  to="/produits"
                  className="bg-primary-default hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full inline-flex items-center"
                >
                  Découvrir nos produits
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
