import DeliverySteps from "../components/home/DeliverySteps";
import AbonnmentHero from "../components/home/AbonnmentHero";
import BrandShowcase from "../components/home/BrandShowcase";
import DeliveryInfo from "../components/home/DeliveryInfo";

const Abonnement = () => {
  return (
    <>
      <AbonnmentHero />
      <DeliverySteps className="py-20" />
      <BrandShowcase className="bg-white shadow-xl" />
      <DeliveryInfo />
    </>
  );
};

export default Abonnement;
