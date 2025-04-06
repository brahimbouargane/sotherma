import React from "react";

// Brand type definition
interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
}

const BrandShowcase: React.FC = () => {
  // Sample brands based on the design
  const brands: Brand[] = [
    {
      id: "sidi-harazem",
      name: "Sidi Harazem",
      logo: "/src/assets/images/brands/sidi-harazem.png",
      description:
        "Une eau minérale naturelle reconnue pour sa pureté exceptionnelle et ses propriétés bénéfiques.",
    },
    {
      id: "ain-saiss",
      name: "Ain Saiss",
      logo: "/src/assets/images/brands/ain-saiss.png",
      description:
        "L'eau minérale naturelle idéale pour une hydratation quotidienne, riche en minéraux essentiels.",
    },
    {
      id: "amanzi",
      name: "Amanzi",
      logo: "/src/assets/images/brands/amanzi.png",
      description:
        "Une eau de source fraîche et légère, parfaite pour toute la famille et tous les moments de la journée.",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
          Découvrez nos Marques
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brands.map((brand) => (
            <div key={brand.id} className="flex flex-col items-center">
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-24 object-contain mb-6"
              />
              <p className="text-center text-gray-600 max-w-xs">
                {brand.description}
              </p>
            </div>
          ))}
        </div>

        {/* Placeholder text as shown in the design */}
        <div className="mt-12 text-center text-gray-500 text-sm max-w-4xl mx-auto">
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit, in pharetra
            neque viverra mi sed pellentesque. Vulputate id morbi egestas tellus
            non vestibulum tempus augue vestibulum in. Sed vulputate vitae non
            vestibulum tempus augue vestibulum in sed vulputate vitae non
            vestibulum.
          </p>
          <p className="mt-4">
            Vulputate id morbi egestas tellus non vestibulum tempus augue
            vestibulum in. Sed vulputate vitae non vestibulum tempus augue
            vestibulum in sed vulputate vitae non vestibulum. Lorem ipsum dolor
            sit amet consectetur adipiscing elit, in pharetra neque viverra mi
            sed pellentesque. Vulputate id morbi egestas tellus non vestibulum.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
