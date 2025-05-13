import { useState, useEffect, useCallback, useRef } from "react";
import {
  Search,
  ChevronDown,
  Plus,
  Check,
  Minus,
  ChevronRight,
  ChevronsRight,
  ChevronLeft,
  ChevronsLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../hooks/useCart";
// Import assets
import banner from "../assets/images/banner-products.webp";
import saislogo from "../assets/images/brands/LogoAS.png";
import sidihrazamlogo from "../assets/images/brands/sidihrazam-logo.png";
import ghaytlogo from "../assets/images/brands/ghayt-logo.png";
import fallbackImage from "../assets/images/poducts/sais-bottle-05.png";
import useProductStore from "../store/productStore";
import { Product } from "../lib/api/productService";
import useCartStore from "../store/cartStore";
import CartNotification from "../components/product/NotificationToast";

// Types
interface Brand {
  id: string;
  name: string;
  logo: string;
  apiName: string;
}

interface Format {
  id: string;
  name: string;
  min: number;
  max: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isInCart: boolean;
}

interface NotificationState {
  message: string;
  visible: boolean;
}

// Static data
const brands: Brand[] = [
  {
    id: "ain-saiss",
    name: "Ain Saiss",
    logo: saislogo,
    apiName: "AIN_SAISS",
  },
  {
    id: "ghayt",
    name: "Ghayt",
    logo: ghaytlogo,
    apiName: "GHAYT",
  },
  {
    id: "sidi-hrazam",
    name: "Sidi Hrazam",
    logo: sidihrazamlogo,
    apiName: "SIDI_HARAZEM",
  },
];

const formats: Format[] = [
  {
    id: "petit",
    name: "Petit format (moins de 1L)",
    min: 0,
    max: 0.99,
  },
  {
    id: "moyen",
    name: "Moyen format (1L à 1,5L)",
    min: 1,
    max: 1.5,
  },
  {
    id: "grand",
    name: "Grand format (2L et plus)",
    min: 2,
    max: 4.99,
  },
  {
    id: "fontaines",
    name: "Fontaines / Bidons (5L et 6L)",
    min: 5,
    max: 100,
  },
];

// Animation variants
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
  hover: {
    y: -5,
    transition: { duration: 0.3 },
  },
};

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

// Helper functions
const extractVolumeFromDescription = (
  description: string | null
): number | null => {
  if (!description) return null;

  // Looking for patterns like: 5L, 1.5L, 0.33L, 0,5L
  const volumeRegex = /(\d+(?:[.,]\d+)?)\s*L/i;
  const match = description.match(volumeRegex);

  if (match && match[1]) {
    // Convert comma to period for proper parsing
    const volumeStr = match[1].replace(",", ".");
    return parseFloat(volumeStr);
  }

  return null;
};

// ProductCard Component
const ProductCard = ({ product, onAddToCart, isInCart }: ProductCardProps) => {
  const [showAdded, setShowAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [flyingImage, setFlyingImage] = useState(false);

  // Reference to the product image for animation start position
  const productImageRef = useRef<HTMLImageElement | null>(null);

  // Use our custom cart hook
  const { addToCart } = useCart();

  // Global cart state from zustand for animations
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Get the best available name and description
  const productName =
    product.nameFrench ||
    product.nameEnglish ||
    product.nameArabic ||
    "Produit sans nom";

  const productDescription =
    product.lightDescriptionFrench ||
    product.lightDescriptionEnglish ||
    product.detailedDescriptionFrench ||
    product.detailedDescriptionEnglish ||
    "";

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  // Get image source with proper fallback
  const getImageSrc = () => {
    try {
      if (product.images && product.images.length > 0) {
        const image = product.images[0];

        if (image.content) {
          return image.content.startsWith("data:")
            ? image.content
            : `data:image/jpeg;base64,${image.content}`;
        }

        if (image.id) {
          return `${import.meta.env.VITE_API_URL || ""}/images/${image.id}`;
        }
      }
    } catch (err) {
      console.warn("Error loading image, using fallback", err);
    }

    return fallbackImage;
  };

  // Function to calculate position for flying animation
  const calculateFlyPosition = () => {
    // Get cart icon position (this will need refs in the header component)
    const cartIconElement = document.querySelector(".cart-icon-target");

    if (!productImageRef.current || !cartIconElement) {
      return { x: window.innerWidth - 80, y: -window.innerHeight + 80 };
    }

    const productRect = productImageRef.current.getBoundingClientRect();
    const cartRect = cartIconElement.getBoundingClientRect();

    return {
      x:
        cartRect.left -
        productRect.left +
        cartRect.width / 2 -
        productRect.width / 2,
      y:
        cartRect.top -
        productRect.top +
        cartRect.height / 2 -
        productRect.height / 2,
    };
  };

  // Add to cart handler with enhanced animation
  const handleAddToCart = () => {
    // Start flying animation
    setFlyingImage(true);

    // Delay actual cart addition slightly for visual effect
    setTimeout(() => {
      addToCart(product, quantity);
      setQuantity(1);
      setShowAdded(true);

      // Dispatch a custom event to notify parent components that a product was added
      // This is the key part for triggering the notification
      window.dispatchEvent(
        new CustomEvent("productAddedToCart", {
          detail: {
            product,
            quantity,
            // Include this information for the notification
            notificationInfo: {
              message: `${productName} ajouté au panier`,
              image: getImageSrc(),
              quantity: quantity,
            },
          },
        })
      );

      // Reset flying animation after completion
      setTimeout(() => {
        setFlyingImage(false);
        // Reset add button after all animations complete
        setTimeout(() => setShowAdded(false), 1000);
      }, 400); // This should match the duration of the flying animation
    }, 100);
  };

  // Enhanced animation variants
  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    added: {
      scale: 1.2, // Changed from array to single target value for spring
      backgroundColor: "#22c55e",
      transition: {
        scale: {
          type: "spring", // Spring animation for scale
          stiffness: 300,
          damping: 15,
          duration: 0.5,
        },
        backgroundColor: {
          duration: 0.2,
          type: "tween", // Tween for color change
        },
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3, type: "tween" },
    },
    idle: {
      scale: 1,
      transition: { duration: 0.3, type: "tween" },
    },
  };

  const flyingImageVariants = {
    initial: {
      opacity: 0,
      scale: 2,
      x: 0,
      y: 0,
      zIndex: 50,
    },
    animate: {
      opacity: [0, 1, 1, 0],
      scale: [0.5, 1, 1, 0.5],
      x: calculateFlyPosition().x,
      y: calculateFlyPosition().y,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        type: "tween", // Explicitly set to tween for multi-keyframe animation
      },
      zIndex: 50,
    },
  };

  // Quantity selector animations
  const quantityControlVariants = {
    hidden: { opacity: 0, y: 10, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="p-4 flex flex-col items-center h-full rounded-3xl hover:shadow-md transition-shadow duration-300"
      variants={imageVariants}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative w-full h-48 lg:h-64 flex items-center justify-center overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse w-16 h-16 rounded-full bg-blue-100"></div>
          </div>
        )}

        <motion.img
          ref={productImageRef}
          src={getImageSrc()}
          alt={productName}
          className={`max-h-full max-w-full object-contain ${
            !imageLoaded && !imageError ? "opacity-0" : "opacity-100"
          }`}
          variants={imageVariants}
          animate={isHovered ? "hover" : "idle"}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {/* Flying image for cart animation */}
        <AnimatePresence>
          {flyingImage && (
            <motion.img
              src={getImageSrc()}
              alt=""
              className="absolute w-32 h-32 object-contain pointer-events-none"
              variants={flyingImageVariants}
              initial="initial"
              animate="animate"
              onAnimationComplete={() => setFlyingImage(false)}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 text-center font-sans mt-10 w-full">
        <motion.h3
          className="text-blue-700 font-semibold text-base uppercase"
          animate={isHovered ? { color: "#1d4ed8" } : { color: "#1e40af" }}
          transition={{ duration: 0.3 }}
        >
          {productName}
        </motion.h3>
        <p className="text-gray-500 text-xs mt-1">{productDescription}</p>
      </div>

      {/* Quantity selector - Improved with smoother animations */}
      {/* <AnimatePresence>
        {isHovered && (
          <motion.div
            className="flex items-center mt-3"
            variants={quantityControlVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.button
              onClick={decrementQuantity}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100"
              disabled={quantity <= 1}
              whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
              whileTap={{ scale: 0.9 }}
            >
              <Minus className="h-3 w-3" />
            </motion.button>
            <motion.span
              className="mx-3 w-5 text-center"
              key={quantity} // Key helps with animation when value changes
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {quantity}
            </motion.span>
            <motion.button
              onClick={incrementQuantity}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100"
              whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus className="h-3 w-3" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Price & Add Button - Enhanced with better feedback animations */}
      <div className="w-full mt-auto text-center pt-4">
        <p className="text-gray-900 font-medium mb-4 text-lg">
          {product.price?.toFixed(2) ?? "0.00"}{" "}
          <span className="text-xs">DH</span>
        </p>
        <motion.button
          className="w-full md:w-3/5 cursor-pointer text-white text-base py-2 px-0 rounded-full relative overflow-hidden group"
          initial={{ backgroundColor: "#3b82f6" }}
          variants={buttonVariants}
          animate={showAdded ? "added" : "idle"}
          whileHover="hover"
          whileTap="tap"
          onClick={handleAddToCart}
        >
          {/* Background ripple effect when clicking */}
          <motion.div
            className="absolute inset-0 bg-white opacity-0 pointer-events-none"
            initial={{ scale: 0, opacity: 0 }}
            whileTap={{
              scale: 2,
              opacity: 0.1,
              transition: { duration: 0.4, type: "tween" },
            }}
          />

          <AnimatePresence mode="wait">
            {showAdded ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "tween", duration: 0.3 }}
                className="flex items-center justify-center"
              >
                Ajouté
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    rotate: 0,
                  }}
                  transition={{
                    type: "spring",
                    damping: 12,
                    stiffness: 200,
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
                transition={{ type: "tween", duration: 0.3 }}
                className="flex items-center justify-center"
              >
                Ajouter
                <motion.span
                  className="ml-1"
                  animate={{
                    x: isHovered ? 5 : 0,
                    transition: {
                      repeat: isHovered ? Infinity : 0,
                      repeatDelay: 1,
                      duration: 0.5,
                      repeatType: "reverse",
                      type: "tween",
                    },
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

// Main Products Page Component
const ProductsPage = () => {
  // UI State
  const [isBrandsOpen, setIsBrandsOpen] = useState(true);
  const [isFormatsOpen, setIsFormatsOpen] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [mobileFilterType, setMobileFilterType] = useState(null);
  const [isFiltersPending, setIsFiltersPending] = useState(false);

  // Filter State
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Refs for debouncing
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const filterTimeout = useRef<NodeJS.Timeout | null>(null);

  // Notification State
  // const [notification, setNotification] = useState<NotificationState>({
  //   message: "",
  //   visible: false,
  // });

  const [notification, setNotification] = useState({
    message: "",
    visible: false,
    image: "",
    quantity: 1,
  });
  const {
    products,
    isLoading,
    error,
    pagination,
    fetchProducts,
    setSearchTerm,
  } = useProductStore();
  const { addToCart, hasItem } = useCart();

  // Load products on mount
  useEffect(() => {
    fetchProducts({ page: 0 });
  }, [fetchProducts]);

  // Handle page change with filter preservation
  const handlePageChange = useCallback(
    (page: number) => {
      // Get current formatted filters for API
      const apiFormattedBrands = selectedBrands
        .map((brandId) => {
          const brand = brands.find((b) => b.id === brandId);
          return brand?.apiName || "";
        })
        .filter(Boolean);

      // Construct API query
      fetchProducts({
        page: page,
        size: pagination?.size || 10,
        orderBy: "id",
        order: "ASC",
        ...(searchQuery.trim() ? { query: searchQuery } : {}),
        ...(apiFormattedBrands.length > 0
          ? { brands: apiFormattedBrands.join(",") }
          : {}),
      });

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [fetchProducts, pagination?.size, searchQuery, selectedBrands]
  );

  // Reset filters
  const resetFilters = useCallback(() => {
    setSelectedBrands([]);
    setSelectedFormats([]);
    setSearchQuery("");
    setMobileFilterType(null);
    fetchProducts({ page: 0 });
  }, [fetchProducts]);

  // Debounced search handler
  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);

      // Clear previous timeout
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }

      // Set search term for the store
      setSearchTerm(query);

      // Debounce API call for search
      searchTimeout.current = setTimeout(() => {
        applyFilters();
      }, 500);
    },
    [setSearchTerm]
  );

  // Helper function to build combined query from search and filters
  const buildCombinedQuery = useCallback(() => {
    // Start with the user's text search query
    let combinedQuery = searchQuery.trim();

    // Add selected brand API names to the query
    if (selectedBrands.length > 0) {
      const brandApiNames = selectedBrands
        .map((brandId) => {
          const brand = brands.find((b) => b.id === brandId);
          return brand?.apiName || "";
        })
        .filter(Boolean);

      // Add each brand API name to the query
      brandApiNames.forEach((apiName) => {
        combinedQuery += combinedQuery ? ` ${apiName}` : apiName;
      });
    }

    // Add volume values based on selected formats
    if (selectedFormats.length > 0) {
      selectedFormats.forEach((formatId) => {
        const format = formats.find((f) => f.id === formatId);
        if (!format) return;

        let formatKeywords = "";
        switch (formatId) {
          case "petit":
            formatKeywords = "0.33L 0.5L 0.75L";
            break;
          case "moyen":
            formatKeywords = "1L 1.5L";
            break;
          case "grand":
            formatKeywords = "2L 3L 4L";
            break;
          case "fontaines":
            formatKeywords = "5L 6L";
            break;
        }

        if (formatKeywords) {
          combinedQuery += combinedQuery
            ? ` ${formatKeywords}`
            : formatKeywords;
        }
      });
    }

    return combinedQuery;
  }, [searchQuery, selectedBrands, selectedFormats]);

  // Updated applyFilters function
  const applyFilters = useCallback(() => {
    // Clear any pending filter timeout
    if (filterTimeout.current) {
      clearTimeout(filterTimeout.current);
    }

    setIsFiltersPending(true);

    const combinedQuery = buildCombinedQuery();

    // Call fetchProducts with page 0 and the combined query
    fetchProducts({
      page: 0, // Reset to first page when filters change
      size: pagination?.size || 10,
      orderBy: "id",
      order: "ASC",
      ...(combinedQuery ? { query: combinedQuery } : {}),
    }).finally(() => {
      setIsFiltersPending(false);
    });
  }, [fetchProducts, pagination?.size, buildCombinedQuery]);

  // Toggle brand filter
  // Just the essential fix for toggleBrand
  const toggleBrand = useCallback(
    (brandId: string) => {
      // Update selected brands
      setSelectedBrands((prev) => {
        const newSelectedBrands = prev.includes(brandId)
          ? prev.filter((id) => id !== brandId)
          : [...prev, brandId];

        // Build the query based on the NEW selection (not the old state)
        let finalQuery = searchQuery.trim();

        if (newSelectedBrands.length > 0) {
          const brandApiNames = newSelectedBrands
            .map((id) => {
              const brand = brands.find((b) => b.id === id);
              return brand?.apiName || "";
            })
            .filter(Boolean);

          if (brandApiNames.length > 0) {
            finalQuery = brandApiNames.join(" ");
          }
        }

        // IMPORTANT: Always call fetchProducts with query parameter
        // This ensures it makes a request even when no brands are selected
        setTimeout(() => {
          fetchProducts({
            page: 0,
            size: pagination?.size || 10,
            orderBy: "id",
            order: "ASC",
            query: finalQuery, // Include even if empty!
          });
        }, 10);

        return newSelectedBrands;
      });
    },
    [fetchProducts, pagination?.size, searchQuery]
  );
  useEffect(() => {
    // This effect runs whenever selectedBrands changes

    // Don't run on component mount
    if (selectedBrands.length === 0 && !isFiltersPending) {
      return;
    }

    // Build the query from the selected brands
    let query = searchQuery.trim();

    if (selectedBrands.length > 0) {
      const brandQueries = selectedBrands
        .map((id) => {
          const brand = brands.find((b) => b.id === id);
          return brand?.apiName || "";
        })
        .filter(Boolean);

      if (brandQueries.length > 0) {
        query = brandQueries.join(" ");
      }
    }

    console.log("Brand selection changed, new query:", query);

    // Apply filter with debounce
    if (filterTimeout.current) {
      clearTimeout(filterTimeout.current);
    }

    setIsFiltersPending(true);

    filterTimeout.current = setTimeout(() => {
      fetchProducts({
        page: 0,
        size: pagination?.size || 10,
        orderBy: "id",
        order: "ASC",
        query: query,
      }).finally(() => {
        setIsFiltersPending(false);
      });
    }, 100);
  }, [selectedBrands, searchQuery, fetchProducts, pagination?.size]);
  // Toggle format filter
  const toggleFormat = useCallback(
    (formatId: string) => {
      setSelectedFormats((prev) =>
        prev.includes(formatId)
          ? prev.filter((id) => id !== formatId)
          : [...prev, formatId]
      );

      // Slight delay to ensure state has updated
      setTimeout(applyFilters, 10);
    },
    [applyFilters]
  );

  // Filter products based on selected filters
  const filterProducts = useCallback(() => {
    if (!products || products.length === 0) {
      return [];
    }

    // Create a brand mapping from ID to API name
    const brandMapping = brands.reduce((acc, brand) => {
      acc[brand.id] = brand.apiName;
      return acc;
    }, {} as Record<string, string>);

    // Start with all products
    let filtered = [...products];

    // Filter by brand
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.some(
          (brandId) => product.brand === brandMapping[brandId]
        )
      );
    }

    // Filter by format (based on volume or description)
    if (selectedFormats.length > 0) {
      filtered = filtered.filter((product) => {
        // Try to get volume from volume field first
        let volume = product.volume ? parseFloat(product.volume) : null;

        // If no volume field, try to extract from description
        if (volume === null || isNaN(volume)) {
          volume =
            extractVolumeFromDescription(product.detailedDescriptionFrench) ||
            extractVolumeFromDescription(product.lightDescriptionFrench);
        }

        // If still no volume, we can't determine format
        if (volume === null || isNaN(volume)) return false;

        return selectedFormats.some((formatId) => {
          const format = formats.find((f) => f.id === formatId);
          if (!format) return false;

          return (
            volume !== null && volume >= format.min && volume <= format.max
          );
        });
      });
    }

    return filtered;
  }, [products, selectedBrands, selectedFormats]);

  // Update filtered products when filters or products change
  useEffect(() => {
    setFilteredProducts(filterProducts());
  }, [filterProducts, products]);

  useEffect(() => {
    // Listen for the custom event fired when a product is added to cart
    const handleProductAdded = (event: any) => {
      const { notificationInfo } = event.detail;

      if (notificationInfo) {
        setNotification({
          message: notificationInfo.message,
          visible: true,
          image: notificationInfo.image,
          quantity: notificationInfo.quantity,
        });
      }
    };

    window.addEventListener("productAddedToCart", handleProductAdded);

    // Clean up the event listener
    return () => {
      window.removeEventListener("productAddedToCart", handleProductAdded);
    };
  }, []);

  // Handle adding product to cart
  const handleAddToCart = useCallback(
    (product: Product) => {
      // Get the name and description
      const name =
        product.nameFrench ||
        product.nameEnglish ||
        product.nameArabic ||
        "Produit";

      const description =
        product.lightDescriptionFrench || product.lightDescriptionEnglish || "";

      // Get image source
      const getImageSrc = () => {
        if (!product.images || product.images.length === 0) {
          return fallbackImage;
        }

        const image = product.images[0];
        return image.content
          ? `data:image/jpeg;base64,${image.content}`
          : fallbackImage;
      };

      // Add to cart
      addToCart({
        id: product.id.toString(),
        name: name,
        price: product.price,
        image: getImageSrc(),
        pack: description,
        quantity: 1,
      });

      // Set notification to visible
      setNotification({
        message: `${name} ajouté au panier`,
        visible: true,
        image: getImageSrc(),
        quantity: 1,
      });

      // Add this code: Hide notification after 3 seconds
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, visible: false }));
      }, 3000);
    },
    [addToCart]
  );

  // Check if product is in cart
  const checkIfInCart = useCallback(
    (productId: string | number) => {
      return hasItem(productId);
    },
    [hasItem]
  );

  // Render Product Content
  const renderContent = () => {
    if (isLoading) {
      return (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Chargement des produits...</p>
        </motion.div>
      );
    }

    if (error) {
      return (
        <motion.div
          className="text-center py-12 bg-white rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-red-500 mb-4">Une erreur est survenue: {error}</p>
          <button
            onClick={() => fetchProducts()}
            className="bg-[#0F67B1] hover:bg-blue-600 text-white py-2 px-6 rounded-full"
          >
            Réessayer
          </button>
        </motion.div>
      );
    }

    if (filteredProducts.length === 0) {
      return (
        <motion.div
          className="text-center py-12 bg-white rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-gray-500 mb-4">
            Aucun produit ne correspond à votre recherche.
          </p>
          <button
            onClick={resetFilters}
            className="bg-[#0F67B1] hover:bg-blue-600 text-white py-2 px-6 rounded-full"
          >
            Réinitialiser les filtres
          </button>
        </motion.div>
      );
    }

    return (
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
    );
  };

  // Render Pagination
  const renderPagination = () => {
    if (!pagination || pagination.totalPages <= 1) return null;

    // Use number instead of page based on your API response
    const currentPage = pagination.number !== undefined ? pagination.number : 0;

    return (
      <div className="flex justify-center mt-12 mb-8">
        <div className="flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-full">
          {/* First page button */}
          <button
            onClick={() => handlePageChange(0)}
            disabled={currentPage === 0}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${
              currentPage === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:bg-blue-50"
            }`}
            aria-label="First page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>

          {/* Previous page button */}
          <button
            onClick={() => currentPage > 0 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${
              currentPage === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:bg-blue-50"
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-200 mx-1"></div>

          {/* Page numbers */}
          <div className="flex gap-1 items-center">
            {Array.from({ length: pagination.totalPages }, (_, i) => {
              // Show limited pages for better UX
              const isCurrentPage = currentPage === i;

              if (
                pagination.totalPages <= 7 || // Show all if 7 or fewer pages
                i === 0 || // Always show first page
                i === pagination.totalPages - 1 || // Always show last page
                (i >= currentPage - 1 && i <= currentPage + 1) // Show current page and neighbors
              ) {
                return (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
                      isCurrentPage
                        ? "bg-[#0F67B1] text-white font-bold shadow-sm"
                        : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              }

              // Show ellipsis (but only once per gap)
              if (i === 1 && currentPage > 3) {
                return (
                  <span key={`start-ellipsis`} className="px-1">
                    ...
                  </span>
                );
              }

              if (
                i === pagination.totalPages - 2 &&
                currentPage < pagination.totalPages - 4
              ) {
                return (
                  <span key={`end-ellipsis`} className="px-1">
                    ...
                  </span>
                );
              }

              return null;
            })}
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-200 mx-1"></div>

          {/* Next page button */}
          <button
            onClick={() =>
              currentPage < pagination.totalPages - 1 &&
              handlePageChange(currentPage + 1)
            }
            disabled={currentPage >= pagination.totalPages - 1}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${
              currentPage >= pagination.totalPages - 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:bg-blue-50"
            }`}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Last page button */}
          <button
            onClick={() => handlePageChange(pagination.totalPages - 1)}
            disabled={currentPage >= pagination.totalPages - 1}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${
              currentPage >= pagination.totalPages - 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:bg-blue-50"
            }`}
            aria-label="Last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  // MAIN COMPONENT RETURN
  return (
    <motion.div
      className="min-h-screen"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
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
                onChange={(e) => handleSearch(e.target.value)}
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
              setIsMobileFiltersOpen(false);
              applyFilters();
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
              setIsMobileFiltersOpen(false);
              applyFilters();
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

            {/* Render Products or Loading/Error State */}
            {renderContent()}

            {/* Pagination */}
            {!isLoading &&
              !error &&
              filteredProducts.length > 0 &&
              renderPagination()}
          </motion.div>
        </div>
      </div>
      <CartNotification
        message={notification.message}
        visible={notification.visible}
        image={notification.image}
        quantity={notification.quantity}
        onClose={() => setNotification((prev) => ({ ...prev, visible: false }))}
      />
    </motion.div>
  );
};

export default ProductsPage;
