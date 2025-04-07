import React from "react";
import { motion } from "framer-motion";
import Heroimage from "../../assets/images/mask-hero-seaction.png";
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
    <div className="flex flex-col items-center text-center pt-12">
      <img src={icon} alt="Icon" className="w-auto h-16 mb-4" />
      <h3 className="text-blue-700 text-xl font-medium mb-4">{title}</h3>
      <p className="text-gray-600 text-base w-3/5 mx-auto">{description}</p>
    </div>
  );
};

interface AbonnmentHeroProps {
  className?: string;
}

const AbonnmentHero: React.FC<AbonnmentHeroProps> = ({ className }) => {
  return (
    <div
      className={`relative h-[85vh] rounded-3xl overflow-hidden ${className}`}
    >
      <Helmet>
        <title>Ain Saiss | Eau Minérale Naturelle</title>
        <meta
          name="description"
          content="Eau minérale naturelle pour une meilleure récupération pendant et après l'effort."
        />
      </Helmet>
      {/* Background image */}
      <div className="absolute inset-0 z-0 rounded-3xl">
        <img
          src={Heroimage}
          alt="Background mountains"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-28 px-4 container mx-auto">
        <motion.h2
          className="text-3xl md:text-7xl font-normal text-blue-700 text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Livraison automatique
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </motion.p>

        {/* Benefits Box */}
        <motion.div
          className="bg-white rounded-3xl shadow-lg py-6 px-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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

          <div className="text-base text-gray-500 text-center mt-8  max-w-4/5 mx-auto">
            * Lorem ipsum dolor sit amet consectetur. Molestie eros vulputate in
            quam luctus ut nisi occurratin vitae turpis luctus elit turpis
            locus. Dui elementum quisquisi integer sapien ullamcorper sed.
            Pulvinar ultricies quisquisque viverra nunc nunc in mattis. Praesent
            vitae egestas semper dui. Praesent enim.
          </div>
        </motion.div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <motion.button
            className="bg-blue-400 hover:bg-blue-500 text-white py-3 px-10 rounded-full text-lg font-medium transition-colors duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Commander
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AbonnmentHero;
