import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import HeroimageDesktop from "../../assets/images/mask-hero-seaction.png";
import HeroimageMobile from "../../assets/images/hero-original-image.png"; // Import mobile image
import bottle5l from "../../assets/images/poducts/bottle-5l.png";
import bottle1l from "../../assets/images/poducts/bottle-1l.png";
import bottle105 from "../../assets/images/poducts/bottle-0.5l.png";
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
  },
  {
    id: 2,
    title:
      "Eau minérale naturelle, pour une meilleure récupération pendant et après l'effort.",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lobortis aliquet quis bibendum nec.",
    image: bottle1l,
  },
  {
    id: 3,
    title:
      "Eau minérale naturelle, pour une meilleure récupération pendant et après l'effort.",
    description:
      "Lorem ipsum dolor sit amet consectetur. Lobortis aliquet quis bibendum nec.",
    image: bottle105,
  },
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="relative h-[40vh] md:h-[90vh] py-8 lg:py-16 overflow-hidden">
      <Helmet>
        <title>Ain Saiss | Eau Minérale Naturelle</title>
        <meta
          name="description"
          content="Eau minérale naturelle pour une meilleure récupération pendant et après l'effort."
        />
      </Helmet>

      {/* Background Image */}
      <div className="absolute  h-full w-full top-0 left-0 z-0 ">
        <img
          src={HeroimageDesktop}
          alt="Background"
          className="object-cover w-full h-full hidden md:block rounded-3xl"
        />
        <img
          src={HeroimageMobile}
          alt="Background"
          className="object-cover w-full h-full md:hidden rounded-3xl"
        />
      </div>

      {/* Carousel Content */}
      <div className="relative z-10 h-full w-full flex flex-col">
        <div className="flex-1 flex flex-col md:flex-row items-center py-8">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={cn(
                "w-full h-full flex flex-col md:flex-row items-center justify-between transition-opacity duration-500 absolute inset-0",
                currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
            >
              {/* Left side - Product Image (30%) */}
              <div className="relative  justify-center hidden lg:flex items-center w-full md:w-[30%] h-[400px] md:h-[480px]">
                <img
                  src={bottle5l}
                  alt="5L Bottle"
                  className="absolute lg:left-16 2xl:left-24 lg:-bottom-8 w-[150px] h-auto  md:w-[220px]"
                />

                <img
                  src={bottle1l}
                  alt="1.5L Bottle"
                  className="relative lg:left-[120px] lg:bottom-4 w-[180px] h-auto md:w-[225px] z-10"
                />
                <img
                  src={bottle105}
                  alt="0.5L Bottle"
                  className="absolute lg:-right-20 2xl:-right-11 lg:-bottom-5 w-[80px] h-auto  md:w-[130px]"
                />
              </div>

              {/* Right side - Text Content (70%) */}
              <div className="w-full lg:w-[60%] text-center lg:text-left p-4 md:mb-20 lg:pr-20">
                <p className="text-2xl  md:text-[65px] text-blue-800 mb-4 leading-tight">
                  {slide.title}
                </p>
                <p className="text-white md:text-blue-700 md:text-lg">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevSlide}
          className="absolute hidden lg:flex cursor-pointer left-2 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full border border-blue-800  items-center justify-center text-blue-800 hover:bg-white transition-colors z-20"
          aria-label="Previous slide"
        >
          {/* <ChevronLeft className="w-6 h-6" /> */}
          <img src={arrowleft} alt="Arrow Left" className="w-6 h-6" />
        </button>

        <button
          onClick={goToNextSlide}
          className="absolute hidden lg:flex cursor-pointer right-2 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full border border-blue-800  items-center justify-center text-blue-800 hover:bg-white transition-colors z-20"
          aria-label="Next slide"
        >
          {/* <ChevronRight className="w-6 h-6" /> */}
          <img src={arrowright} alt="Arrow Right" className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        {/* <div className="absolute bottom-0 right-8 flex items-center gap-2 z-20"> */}
        <div className="absolute bottom-0 left-1/2 lg:left-auto lg:right-8 transform -translate-x-1/2 lg:translate-x-0 flex items-center gap-2 z-20">
          <span className="text-blue-800 font-medium text-xl md:text-2xl">
            {String(currentSlide + 1).padStart(2, "0")}
          </span>
          <div className="w-20 md:w-36 h-1 bg-blue-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-800 transition-all duration-500"
              style={{
                width: `${((currentSlide + 1) / slides.length) * 100}%`,
              }}
            ></div>
          </div>
          <span className="text-blue-800 font-medium text-xl md:text-2xl">
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
