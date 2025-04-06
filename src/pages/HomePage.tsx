import { Helmet } from "react-helmet-async";
import HeroBanner from "../components/home/HeroBanner";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import BrandShowcase from "../components/home/BrandShowcase";
import BlogPreview from "../components/home/BlogPreview";
import DeliveryInfo from "../components/home/DeliveryInfo";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Ain Saiss | Eau Minérale Naturelle</title>
        <meta
          name="description"
          content="Découvrez l'eau minérale naturelle Ain Saiss, idéale pour une hydratation optimale pendant et après l'effort. Livraison à domicile disponible."
        />
        <meta
          property="og:title"
          content="Ain Saiss | Eau Minérale Naturelle"
        />
        <meta
          property="og:description"
          content="Eau minérale naturelle pour une meilleure récupération pendant et après l'effort."
        />
        <link rel="canonical" href="https://www.ain-saiss.ma" />
      </Helmet>

      <HeroBanner />
      <CategorySection />
      <FeaturedProducts />
      <BrandShowcase />
      <BlogPreview />
      <DeliveryInfo />
    </div>
  );
};

export default HomePage;
