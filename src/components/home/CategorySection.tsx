import { useState, useEffect, useRef, TouchEvent } from "react";
import { motion } from "framer-motion";
import category1 from "../../assets/images/category/category-farme-1.png";
import category2 from "../../assets/images/category/category-farme-2.png";
import category3 from "../../assets/images/category/category-farme-3.png";
import category4 from "../../assets/images/category/category-farme-4.png";
import arrowright from "../../assets/icons/Arrow-right.svg";
import arrowleft from "../../assets/icons/Arrow-left.svg";
import { Link } from "@tanstack/react-router";

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
    // Add duplicates for demonstration of carousel functionality
    {
      id: 5,
      title: "Les grandes bouteilles",
      image: category1,
      link: "/categories/grandes-bouteilles-2",
    },
    {
      id: 6,
      title: "Eau Aromatisée",
      image: category2,
      link: "/categories/eau-aromatisee-2",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  // const [isMobile, setIsMobile] = useState<boolean>(false);
  const [itemsPerView, setItemsPerView] = useState<number>(4);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      // const mobile = window.innerWidth < 768;
      // setIsMobile(mobile);

      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Auto-advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex < categories.length - itemsPerView) {
        nextSlide();
      } else {
        setActiveIndex(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, itemsPerView, categories.length]);

  const nextSlide = (): void => {
    setActiveIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= categories.length - (itemsPerView - 1)
        ? 0
        : nextIndex;
    });
  };

  const prevSlide = (): void => {
    setActiveIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? categories.length - itemsPerView : nextIndex;
    });
  };

  // Touch events for mobile swiping
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>): void => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>): void => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (): void => {
    if (touchStart - touchEnd > 50) {
      // Swipe left, go to next slide
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right, go to previous slide
      prevSlide();
    }
  };

  // const container = {
  //   hidden: { opacity: 0 },
  //   show: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.1,
  //     },
  //   },
  // };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-8 md:py-12 bg-white  overflow-hidden">
      <div className=" mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <h2 className="text-2xl md:text-4xl lg:text-[52px] font-normal text-[#0F67B1] text-center sm:text-left">
            Découvrez nos catégories
          </h2>

          <div className="flex space-x-6 md:space-x-12">
            <button
              onClick={prevSlide}
              className="p-1 md:p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Previous categories"
            >
              <img
                src={arrowleft}
                alt="Arrow Left"
                className="h-8 w-6 md:h-12 md:w-10"
              />
            </button>

            <button
              onClick={nextSlide}
              className="p-1 md:p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Next categories"
            >
              <img
                src={arrowright}
                alt="Arrow Right"
                className="h-8 w-6 md:h-12 md:w-10"
              />
            </button>
          </div>
        </div>

        <div
          className="relative overflow-hidden"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="flex transition-all duration-500 ease-in-out"
            initial={{ x: 0 }}
            animate={{
              x: `calc(-${activeIndex * (100 / itemsPerView)}%)`,
            }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
          >
            {categories.map((category) => (
              <motion.div
                key={category.id}
                className={`flex-shrink-0 px-2 transition-all duration-500 ease-in-out`}
                style={{ width: `${100 / itemsPerView}%` }}
                variants={item}
              >
                <div className="relative cursor-pointer rounded-3xl overflow-hidden bg-blue-50 aspect-[3/4] group h-full">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <h3 className="text-white text-xl font-medium p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Pagination indicators */}
        {/* <div className="flex justify-center mt-6 space-x-2">
          {Array.from({
            length: Math.ceil(categories.length - (itemsPerView - 1)),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? "bg-blue-700 w-6" : "bg-blue-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div> */}

        <div className="mt-10 md:mt-16 text-center">
          <Link
            to="/produits"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-[#0F67B1] text-white rounded-full hover:bg-blue-600 text-lg md:text-3xl font-semibold px-6 py-3 md:py-2 transition-colors"
          >
            Tous les produits
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
