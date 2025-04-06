// import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import category1 from "../../assets/images/category/category-farme-1.png";
import category2 from "../../assets/images/category/category-farme-2.png";
import category3 from "../../assets/images/category/category-farme-3.png";
import category4 from "../../assets/images/category/category-farme-4.png";

// Define category types
interface Category {
  id: number;
  title: string;
  image: string;
  link: string;
}

const CategorySection = () => {
  // Sample categories based on the design
  const categories: Category[] = [
    {
      id: 1,
      title: "Les grandes bouteilles",
      image: category1,
      link: "/categories/grandes-bouteilles",
    },
    {
      id: 2,
      title: "Eau Aromatisée",
      image: category2,
      link: "/categories/eau-aromatisee",
    },
    {
      id: 3,
      title: "Les fontaines BIONS",
      image: category3,
      link: "/categories/fontaines",
    },
    {
      id: 4,
      title: "Les petites bouteilles",
      image: category4,
      link: "/categories/petites-bouteilles",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const visibleCategories = 4;

  const nextCategories = () => {
    setStartIndex((prev) =>
      Math.min(prev + 1, categories.length - visibleCategories)
    );
  };

  const prevCategories = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

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
  return (
    <section className="py-12 bg-white">
      <div className=" mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-[52px] font-medium text-blue-700">
            Découvrez nos catégories
          </h2>

          <div className="flex space-x-12">
            <button
              onClick={prevCategories}
              disabled={startIndex === 0}
              className="p-2 rounded-full   "
              aria-label="Previous categories"
            >
              {/* <ChevronLeft className="h-5 w-5 text-blue-700" /> */}
              {/* <img src={arrowleft} alt="Arrow Left" className="h-12 w-10" /> */}
            </button>

            <button
              onClick={nextCategories}
              disabled={startIndex >= categories.length - visibleCategories}
              className="p-2 rounded-full   "
              aria-label="Next categories"
            >
              {/* <ChevronRight className="h-12 w-10 text-blue-700" /> */}
              {/* <img src={arrowright} alt="Arrow Right" className="h-12 w-10" /> */}
            </button>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="relative cursor-pointer rounded-xl overflow-hidden bg-blue-50 aspect-[3/4]"
              variants={item}
            >
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
              />
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-16 text-center">
          <button className="bg-blue-500 text-white rounded-full hover:bg-primary/80 text-2xl font-semibold px-6 py-4">
            Tous les produits
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
