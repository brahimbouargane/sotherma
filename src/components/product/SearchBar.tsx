// components/products/SearchBar.tsx
import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

export const SearchBar = ({ searchQuery, onSearch }: SearchBarProps) => {
  return (
    <motion.div
      className="max-w-2xl mx-auto md:mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="relative">
        <motion.input
          type="text"
          placeholder="Rechercher un produit..."
          className="w-full py-3 bg-white text-[#11459D] px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0F67B1] focus:border-transparent"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          initial={{ width: "90%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5, delay: 0.7 }}
          whileFocus={{ boxShadow: "0 0 0 3px rgba(15, 103, 177, 0.2)" }}
        />
        <motion.div
          className="absolute right-3 top-3 text-[#11459D]"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.1 }}
        >
          <Search />
        </motion.div>
      </div>
    </motion.div>
  );
};
