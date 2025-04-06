import { Link } from "@tanstack/react-router";

// Define category types
interface Category {
  id: string;
  title: string;
  image: string;
  link: string;
}

const CategorySection = () => {
  // Sample categories based on the design
  const categories: Category[] = [
    {
      id: "large-bottles",
      title: "Les grandes bouteilles",
      image: "/src/assets/images/categories/large-bottles.jpg",
      link: "/products/category/large-bottles",
    },
    {
      id: "flavored-water",
      title: "Eau Aromatisée",
      image: "/src/assets/images/categories/flavored-water.jpg",
      link: "/products/category/flavored-water",
    },
    {
      id: "fountains",
      title: "Les fontaines / Bidons",
      image: "/src/assets/images/categories/water-fountains.jpg",
      link: "/products/category/fountains",
    },
    {
      id: "small-bottles",
      title: "Les petites bouteilles",
      image: "/src/assets/images/categories/small-bottles.jpg",
      link: "/products/category/small-bottles",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Découvrez nos catégories
          </h2>

          {/* Navigation arrows */}
          <div className="flex space-x-2">
            <button
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Previous category"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Next category"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              to={category.link}
              key={category.id}
              className="rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow group"
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-medium">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="bg-primary text-white font-medium py-2 px-6 rounded-full hover:bg-primary-dark transition-colors"
          >
            Tous les produits
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
