import { Link } from "@tanstack/react-router";

const DeliveryInfo = () => {
  return (
    <section className="py-12 bg-primary">
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          {/* Image */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="/src/assets/images/delivery-man.png"
              alt="Service de livraison Ain Saiss"
              className="max-w-full h-auto rounded-lg"
            />
          </div>

          {/* Text content */}
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              La livraison automatique
            </h2>
            <p className="text-white/90 mb-6">
              Programmez des livraisons régulières pour ne jamais manquer d'eau
              et bénéficiez d'un service personnalisé. Les livraisons sont
              suivies en temps réel pour vous offrir la meilleure expérience.
            </p>
            <Link
              to="/delivery-service"
              className="inline-block bg-white text-primary font-medium py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryInfo;
