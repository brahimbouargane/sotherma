import { useState, useEffect } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
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
    format: "Grand format",
    featured: true,
    new: false,
    image: product1,
  },
  {
    id: 2,
    name: "AÏN SAÏSS BULLES PREMIUM 0,75L ",
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
    name: "AÏN SAÏSS BULLES 1L ",
    description: "PACK 6 / 1L",
    brand: "Sidi Hrazam",
    price: 21.99,
    format: "Petit format",
    featured: false,
    new: true,
    image: product4,
  },
  {
    id: 5,
    name: "Fontaine d'eau",
    description: "Fontaine d'eau pour bureau ou maison",
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
    description: "Pack de 12 bouteilles d'eau minérale",
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
    name: "Fontaines / Bidons ( 5L et 6L)",
  },
];

// Product Card Component
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Mock function for adding to cart

  return (
    <motion.div
      key={product.id}
      className="bg-white rounded-lg p-4 flex flex-col items-center  h-full"
      variants={item}
    >
      <div className="relative w-full flex justify-center">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className=" h-auto max-h-[380px] object-cover object-center rounded-md"
        />
      </div>
      <div className="flex-1 text-center font-sans mt-10">
        <h3 className="text-blue-700 font-semibold text-base uppercase">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs mt-1">{product.name}</p>
      </div>

      {/* Price & Add Button */}
      <div className="w-full mt-auto text-center">
        <p className="text-gray-900 font-medium mb-4 text-lg">
          {product.price.toFixed(2)} <span className="text-xs">DH</span>
        </p>
        <button className="w-2/5 bg-blue-500 text-white hover:bg-primary/75 text-base py-2 px-0 rounded-full">
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

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Filter by brand if any selected
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.some((brand) => {
          if (brand === "ain-saiss") return product.brand === "Ain Saiss";
          if (brand === "ghayt") return product.brand === "Ghayt";
          if (brand === "sidi-hrazam") return product.brand === "Sidi Hrazam";
          return false;
        })
      );
    }

    // Filter by format if any selected
    if (selectedFormats.length > 0) {
      filtered = filtered.filter((product) =>
        selectedFormats.some((format) => {
          if (format === "petit") return product.format === "Petit format";
          if (format === "moyen") return product.format === "Moyen format";
          if (format === "grand") return product.format === "Grand format";
          if (format === "fontaines") return product.format === "Fontaines";
          return false;
        })
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedBrands, selectedFormats, searchQuery]);

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

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-blue-50 py-12 h-[40vh] overflow-hidden rounded-3xl">
        <div className="absolute inset-0 z-0">
          <img
            src={banner}
            alt="Mountains background"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="container mt-10  md:mt-14 mx-auto px-4 relative z-10">
          <h1 className="text-2xl lg:text-7xl text-[#0F67B1] font-normal  text-center mb-8">
            Tous les produits
          </h1>
          <div className="max-w-2xl mx-auto md:mt-16">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                className="w-full py-3 bg-white text-[#11459D] px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute  right-3 top-3 text-[#11459D]" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-4 py-8">
        {/* Mobile Filters Toggle */}
        <div className="md:hidden mb-4 flex justify-between items-center">
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm"
          >
            <Filter className="h-4 w-4" />
            <span>Filtres</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isMobileFiltersOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`w-full md:w-72  shrink-0 ${
              isMobileFiltersOpen ? "block" : "hidden"
            } md:block`}
          >
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-primary text-lg">Marques</h3>
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
                        id={`brand-${brand.id}`}
                        checked={selectedBrands.includes(brand.id)}
                        onChange={() => toggleBrand(brand.id)}
                        className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`brand-${brand.id}`}
                        className="ml- flex items-center"
                      >
                        <img
                          src={brand.logo || "/placeholder.svg"}
                          alt={brand.name}
                          width={90}
                          height={45}
                          className="ml-20"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-primary text-lg">Format</h3>
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
                        id={`format-${format.id}`}
                        checked={selectedFormats.includes(format.id)}
                        onChange={() => toggleFormat(format.id)}
                        className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`format-${format.id}`}
                        className="ml-14 text-base text-gray-700"
                      >
                        {format.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset Filters Button (Mobile) */}
              <div className="md:hidden mt-8">
                <button
                  onClick={() => {
                    setSelectedBrands([]);
                    setSelectedFormats([]);
                    setSearchQuery("");
                    setIsMobileFiltersOpen(false);
                  }}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-md transition-colors duration-200 font-medium"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Count and Sort (Desktop) */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {filteredProducts.length} produit
                {filteredProducts.length !== 1 ? "s" : ""} trouvé
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 mb-4">
                  Aucun produit ne correspond à votre recherche.
                </p>
                <button
                  onClick={() => {
                    setSelectedBrands([]);
                    setSelectedFormats([]);
                    setSearchQuery("");
                  }}
                  className="bg-primary hover:bg-blue-600 text-white py-2 px-6 rounded-md transition-colors duration-200"
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
