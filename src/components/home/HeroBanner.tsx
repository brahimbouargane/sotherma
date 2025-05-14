// export default HeroBanner;
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import HeroimageDesktop from "../../assets/images/mask-hero-seaction.webp";
import HeroimageMobile from "../../assets/images/hero-original-image.webp";
import bottle5l from "../../assets/images/poducts/bottle-5l.png";
import bottle1l from "../../assets/images/poducts/bottle-1l.png";
import bottle105 from "../../assets/images/poducts/bottle-0.5l.png";
import ainsais5l from "../../assets/images/poducts/sais5.png";
import ainsais1l from "../../assets/images/poducts/sais1.png";
import ainsais05 from "../../assets/images/poducts/sais-05.png";
import ghyat5l from "../../assets/images/poducts/ghayt5.png";
import ghayt1l from "../../assets/images/poducts/ghayt1.png";
import ghayt05 from "../../assets/images/poducts/ghayt-0.5.png";
import arrowright from "../../assets/icons/Arrow-right.svg";
import arrowleft from "../../assets/icons/Arrow-left.svg";
import { cn } from "../../lib/utils";

const slides = [
  {
    id: 1,
    title:
      "Eau minérale naturelle, pour une meilleure récupération pendant et après l'effort.",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lobortis aliquet quis bibendum nec.",
    image: bottle5l,
    bottles: {
      large: bottle5l, // 5L bottle
      medium: bottle1l, // 1L bottle
      small: bottle105, // 0.5L bottle
    },
  },
  {
    id: 2,
    title:
      "Eau minérale naturelle, pour une meilleure récupération pendant et après l'effort.",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lobortis aliquet quis bibendum nec.",
    image: bottle1l,
    bottles: {
      large: ainsais5l, // 5L bottle
      medium: ainsais1l, // 1L bottle
      small: ainsais05, // 0.5L bottle
    },
  },
  {
    id: 3,
    title:
      "Eau minérale naturelle, pour une meilleure récupération pendant et après l'effort.",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lobortis aliquet quis bibendum nec.",
    image: bottle105,
    bottles: {
      large: ghyat5l, // 5L bottle
      medium: ghayt1l, // 1L bottle
      small: ghayt05, // 0.5L bottle
    },
  },
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("right"); // to track animation direction
  const [isLoaded, setIsLoaded] = useState(false); // to track initial page load animation
  const [isPaused, setIsPaused] = useState(false); // to track if auto slide is paused
  const [showText, setShowText] = useState(false); // new state to control text appearance
  const [isMobile, setIsMobile] = useState(false); // new state to track mobile view

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the md breakpoint in your code
    };

    // Check on initial load
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const goToSlide = (index: any, dir: any) => {
    if (isAnimating || isMobile) return; // Don't animate on mobile
    setDirection(dir);
    setIsAnimating(true);
    // Reset text animation when changing slides
    setShowText(false);

    setCurrentSlide(index);

    // After bottles appear, show text with delay
    setTimeout(() => {
      setShowText(true);
    }, 400); // Faster text animation after bottles animation

    setTimeout(() => setIsAnimating(false), 600); // Reduced animation time
  };

  const goToNextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length, "right");
  };

  const goToPrevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length, "left");
  };

  useEffect(() => {
    // Only set up the interval if not paused and not on mobile
    if (!isPaused && !isMobile) {
      const interval = setInterval(() => {
        goToNextSlide();
      }, 5000);

      return () => clearInterval(interval);
    }
    // Return an empty cleanup function when paused
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, currentSlide, isMobile]);

  // Set isLoaded to true after component mounts for entrance animations
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsLoaded(true);

      // After the initial load animation completes, show the text
      const textTimer = setTimeout(() => {
        setShowText(true);
      }, 600); // Show text faster (600ms) after page loads

      return () => clearTimeout(textTimer);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`relative h-[40vh] overflow-hidden md:h-[90vh] py-8 lg:py-16 rounded-xl mt-16 md:mt-20 transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <Helmet>
        <title>Ain Saiss | Eau Minérale Naturelle</title>
        <meta
          name="description"
          content="Eau minérale naturelle pour une meilleure récupération pendant et après l'effort."
        />
      </Helmet>

      {/* Background Image with Fade-in animation */}
      <div
        className={`absolute h-full w-full top-0 left-0 z-0 ${
          isLoaded ? "animate-fadeIn" : ""
        }`}
      >
        <img
          src={HeroimageDesktop}
          alt="Background"
          className="object-cover w-full h-full hidden md:block rounded-3xl transform transition-transform duration-[2000ms] hover:scale-105"
        />
        <img
          src={HeroimageMobile}
          alt="Background"
          className="object-cover w-full h-full md:hidden rounded-3xl transform transition-transform duration-[2000ms] hover:scale-105"
        />
      </div>

      {/* Mobile Static Content */}
      {isMobile && (
        <div className="relative z-10 h-full w-full flex flex-col">
          <div className="flex-1 flex flex-col items-center py-8">
            <div className="w-full text-center p-4">
              <p className="text-2xl text-primary-default mb-4 leading-tight">
                {slides[0].title}
              </p>
              <p className="text-white">{slides[0].description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Carousel Content - Only shown on non-mobile */}
      {!isMobile && (
        <div className="relative z-10 h-full w-full flex flex-col">
          <div className="flex-1 flex flex-col md:flex-row items-center py-8">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={cn(
                  "w-full h-full flex flex-col md:flex-row items-center justify-between transition-all duration-700 absolute inset-0",
                  currentSlide === index && !isAnimating
                    ? "opacity-100 z-10 transform translate-x-0"
                    : currentSlide === index && isAnimating
                    ? "opacity-100 z-10 transform translate-x-0"
                    : index ===
                        (currentSlide - 1 + slides.length) % slides.length &&
                      direction === "right"
                    ? "opacity-0 z-0 transform -translate-x-full"
                    : index === (currentSlide + 1) % slides.length &&
                      direction === "left"
                    ? "opacity-0 z-0 transform translate-x-full"
                    : "opacity-0 z-0 transform translate-x-full"
                )}
              >
                {/* Left side - Product Image (30%) with animation - DISPLAY FIRST */}

                <div
                  className={`relative justify-center hidden lg:flex items-center w-full md:w-[30%] h-[400px] md:h-[480px] transition-all duration-500 ${
                    isLoaded ? "animate-scaleIn" : ""
                  } ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
                >
                  {/* Large bottle with custom dimensions per slide */}
                  <img
                    src={slide.bottles.large}
                    alt="Large Bottle"
                    className={cn(
                      "absolute lg:left-16 2xl:left-24 lg:-bottom-8 transition-all duration-700",
                      // Custom dimensions for each slide
                      index === 0
                        ? "w-[150px] h-auto md:w-[220px]"
                        : index === 1
                        ? "w-[140px] h-auto md:w-[220px] lg:bottom-0"
                        : index === 2
                        ? "w-[130px] h-auto md:w-[200px] lg:bottom-4"
                        : "w-[150px] h-auto md:w-[220px]", // default fallback
                      isLoaded && index === 0 ? "animate-slideInFromLeft" : "",
                      currentSlide === index
                        ? "opacity-100 transform translate-y-0 rotate-0"
                        : "opacity-0 transform translate-y-8 -rotate-6"
                    )}
                  />

                  {/* Medium bottle with custom dimensions per slide */}
                  <img
                    src={slide.bottles.medium}
                    alt="Medium Bottle"
                    className={cn(
                      "relative lg:left-[120px] lg:bottom-4 z-10 transition-all duration-700 delay-100",
                      // Custom dimensions for each slide
                      index === 0
                        ? "w-[180px] h-auto md:w-[225px]"
                        : index === 1
                        ? "w-[170px] h-auto md:w-[180px] "
                        : index === 2
                        ? "w-[160px] h-auto md:w-[180px] lg:bottom-6"
                        : "w-[180px] h-auto md:w-[225px]", // default fallback
                      isLoaded && index === 0
                        ? "animate-slideInFromBottom"
                        : "",
                      currentSlide === index
                        ? "opacity-100 transform translate-y-0 rotate-0"
                        : "opacity-0 transform translate-y-12 rotate-6"
                    )}
                  />

                  {/* Small bottle with custom dimensions per slide */}
                  <img
                    src={slide.bottles.small}
                    alt="Small Bottle"
                    className={cn(
                      "absolute lg:-right-20 2xl:-right-11 lg:-bottom-5 transition-all duration-700 delay-200",
                      // Custom dimensions for each slide
                      index === 0
                        ? "w-[80px] h-auto md:w-[130px]"
                        : index === 1
                        ? "w-[75px] h-auto md:w-[110px] lg:bottom-0"
                        : index === 2
                        ? "w-[70px] h-auto md:w-[100px] lg:bottom-4"
                        : "w-[80px] h-auto md:w-[130px]", // default fallback
                      isLoaded && index === 0 ? "animate-slideInFromRight" : "",
                      currentSlide === index
                        ? "opacity-100 transform translate-y-0 rotate-0"
                        : "opacity-0 transform translate-y-16 -rotate-6"
                    )}
                  />
                </div>

                {/* Right side - Text Content (70%) with animations - DISPLAY AFTER BOTTLES */}
                <div
                  className={`w-full lg:w-[60%] text-center lg:text-left p-4 md:mb-20 lg:pr-20 transition-all duration-500 ${
                    isLoaded && index === 0 ? "animate-fadeIn" : ""
                  }`}
                >
                  <p
                    className={cn(
                      "text-2xl md:text-[65px] text-primary-default mb-4 leading-tight transition-all duration-700",
                      showText && currentSlide === index
                        ? "opacity-100 transform translate-y-0 delay-300"
                        : "opacity-0 transform translate-y-8"
                    )}
                  >
                    {slide.title}
                  </p>
                  <p
                    className={cn(
                      "text-white md:text-[#11459D] md:text-lg transition-all duration-700",
                      showText && currentSlide === index
                        ? "opacity-100 transform translate-y-0 delay-500"
                        : "opacity-0 transform translate-y-8"
                    )}
                  >
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows with pulse effect and pause on hover - Only for desktop */}
          <button
            onClick={goToPrevSlide}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className={`absolute hidden lg:flex cursor-pointer left-2 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full border border-blue-800 items-center justify-center text-primary-default hover:bg-white transition-all z-20 hover:scale-110 active:scale-95 duration-300 ${
              isLoaded ? "opacity-100 animate-slideInFromLeft" : "opacity-0"
            } ${isPaused ? "bg-blue-50" : ""}`}
            aria-label="Previous slide"
          >
            <img src={arrowleft} alt="Arrow Left" className="w-6 h-6" />
          </button>

          <button
            onClick={goToNextSlide}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className={`absolute hidden lg:flex cursor-pointer right-2 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full border border-blue-800 items-center justify-center text-primary-default hover:bg-white transition-all z-20 hover:scale-110 active:scale-95 duration-300 ${
              isLoaded ? "opacity-100 animate-slideInFromRight" : "opacity-0"
            } ${isPaused ? "bg-blue-50" : ""}`}
            aria-label="Next slide"
          >
            <img src={arrowright} alt="Arrow Right" className="w-6 h-6" />
          </button>

          {/* Slide Indicators with animated progress - Only for desktop */}
          <div
            className={`absolute -bottom-4 lg:-bottom-10 left-1/2 lg:left-auto lg:right-8 transform -translate-x-1/2 lg:translate-x-0 flex items-center gap-2 z-20 transition-all duration-700 delay-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-primary-default font-medium text-xl md:text-2xl">
              {String(currentSlide + 1).padStart(2, "0")}
            </span>
            <div className="w-20 md:w-36 h-1 bg-blue-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-800 transition-all duration-500 ease-out"
                style={{
                  width: `${((currentSlide + 1) / slides.length) * 100}%`,
                }}
              ></div>
            </div>
            <span className="text-primary-default font-medium text-xl md:text-2xl">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroBanner;
