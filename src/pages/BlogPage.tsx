import DeliveryInfo from "../components/home/DeliveryInfo";
import banner from "../assets/images/banner-products.png";
import BlogPreview, { BlogPost } from "../components/home/BlogPreview";
import blog1 from "../assets/images/blog/blog-1.png";
import blog2 from "../assets/images/blog/blog-2.png";
import blog3 from "../assets/images/blog/blog-3.png";

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
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="relative bg-blue-50 py-12 h-[40vh] overflow-hidden rounded-3xl">
        <div className="absolute inset-0 z-0">
          <img
            src={banner}
            alt="Mountains background"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="container mt-10 md:mt-14 mx-auto px-4 relative z-10">
          <h1 className="text-2xl lg:text-7xl text-[#0F67B1] font-normal text-center mb-4">
            Nos dernières actualités
          </h1>
          <p className="text-center text-[#012645] font-normal text-lg md:text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          </p>
        </div>
      </div>
      <BlogPreview
        blogPosts={blogPosts}
        showTitle={false}
        showSubtitle={false}
        showViewAllButton={false}
      />
      <DeliveryInfo />
    </div>
  );
}

export default BlogPage;
