import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Right from "../../assets/icons/Chevron Right.svg";

// BlogPost type definition
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  link: string;
}

// BlogPreview props interface
interface BlogPreviewProps {
  blogPosts: BlogPost[];
  title?: string;
  subtitle?: string;
  viewAllLink?: string;
  viewAllText?: string;
  showTitle?: boolean;
  showSubtitle?: boolean;
  showViewAllButton?: boolean;
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

const BlogPreview = ({
  blogPosts,
  title = "Nos dernières actualités",
  subtitle = "Restez informé de nos dernières nouvelles et événements",
  viewAllLink = "/blog",
  viewAllText = "Tous les articles",
  showTitle = true,
  showSubtitle = true,
  showViewAllButton = true,
}: BlogPreviewProps) => {
  return (
    <section className="py-12 ">
      <div className="mx-auto">
        {showTitle && (
          <motion.h2
            className="text-2xl md:text-7xl font-normal text-[#0F67B1] text-center mb-2"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
        )}

        {showSubtitle && (
          <motion.p
            className="text-gray-500 text-center mb-10 mt-8 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-6  md:px-12"
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
              <Link
                to={article.link}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="block"
              >
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="object-cover w-full h-40 md:h-72"
                />
              </Link>

              <div className="p-3 md:p-5">
                <div className="flex font-semibold items-center text-xs text-gray-500 mb-3">
                  <span className="mr-4 md:mr-3 bg-[#E0F4FC] px-2 md:px-4 py-2 rounded-full text-blue-700">
                    {article.category}
                  </span>
                  <span className="font-sans">{article.date}</span>
                </div>

                <Link
                  to={article.link}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="block"
                >
                  <h3 className="text-sm md:text-lg font-medium text-blue-600 mb-2 hover:text-blue-700 transition-colors">
                    {article.title}
                  </h3>
                </Link>

                <p className="text-gray-600 text-xs md:text-sm mb-4">
                  {article.excerpt}
                </p>

                <Link
                  to={article.link}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="text-blue-400 text-sm font-medium hover:text-blue-800 inline-flex  justify-center items-stretch"
                >
                  Read more
                  <img src={Right} alt="Right Arrow" className="ml-2 h-5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {showViewAllButton && (
          <div className="mt-8 text-center">
            <Link
              to={viewAllLink}
              className="inline-block text-white bg-blue-500 border border-primary text-primary font-medium py-2 px-6 rounded-full hover:bg-primary hover:text-white transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              {viewAllText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPreview;
