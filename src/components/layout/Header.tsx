import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useCart } from "../../features/cart/hooks/useCart";
import logo from "../../assets/images/brands/LogoAS.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItemsCount } = useCart();

  return (
    <header className=" ">
      <div className="mx-auto  py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Saiss Logo" className="h-16" />
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8 ml-28 ">
            <Link
              to="/produits"
              className="text-lg text-[#37AFE1] hover:text-blue-800 font-normal transition-colors"
            >
              Nos Produits
            </Link>
            <Link
              to="/abonnement"
              className=" text-lg text-[#37AFE1] hover:text-blue-800 font-normal transition-colors"
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
            <div className="relative p-2 cursor-pointer">
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
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
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

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#37AFE1]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/products"
                className="text-[#37AFE1] hover:text-primary transition-colors"
              >
                Nos Produits
              </Link>
              <Link
                to="/products/category/large-bottles"
                className="text-[#37AFE1] hover:text-primary transition-colors"
              >
                Catégories
              </Link>
              <Link
                to="/blog"
                className="text-[#37AFE1] hover:text-primary transition-colors"
              >
                Nos Actualités
              </Link>
              <Link
                to="/about"
                className="text-[#37AFE1] hover:text-primary transition-colors"
              >
                À propos
              </Link>
              <Link
                to="/login"
                className="text-[#37AFE1] hover:text-[#37AFE1]-dark transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="text-[#37AFE1] hover:text-[#37AFE1]-dark transition-colors"
              >
                Sign up
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
