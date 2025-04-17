// import { useEffect, useState } from "react";
// import { Link } from "@tanstack/react-router";
// import logo from "../../assets/images/brands/LogoAS.png";
// import CartDropdown from "../../features/cart/components/cartDropDown";
// import { useCartStore } from "../../features/cart/cartStore";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const cartItems = useCartStore((state) => state.items);
//   const [cartCount, setCartCount] = useState(0);

//   // Calculate cart count whenever items change
//   useEffect(() => {
//     const count = cartItems.reduce((total, item) => total + item.quantity, 0);
//     setCartCount(count);
//   }, [cartItems]);

//   return (
//     <header className=" ">
//       <div className="mx-auto  py-2">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <Link to="/" className="flex items-center">
//             <img src={logo} alt="Saiss Logo" className="h-16" />
//           </Link>

//           {/* Navigation - Desktop */}
//           <nav className="hidden lg:flex items-center space-x-8 ml-28 ">
//             <Link
//               to="/produits"
//               className="text-lg text-[#37AFE1] hover:text-blue-800 font-normal transition-colors"
//             >
//               Nos Produits
//             </Link>
//             <Link
//               to="/abonnement"
//               className=" text-lg text-[#37AFE1] hover:text-blue-800 font-normal transition-colors"
//             >
//               Abonnement
//             </Link>
//             <Link
//               to="/contact"
//               className="text-lg text-[#37AFE1] hover:text-blue-800 font-normal transition-colors"
//             >
//               Nous Contacter
//             </Link>
//           </nav>

//           {/* User Actions */}
//           <div className="flex items-center space-x-4">
//             {/* Cart Icon */}
//             <div className="relative">
//               <button
//                 className="p-2 cursor-pointer relative"
//                 onClick={() => setIsCartOpen(!isCartOpen)}
//                 aria-label={`Shopping cart with ${cartCount} items`}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 text-[#37AFE1] hover:text-blue-800 transition-colors"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                   />
//                 </svg>

//                 {/* Cart count badge - always visible for debugging */}
//                 <div
//                   className="absolute -top-0 -right-0 bg-[#37AFE1] text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full px-1 font-bold z-10"
//                   style={{ display: cartCount > 0 ? "flex" : "none" }}
//                 >
//                   {cartCount}
//                 </div>
//               </button>

//               <CartDropdown
//                 isOpen={isCartOpen}
//                 onClose={() => setIsCartOpen(false)}
//               />
//             </div>
//             {/* Login / Sign Up */}
//             <div className="hidden md:flex items-center space-x-3">
//               <Link
//                 to="/login"
//                 className="text-lg text-[#37AFE1] hover:text-blue-800 font-normal transition-colors"
//               >
//                 Log in
//               </Link>
//               <span className="text-[#37AFE1]">/</span>
//               <Link
//                 to="/signup"
//                 className="text-lg text-[#37AFE1] hover:text-blue-800 font-normal transition-colors"
//               >
//                 Sign up
//               </Link>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               type="button"
//               className="md:hidden p-2"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6 text-[#37AFE1]"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <nav className="lg:hidden mt-4 pb-4">
//             <div className="flex flex-col space-y-4">
//               <Link
//                 to="/produits"
//                 className="text-[#37AFE1] hover:text-primary transition-colors"
//               >
//                 Nos Produits
//               </Link>
//               <Link
//                 to="/abonnement"
//                 className="text-[#37AFE1] hover:text-primary transition-colors"
//               >
//                 Abonnement
//               </Link>
//               <Link
//                 to="/blog"
//                 className="text-[#37AFE1] hover:text-primary transition-colors"
//               >
//                 Nos Actualités
//               </Link>
//               <Link
//                 to="/contact"
//                 className="text-[#37AFE1] hover:text-primary transition-colors"
//               >
//                 Contact
//               </Link>
//               <Link
//                 to="/login"
//                 className="text-[#37AFE1] hover:text-[#37AFE1]-dark transition-colors"
//               >
//                 Log in
//               </Link>
//               <Link
//                 to="/signup"
//                 className="text-[#37AFE1] hover:text-[#37AFE1]-dark transition-colors"
//               >
//                 Sign up
//               </Link>
//             </div>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import logo from "../../assets/images/brands/LogoAS.png";
import CartDropdown from "../../features/cart/components/cartDropDown";
import { useCartStore } from "../../features/cart/cartStore";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const [cartCount, setCartCount] = useState(0);

  // Calculate cart count whenever items change
  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <header className="">
      <div className="mx-auto py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Saiss Logo" className="h-16" />
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8 ml-28">
            <Link
              to="/produits"
              className="text-lg text-[#37AFE1] hover:text-blue-800 font-normal transition-colors"
            >
              Nos Produits
            </Link>
            <Link
              to="/abonnement"
              className="text-lg text-[#37AFE1] hover:text-blue-800 font-normal transition-colors"
            >
              Abonnement
            </Link>
            <Link
              to="/contact"
              className="text-lg text-[#37AFE1] hover:text-blue-800 font-normal transition-colors"
            >
              Nous Contacter
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <div className="relative">
              <button
                className="p-2 cursor-pointer relative"
                onClick={() => setIsCartOpen(!isCartOpen)}
                aria-label={`Shopping cart with ${cartCount} items`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#37AFE1] hover:text-blue-800 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>

                {/* Cart count badge */}
                <div
                  className="absolute -top-0 -right-0 bg-[#37AFE1] text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full px-1 font-bold z-10"
                  style={{ display: cartCount > 0 ? "flex" : "none" }}
                >
                  {cartCount}
                </div>
              </button>

              <CartDropdown
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
              />
            </div>
            {/* Login / Sign Up */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                to="/login"
                className="text-lg text-[#37AFE1] hover:text-blue-800 font-normal transition-colors"
              >
                Log in
              </Link>
              <span className="text-[#37AFE1]">/</span>
              <Link
                to="/signup"
                className="text-lg text-[#37AFE1] hover:text-blue-800 font-normal transition-colors"
              >
                Sign up
              </Link>
            </div>

            {/* Hamburger/X Button with Animation */}
            <button
              type="button"
              className="md:hidden p-2 z-50 relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-[#37AFE1] transition-all duration-300 ease-in-out" />
              ) : (
                <Menu className="w-6 h-6 text-[#37AFE1] transition-all duration-300 ease-in-out" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu with Animation */}
        <div
          className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } lg:hidden flex flex-col`}
          style={{ paddingTop: "5rem" }}
        >
          <nav className="container mx-auto px-6 py-8">
            <div className="flex flex-col space-y-6">
              <Link
                to="/produits"
                className="text-xl text-[#37AFE1] hover:text-blue-800 font-medium transition-colors transform hover:translate-x-2 transition-transform duration-200 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                Nos Produits
              </Link>
              <div className="w-full h-px bg-gray-100"></div>

              <Link
                to="/abonnement"
                className="text-xl text-[#37AFE1] hover:text-blue-800 font-medium transition-colors transform hover:translate-x-2 transition-transform duration-200 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                Abonnement
              </Link>
              <div className="w-full h-px bg-gray-100"></div>

              <Link
                to="/contact"
                className="text-xl text-[#37AFE1] hover:text-blue-800 font-medium  transform hover:translate-x-2 transition-transform duration-200 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Nous Contacter
              </Link>
              <div className="w-full h-px bg-gray-100"></div>

              <div className="flex space-x-4 mt-4">
                <Link
                  to="/login"
                  className="flex-1 bg-white border border-[#37AFE1] text-[#37AFE1] hover:bg-[#37AFE1] hover:text-white transition-colors duration-300 py-3 rounded-full text-center font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="flex-1 bg-[#37AFE1] text-white hover:bg-blue-600 transition-colors duration-300 py-3 rounded-full text-center font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </nav>

          <div className="mt-auto py-8 px-6 border-t border-gray-100">
            <p className="text-gray-500 text-sm text-center">
              © {new Date().getFullYear()} Saiss. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
