import { Helmet } from "react-helmet-async";
import HeroBanner from "../components/home/HeroBanner";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import BrandShowcase from "../components/home/BrandShowcase";
import BlogPreview from "../components/home/BlogPreview";
import DeliveryInfo from "../components/home/DeliveryInfo";
import { BlogPost } from "../types/blog.types";

import blog1 from "../assets/images/blog/blog-1.webp";
import blog2 from "../assets/images/blog/blog-2.webp";
import blog3 from "../assets/images/blog/blog-3.webp";

const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "Blog title heading will go here neatly spanning over two lines",
    excerpt:
      "Suspendisse vitae enim in eros tristique ultricies eu placerat velit. Suspendisse vulputate id eros vitae.",
    image: blog1,
    category: "Lifestyle",
    date: "5 mai 2023",
    link: "/blog/post-1",
  },
  {
    id: "post-2",
    title: "Blog title heading will go here neatly spanning over two lines",
    excerpt:
      "Suspendisse vitae enim in eros tristique ultricies eu placerat velit. Suspendisse vulputate id eros vitae.",
    image: blog2,
    category: "Santé",
    date: "3 mai 2023",
    link: "/blog/post-2",
  },
  {
    id: "post-3",
    title: "Blog title heading will go here neatly spanning over two lines",
    excerpt:
      "Suspendisse vitae enim in eros tristique ultricies eu placerat velit. Suspendisse vulputate id eros vitae.",
    image: blog3,
    category: "Sports",
    date: "1 mai 2023",
    link: "/blog/post-3",
  },
];

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
      <BlogPreview blogPosts={blogPosts} />
      <DeliveryInfo />
    </div>
  );
};

export default HomePage;
