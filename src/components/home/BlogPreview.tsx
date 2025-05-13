// import { Link } from "@tanstack/react-router";
// import { motion } from "framer-motion";
// import { ChevronRight } from "lucide-react";
// import { useEffect, useState } from "react";

// // BlogPost type definition
// export interface BlogPost {
//   id: string;
//   title: string;
//   excerpt: string;
//   image: string;
//   category: string;
//   date: string;
//   link: string;
// }

// // BlogPreview props interface
// interface BlogPreviewProps {
//   blogPosts: BlogPost[];
//   title?: string;
//   subtitle?: string;
//   viewAllLink?: string;
//   viewAllText?: string;
//   showTitle?: boolean;
//   showSubtitle?: boolean;
//   showViewAllButton?: boolean;
// }

// const container = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const item = {
//   hidden: { opacity: 0, y: 20 },
//   show: { opacity: 1, y: 0 },
// };

// const BlogPreview = ({
//   blogPosts,
//   title = "Nos dernières actualités",
//   subtitle = "Restez informé de nos dernières nouvelles et événements",
//   viewAllLink = "/blog",
//   viewAllText = "Tous les articles",
//   showTitle = true,
//   showSubtitle = true,
//   showViewAllButton = true,
// }: BlogPreviewProps) => {
//   // State to track window width
//   const [isMobile, setIsMobile] = useState(false);

//   // Effect to handle window resize and set mobile state
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     // Initial check
//     handleResize();

//     // Add event listener
//     window.addEventListener("resize", handleResize);

//     // Cleanup
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   // Display only the first two posts on mobile
//   const displayedPosts = isMobile ? blogPosts.slice(0, 2) : blogPosts;

//   return (
//     <section className="py-12">
//       <div className="mx-auto">
//         {showTitle && (
//           <motion.h2
//             className="text-2xl md:text-7xl font-normal text-[#0F67B1] text-center mb-2"
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             {title}
//           </motion.h2>
//         )}

//         {showSubtitle && (
//           <motion.p
//             className="text-gray-500 text-center mb-10 mt-8 text-lg"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.2 }}
//           >
//             {subtitle}
//           </motion.p>
//         )}

//         <motion.div
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:px-12"
//           variants={container}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//         >
//           {displayedPosts.map((article) => (
//             <motion.article
//               key={article.id}
//               className="bg-white border border-blue-500 rounded-3xl overflow-hidden shadow-sm"
//               variants={item}
//             >
//               <Link
//                 to={article.link}
//                 onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//                 className="block"
//               >
//                 <img
//                   src={article.image || "/placeholder.svg"}
//                   alt={article.title}
//                   className="object-cover w-full h-40 md:h-72"
//                 />
//               </Link>

//               <div className="p-3 md:p-5">
//                 <div className="flex font-semibold items-center text-xs text-gray-500 mb-3">
//                   <span className="mr-4 md:mr-3 bg-[#E0F4FC] px-2 md:px-4 py-2 rounded-full text-blue-700">
//                     {article.category}
//                   </span>
//                   <span className="font-sans">{article.date}</span>
//                 </div>

//                 <Link
//                   to={article.link}
//                   onClick={() =>
//                     window.scrollTo({ top: 0, behavior: "smooth" })
//                   }
//                   className="block"
//                 >
//                   <h3 className="text-sm md:text-lg font-medium text-blue-600 mb-2 hover:text-blue-700 transition-colors">
//                     {article.title}
//                   </h3>
//                 </Link>

//                 <p className="text-gray-600 text-xs md:text-sm mb-4">
//                   {article.excerpt}
//                 </p>

//                 <Link
//                   to={article.link}
//                   onClick={() =>
//                     window.scrollTo({ top: 0, behavior: "smooth" })
//                   }
//                   className="text-blue-400 text-sm font-medium hover:text-blue-800 inline-flex items-center"
//                 >
//                   Read more
//                   <ChevronRight className="ml-1 h-4 w-4" />
//                 </Link>
//               </div>
//             </motion.article>
//           ))}
//         </motion.div>

//         {showViewAllButton && (
//           <div className="mt-8 text-center">
//             <Link
//               to={viewAllLink}
//               className="inline-block bg-blue-500 text-white font-medium py-2 px-6 rounded-full hover:bg-blue-600 transition-colors"
//               onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//             >
//               {viewAllText}
//             </Link>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default BlogPreview;
import React from "react";
import { motion } from "framer-motion";
import { BlogPost } from "../../types/blog.types";

interface BlogPreviewProps {
  blogPosts: BlogPost[];
  showTitle?: boolean;
  showSubtitle?: boolean;
  showViewAllButton?: boolean;
}

const BlogPostCard: React.FC<{ post: BlogPost; index: number }> = ({
  post,
  index,
}) => {
  return (
    <motion.div
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: Math.min(0.1 * index, 0.8), // Cap max delay to 0.8s for better UX
        ease: "easeOut",
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
    >
      <a href="blog/1" className="block">
        <div className="relative overflow-hidden h-48 md:h-56">
          <motion.img
            src={post.image}
            alt={`Featured image for: ${post.title}`}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            loading="lazy"
          />
        </div>
        <div className="p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-[#E0F4FC] backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-default">
              {post.category}
            </div>
            <time
              dateTime={post.date.replace(/\s/g, "-")}
              className="text-gray-500 text-xs"
            >
              {post.date}
            </time>
          </div>
          <h3 className="text-primary-default font-medium text-lg md:text-xl mb-2 line-clamp-2 group-hover:text-[#012645] transition-colors duration-300">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>

          <motion.div
            className="mt-4 text-[#0F67B1] text-sm font-medium flex items-center"
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            Lire l'article
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 group-hover:ml-2 transition-all duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.div>
        </div>
      </a>
    </motion.div>
  );
};

const BlogPreview: React.FC<BlogPreviewProps> = ({
  blogPosts,
  showTitle = true,
  showSubtitle = true,
  showViewAllButton = true,
}) => {
  return (
    <section className="container mx-auto px-4 py-10 md:py-16">
      {showTitle && (
        <motion.h2
          className="text-3xl md:text-5xl text-center text-primary-default font-normal mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Nos dernières actualités
        </motion.h2>
      )}

      {showSubtitle && (
        <motion.p
          className="text-center text-[#012645] font-normal text-sm md:text-base mb-8 md:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Découvrez nos derniers articles et conseils
        </motion.p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {blogPosts.map((post, index) => (
          <BlogPostCard key={post.id} post={post} index={index} />
        ))}
      </div>

      {showViewAllButton && (
        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="/blog"
            className="inline-block px-8 py-3 md:text-2xl border border-[#37AFE1] text-white bg-[#37AFE1] hover:bg-[#012645] hover:text-white hover:scale-105 transition-all duration-300  rounded-full"
            aria-label="View all blog posts"
          >
            Voir tous les articles
          </a>
        </motion.div>
      )}
    </section>
  );
};

export default BlogPreview;
