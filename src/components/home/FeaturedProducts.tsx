import saisFrame from "../../assets/images/category/frame-sais.png";
import { motion } from "framer-motion";
import product1 from "../../assets/images/poducts/product-1.png";
import product2 from "../../assets/images/poducts/product-2.png";
import product3 from "../../assets/images/poducts/product-3.png";
import product4 from "../../assets/images/poducts/product-4.png";
import { useEffect, useState } from "react";

// Product type definition
interface Product {
  id: string;
  name: string;
  description?: string;
  image: string;
  price: number;
  discountPrice?: number;
  link: string;
  pack?: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const FeaturedProducts = () => {
  // State to track screen size
  const [isMobile, setIsMobile] = useState<boolean>(false);

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

  return (
    <section className="py-12 ">
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Featured Product - Hidden on mobile */}
          <motion.div
            className="hidden md:block relative rounded-3xl overflow-hidden bg-blue-50 aspect-[3/4]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
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
            viewport={{ once: true }}
          >
            {displayedProducts.map((product) => (
              <motion.div
                key={product.id}
                className="rounded-lg p-3 md:p-4 flex flex-col items-center h-full"
                variants={item}
              >
                {/* Product Image */}
                <div className="relative w-full flex justify-center">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="h-auto max-h-[280px] md:max-h-[380px] object-cover object-center rounded-md"
                  />
                </div>

                {/* Product Name & Description */}
                <div className="flex-1 text-center font-sans mt-6 md:mt-10">
                  <h3 className="text-blue-700 font-semibold text-sm md:text-base uppercase">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">
                    {product.description}
                  </p>
                </div>

                {/* Price & Add Button */}
                <div className="w-full mt-auto text-center">
                  <p className="text-gray-900 font-medium mb-3 md:mb-4 text-base md:text-lg">
                    {product.price.toFixed(2)}{" "}
                    <span className="text-xs">DH</span>
                  </p>
                  <button className="w-full md:w-2/5 cursor-pointer bg-blue-500 text-white hover:bg-primary/75 text-xs md:text-base py-1.5 md:py-2 px-0 rounded-full">
                    Ajouter
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

// Sample products based on the design
const products: Product[] = [
  {
    id: "ain-saiss-1-5l",
    name: "AIN SAISS 1,5L",
    description: "PACK 6 / 1,5L",
    image: product1,
    price: 22.0,
    link: "/products/ain-saiss-1-5l",
  },
  {
    id: "ain-saiss-bleue-premium",
    name: "AIN SAISS BULLES",
    description: "PACK 6 / 0.75L",
    image: product2,
    price: 25.0,
    link: "/products/ain-saiss-bleue-premium",
  },
  {
    id: "ain-saiss-bleue-premium-2",
    name: "AIN SAISS BULLES",
    description: "PACK 6 / 0.75L",
    image: product3,
    price: 22.0,
    link: "/products/ain-saiss-bleue-premium-2",
  },
  {
    id: "ain-saiss-bleue-premium-3",
    name: "AIN SAISS BULLES 1L",
    description: "PACK 6 / 1L",
    image: product4,
    price: 22.0,
    link: "/products/ain-saiss-bleue-premium-3",
  },
];
