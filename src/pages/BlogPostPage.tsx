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
import bannerBlog from "../assets/images/blog/blog-image.png";
import bodyBlog from "../assets/images/blog/blog-glas-water.png";
//icon
import facebook from "../assets/icons/facebook.svg";
import x from "../assets/icons/x.svg";
import linkedin from "../assets/icons/linkedin.svg";
import link from "../assets/icons/link.svg";
import { ChevronRight } from "lucide-react";

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
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
      <div className="min-h-screen mt-16 md:mt-20">
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

        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-10">
          {/* Breadcrumb */}
          <div className="flex items-center py-2 md:py-4 text-sm md:text-md text-[#0F67B1] overflow-x-auto">
            <Link
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              to="/"
              className="hover:underline whitespace-nowrap"
            >
              Blog
            </Link>{" "}
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4 mx-1 md:mx-2 flex-shrink-0" />
            <Link
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              to={`/category/${post.category.toLowerCase()}`}
              className="hover:underline font-bold whitespace-nowrap"
            >
              {post.category}
            </Link>
          </div>

          {/* Article Title */}
          <div className="mb-4 md:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F67B1] break-words">
              {post.title}
            </h1>
          </div>
        </div>

        {/* Main Image */}
        <div className="mx-auto px-4 sm:px-8 md:px-12 lg:px-20 mb-6 md:mb-8">
          <div className="rounded-xl md:rounded-3xl overflow-hidden shadow-md">
            <img
              src={bannerBlog}
              alt={post.title}
              className="w-full h-auto object-cover md:max-h-[780px]"
            />
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-8 font-sans text-gray-800">
          <div className="rounded-lg p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Introduction */}
            <div className="mb-6 md:mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F67B1] mb-4 md:mb-6">
                {post.introduction.title}
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
                suspendisse morbi eleifend faucibus eget vestibulum felis.
                Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.
                Mauris posuere vulputate arcu amet, vitae nisi, tellus
                tincidunt. At feugiat sapien varius id.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Eget quis mi enim, leo lacinia pharetra, semper. Eget in
                volutpat mollis at volutpat lectus velit, sed auctor. Porttitor
                fames arcu quis fusce augue enim. Quis at habitant diam at.
                Suscipit tristique risus, at donec. In turpis vel et quam
                imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.
              </p>
            </div>

            {/* Content Sections */}
            {post.sections?.map((section, index) => (
              <div key={index} className="mb-6 md:mb-8">
                {section.image && (
                  <div className="mb-3 md:mb-4">
                    <img
                      src={bodyBlog}
                      alt={section.caption || ""}
                      className="w-full h-auto rounded-lg"
                    />
                    <div className="text-xs sm:text-sm text-gray-600 mt-2 md:mt-4 pl-3 md:pl-4 border-l-2 border-black">
                      {section.caption}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <p className="text-xl sm:text-2xl text-[#0F67B1] leading-relaxed font-bold mb-4 md:mb-6">
              Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum,
              nulla odio nisl vitae. In aliquet pellentesque aenean hac
              vestibulum turpis mi bibendum diam. Tempor integer aliquam in
              vitae malesuada fringilla.
            </p>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
              Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet
              commodo consectetur convallis risus. Sed condimentum enim
              dignissim adipiscing faucibus consequat, urna. Viverra purus et
              erat auctor aliquam. Risus, volutpat vulputate posuere purus sit
              congue convallis aliquet. Arcu id augue ut feugiat donec porttitor
              neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem
              id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.
            </p>

            <div className="text-lg md:text-xl text-gray-700 mt-3 md:mt-4 pl-3 md:pl-4 border-l-2 border-black mb-4 md:mb-6">
              "Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim
              mauris id. Non pellentesque congue eget consectetur turpis.
              Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt
              aenean tempus."
            </div>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
              Tristique odio senectus nam posuere ornare leo metus, ultricies.
              Blandit duis ultricies vulputate morbi feugiat cras placerat elit.
              Aliquam tellus lorem sed ac. Montes, sed mattis pellentesque
              suscipit accumsan. Cursus viverra aenean magna risus elementum
              faucibus molestie pellentesque. Arcu ultricies sed mauris
              vestibulum.
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F67B1] mb-4 md:mb-6">
              Conclusion
            </h2>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
              Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus
              id scelerisque est ultricies ultricies. Duis est sit sed leo nisl,
              blandit elit sagittis. Quisque tristique consequat quam sed. Nisl
              at scelerisque amet nulla purus habitasse.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
              Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas
              condimentum mi massa. In tincidunt pharetra consectetur sed duis
              facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit
              dictum eget nibh tortor commodo cursus.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
              Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce
              aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare
              id morbi eget ipsum. Aliquam senectus neque ut id eget consectetur
              dictum. Donec posuere pharetra odio consequat scelerisque et, nunc
              tortor. Nulla adipiscing erat a erat. Condimentum lorem posuere
              gravida enim posuere cursus diam.
            </p>

            {/* Social Sharing */}
            <div className="border-b-2 border-blue-400 pb-4 sm:pb-6 md:pb-8 mt-8 md:mt-12">
              <p className="text-lg md:text-xl font-bold text-blue-700 mb-3 md:mb-4">
                Merci de partager:
              </p>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-600 transition p-2 rounded-full bg-[#F4F4F4]"
                    aria-label="Partager sur Twitter"
                  >
                    <img
                      src={link}
                      alt="ain sais link sotherma ghayt sidiharazam"
                      className="w-5 h-5 md:w-6 md:h-6"
                    />
                  </a>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 transition p-2 rounded-full bg-[#F4F4F4]"
                    aria-label="Partager sur Facebook"
                  >
                    <img
                      src={linkedin}
                      alt="ain sais link sotherma ghayt sidiharazam"
                      className="w-5 h-5 md:w-6 md:h-6"
                    />
                  </a>
                  <a
                    href="#"
                    className="text-blue-700 hover:text-blue-900 transition p-2 rounded-full bg-[#F4F4F4]"
                    aria-label="Partager sur LinkedIn"
                  >
                    <img
                      src={x}
                      alt="ain sais link sotherma ghayt sidiharazam"
                      className="w-5 h-5 md:w-6 md:h-6"
                    />
                  </a>
                  <a
                    href="#"
                    className="text-blue-700 hover:text-blue-900 transition p-2 rounded-full bg-[#F4F4F4]"
                    aria-label="Partager sur Pinterest"
                  >
                    <img
                      src={facebook}
                      alt="ain sais link sotherma ghayt sidiharazam"
                      className="w-5 h-5 md:w-6 md:h-6"
                    />
                  </a>
                </div>

                <div className="mt-3 sm:mt-0">
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-600 font-bold text-xs sm:text-sm rounded-full hover:bg-blue-200 cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div className="mt-4">
        <BlogPreview blogPosts={blogPosts} />
      </div>
      <DeliveryInfo />
    </>
  );
}

export default BlogPostPage;
