import { useState, useEffect } from "react";
import DeliveryInfo from "../components/home/DeliveryInfo";
import banner from "../assets/images/mask-hero-seaction.png";
import bannerMobile from "../assets/images/hero-original-image.png"; // Import mobile banner
import BlogPreview, { BlogPost } from "../components/home/BlogPreview";
import blog1 from "../assets/images/blog/blog-1.png";
import blog2 from "../assets/images/blog/blog-2.png";
import blog3 from "../assets/images/blog/blog-3.png";
import { Helmet } from "react-helmet-async";

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

function BlogPage() {
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
    <div className="min-h-screen">
      <Helmet>
        <title>Ain Saiss | Eau Minérale Naturelle</title>
        <meta
          name="description"
          content="Eau minérale naturelle pour une meilleure récupération pendant et après l'effort."
        />
      </Helmet>
      {/* Hero Section */}
      <div className="relative  py-6 sm:py-8 md:py-12 h-[30vh] sm:h-[35vh] md:h-[40vh] overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl ">
        {/* <div className="absolute inset-0 z-0">
          <img
            src={isMobile ? bannerMobile : banner}
            alt="Mountains background"
            className="object-cover  h-full w-full"
          />
        </div> */}
        <div className="absolute h-full md:h-[90vh] w-full top-0 left-0 z-0 ">
          <img
            src={isMobile ? bannerMobile : banner}
            alt="Mountain landscape"
            className="w-full h-full object-cover object-bottom rounded-3xl"
          />
        </div>
        <div className="container mt-4 sm:mt-6 md:mt-10 lg:mt-14 mx-auto px-4 relative z-10">
          <h1
            className="text-xl sm:text-3xl md:text-5xl lg:text-7xl 
              text-[#0F67B1] font-normal text-center mb-2 sm:mb-3 md:mb-4"
          >
            {isMobile
              ? "Eau minérale naturelle, pour une meilleure récupération pendant et après l'effort."
              : "Nos dernières actualités"}
          </h1>
          <p
            className={`text-center ${
              isMobile ? "text-[#fff]" : "text-[#012645]"
            } font-normal text-sm sm:text-base md:text-lg lg:text-xl`}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>

      {/* Blog Preview Section */}
      <div className=" md:px-6">
        <BlogPreview
          blogPosts={blogPosts}
          showTitle={false}
          showSubtitle={false}
          showViewAllButton={false}
        />
      </div>

      {/* Delivery Info Section */}
      <DeliveryInfo />
    </div>
  );
}

export default BlogPage;
