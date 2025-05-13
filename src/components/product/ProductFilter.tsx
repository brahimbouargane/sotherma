// components/products/ProductFilter.tsx
import { motion, AnimatePresence } from "framer-motion";

interface FilterOption {
  id: string;
  name: string;
  logo?: string;
}

interface ProductFilterProps {
  title: string;
  options: FilterOption[];
  selectedOptions: string[];
  onToggleOption: (optionId: string) => void;
  isFilterOpen: boolean;
  onToggleFilter: () => void;
}

export const ProductFilter = ({
  title,
  options,
  selectedOptions,
  onToggleOption,
  isFilterOpen,
  onToggleFilter,
}: ProductFilterProps) => {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      {/* Clickable header */}
      <div
        className="flex items-center justify-between mb-4 cursor-pointer"
        onClick={onToggleFilter}
      >
        <h3 className="font-medium text-[#0F67B1] text-lg">{title}</h3>
        <motion.svg
          className="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isFilterOpen ? 0 : -180 }}
          transition={{ duration: 0.3 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </div>

      {/* Content with animation */}
      <AnimatePresence initial={false}>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, overflow: "hidden" }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.3, ease: "easeOut" },
                opacity: { duration: 0.2, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: "easeIn" },
                opacity: { duration: 0.2 },
              },
            }}
          >
            <div className="space-y-5">
              {options.map((option, index) => (
                <motion.div
                  key={option.id}
                  className="flex items-center py-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.5 + index * 0.1,
                  }}
                >
                  <motion.input
                    type="checkbox"
                    id={`desktop-${title.toLowerCase()}-${option.id}`}
                    checked={selectedOptions.includes(option.id)}
                    onChange={() => onToggleOption(option.id)}
                    className="h-5 w-5 text-[#0F67B1] focus:ring-[#0F67B1] border-gray-300 rounded-3xl"
                    whileTap={{ scale: 1.2 }}
                  />
                  <motion.label
                    htmlFor={`desktop-${title.toLowerCase()}-${option.id}`}
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {option.logo ? (
                      <img
                        src={option.logo || "/placeholder.svg"}
                        alt={option.name}
                        width={90}
                        height={45}
                        className="ml-10"
                      />
                    ) : (
                      <span className="ml-3 text-base text-gray-700">
                        {option.name}
                      </span>
                    )}
                  </motion.label>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
