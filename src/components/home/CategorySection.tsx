import { useState, useEffect, useRef, TouchEvent } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import category1 from "../../assets/images/category/cat-1.webp";
import category2 from "../../assets/images/category/cat-2.webp";
import category3 from "../../assets/images/category/cat-3.webp";
import category4 from "../../assets/images/category/cat-4.webp";
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
      title: "Eau aromatisée",
      image: category2,
      link: "/categories/eau-aromatisee",
    },
    {
      id: 3,
      title: "Les fontaines bions",
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
      title: "Eau aromatisée",
      image: category2,
      link: "/categories/eau-aromatisee-2",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [itemsPerView, setItemsPerView] = useState<number>(4);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // References for animation controls
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const titleControls = useAnimation();
  const navControls = useAnimation();
  const cardsControls = useAnimation();
  const buttonControls = useAnimation();

  // Trigger animations when section comes into view
  useEffect(() => {
    if (isInView) {
      // Animate title
      titleControls.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        },
      });

      // Animate nav buttons with delay
      navControls.start({
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.6,
          delay: 0.3,
          ease: [0.22, 1, 0.36, 1],
        },
      });

      // Animate cards container
      cardsControls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: 0.5,
          ease: [0.22, 1, 0.36, 1],
        },
      });

      // Animate button
      buttonControls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: 1.4,
          ease: [0.22, 1, 0.36, 1],
        },
      });
    }
  }, [isInView, titleControls, navControls, cardsControls, buttonControls]);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
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
      if (hoveredItem === null) {
        // Only auto-advance if no item is being hovered
        if (activeIndex < categories.length - itemsPerView) {
          nextSlide();
        } else {
          setActiveIndex(0);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, itemsPerView, categories.length, hoveredItem]);

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

  return (
    <section
      ref={sectionRef}
      className="py-8 md:py-12 lg:py-16 overflow-hidden relative"
    >
      {/* Background shape animation */}
      <motion.div
        className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-blue-50 opacity-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={
          isInView ? { scale: 1, opacity: 0.4 } : { scale: 0, opacity: 0 }
        }
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
      />

      <motion.div
        className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-blue-50 opacity-30"
        initial={{ scale: 0, opacity: 0 }}
        animate={
          isInView ? { scale: 1, opacity: 0.3 } : { scale: 0, opacity: 0 }
        }
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
      />

      <div className="mx-auto relative">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12 space-y-4 sm:space-y-0">
          <motion.h2
            className="text-2xl md:text-4xl lg:text-[52px] font-normal text-[#0F67B1] text-center sm:text-left relative"
            initial={{ opacity: 0, y: 30 }}
            animate={titleControls}
          >
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Découvrez
            </motion.span>{" "}
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              nos
            </motion.span>{" "}
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              catégories
            </motion.span>
            {/* Decorative underline that animates in */}
            <motion.div
              className="h-1 w-0 bg-[#0F67B1] absolute -bottom-2 left-0 sm:block hidden"
              initial={{ width: 0 }}
              animate={isInView ? { width: "40%" } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            />
          </motion.h2>

          <motion.div
            className="flex space-x-6 md:space-x-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={navControls}
          >
            <motion.button
              onClick={prevSlide}
              className="p-1 md:p-2 cursor-pointer rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Previous categories"
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={arrowleft}
                alt="Arrow Left"
                className="h-8 w-6 md:h-12 md:w-10"
              />
            </motion.button>

            <motion.button
              onClick={nextSlide}
              className="p-1 md:p-2 cursor-pointer rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Next categories"
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={arrowright}
                alt="Arrow Right"
                className="h-8 w-6 md:h-12 md:w-10 "
              />
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          className="relative overflow-hidden"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          initial={{ opacity: 0, y: 60 }}
          animate={cardsControls}
        >
          <motion.div
            className="flex transition-all duration-300 ease-in-out"
            initial={{ x: 0 }}
            animate={{
              x: `calc(-${activeIndex * (100 / itemsPerView)}%)`,
            }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                className="flex-shrink-0 px-2 transition-all duration-500 ease-in-out"
                style={{ width: `${100 / itemsPerView}%` }}
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                      }
                    : { opacity: 0, y: 40 }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.6 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.div
                  className="relative cursor-pointer rounded-3xl overflow-hidden bg-blue-50 aspect-[3/4] group h-full"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 5px 10px rgba(15, 103, 177, 0.15)",
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>

                  {/* Overlay background with gradient - always visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent">
                    {/* Bottom middle title with split text */}
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-6 text-center">
                      {(() => {
                        const words = category.title.split(" ");
                        let firstLine = "";
                        let secondLine = "";

                        if (
                          words[0].toLowerCase() === "les" &&
                          words.length >= 2
                        ) {
                          // If title starts with "Les", put "Les" and the second word on top
                          firstLine = `${words[0]} ${words[1]}`;
                          // Put the rest on bottom
                          secondLine = words.slice(2).join(" ");
                        } else {
                          // For other cases, just put first word on top, rest on bottom
                          firstLine = words[0];
                          secondLine = words.slice(1).join(" ");
                        }

                        return (
                          <h3 className="text-white text-2xl md:text-3xl font-medium flex flex-col items-center">
                            <motion.span
                              className="block"
                              initial={{ opacity: 0, y: 10 }}
                              animate={
                                isInView
                                  ? { opacity: 1, y: 0 }
                                  : { opacity: 0, y: 10 }
                              }
                              transition={{
                                duration: 0.4,
                                delay: 0.7 + index * 0.1,
                                ease: "easeOut",
                              }}
                            >
                              {firstLine}
                            </motion.span>
                            {secondLine && (
                              <motion.span
                                className="block mt-1"
                                initial={{ opacity: 0, y: 10 }}
                                animate={
                                  isInView
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 10 }
                                }
                                transition={{
                                  duration: 0.4,
                                  delay: 0.8 + index * 0.1,
                                  ease: "easeOut",
                                }}
                              >
                                {secondLine}
                              </motion.span>
                            )}
                          </h3>
                        );
                      })()}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-10 md:mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={buttonControls}
        >
          <Link
            to="/produits"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-[#0F67B1] hover:bg-blue-700 hover:scale-105 text-white rounded-full text-lg md:text-3xl font-semibold px-8 py-4 md:py-3 inline-block shadow-lg transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Tous les produits</span>

            {/* Button background animation */}
            <motion.div
              className="absolute inset-0 bg-blue-700 z-0"
              initial={{ scale: 0, x: "-50%", y: "-50%", opacity: 0 }}
              whileHover={{
                scale: 1.5,
                opacity: 1,
                transition: { duration: 0.4 },
              }}
              style={{
                borderRadius: "9999px",
                top: "50%",
                left: "50%",
                originX: "50%",
                originY: "50%",
              }}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CategorySection;
