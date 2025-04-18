import { useState, useEffect, useCallback } from "react";
import { Search, ChevronDown, Plus, Check } from "lucide-react";
import banner from "../assets/images/banner-products.png";
import saislogo from "../assets/images/brands/LogoAS.png";
import sidihrazamlogo from "../assets/images/brands/sidihrazam-logo.png";
import ghaytlogo from "../assets/images/brands/ghayt-logo.png";
import product1 from "../assets/images/poducts/sais-bottle-05.png";
import product2 from "../assets/images/poducts/product-2.png";
import product3 from "../assets/images/poducts/product-3.png";
import product4 from "../assets/images/poducts/product-4.png";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../features/cart/hooks/useCart";

/// Define TypeScript interfaces
interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  format: string;
  featured: boolean;
  new: boolean;
  image: string;
}

interface Brand {
  id: string;
  name: string;
  logo: string;
}

interface Format {
  id: string;
  name: string;
}

// Enhanced animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  hover: {
    y: -5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

// Static data for products
const products: Product[] = [
  {
    id: 1,
    name: "AÏN SAÏSS 0,33L",
    description: "PACK 12 / 33CL",
    brand: "Ain Saiss",
    price: 15.99,
    format: "Petit format",
    featured: true,
    new: false,
    image: product1,
  },
  {
    id: 2,
    name: "AÏN SAÏSS BULLES PREMIUM 0,75L",
    description: "PACK 12 / 0.75L",
    brand: "Ain Saiss",
    price: 18.99,
    format: "Moyen format",
    featured: true,
    new: true,
    image: product2,
  },
  {
    id: 3,
    name: "AÏN SAÏSS - PREMIUM 0,5L",
    description: "PACK 20 / 0.5L",
    brand: "Ghayt",
    price: 12.5,
    format: "Petit format",
    featured: false,
    new: false,
    image: product3,
  },
  {
    id: 4,
    name: "AÏN SAÏSS BULLES 1L",
    description: "PACK 6 / 1L",
    brand: "Sidi Hrazam",
    price: 21.99,
    format: "Moyen format",
    featured: false,
    new: true,
    image: product4,
  },
  {
    id: 5,
    name: "Fontaine d'eau",
    description: "PACK 12 / 33CL",
    brand: "Ain Saiss",
    price: 199.99,
    format: "Fontaines",
    featured: true,
    new: false,
    image: product1,
  },
  {
    id: 6,
    name: "Pack eau minérale",
    description: "PACK 12 / 33CL",
    brand: "Ghayt",
    price: 45.99,
    format: "Grand format",
    featured: false,
    new: false,
    image: product2,
  },
];

// Static data for brands
const brands: Brand[] = [
  {
    id: "ain-saiss",
    name: "Ain Saiss",
    logo: saislogo,
  },
  {
    id: "ghayt",
    name: "Ghayt",
    logo: ghaytlogo,
  },
  {
    id: "sidi-hrazam",
    name: "Sidi Hrazam",
    logo: sidihrazamlogo,
  },
];

// Static data for formats
const formats: Format[] = [
  {
    id: "petit",
    name: "Petit format (moins de 1L)",
  },
  {
    id: "moyen",
    name: "Moyen format (1L à 1,5L)",
  },
  {
    id: "grand",
    name: "Grand format (2L et plus)",
  },
  {
    id: "fontaines",
    name: "Fontaines / Bidons (5L et 6L)",
  },
];

// Brand to filter mapping
const brandMap: Record<string, string> = {
  "ain-saiss": "Ain Saiss",
  ghayt: "Ghayt",
  "sidi-hrazam": "Sidi Hrazam",
};

// Format to filter mapping
const formatMap: Record<string, string> = {
  petit: "Petit format",
  moyen: "Moyen format",
  grand: "Grand format",
  fontaines: "Fontaines",
};

// Product Card Component
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isInCart: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [showAdded, setShowAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setShowAdded(true);

    // Reset after 1 second
    setTimeout(() => {
      setShowAdded(false);
    }, 1000);
  };

  // Button animation variants
  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    added: {
      scale: [1, 1.2, 1],
      backgroundColor: "#22c55e", // green-500
      transition: {
        duration: 0.5,
        backgroundColor: { duration: 0.2 },
      },
    },
  };

  // Image animation variants
  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
    idle: {
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="p-4 flex flex-col items-center h-full rounded-3xl hover:shadow-md transition-shadow duration-300 "
      variants={item}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative w-full h-48 lg:h-64 flex items-center justify-center overflow-hidden">
        <motion.img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
          variants={imageVariants}
          animate={isHovered ? "hover" : "idle"}
        />

        {/* New badge */}
        {/* {product.new && (
          <motion.div
            className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
          >
            NOUVEAU
          </motion.div>
        )} */}
      </div>
      <div className="flex-1 text-center font-sans mt-10 w-full">
        <motion.h3
          className="text-blue-700 font-semibold text-base uppercase"
          animate={isHovered ? { color: "#1d4ed8" } : { color: "#1e40af" }}
          transition={{ duration: 0.3 }}
        >
          {product.name}
        </motion.h3>
        <p className="text-gray-500 text-xs mt-1">{product.description}</p>
      </div>

      {/* Price & Add Button */}
      <div className="w-full mt-auto text-center pt-4">
        <p className="text-gray-900 font-medium mb-4 text-lg">
          {product.price.toFixed(2)} <span className="text-xs">DH</span>
        </p>
        <motion.button
          className="w-full md:w-2/5 cursor-pointer text-white text-base py-2 px-0 rounded-full"
          initial={{ backgroundColor: "#3b82f6" }} // bg-blue-500
          variants={buttonVariants}
          animate={showAdded ? "added" : "idle"}
          whileHover="hover"
          whileTap="tap"
          onClick={handleAddToCart}
        >
          <AnimatePresence mode="wait">
            {showAdded ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-center"
              >
                Ajouté
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    damping: 10,
                    stiffness: 300,
                    delay: 0.1,
                  }}
                  className="ml-1"
                >
                  <Check size={16} />
                </motion.span>
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center justify-center"
              >
                Ajouter
                <motion.span
                  className="ml-1"
                  animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                  transition={{
                    repeat: isHovered ? Infinity : 0,
                    repeatDelay: 1,
                    duration: 0.5,
                  }}
                >
                  <Plus size={16} />
                </motion.span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};

const ProductsPage: React.FC = () => {
  const [isBrandsOpen, setIsBrandsOpen] = useState(true);
  const [isFormatsOpen, setIsFormatsOpen] = useState(true);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] =
    useState<boolean>(false);
  const [mobileFilterType, setMobileFilterType] = useState<
    "brands" | "formats" | null
  >(null);

  // Get cart functions from our hook
  const { addToCart, hasItem, items } = useCart();

  // State for notification
  const [notification, setNotification] = useState<{
    message: string;
    visible: boolean;
  }>({
    message: "",
    visible: false,
  });

  // Function to add product to cart
  const handleAddToCart = (product: Product) => {
    console.log("Adding product to cart:", product);

    // Convert the Product to CartItem format
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      pack: product.description,
      quantity: 1,
    });

    // Verify the cart after adding
    console.log("Cart after adding:", items);

    // Show notification
    setNotification({
      message: `${product.name} ajouté au panier`,
      visible: true,
    });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Memoize the filter function to avoid unnecessary recalculations
  const filterProducts = useCallback(() => {
    console.log("Filtering products with:", {
      selectedBrands,
      selectedFormats,
      searchQuery,
    });

    let filtered = [...products];

    // Filter by brand if any selected
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.some((brandId) => brandMap[brandId] === product.brand)
      );
    }

    // Filter by format if any selected
    if (selectedFormats.length > 0) {
      filtered = filtered.filter((product) =>
        selectedFormats.some(
          (formatId) => formatMap[formatId] === product.format
        )
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query)
      );
    }

    console.log("Filtered products count:", filtered.length);
    return filtered;
  }, [selectedBrands, selectedFormats, searchQuery]);

  // Update filtered products when filters change
  useEffect(() => {
    setFilteredProducts(filterProducts());
  }, [filterProducts]);

  // Toggle brand selection
  const toggleBrand = (brandId: string): void => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  // Toggle format selection
  const toggleFormat = (formatId: string): void => {
    setSelectedFormats((prev) =>
      prev.includes(formatId)
        ? prev.filter((id) => id !== formatId)
        : [...prev, formatId]
    );
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedFormats([]);
    setSearchQuery("");
    setMobileFilterType(null);
  };

  // Check if product is in cart
  const checkIfInCart = (productId: number) => {
    return hasItem(productId.toString());
  };

  // Animation variants for page sections
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Notification toast variants
  const toastVariants = {
    initial: { opacity: 0, y: 50, scale: 0.8 },
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
      },
    },
  };

  // Filter button variants
  const filterButtonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    active: {
      backgroundColor: "#0d4f91",
      color: "#ffffff",
    },
    inactive: {
      backgroundColor: "#0F67B1",
      color: "#ffffff",
    },
  };

  return (
    <motion.div
      className="min-h-screen"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      {/* Notification Toast */}
      <AnimatePresence>
        {notification.visible && (
          <motion.div
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-3xl shadow-lg z-50 flex items-center"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 0.5,
                times: [0, 0.2, 0.4, 0.6],
              }}
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </motion.svg>
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.div
        className="relative bg-blue-50 mt-16 md:mt-20 py-12 h-[40vh] overflow-hidden rounded-3xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img
            src={banner}
            alt="Mountains background"
            className="object-cover h-full w-full"
          />
        </motion.div>
        <motion.div
          className="mt-10 md:mt-14 mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-2xl font-semibold lg:text-7xl text-[#0F67B1] text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Tous les produits
          </motion.h1>
          <motion.div
            className="max-w-2xl mx-auto md:mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="relative">
              <motion.input
                type="text"
                placeholder="Rechercher un produit..."
                className="w-full py-3 bg-white text-[#11459D] px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0F67B1] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                initial={{ width: "90%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileFocus={{ boxShadow: "0 0 0 3px rgba(15, 103, 177, 0.2)" }}
              />
              <motion.div
                className="absolute right-3 top-3 text-[#11459D]"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.1 }}
              >
                <Search />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="mx-auto px-4 py-8">
        {/* Mobile Filters */}
        <motion.div
          className="lg:hidden mb-6 flex justify-left space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <motion.button
            onClick={() => {
              setMobileFilterType(
                mobileFilterType === "brands" ? null : "brands"
              );
              setIsMobileFiltersOpen(mobileFilterType !== "brands");
            }}
            className="flex items-center justify-center px-6 py-1 rounded-full shadow-sm border border-[#0F67B1]"
            variants={filterButtonVariants}
            initial="initial"
            animate={mobileFilterType === "brands" ? "active" : "inactive"}
            whileHover="hover"
            whileTap="tap"
          >
            <span>Marques</span>
            <motion.div
              animate={{ rotate: mobileFilterType === "brands" ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="ml-2"
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </motion.button>

          <motion.button
            onClick={() => {
              setMobileFilterType(
                mobileFilterType === "formats" ? null : "formats"
              );
              setIsMobileFiltersOpen(mobileFilterType !== "formats");
            }}
            className="flex items-center justify-center px-6 py-3 rounded-full shadow-sm border border-[#0F67B1]"
            variants={filterButtonVariants}
            initial="initial"
            animate={mobileFilterType === "formats" ? "active" : "inactive"}
            whileHover="hover"
            whileTap="tap"
          >
            <span>Format</span>
            <motion.div
              animate={{ rotate: mobileFilterType === "formats" ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="ml-2"
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </motion.button>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <motion.div
            className="hidden lg:block w-80 shrink-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-3xl shadow-sm p-6 mb-6">
              {/* Brands Filter */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                {/* Clickable header */}
                <div
                  className="flex items-center justify-between mb-4 cursor-pointer"
                  onClick={() => setIsBrandsOpen(!isBrandsOpen)}
                >
                  <h3 className="font-medium text-[#0F67B1] text-lg">
                    Marques
                  </h3>
                  <motion.svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: isBrandsOpen ? 0 : -180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </div>

                {/* Content with animation */}
                <AnimatePresence initial={false}>
                  {isBrandsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.3, ease: "easeOut" },
                          opacity: { duration: 0.2, delay: 0.1 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3, ease: "easeIn" },
                          opacity: { duration: 0.2 },
                        },
                      }}
                    >
                      <div className="space-y-5">
                        {brands.map((brand, index) => (
                          <motion.div
                            key={brand.id}
                            className="flex items-center py-1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.5 + index * 0.1,
                            }}
                          >
                            <motion.input
                              type="checkbox"
                              id={`desktop-brand-${brand.id}`}
                              checked={selectedBrands.includes(brand.id)}
                              onChange={() => toggleBrand(brand.id)}
                              className="h-5 w-5 text-[#0F67B1] focus:ring-[#0F67B1] border-gray-300 rounded-3xl"
                              whileTap={{ scale: 1.2 }}
                            />
                            <motion.label
                              htmlFor={`desktop-brand-${brand.id}`}
                              className="flex items-center"
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <img
                                src={brand.logo || "/placeholder.svg"}
                                alt={brand.name}
                                width={90}
                                height={45}
                                className="ml-10"
                              />
                            </motion.label>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Formats Filter */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                {/* Clickable header */}
                <div
                  className="flex items-center justify-between mb-4 cursor-pointer"
                  onClick={() => setIsFormatsOpen(!isFormatsOpen)}
                >
                  <h3 className="font-medium text-[#0F67B1] text-lg">Format</h3>
                  <motion.svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: isFormatsOpen ? 0 : -180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </div>

                {/* Content with animation */}
                <AnimatePresence initial={false}>
                  {isFormatsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.3, ease: "easeOut" },
                          opacity: { duration: 0.2, delay: 0.1 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3, ease: "easeIn" },
                          opacity: { duration: 0.2 },
                        },
                      }}
                    >
                      <div className="space-y-5">
                        {formats.map((format, index) => (
                          <motion.div
                            key={format.id}
                            className="flex items-center py-1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.8 + index * 0.1,
                            }}
                          >
                            <motion.input
                              type="checkbox"
                              id={`desktop-format-${format.id}`}
                              checked={selectedFormats.includes(format.id)}
                              onChange={() => toggleFormat(format.id)}
                              className="h-5 w-5 text-[#0F67B1] focus:ring-[#0F67B1] border-gray-300 rounded-3xl"
                              whileTap={{ scale: 1.2 }}
                            />
                            <motion.label
                              htmlFor={`desktop-format-${format.id}`}
                              className="ml-3 text-base text-gray-700"
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              {format.name}
                            </motion.label>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Reset Filters Button (Desktop) */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 }}
              >
                <motion.button
                  onClick={resetFilters}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-full transition-colors duration-200 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Réinitialiser les filtres
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Mobile Filters Dropdown */}
          <AnimatePresence>
            {isMobileFiltersOpen && (
              <motion.div
                className="lg:hidden w-full p-6 mb-6 bg-white rounded-3xl shadow-sm"
                initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                animate={{ opacity: 1, height: "auto", overflow: "visible" }}
                exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                transition={{ duration: 0.3 }}
              >
                {mobileFilterType === "brands" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-medium text-[#0F67B1] text-lg mb-4">
                      Marques
                    </h3>
                    <div className="space-y-5">
                      {brands.map((brand, index) => (
                        <motion.div
                          key={brand.id}
                          className="flex items-center py-1"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <motion.input
                            type="checkbox"
                            id={`mobile-brand-${brand.id}`}
                            checked={selectedBrands.includes(brand.id)}
                            onChange={() => toggleBrand(brand.id)}
                            className="h-5 w-5 text-[#0F67B1] focus:ring-[#0F67B1] border-gray-300 rounded-3xl"
                            whileTap={{ scale: 1.2 }}
                          />
                          <motion.label
                            htmlFor={`mobile-brand-${brand.id}`}
                            className="flex items-center"
                            whileHover={{ x: 5 }}
                          >
                            <img
                              src={brand.logo || "/placeholder.svg"}
                              alt={brand.name}
                              width={90}
                              height={45}
                              className="ml-8"
                            />
                          </motion.label>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {mobileFilterType === "formats" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-medium text-[#0F67B1] text-lg mb-4">
                      Format
                    </h3>
                    <div className="space-y-5">
                      {formats.map((format, index) => (
                        <motion.div
                          key={format.id}
                          className="flex items-center py-1"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <motion.input
                            type="checkbox"
                            id={`mobile-format-${format.id}`}
                            checked={selectedFormats.includes(format.id)}
                            onChange={() => toggleFormat(format.id)}
                            className="h-5 w-5 text-[#0F67B1] focus:ring-[#0F67B1] border-gray-300 rounded-3xl"
                            whileTap={{ scale: 1.2 }}
                          />
                          <motion.label
                            htmlFor={`mobile-format-${format.id}`}
                            className="ml-3 text-base text-gray-700"
                            whileHover={{ x: 5 }}
                          >
                            {format.name}
                          </motion.label>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Apply Filters Button (Mobile) */}
                <motion.div className="mt-6">
                  <motion.button
                    onClick={() => {
                      // Don't reset filters when applying - just close the filter panel
                      setIsMobileFiltersOpen(false);
                    }}
                    className="w-full bg-[#0F67B1] text-white py-3 px-4 rounded-full transition-colors duration-200 font-medium"
                    whileHover={{ scale: 1.02, backgroundColor: "#0d4f91" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Appliquer les filtres
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Results Count */}
            <motion.div
              className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <motion.p
                className="text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                {filteredProducts.length} produit
                {filteredProducts.length !== 1 ? "s" : ""} trouvé
                {filteredProducts.length !== 1 ? "s" : ""}
              </motion.p>

              {(selectedBrands.length > 0 ||
                selectedFormats.length > 0 ||
                searchQuery.trim()) && (
                <motion.button
                  onClick={resetFilters}
                  className="bg-white text-[#0F67B1] hover:bg-blue-50 md:bg-transparent py-2 px-4 md:px-0 rounded-full md:rounded-none border border-[#0F67B1] md:border-0 text-sm font-medium flex items-center justify-center w-full md:w-auto shadow-sm md:shadow-none transition-colors"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 1, delay: 1, repeat: 0 }}
                  >
                    <path d="M3 2v6h6"></path>
                    <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
                    <path d="M21 22v-6h-6"></path>
                    <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
                  </motion.svg>
                  Réinitialiser les filtres
                </motion.button>
              )}
            </motion.div>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              key={`products-${selectedBrands.join("-")}-${selectedFormats.join(
                "-"
              )}-${searchQuery}`}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  isInCart={checkIfInCart(product.id)}
                />
              ))}
            </motion.div>

            {filteredProducts.length === 0 && (
              <motion.div
                className="text-center py-12 bg-white rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.p
                  className="text-gray-500 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  Aucun produit ne correspond à votre recherche.
                </motion.p>
                <motion.button
                  onClick={resetFilters}
                  className="bg-[#0F67B1] hover:bg-blue-600 text-white py-2 px-6 rounded-full transition-colors duration-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Réinitialiser les filtres
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductsPage;
