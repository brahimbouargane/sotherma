import { useState, useEffect } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";

//compionnets
import BlogPreview, { BlogPost } from "../components/home/BlogPreview";
import DeliveryInfo from "../components/home/DeliveryInfo";

//services
import { getBlogPostBySlug, BlogPostOne } from "../store/blogService";

//images
import blog1 from "../assets/images/blog/blog-1.png";
import blog2 from "../assets/images/blog/blog-2.png";
import blog3 from "../assets/images/blog/blog-3.png";
//icon
import facebook from "../assets/icons/facebook.svg";
import x from "../assets/icons/x.svg";
import linkedin from "../assets/icons/linkedin.svg";
import link from "../assets/icons/link.svg";

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

function BlogPostPage() {
  const { postId } = useParams({ from: "/blog/$postId" });
  const [post, setPost] = useState<BlogPostOne | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log(postId);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // Assuming postId could be either a slug or numeric ID
        // You might need to adjust this based on your actual data structure
        const data = await getBlogPostBySlug(postId);
        if (data) {
          setPost(data);
        } else {
          setError("Article non trouvé");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Une erreur est survenue lors du chargement de l'article");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  // Loading state
  if (loading) {
    return (
      <div className="bg-blue-50/50 min-h-screen flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-40 bg-blue-200 rounded mb-4"></div>
          <div className="h-6 w-64 bg-blue-100 rounded"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div className="bg-blue-50/50 min-h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            {error || "Article non trouvé"}
          </h2>
          <p className="text-gray-600 mb-6">
            Nous n'avons pas pu trouver l'article que vous recherchez.
          </p>
          <Link
            to="/blog"
            className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
          >
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className=" min-h-screen">
        {/* SEO */}
        <Helmet>
          <title>{post.title} | Ain Saiss Blog</title>
          <meta
            name="description"
            content={post.introduction.content.substring(0, 160)}
          />
          <meta property="og:title" content={post.title} />
          <meta
            property="og:description"
            content={post.introduction.content.substring(0, 160)}
          />
          <meta property="og:image" content={post.mainImage} />
          <meta property="og:type" content="article" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.title} />
          <meta
            name="twitter:description"
            content={post.introduction.content.substring(0, 160)}
          />
          <meta name="twitter:image" content={post.mainImage} />
        </Helmet>

        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4 text-sm text-blue-600">
          <Link to="/" className="hover:underline">
            Blog
          </Link>{" "}
          /{" "}
          <Link
            to={`/category/${post.category.toLowerCase()}`}
            className="hover:underline"
          >
            {post.category}
          </Link>
        </div>

        {/* Article Title */}
        <div className="container mx-auto px-4 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700">
            {post.title}
          </h1>
          <p className="text-gray-500 mt-2">{post.publishDate}</p>
        </div>

        {/* Main Image */}
        <div className="container mx-auto px-4 mb-8">
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src={post.mainImage}
              alt={post.title}
              className="w-full h-auto object-cover max-h-[400px]"
            />
          </div>
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-4 pb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            {/* Introduction */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                {post.introduction.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {post.introduction.content}
              </p>
            </div>

            {/* Content Sections */}
            {post.sections.map((section, index) => (
              <div key={index} className="mb-8">
                {section.title && (
                  <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                    {section.title}
                  </h2>
                )}

                {section.image && (
                  <div className="mb-4">
                    <img
                      src={section.image}
                      alt={section.caption || ""}
                      className="w-full h-auto rounded-lg"
                    />
                    {section.caption && (
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        {section.caption}
                      </p>
                    )}
                  </div>
                )}

                <p className="text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}

            {/* Conclusion */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                {post.conclusion.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {post.conclusion.content}
              </p>
            </div>

            {/* Author Info */}
            <div className="border-t border-gray-200 pt-6 mt-8">
              <div className="flex items-center">
                <img
                  src={post.author.image}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">
                    Écrit par {post.author.name}
                  </p>
                  <p className="text-sm text-gray-600">{post.author.bio}</p>
                </div>
              </div>
            </div>

            {/* Social Sharing */}
            <div className="border-t border-gray-200 pt-6 mt-8">
              <p className="text-sm text-gray-600 mb-2">Merci de partager:</p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-600 transition"
                  aria-label="Partager sur Twitter"
                >
                  <img
                    src={link}
                    alt="ain sais link sotherma ghayt sidiharazam"
                  />
                </a>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 transition"
                  aria-label="Partager sur Facebook"
                >
                  <img
                    src={linkedin}
                    alt="ain sais link sotherma ghayt sidiharazam"
                  />
                </a>
                <a
                  href="#"
                  className="text-blue-700 hover:text-blue-900 transition"
                  aria-label="Partager sur LinkedIn"
                >
                  <img src={x} alt="ain sais link sotherma ghayt sidiharazam" />
                </a>
                <a
                  href="#"
                  className="text-red-600 hover:text-red-800 transition"
                  aria-label="Partager sur Pinterest"
                >
                  <img
                    src={facebook}
                    alt="ain sais link sotherma ghayt sidiharazam"
                  />
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
      <BlogPreview blogPosts={blogPosts} />
      <DeliveryInfo />
    </>
  );
}

export default BlogPostPage;
