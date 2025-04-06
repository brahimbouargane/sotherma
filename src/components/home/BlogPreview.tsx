import { Link } from "@tanstack/react-router";

// BlogPost type definition
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  link: string;
}

const BlogPreview = () => {
  // Sample blog posts based on the design
  const blogPosts: BlogPost[] = [
    {
      id: "post-1",
      title: "Blog title heading will go here neatly spanning over two lines",
      excerpt:
        "Suspendisse vitae enim in eros tristique ultricies eu placerat velit. Suspendisse vulputate id eros vitae.",
      image: "/src/assets/images/blog/post-1.jpg",
      category: "Lifestyle",
      date: "5 mai 2023",
      link: "/blog/post-1",
    },
    {
      id: "post-2",
      title: "Blog title heading will go here neatly spanning over two lines",
      excerpt:
        "Suspendisse vitae enim in eros tristique ultricies eu placerat velit. Suspendisse vulputate id eros vitae.",
      image: "/src/assets/images/blog/post-2.jpg",
      category: "Santé",
      date: "3 mai 2023",
      link: "/blog/post-2",
    },
    {
      id: "post-3",
      title: "Blog title heading will go here neatly spanning over two lines",
      excerpt:
        "Suspendisse vitae enim in eros tristique ultricies eu placerat velit. Suspendisse vulputate id eros vitae.",
      image: "/src/assets/images/blog/post-3.jpg",
      category: "Sports",
      date: "1 mai 2023",
      link: "/blog/post-3",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
          Nos dernières actualités
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to={post.link}
              className="bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{post.category}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="text-primary font-medium text-sm inline-flex items-center">
                  Read more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/blog"
            className="inline-block bg-white border border-primary text-primary font-medium py-2 px-6 rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            Tous les articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
