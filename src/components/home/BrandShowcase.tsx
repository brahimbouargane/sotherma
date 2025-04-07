import React from "react";
import saislogo from "../../assets/images/brands/ainsaiss-logo.png";
import sidihrazamlogo from "../../assets/images/brands/sidihrazam-logo.png";
import ghaytlogo from "../../assets/images/brands/ghayt-logo.png";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

// Brand type definition
interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
}

// Props type definition
interface BrandShowcaseProps {
  className?: string;
  titleClassName?: string;
  textClassName?: string;
  containerClassName?: string;
}

const BrandShowcase: React.FC<BrandShowcaseProps> = ({
  className,
  titleClassName,
  textClassName,
  containerClassName,
}) => {
  // Sample brands based on the design
  const brands: Brand[] = [
    {
      id: "sidi-harazem",
      name: "Sidi Harazem",
      logo: sidihrazamlogo,
      description:
        "Une eau minérale naturelle reconnue pour sa pureté exceptionnelle et ses propriétés bénéfiques.",
    },
    {
      id: "ain-saiss",
      name: "Ain Saiss",
      logo: saislogo,
      description:
        "L'eau minérale naturelle idéale pour une hydratation quotidienne, riche en minéraux essentiels.",
    },
    {
      id: "ghayt",
      name: "Ghayt",
      logo: ghaytlogo,
      description:
        "Une eau de source fraîche et légère, parfaite pour toute la famille et tous les moments de la journée.",
    },
  ];

  return (
    <section className={cn("py-16 bg-[#EEF4F9] rounded-3xl", className)}>
      <div className={cn("mx-auto", containerClassName)}>
        <motion.h2
          className={cn(
            "text-2xl md:text-6xl font-normal text-blue-700 text-center mb-12",
            titleClassName
          )}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Découvrez nos Marques
        </motion.h2>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-64 mb-12">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              className="w-32 md:w-64"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <img
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                width={150}
                height={80}
                className="w-full h-auto"
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          className={cn(
            "text-gray-500 text-center max-w-5xl mx-auto text-base md:text-lg",
            textClassName
          )}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Lorem ipsum dolor sit amet consectetur. In pharetra neque viverra mi
          sed pellentesque. Vulputate at morbi egestas lacus. Egestas risus non
          non vestibulum sagittis vestibulum in. Sed vulputate vitae id nunc
          quisque pellentesque viverra laoreet.Lorem ipsum dolor sit amet
          consectetur. In pharetra neque viverra mi sed pellentesque. Vulputate
          at morbi egestas lacus. Egestas risus non non vestibulum sagittis
          vestibulum in. Sed vulputate vitae id nunc quisque pellentesque
          viverra laoreet.Lorem ipsum dolor sit amet consectetur. In pharetra
          neque viverra mi sed pellentesque. Vulputate at morbi egestas lacus.
          Egestas risus non non vestibulum sagittis vestibulum in. Sed vulputate
          vitae id nunc quisque pellentesque viverra laoreet.
        </motion.p>
      </div>
    </section>
  );
};

export default BrandShowcase;
