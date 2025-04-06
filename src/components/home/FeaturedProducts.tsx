import { useState } from "react";
import { useCart } from "../../features/cart/hooks/useCart";
import { Link } from "@tanstack/react-router";

// Product type definition
interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  discountPrice?: number;
  link: string;
  pack?: string;
}

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    setIsAddingToCart(product.id);

    // Simulate API call or state update
    setTimeout(() => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
      setIsAddingToCart(null);
    }, 500);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Notre sélection</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Feature Product Card */}
          <div className="bg-primary bg-opacity-10 rounded-2xl overflow-hidden shadow-card p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-primary mb-2">
                Notre sélection
              </h3>
              <p className="text-gray-600">
                Découvrez nos produits les plus populaires sélectionnés pour
                vous.
              </p>
            </div>
            <div className="mt-6">
              <img
                src="/src/assets/images/smiling-man.jpg"
                alt="Happy customer with Ain Saiss water"
                className="rounded-xl w-full h-auto"
              />
            </div>
          </div>

          {/* Product Cards */}
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all"
            >
              <Link to={product.link} className="block p-4">
                <div className="h-48 flex items-center justify-center mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="border-t pt-4">
                  <h3 className="text-sm text-gray-500 font-medium">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline mt-2">
                    <span className="text-xl font-bold text-gray-900">
                      {product.price.toFixed(2)} DH
                    </span>
                    {product.discountPrice && (
                      <span className="ml-2 text-sm text-gray-400 line-through">
                        {product.discountPrice.toFixed(2)} DH
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              <div className="px-4 pb-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={isAddingToCart === product.id}
                  className="w-full bg-blue-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-primary-dark transition-colors flex items-center justify-center"
                >
                  {isAddingToCart === product.id ? (
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Ajouter"
                  )}
                </button>
              </div>
            </div>
          ))}
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
    name: "AIN SAISS 1,5L PACK 6 / 1,5L",
    image: "/src/assets/images/products/saiss-1-5l.png",
    price: 22.0,
    link: "/products/ain-saiss-1-5l",
  },
  {
    id: "ain-saiss-bleue-premium",
    name: "AIN SAISS BLEUE PREMIUM 0,75L PACK 12 / 0,75L",
    image: "/src/assets/images/products/saiss-premium-blue.png",
    price: 25.0,
    link: "/products/ain-saiss-bleue-premium",
  },
  {
    id: "ain-saiss-bleue-premium-2",
    name: "AIN SAISS BLEUE PREMIUM 0,75L PACK 12 / 0,75L",
    image: "/src/assets/images/products/saiss-premium-white.png",
    price: 22.0,
    link: "/products/ain-saiss-bleue-premium-2",
  },
  {
    id: "ain-saiss-bleue-premium-3",
    name: "AIN SAISS BLEUE PREMIUM 1L PACK 12 / 1L",
    image: "/src/assets/images/products/saiss-premium-blue-1l.png",
    price: 22.0,
    link: "/products/ain-saiss-bleue-premium-3",
  },
];
