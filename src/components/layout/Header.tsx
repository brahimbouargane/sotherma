import { useEffect, useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/brands/LogoAS.png";
import CartDropdown from "../../features/cart/components/cartDropDown";
import { useCartStore } from "../../features/cart/cartStore";
import { Menu, X, ShoppingCart, Package, Bell, Mail } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const headerRef = useRef(null);

  // Calculate cart count whenever items change
  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  // Handle scroll events for header animation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if we've scrolled enough to change header style
      if (currentScrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle body scroll and mobile menu when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Completely disable all scrolling
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "100%";
      document.body.style.height = "100%";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      document.documentElement.style.height = "auto";
      document.body.style.height = "auto";
      document.body.style.position = "static";
      document.body.style.width = "auto";
    }

    return () => {
      // Clean up
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      document.documentElement.style.height = "auto";
      document.body.style.height = "auto";
      document.body.style.position = "static";
      document.body.style.width = "auto";
    };
  }, [isMenuOpen]);

  // Animation variants
  const logoVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: any) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1 * i,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    }),
  };

  const cartBadgeVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20,
      },
    },
    exit: {
      scale: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const mobileNavItemVariants = {
    closed: {
      x: 40,
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const cartIconVariants = {
    initial: { rotate: 0 },
    hover: {
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        duration: 0.5,
      },
    },
    tap: { scale: 0.9 },
  };

  return (
    <motion.header
      ref={headerRef}
      className={`fixed w-full z-40 left-0 transition-all duration-300 py-1 ${
        scrolled ? "shadow-md bg-white" : " bg-none"
      }`}
      initial={{ y: -100 }}
      animate={{
        y: visible ? 0 : -100,
        transition: {
          type: "tween",
          duration: 0.4,
          ease: [0.43, 0.13, 0.23, 0.96],
        },
      }}
    >
      <div className="mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              to="/"
              className="flex items-center"
            >
              <img
                src={logo}
                alt="Saiss Logo"
                className="h-12 lg:h-16 transition-all duration-300 hover:scale-110"
              />
            </Link>
          </motion.div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8 ml-28">
            {["Nos Produits", "Abonnement", "Nous Contacter"].map((item, i) => (
              <motion.div
                key={item}
                custom={i}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  to={
                    item === "Nos Produits"
                      ? "/produits"
                      : item === "Abonnement"
                      ? "/abonnement"
                      : "/contact"
                  }
                  className="text-lg text-[#37AFE1] hover:text-blue-800 font-normal transition-colors relative group"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <motion.div
              className="relative"
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <motion.button
                className="p-2 cursor-pointer relative"
                onClick={() => setIsCartOpen(!isCartOpen)}
                aria-label={`Shopping cart with ${cartCount} items`}
                variants={cartIconVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <ShoppingCart className="h-6 w-6 text-[#37AFE1] hover:text-blue-800 transition-colors" />

                {/* Cart count badge with animation */}
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.div
                      className="absolute -top-0 -right-0 bg-[#37AFE1] text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full px-1 font-bold z-10"
                      variants={cartBadgeVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      key="cart-badge"
                    >
                      {cartCount}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <CartDropdown
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
              />
            </motion.div>

            {/* Login / Sign Up */}
            <div className="hidden lg:flex items-center space-x-3">
              <motion.div
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                custom={4}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  to="/login"
                  className="text-lg text-[#37AFE1] hover:text-blue-800 font-normal transition-colors"
                >
                  Se connecter
                </Link>
              </motion.div>

              <motion.span
                className="text-[#37AFE1]"
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                custom={4.5}
              >
                /
              </motion.span>

              <motion.div
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                custom={5}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  to="/signup"
                  className="text-lg text-[#37AFE1] hover:text-blue-800 font-normal transition-colors"
                >
                  S'inscrire
                </Link>
              </motion.div>
            </div>

            {/* Hamburger/X Button with Animation */}
            <motion.button
              type="button"
              className="lg:hidden p-2 z-50 relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              custom={6}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-[#37AFE1]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-[#37AFE1]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Menu with Animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-white z-40 flex flex-col"
              style={{ paddingTop: "5rem" }}
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <nav className="container mx-auto px-6 py-8">
                <div className="flex flex-col space-y-6">
                  <motion.div variants={mobileNavItemVariants}>
                    <Link
                      to="/produits"
                      className="text-xl text-[#37AFE1] hover:text-blue-800 font-medium transition-all hover:scale-105 flex items-center group"
                      onClick={() => {
                        setIsMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <motion.div
                        className="mr-3 bg-blue-50 p-2 rounded-full"
                        whileHover={{ scale: 1.1, backgroundColor: "#37AFE1" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Package className="h-5 w-5 text-[#37AFE1]" />
                      </motion.div>
                      <span className="relative">
                        Nos Produits
                        <motion.span
                          className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-800"
                          whileHover={{ width: "100%" }}
                        />
                      </span>
                    </Link>
                  </motion.div>

                  <motion.div
                    className="w-full h-px bg-gray-100"
                    variants={mobileNavItemVariants}
                  />

                  <motion.div variants={mobileNavItemVariants}>
                    <Link
                      to="/abonnement"
                      className="text-xl text-[#37AFE1] hover:text-blue-800 font-medium transition-all hover:scale-105 flex items-center group"
                      onClick={() => {
                        setIsMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <motion.div
                        className="mr-3 bg-blue-50 p-2 rounded-full"
                        whileHover={{ scale: 1.1, backgroundColor: "#37AFE1" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Bell className="h-5 w-5 text-[#37AFE1]" />
                      </motion.div>
                      <span className="relative">
                        Abonnement
                        <motion.span
                          className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-800"
                          whileHover={{ width: "100%" }}
                        />
                      </span>
                    </Link>
                  </motion.div>

                  <motion.div
                    className="w-full h-px bg-gray-100"
                    variants={mobileNavItemVariants}
                  />

                  <motion.div variants={mobileNavItemVariants}>
                    <Link
                      to="/contact"
                      className="text-xl text-[#37AFE1] hover:text-blue-800 transition-all hover:scale-105 font-medium flex items-center group"
                      onClick={() => {
                        setIsMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <motion.div
                        className="mr-3 bg-blue-50 p-2 rounded-full"
                        whileHover={{ scale: 1.1, backgroundColor: "#37AFE1" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Mail className="h-5 w-5 text-[#37AFE1]" />
                      </motion.div>
                      <span className="relative">
                        Nous Contacter
                        <motion.span
                          className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-800"
                          whileHover={{ width: "100%" }}
                        />
                      </span>
                    </Link>
                  </motion.div>

                  <motion.div
                    className="w-full h-px bg-gray-100"
                    variants={mobileNavItemVariants}
                  />

                  <motion.div
                    className="flex space-x-4 mt-4"
                    variants={mobileNavItemVariants}
                  >
                    <motion.div
                      className="flex-1"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to="/login"
                        className="w-full block bg-white border border-[#37AFE1] text-[#37AFE1] hover:bg-[#37AFE1] hover:text-white transition-colors duration-300 py-3 rounded-full text-center font-medium"
                        onClick={() => {
                          setIsMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Log in
                      </Link>
                    </motion.div>

                    <motion.div
                      className="flex-1"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to="/signup"
                        className="w-full block bg-[#37AFE1] text-white hover:bg-blue-600 transition-colors duration-300 py-3 rounded-full text-center font-medium"
                        onClick={() => {
                          setIsMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        S'inscrire
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </nav>

              <motion.div
                className="mt-auto py-8 px-6 border-t border-gray-100"
                variants={mobileNavItemVariants}
              >
                <p className="text-gray-500 text-sm text-center">
                  © Copyright 2025. Ain Saiss. Tous les droits sont réservés.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
