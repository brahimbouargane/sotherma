// import saisFrame from "../../assets/images/category/frame-sais.png";
// import { motion, AnimatePresence } from "framer-motion";
// import product1 from "../../assets/images/poducts/product-1.png";
// import product2 from "../../assets/images/poducts/product-2.png";
// import product3 from "../../assets/images/poducts/product-3.png";
// import product4 from "../../assets/images/poducts/product-4.png";
// import { useEffect, useState } from "react";
// import { useCart } from "../../features/cart/hooks/useCart";

// // Product type definition
// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   brand: string;
//   price: number;
//   format: string;
//   featured: boolean;
//   new: boolean;
//   image: string;
// }

// const container = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const item = {
//   hidden: { opacity: 0, y: 20 },
//   show: { opacity: 1, y: 0 },
// };

// // Product Item Component - Extracted for proper state management per item
// const ProductItem = ({
//   product,
//   onAddToCart,
// }: {
//   product: Product;
//   onAddToCart: (product: Product) => void;
// }) => {
//   const [showAdded, setShowAdded] = useState(false);

//   const addProductToCart = () => {
//     onAddToCart(product);
//     setShowAdded(true);

//     // Reset after 1 second
//     setTimeout(() => {
//       setShowAdded(false);
//     }, 1000);
//   };

//   return (
//     <motion.div
//       className="rounded-lg p-3 md:p-4 flex flex-col items-center h-full"
//       variants={item}
//     >
//       {/* Product Image */}
//       <div className="relative w-full flex justify-center">
//         <img
//           src={product.image || "/placeholder.svg"}
//           alt={product.name}
//           className="h-auto max-h-[280px] md:max-h-[380px] object-cover object-center rounded-md"
//         />
//       </div>

//       {/* Product Name & Description */}
//       <div className="flex-1 text-center font-sans mt-6 md:mt-10">
//         <h3 className="text-blue-700 font-semibold text-sm md:text-base uppercase">
//           {product.name}
//         </h3>
//         <p className="text-gray-500 text-xs mt-1">{product.description}</p>
//       </div>

//       {/* Price & Add Button */}
//       <div className="w-full mt-auto text-center">
//         <p className="text-gray-900 font-medium mb-3 md:mb-4 text-base md:text-lg">
//           {product.price.toFixed(2)} <span className="text-xs">DH</span>
//         </p>
//         <button
//           onClick={addProductToCart}
//           className={`w-full md:w-2/5 cursor-pointer ${
//             showAdded
//               ? "bg-green-500 hover:bg-green-600"
//               : "bg-blue-500 hover:bg-blue-600"
//           } text-white text-xs md:text-base py-1.5 md:py-2 px-0 rounded-full transition-colors duration-300`}
//         >
//           {showAdded ? "Ajouté ✓" : "Ajouter"}
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// const FeaturedProducts = () => {
//   // State to track screen size
//   const [isMobile, setIsMobile] = useState<boolean>(false);

//   // Get cart functions from our hook
//   const { addToCart, items } = useCart();

//   // State for notification
//   const [notification, setNotification] = useState<{
//     message: string;
//     visible: boolean;
//   }>({
//     message: "",
//     visible: false,
//   });

//   // Check if we're on mobile view
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768); // Set breakpoint to md (768px)
//     };

//     // Initial check
//     checkScreenSize();

//     // Add listener for window resize
//     window.addEventListener("resize", checkScreenSize);

//     // Cleanup
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   const displayedProducts = isMobile ? products.slice(0, 3) : products;

//   // Function to handle adding product to cart
//   const handleAddToCart = (product: Product) => {
//     console.log("Adding product to cart:", product);

//     // Convert the Product to CartItem format
//     addToCart({
//       id: product.id.toString(),
//       name: product.name,
//       price: product.price,
//       image: product.image,
//       pack: product.description || "",
//       quantity: 1,
//     });

//     // Verify the cart after adding
//     console.log("Cart after adding:", items);

//     // Show notification
//     setNotification({
//       message: `${product.name} ajouté au panier`,
//       visible: true,
//     });

//     // Hide notification after 3 seconds
//     setTimeout(() => {
//       setNotification((prev) => ({ ...prev, visible: false }));
//     }, 3000);
//   };

//   return (
//     <section className="py-12 relative">
//       {/* Notification Toast */}
//       <AnimatePresence>
//         {notification.visible && (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 50 }}
//             className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 mr-2"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             {notification.message}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="mx-auto">
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Featured Product - Hidden on mobile */}
//           <motion.div
//             className="hidden md:block relative rounded-3xl overflow-hidden bg-blue-50 aspect-[3/4]"
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//           >
//             <img
//               src={saisFrame}
//               alt="Featured product"
//               className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
//             />
//           </motion.div>

//           {/* Products Grid - 3 columns on mobile, 4 on desktop */}
//           <motion.div
//             className="w-full md:w-3/4 grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 mx-auto"
//             variants={container}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//           >
//             {displayedProducts.map((product) => (
//               <ProductItem
//                 key={product.id}
//                 product={product}
//                 onAddToCart={handleAddToCart}
//               />
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedProducts;

// // Sample products based on the design
// const products: Product[] = [
//   {
//     id: 1,
//     name: "AÏN SAÏSS 0,33L",
//     description: "PACK 12 / 33CL",
//     brand: "Ain Saiss",
//     price: 15.99,
//     format: "Petit format",
//     featured: true,
//     new: false,
//     image: product1,
//   },
//   {
//     id: 2,
//     name: "AÏN SAÏSS BULLES PREMIUM 0,75L",
//     description: "PACK 12 / 0.75L",
//     brand: "Ain Saiss",
//     price: 18.99,
//     format: "Moyen format",
//     featured: true,
//     new: true,
//     image: product2,
//   },
//   {
//     id: 3,
//     name: "AÏN SAÏSS - PREMIUM 0,5L",
//     description: "PACK 20 / 0.5L",
//     brand: "Ghayt",
//     price: 12.5,
//     format: "Petit format",
//     featured: false,
//     new: false,
//     image: product3,
//   },
//   {
//     id: 4,
//     name: "AÏN SAÏSS BULLES 1L",
//     description: "PACK 6 / 1L",
//     brand: "Sidi Hrazam",
//     price: 21.99,
//     format: "Moyen format",
//     featured: false,
//     new: true,
//     image: product4,
//   },
// ];

import saisFrame from "../../assets/images/category/frame-sais.png";
import { motion, AnimatePresence } from "framer-motion";
import product1 from "../../assets/images/poducts/product-1.png";
import product2 from "../../assets/images/poducts/product-2.png";
import product3 from "../../assets/images/poducts/product-3.png";
import product4 from "../../assets/images/poducts/product-4.png";
import { useEffect, useState } from "react";
import { useCart } from "../../features/cart/hooks/useCart";

// Product type definition
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

// Animation variants
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

// Product Item Component - Extracted for proper state management per item
const ProductItem = ({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (product: Product) => void;
}) => {
  const [showAdded, setShowAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const addProductToCart = () => {
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
      className="rounded-3xl p-3 md:p-4 flex flex-col items-center h-full  hover:shadow-md transition-shadow duration-300"
      variants={item}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Product Image with animation */}
      <div className="relative w-full flex justify-center overflow-hidden rounded-md">
        <motion.img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-auto max-h-[280px] md:max-h-[380px] object-cover object-center"
          variants={imageVariants}
          animate={isHovered ? "hover" : "idle"}
        />

        {/* New badge if product is new */}
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

      {/* Product Name & Description */}
      <div className="flex-1 text-center font-sans mt-6 md:mt-10">
        <motion.h3
          className="text-blue-700 font-semibold text-sm md:text-base uppercase"
          animate={isHovered ? { color: "#1d4ed8" } : { color: "#1e40af" }}
          transition={{ duration: 0.3 }}
        >
          {product.name}
        </motion.h3>
        <p className="text-gray-500 text-xs mt-1">{product.description}</p>
      </div>

      {/* Price & Add Button */}
      <div className="w-full mt-auto text-center">
        <p className="text-gray-900 font-medium mb-3 md:mb-4 text-base md:text-lg">
          {product.price.toFixed(2)} <span className="text-xs">DH</span>
        </p>

        {/* Animated button */}
        <motion.button
          onClick={addProductToCart}
          className="w-full md:w-2/5 cursor-pointer text-white text-xs md:text-base py-1.5 md:py-2 px-0 rounded-full"
          initial={{ backgroundColor: "#3b82f6" }} // bg-blue-500
          variants={buttonVariants}
          animate={showAdded ? "added" : "idle"}
          whileHover="hover"
          whileTap="tap"
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
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    damping: 10,
                    stiffness: 300,
                    delay: 0.1,
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </motion.svg>
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
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                  transition={{
                    repeat: isHovered ? Infinity : 0,
                    repeatDelay: 1,
                    duration: 0.5,
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </motion.svg>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};

const FeaturedProducts = () => {
  // State to track screen size
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Get cart functions from our hook
  const { addToCart, items } = useCart();

  // State for notification
  const [notification, setNotification] = useState<{
    message: string;
    visible: boolean;
  }>({
    message: "",
    visible: false,
  });

  // Check if we're on mobile view
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Set breakpoint to md (768px)
    };

    // Initial check
    checkScreenSize();

    // Add listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const displayedProducts = isMobile ? products.slice(0, 3) : products;

  // Function to handle adding product to cart
  const handleAddToCart = (product: Product) => {
    console.log("Adding product to cart:", product);

    // Convert the Product to CartItem format
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      pack: product.description || "",
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

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    in: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
    out: { opacity: 0 },
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

  return (
    <motion.section
      className="py-12 relative"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      {/* Notification Toast */}
      <AnimatePresence>
        {notification.visible && (
          <motion.div
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center"
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

      <div className="mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Featured Product - Hidden on mobile */}
          <motion.div
            className="hidden md:block relative rounded-3xl overflow-hidden bg-blue-50 aspect-[3/4]"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.2,
            }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={saisFrame}
              alt="Featured product"
              className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
            />
          </motion.div>

          {/* Products Grid - 3 columns on mobile, 4 on desktop */}
          <motion.div
            className="w-full md:w-3/4 grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 mx-auto"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {displayedProducts.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedProducts;

// Sample products based on the design
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
];
