import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DeliveryInfo from "../components/home/DeliveryInfo";
import banner from "../assets/images/mask-hero-seaction.webp";
import bannerMobile from "../assets/images/hero-original-image.webp";
import BlogPreview from "../components/home/BlogPreview";
import blog1 from "../assets/images/blog/blog-1.webp";
import blog2 from "../assets/images/blog/blog-2.webp";
import blog3 from "../assets/images/blog/blog-3.webp";
import { Helmet } from "react-helmet-async";
import { BlogPost } from "../types/blog.types";

function BlogPage(): JSX.Element {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);

  // Check if device is mobile based on screen width
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Consider < 768px as mobile
    };

    // Handle scroll position for animations
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Initial checks
    checkIfMobile();
    handleScroll();

    // Add event listeners
    window.addEventListener("resize", checkIfMobile);
    window.addEventListener("scroll", handleScroll);

    // Clean up event listeners
    return () => {
      window.removeEventListener("resize", checkIfMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Blog posts data
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
    {
      id: "post-4",
      title: "Blog title heading will go here neatly spanning over two lines",
      excerpt:
        "Suspendisse vitae enim in eros tristique ultricies eu placerat velit. Suspendisse vulputate id eros vitae.",
      image: blog2,
      category: "Santé",
      date: "3 mai 2023",
      link: "/blog/post-2",
    },
    {
      id: "post-5",
      title: "Blog title heading will go here neatly spanning over two lines",
      excerpt:
        "Suspendisse vitae enim in eros tristique ultricies eu placerat velit. Suspendisse vulputate id eros vitae.",
      image: blog3,
      category: "Sports",
      date: "1 mai 2023",
      link: "/blog/post-3",
    },
    {
      id: "post-6",
      title: "Blog title heading will go here neatly spanning over two lines",
      excerpt:
        "Suspendisse vitae enim in eros tristique ultricies eu placerat velit. Suspendisse vulputate id eros vitae.",
      image: blog1,
      category: "Lifestyle",
      date: "5 mai 2023",
      link: "/blog/post-1",
    },
    {
      id: "post-7",
      title: "Blog title heading will go here neatly spanning over two lines",
      excerpt:
        "Suspendisse vitae enim in eros tristique ultricies eu placerat velit. Suspendisse vulputate id eros vitae.",
      image: blog1,
      category: "Lifestyle",
      date: "5 mai 2023",
      link: "/blog/post-1",
    },
    {
      id: "post-8",
      title: "Blog title heading will go here neatly spanning over two lines",
      excerpt:
        "Suspendisse vitae enim in eros tristique ultricies eu placerat velit. Suspendisse vulputate id eros vitae.",
      image: blog2,
      category: "Santé",
      date: "3 mai 2023",
      link: "/blog/post-2",
    },
    {
      id: "post-9",
      title: "Blog title heading will go here neatly spanning over two lines",
      excerpt:
        "Suspendisse vitae enim in eros tristique ultricies eu placerat velit. Suspendisse vulputate id eros vitae.",
      image: blog3,
      category: "Sports",
      date: "1 mai 2023",
      link: "/blog/post-3",
    },
  ];

  return (
    <motion.div
      className="min-h-screen mt-16 md:mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Ain Saiss | Eau Minérale Naturelle</title>
        <meta
          name="description"
          content="Eau minérale naturelle pour une meilleure récupération pendant et après l'effort."
        />
        <link rel="preload" as="image" href={banner} />
        <link rel="preload" as="image" href={bannerMobile} />
      </Helmet>

      {/* Hero Section */}

      <motion.div
        className="relative py-6 sm:py-8 md:py-12 h-[30vh] sm:h-[35vh] md:h-[40vh] overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute h-full md:h-[90vh] w-full top-0 left-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img
            src={isMobile ? bannerMobile : banner}
            alt="Mountain landscape"
            className="w-full h-full object-cover object-bottom rounded-3xl"
            fetchPriority="high"
          />
        </motion.div>
        <div className="container flex flex-col justify-center items-center h-full mx-auto px-4 relative z-10">
          <motion.h1
            className="text-xl sm:text-3xl md:text-5xl lg:text-7xl text-[#0F67B1] font-normal text-center mb-2 sm:mb-3 md:mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {isMobile
              ? "Eau minérale naturelle, pour une meilleure récupération pendant et après l'effort."
              : "Nos dernières actualités"}
          </motion.h1>
          <motion.p
            className={`text-center ${
              isMobile ? "text-[#fff]" : "text-[#012645]"
            } font-normal text-sm sm:text-base md:text-lg lg:text-xl`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </motion.p>
        </div>
      </motion.div>

      {/* Blog Preview Section with Animations */}
      <div className="md:px-6">
        <BlogPreview
          blogPosts={blogPosts}
          showTitle={false}
          showSubtitle={false}
          showViewAllButton={false}
        />
      </div>

      {/* Animated Delivery Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: scrollY > 300 ? 1 : 0,
          y: scrollY > 300 ? 0 : 30,
        }}
        transition={{ duration: 0.6 }}
      >
        <DeliveryInfo />
      </motion.div>
    </motion.div>
  );
}

export default BlogPage;
