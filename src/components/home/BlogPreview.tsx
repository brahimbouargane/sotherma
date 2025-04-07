import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import blog1 from "../../assets/images/blog/blog-1.png";
import blog2 from "../../assets/images/blog/blog-2.png";
import blog3 from "../../assets/images/blog/blog-3.png";
import Right from "../../assets/icons/Chevron Right.svg";

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
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const BlogPreview = () => {
  // Sample blog posts based on the design
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

  return (
    <section className="py-12 ">
      <div className="mx-auto">
        <motion.h2
          className="text-2xl md:text-5xl font-normal text-blue-700 text-center mb-2"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Nos dernières actualités
        </motion.h2>

        <motion.p
          className="text-gray-500 text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Restez informé de nos dernières nouvelles et événements
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 px-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {blogPosts.map((article) => (
            <motion.article
              key={article.id}
              className="bg-white border border-blue-500 rounded-3xl overflow-hidden shadow-sm"
              variants={item}
            >
              <Link to={article.link} className="block">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="object-fill w-full h-72"
                />
              </Link>

              <div className="p-5">
                <div className="flex font-semibold items-center text-xs text-gray-500 mb-3">
                  <span className="mr-3 bg-[#E0F4FC] px-4 py-2 rounded-full text-blue-700">
                    {article.category}
                  </span>
                  <span className="font-sans">{article.date}</span>
                </div>

                <Link to={article.link} className="block">
                  <h3 className="text-lg font-medium text-blue-600 mb-2 hover:text-blue-700 transition-colors">
                    {article.title}
                  </h3>
                </Link>

                <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>

                <Link
                  to={article.link}
                  className="text-blue-400 text-sm font-medium hover:text-blue-800 inline-flex items-center justify-center"
                >
                  Read more
                  <img src={Right} alt="Right Arrow" className="ml-2 h-5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-8 text-center">
          <Link
            to="/blog"
            className="inline-block text-white bg-blue-500 border border-primary text-primary font-medium py-2 px-6 rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            Tous les articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
