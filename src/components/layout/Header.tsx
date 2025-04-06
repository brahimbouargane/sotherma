import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useCart } from "../../features/cart/hooks/useCart";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItemsCount } = useCart();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/src/assets/images/logo.svg"
              alt="Saiss Logo"
              className="h-10"
            />
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/products"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Nos Produits
            </Link>
            <Link
              to="/products/category/large-bottles"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Catégories
            </Link>
            <Link
              to="/blog"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Nos Actualités
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              À propos
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
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
            </Link>

            {/* Login / Sign Up */}
            <div className="hidden md:block">
              <Link
                to="/login"
                className="text-sm text-primary hover:text-primary-dark transition-colors"
              >
                Log in / Sign up
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
                className="h-6 w-6 text-gray-700"
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
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Nos Produits
              </Link>
              <Link
                to="/products/category/large-bottles"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Catégories
              </Link>
              <Link
                to="/blog"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Nos Actualités
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                À propos
              </Link>
              <Link
                to="/login"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                Log in / Sign up
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
