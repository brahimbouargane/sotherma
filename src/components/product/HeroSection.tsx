// components/products/HeroSection.tsx
import { motion } from "framer-motion";
import { SearchBar } from "./SearchBar";

interface HeroSectionProps {
  banner: string;
  searchQuery: string;
  onSearch: (query: string) => void;
}

export const HeroSection = ({
  banner,
  searchQuery,
  onSearch,
}: HeroSectionProps) => {
  return (
    <motion.div
      className="relative bg-blue-50 mt-16 md:mt-20 py-12 h-[40vh] overflow-hidden rounded-3xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <img
          src={banner}
          alt="Mountains background"
          className="object-cover h-full w-full"
        />
      </motion.div>
      <motion.div
        className="mt-10 md:mt-14 mx-auto px-4 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h1
          className="text-2xl font-semibold lg:text-7xl text-[#0F67B1] text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Tous les produits
        </motion.h1>
        <SearchBar searchQuery={searchQuery} onSearch={onSearch} />
      </motion.div>
    </motion.div>
  );
};
