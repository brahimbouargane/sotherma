import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import Heroimage from "../../assets/images/mask-hero-seaction.png";
import bottle5l from "../../assets/images/poducts/bottle-5l.png";
import bottle1l from "../../assets/images/poducts/bottle-1l.png";
import bottle105 from "../../assets/images/poducts/bottle-0.5l.png";
import arrowright from "../../assets/icons/Arrow-right.svg";
import arrowleft from "../../assets/icons/arrow-left.svg";
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
    <section className="relative h-[90vh]  py-8 md:py-16 overflow-hidden">
      <Helmet>
        <title>Ain Saiss | Eau Minérale Naturelle</title>
        <meta
          name="description"
          content="Eau minérale naturelle pour une meilleure récupération pendant et après l'effort."
        />
      </Helmet>

      {/* Background Image */}
      <div className="absolute h-full w-full top-0 left-0 z-0 ">
        <img
          src={Heroimage}
          alt="Background"
          className="object-fill w-full h-full"
        />
      </div>

      {/* Carousel Content */}
      <div className="relative z-10 h-full flex flex-col">
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
              <div className="relative flex justify-center items-center w-full md:w-[30%] h-[400px] md:h-[480px]">
                {/* 5L Bottle - Left */}
                <img
                  src={bottle5l}
                  alt="5L Bottle"
                  className="absolute left-24 bottom-0 w-[150px] md:w-[220px]"
                />

                {/* 1.5L Bottle - Center */}
                <img
                  src={bottle1l}
                  alt="1.5L Bottle"
                  className="relative left-[100px] bottom-16 w-[180px] md:w-[225px] z-10"
                />

                {/* 0.5L Bottle - Right */}
                <img
                  src={bottle105}
                  alt="0.5L Bottle"
                  className="absolute -right-4 bottom-2 w-[80px] md:w-[130px]"
                />
              </div>

              {/* Right side - Text Content (70%) */}
              <div className="w-full md:w-[60%] text-center md:text-left p-4 md:mb-20 md:pr-20">
                <p className="text-2xl  md:text-[65px] text-blue-800 mb-4 leading-tight">
                  {slide.title}
                </p>
                <p className="text-blue-700 md:text-lg">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevSlide}
          className="absolute cursor-pointer left-2 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full border border-blue-800 flex items-center justify-center text-blue-800 hover:bg-white transition-colors z-20"
          aria-label="Previous slide"
        >
          {/* <ChevronLeft className="w-6 h-6" /> */}
          <img src={arrowleft} alt="Arrow Left" className="w-6 h-6" />
        </button>

        <button
          onClick={goToNextSlide}
          className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full border border-blue-800 flex items-center justify-center text-blue-800 hover:bg-white transition-colors z-20"
          aria-label="Next slide"
        >
          {/* <ChevronRight className="w-6 h-6" /> */}
          <img src={arrowright} alt="Arrow Right" className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-0 right-8 flex items-center gap-2 z-20">
          <span className="text-blue-800 font-medium text-2xl">
            {String(currentSlide + 1).padStart(2, "0")}
          </span>
          <div className="w-36 h-1 bg-blue-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-800 transition-all duration-500"
              style={{
                width: `${((currentSlide + 1) / slides.length) * 100}%`,
              }}
            ></div>
          </div>
          <span className="text-blue-800 font-medium text-2xl">
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
