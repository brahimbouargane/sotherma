import { Link } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";

const HeroBanner = () => {
  return (
    <section className="relative bg-secondary py-8 md:py-16 overflow-hidden">
      <Helmet>
        <title>Ain Saiss | Eau Minérale Naturelle</title>
        <meta
          name="description"
          content="Eau minérale naturelle pour une meilleure récupération pendant et après l'effort."
        />
      </Helmet>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
              Eau minérale naturelle, pour une meilleure récupération pendant et
              après l'effort.
            </h1>
            <p className="text-gray-600 mb-6">
              L'eau minérale naturelle idéale pour les sportifs en compétition
              et les adeptes du fitness qui recherchent une hydratation
              optimale.
            </p>
            <Link
              to="/products"
              className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Découvrir nos produits
            </Link>
          </div>

          {/* Product Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/src/assets/images/products/water-bottles-hero.png"
              alt="Bouteilles d'eau Ain Saiss"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Carousel navigation dots */}
      <div className="flex justify-center mt-8">
        <button className="w-3 h-3 rounded-full bg-primary mx-1"></button>
        <button className="w-3 h-3 rounded-full bg-gray-300 mx-1"></button>
        <button className="w-3 h-3 rounded-full bg-gray-300 mx-1"></button>
      </div>
    </section>
  );
};

export default HeroBanner;
