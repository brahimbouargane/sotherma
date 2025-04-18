import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import Heroimage from "../../assets/images/mask-hero-seaction.png";
import HeroimageMobile from "../../assets/images/hero-original-image.png"; // Import mobile image
import PercentIcon from "../../assets/icons/Bénéficiez.png";
import TruckIcon from "../../assets/icons/Livraisonc.png";
import BottleIcon from "../../assets/icons/eau.png";
import BoxIcon from "../../assets/icons/pack.png";

import { Helmet } from "react-helmet-async";

interface BenefitProps {
  icon: string;
  title: string;
  description: string;
}

const Benefit: React.FC<BenefitProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center pt-4 sm:pt-6 md:pt-8 lg:pt-12">
      <img
        src={icon}
        alt="Icon"
        className="w-auto h-10 sm:h-12 md:h-14 lg:h-16 mb-2 sm:mb-3 md:mb-4"
      />
      <h3 className="text-blue-700 text-base sm:text-lg md:text-xl font-medium mb-2 sm:mb-3 md:mb-4">
        {title}
      </h3>
      <p className="text-gray-600 text-xs sm:text-sm md:text-base w-full sm:w-4/5 md:w-3/4 lg:w-3/5 mx-auto">
        {description}
      </p>
    </div>
  );
};

interface AbonnmentHeroProps {
  className?: string;
}

const AbonnmentHero: React.FC<AbonnmentHeroProps> = ({ className }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if device is mobile based on screen width
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Consider < 768px as mobile
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up event listener
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <div
      className={`relative min-h-[90vh]  mt-16 md:mt-20 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden ${className}`}
    >
      <Helmet>
        <title>Ain Saiss | Eau Minérale Naturelle</title>
        <meta
          name="description"
          content="Eau minérale naturelle pour une meilleure récupération pendant et après l'effort."
        />
      </Helmet>
      {/* Background image - conditional based on screen size */}
      <div className="absolute inset-0 z-0 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl">
        <img
          src={isMobile ? HeroimageMobile : Heroimage}
          alt="Background mountains"
          className="w-full h-full object-cover object-center rounded-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-8  md:pt-20 lg:pt-32 px-4 container mx-auto">
        <motion.h2
          className="text-2xl md:text-4xl lg:text-5xl xl:text-7xl font-semibold text-blue-700 text-center mb-2 sm:mb-3 md:mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Livraison automatique
        </motion.h2>

        <motion.p
          className="text-center text-xs  md:text-base text-gray-600 mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-2xl mx-auto px-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </motion.p>

        {/* Benefits Box */}
        <motion.div
          className="bg-white rounded-2xl md:rounded-3xl shadow-lg py-4 sm:py-5 md:py-6 px-3 sm:px-4 md:px-6 lg:px-8 mb-6 sm:mb-8 md:mb-10 lg:mb-12 mx-auto md:mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-6 lg:gap-8">
            <Benefit
              icon={PercentIcon}
              title="Bénéficiez de 5%"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />

            <Benefit
              icon={TruckIcon}
              title="Livraison gratuite"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />

            <Benefit
              icon={BottleIcon}
              title="Ne manquez plus jamais d'eau !"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />

            <Benefit
              icon={BoxIcon}
              title="Un ajustement à faire ?"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
          </div>

          <div className="text-xs sm:text-sm md:text-base text-[#0F67B1] md:text-gray-500 text-center mt-8 sm:mt-6 md:mt-8 max-w-full sm:max-w-4/5  sm:mx-auto px-1 sm:px-2">
            * Lorem ipsum dolor sit amet consectetur. Molestie eros vulputate in
            quam luctus ut nisi occurratin vitae turpis luctus elit turpis
            locus. Dui elementum quisquisi integer sapien ullamcorper sed.
            Pulvinar ultricies quisquisque viverra nunc nunc in mattis. Praesent
            vitae egestas semper dui. Praesent enim.
          </div>
        </motion.div>

        {/* CTA Button using Tanstack Router Link */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/produits"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-block bg-blue-400 hover:bg-blue-500 text-white py-2 sm:py-2.5 md:py-3 px-6 sm:px-8 md:px-10 rounded-full text-sm sm:text-base md:text-lg font-medium transition-colors duration-300"
            >
              Commander
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AbonnmentHero;
