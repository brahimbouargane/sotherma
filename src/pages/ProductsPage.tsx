import { useState, useEffect, useCallback } from "react";
import { Search, ChevronDown } from "lucide-react";
import banner from "../assets/images/banner-products.png";
import saislogo from "../assets/images/brands/LogoAS.png";
import sidihrazamlogo from "../assets/images/brands/sidihrazam-logo.png";
import ghaytlogo from "../assets/images/brands/ghayt-logo.png";
import product1 from "../assets/images/poducts/sais-bottle-05.png";
import product2 from "../assets/images/poducts/product-2.png";
import product3 from "../assets/images/poducts/product-3.png";
import product4 from "../assets/images/poducts/product-4.png";
import { motion } from "framer-motion";

// Define TypeScript interfaces
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

// Animation variants
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
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <motion.div
      className="p-4 flex flex-col items-center h-full  rounded-3xl  hover:shadow-md transition-shadow duration-300"
      variants={item}
    >
      <div className="relative w-full flex justify-center">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-auto max-h-[380px] object-cover object-center rounded-2xl"
        />
        {/* {product.new && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            Nouveau
          </div>
        )} */}
      </div>
      <div className="flex-1 text-center font-sans mt-10 w-full">
        <h3 className="text-blue-700 font-semibold text-base uppercase">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs mt-1">{product.description}</p>
      </div>

      {/* Price & Add Button */}
      <div className="w-full mt-auto text-center pt-4">
        <p className="text-gray-900 font-medium mb-4 text-lg">
          {product.price.toFixed(2)} <span className="text-xs">DH</span>
        </p>
        <button
          className="w-2/5 bg-blue-500 text-white hover:bg-blue-600 text-base py-2 px-0 rounded-full transition-colors duration-300"
          onClick={() => onAddToCart(product)}
        >
          Ajouter
        </button>
      </div>
    </motion.div>
  );
};

const ProductsPage: React.FC = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] =
    useState<boolean>(false);
  const [mobileFilterType, setMobileFilterType] = useState<
    "brands" | "formats" | null
  >(null);

  // Function to add to cart
  const addToCart = (product: Product) => {
    console.log("Added to cart:", product);
    // Here you would normally dispatch an action to your cart state manager
    alert(`${product.name} ajouté au panier`);
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

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="relative bg-blue-50 py-12 h-[40vh] overflow-hidden rounded-3xl">
        <div className="absolute inset-0 z-0">
          <img
            src={banner}
            alt="Mountains background"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="container mt-10 md:mt-14 mx-auto px-4 relative z-10">
          <h1 className="text-2xl lg:text-7xl text-[#0F67B1] font-normal text-center mb-8">
            Tous les produits
          </h1>
          <div className="max-w-2xl mx-auto md:mt-16">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                className="w-full py-3 bg-white text-[#11459D] px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0F67B1] focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-3 text-[#11459D]" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" mx-auto px-4 py-8">
        {/* Mobile Filters */}
        <div className="md:hidden mb-6 flex justify-center space-x-4">
          <button
            onClick={() => {
              setMobileFilterType(
                mobileFilterType === "brands" ? null : "brands"
              );
              setIsMobileFiltersOpen(mobileFilterType !== "brands");
            }}
            className="flex items-center justify-center bg-white px-6 py-3 rounded-full shadow-sm text-[#0F67B1] border border-[#0F67B1]"
          >
            <span>Marques</span>
            <ChevronDown
              className={`h-4 w-4 ml-2 transition-transform ${
                mobileFilterType === "brands" ? "rotate-180" : ""
              }`}
            />
          </button>

          <button
            onClick={() => {
              setMobileFilterType(
                mobileFilterType === "formats" ? null : "formats"
              );
              setIsMobileFiltersOpen(mobileFilterType !== "formats");
            }}
            className="flex items-center justify-center bg-white px-6 py-3 rounded-full shadow-sm text-[#0F67B1] border border-[#0F67B1]"
          >
            <span>Format</span>
            <ChevronDown
              className={`h-4 w-4 ml-2 transition-transform ${
                mobileFilterType === "formats" ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden md:block w-80 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              {/* Brands Filter */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-[#0F67B1] text-lg">
                    Marques
                  </h3>
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <div className="space-y-5">
                  {brands.map((brand) => (
                    <div key={brand.id} className="flex items-center py-1">
                      <input
                        type="checkbox"
                        id={`desktop-brand-${brand.id}`}
                        checked={selectedBrands.includes(brand.id)}
                        onChange={() => toggleBrand(brand.id)}
                        className="h-5 w-5 text-[#0F67B1] focus:ring-[#0F67B1] border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`desktop-brand-${brand.id}`}
                        className="flex items-center"
                      >
                        <img
                          src={brand.logo || "/placeholder.svg"}
                          alt={brand.name}
                          width={90}
                          height={45}
                          className="ml-10"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formats Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-[#0F67B1] text-lg">Format</h3>
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <div className="space-y-5">
                  {formats.map((format) => (
                    <div key={format.id} className="flex items-center py-1">
                      <input
                        type="checkbox"
                        id={`desktop-format-${format.id}`}
                        checked={selectedFormats.includes(format.id)}
                        onChange={() => toggleFormat(format.id)}
                        className="h-5 w-5 text-[#0F67B1] focus:ring-[#0F67B1] border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`desktop-format-${format.id}`}
                        className="ml-3 text-base text-gray-700"
                      >
                        {format.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset Filters Button (Desktop) */}
              <div className="mt-8">
                <button
                  onClick={resetFilters}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-full transition-colors duration-200 font-medium"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters Dropdown */}
          {isMobileFiltersOpen && (
            <div className="md:hidden w-full  p-6 mb-6">
              {mobileFilterType === "brands" && (
                <div>
                  <h3 className="font-medium text-[#0F67B1] text-lg mb-4">
                    Marques
                  </h3>
                  <div className="space-y-5">
                    {brands.map((brand) => (
                      <div key={brand.id} className="flex items-center py-1">
                        <input
                          type="checkbox"
                          id={`mobile-brand-${brand.id}`}
                          checked={selectedBrands.includes(brand.id)}
                          onChange={() => toggleBrand(brand.id)}
                          className="h-5 w-5 text-[#0F67B1] focus:ring-[#0F67B1] border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`mobile-brand-${brand.id}`}
                          className="flex items-center"
                        >
                          <img
                            src={brand.logo || "/placeholder.svg"}
                            alt={brand.name}
                            width={90}
                            height={45}
                            className="ml-8"
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {mobileFilterType === "formats" && (
                <div>
                  <h3 className="font-medium text-[#0F67B1] text-lg mb-4">
                    Format
                  </h3>
                  <div className="space-y-5">
                    {formats.map((format) => (
                      <div key={format.id} className="flex items-center py-1">
                        <input
                          type="checkbox"
                          id={`mobile-format-${format.id}`}
                          checked={selectedFormats.includes(format.id)}
                          onChange={() => toggleFormat(format.id)}
                          className="h-5 w-5 text-[#0F67B1] focus:ring-[#0F67B1] border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`mobile-format-${format.id}`}
                          className="ml-3 text-base text-gray-700"
                        >
                          {format.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reset Filters Button (Mobile) */}
              <div className="mt-6">
                <button
                  onClick={() => {
                    resetFilters();
                    setIsMobileFiltersOpen(false);
                  }}
                  className="w-full bg-[#0F67B1] text-white py-3 px-4 rounded-full transition-colors duration-200 font-medium"
                >
                  Appliquer les filtres
                </button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {filteredProducts.length} produit
                {filteredProducts.length !== 1 ? "s" : ""} trouvé
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>

              {(selectedBrands.length > 0 ||
                selectedFormats.length > 0 ||
                searchQuery.trim()) && (
                <button
                  onClick={resetFilters}
                  className="text-[#0F67B1] hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              key={`products-${selectedBrands.join("-")}-${selectedFormats.join(
                "-"
              )}-${searchQuery}`}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 mb-4">
                  Aucun produit ne correspond à votre recherche.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#0F67B1] hover:bg-blue-600 text-white py-2 px-6 rounded-full transition-colors duration-200"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
