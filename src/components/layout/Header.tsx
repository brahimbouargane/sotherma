import { useEffect, useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/brands/LogoAS.png";
import CartDropdown from "../../features/cart/components/cartDropDown";
import { useCartStore } from "../../store/cartStore";
import {
  Menu,
  X,
  ShoppingCart,
  Package,
  Bell,
  Mail,
  User,
  LogOut,
} from "lucide-react";
import authService from "../../lib/api/client";
import { useAuthStore } from "../../store/authStore";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const [isAnimating, setIsAnimating] = useState(false);
  const cartIconRef = useRef(null);
  const [cartCount, setCartCount] = useState(0);

  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const headerRef = useRef(null);

  //api
  const { isAuthenticated, user, customer, logout } = useAuthStore();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  ///api
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    // Optional: Redirect to home page
    // window.location.href = '/';
  };

  // Calculate cart count whenever items change
  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  // Listen for product added to cart event
  useEffect(() => {
    const handleProductAdded = () => {
      // Trigger animation when product is added
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 800);
    };

    window.addEventListener("productAddedToCart", handleProductAdded);
    return () => {
      window.removeEventListener("productAddedToCart", handleProductAdded);
    };
  }, []);

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
      // Save the current scroll position
      const scrollY = window.scrollY;

      // Apply fixed positioning without changing the visual position
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // Get the scroll position from the body's top position
      const scrollY = document.body.style.top
        ? parseInt(document.body.style.top || "0", 10) * -1
        : 0;

      // Restore normal positioning and scrolling
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      // Restore scroll position
      window.scrollTo(0, scrollY);
    }

    // Cleanup function
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
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
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20,
      },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        type: "tween",
      },
    },
    productAdded: {
      // Using tween for color and scale animations with multiple keyframes
      scale: [1, 1.6, 1],
      backgroundColor: ["#0F67B1", "#22c55e", "#0F67B1"],
      transition: {
        duration: 0.5,
        times: [0, 0.5, 1],
        type: "tween", // Explicitly set to tween
      },
    },
  };
  const rippleVariants = {
    initial: {
      boxShadow: "0 0 0 0 rgba(15, 103, 177, 0.4)",
    },
    animate: {
      boxShadow: "0 0 0 8px rgba(15, 103, 177, 0)",
      transition: {
        duration: 0.8,
        type: "tween", // Use tween for box-shadow
        ease: "easeOut",
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

  // Enhanced animation variants
  const cartIconVariants = {
    initial: { rotate: 0 },
    hover: {
      rotate: [-10, 10, -5, 5, 0], // Multi-keyframe animation
      transition: {
        duration: 0.5,
        type: "tween", // Explicitly set to tween, not spring
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    productAdded: {
      // For multi-keyframe animations, use tween
      rotate: [-10, 10, -5, 5, 0],
      scale: [1, 1.2, 1.1, 1],
      transition: {
        duration: 0.8,
        times: [0, 0.3, 0.6, 1],
        type: "tween", // Using tween for multiple keyframes
        ease: "easeInOut",
      },
    },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
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
          <nav className="hidden lg:flex items-center space-x-8 ml-40">
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
                  className="text-lg text-primary-default hover:text-blue-800 font-normal transition-colors relative group"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {/* Cart Icon */}
            {/* <motion.div
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
                <ShoppingCart className="h-6 w-6 text-primary-default hover:text-blue-800 transition-colors" />

                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.div
                      className="absolute gap-2 -top-0 -right-0 bg-primary-default text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full px-1 font-bold z-10"
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
            </motion.div> */}

            <motion.div
              className="relative"
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <motion.button
                className="p-2 cursor-pointer relative cart-icon-target"
                onClick={() => setIsCartOpen(!isCartOpen)}
                aria-label={`Shopping cart with ${cartCount} items`}
                variants={cartIconVariants}
                initial="initial"
                animate={isAnimating ? "productAdded" : "initial"}
                whileHover="hover"
                whileTap="tap"
                ref={cartIconRef}
              >
                <ShoppingCart className="h-6 w-6 text-primary-default hover:text-blue-800 transition-colors" />

                {/* Cart count badge with enhanced animation */}
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.div
                      className="absolute gap-2 -top-0 -right-0 bg-primary-default text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full px-1 font-bold z-10"
                      variants={cartBadgeVariants}
                      initial="initial"
                      animate={isAnimating ? "productAdded" : "animate"}
                      exit="exit"
                      key="cart-badge"
                    >
                      {cartCount}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Ripple effect when product added */}
                <AnimatePresence>
                  {isAnimating && (
                    <motion.div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      variants={rippleVariants}
                      initial="initial"
                      animate="animate"
                      exit="initial"
                    />
                  )}
                </AnimatePresence>
              </motion.button>

              <CartDropdown
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
              />
            </motion.div>
            {isAuthenticated ? (
              // Logged in - User profile menu
              <div className="relative" ref={profileMenuRef}>
                <motion.button
                  className="flex items-center p-2"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 lg:mr-2 bg-blue-100 rounded-full flex items-center justify-center text-primary-default">
                    {customer?.firstName?.[0] || user?.firstName?.[0] || (
                      <User className="h-5 w-5" />
                    )}
                  </div>
                  <span className="hidden lg:block text-primary-default">
                    {authService.getUserDisplayName()}
                  </span>
                </motion.button>

                {/* Profile dropdown menu */}
                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Link
                        to="/account"
                        className="block px-4 py-2 text-primary-default hover:bg-blue-50 transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Mon compte
                      </Link>
                      <Link
                        to="/account/orders"
                        className="block px-4 py-2 text-primary-default hover:bg-blue-50 transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Mes commandes
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full cursor-pointer text-left px-4 py-2 text-red-500 hover:bg-red-50 transition-colors flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Déconnexion
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // Not logged in - Login/Signup links (your existing code)
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
                    className="text-lg text-primary-default hover:text-blue-800 font-normal transition-colors"
                  >
                    Se connecter
                  </Link>
                </motion.div>

                <motion.span
                  className="text-primary-default"
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
                    className="text-lg text-primary-default hover:text-blue-800 font-normal transition-colors"
                  >
                    S'inscrire
                  </Link>
                </motion.div>
              </div>
            )}

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
                    <X className="w-6 h-6 text-primary-default" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-primary-default" />
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
                      className="text-xl text-primary-default hover:text-blue-800 font-medium transition-all hover:scale-102 flex items-center group"
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
                        <Package className="h-5 w-5 text-primary-default" />
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
                      className="text-xl text-primary-default hover:text-blue-800 font-medium transition-all hover:scale-102 flex items-center group"
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
                        <Bell className="h-5 w-5 text-primary-default" />
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
                      className="text-xl text-primary-default hover:text-blue-800 transition-all hover:scale-102 font-medium flex items-center group"
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
                        <Mail className="h-5 w-5 text-primary-default" />
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
                  {isAuthenticated ? (
                    // User is logged in - Account and Logout buttons
                    <motion.div
                      className="flex flex-col gap-6 space-x-2 mt-4"
                      variants={mobileNavItemVariants}
                    >
                      <Link
                        to="/account"
                        className="flex items-center text-xl text-primary-default hover:text-blue-800 transition-all hover:scale-102 font-medium"
                        onClick={() => {
                          setIsMenuOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        <motion.div
                          className="mr-3 bg-blue-50 p-2 rounded-full"
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "#37AFE1",
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <User className="h-5 w-5 text-primary-default" />
                        </motion.div>
                        <span className="relative">Mon compte</span>
                      </Link>

                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="flex cursor-pointer items-center text-xl text-red-500 hover:text-red-600 transition-all hover:scale-102 font-medium"
                      >
                        <motion.div
                          className="mr-3 bg-red-50 p-2 rounded-full"
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "#FEE2E2",
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <LogOut className="h-5 w-5 text-red-500" />
                        </motion.div>
                        <span className="relative">Déconnexion</span>
                      </button>
                    </motion.div>
                  ) : (
                    // Your existing login/signup buttons for mobile
                    <motion.div
                      className="flex space-x-2 mt-4"
                      variants={mobileNavItemVariants}
                    >
                      <motion.div
                        className="flex-1"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to="/login"
                          className="w-full block bg-white border border-primary-default text-primary-default hover:bg-[#37AFE1] hover:text-white transition-colors duration-300 py-3 rounded-full text-center font-medium"
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
                  )}
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
