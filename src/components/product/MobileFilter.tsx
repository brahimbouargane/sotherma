// components/products/MobileFilter.tsx
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { filterButtonVariants } from "./animationVariants";

interface FilterOption {
  id: string;
  name: string;
  logo?: string;
}

interface MobileFilterProps {
  title: string;
  options: FilterOption[];
  selectedOptions: string[];
  onToggleOption: (optionId: string) => void;
  isActive: boolean;
  onToggle: () => void;
  onApplyFilters: () => void;
}

export const MobileFilter = ({
  title,
  options,
  selectedOptions,
  onToggleOption,
  isActive,
  onToggle,
  onApplyFilters,
}: MobileFilterProps) => {
  return (
    <>
      <motion.button
        onClick={onToggle}
        className="flex items-center justify-center px-6 py-3 rounded-full shadow-sm border border-[#0F67B1]"
        variants={filterButtonVariants}
        initial="initial"
        animate={isActive ? "active" : "inactive"}
        whileHover="hover"
        whileTap="tap"
      >
        <span>{title}</span>
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-2"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.button>

      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden w-full"
        >
          <h3 className="font-medium text-[#0F67B1] text-lg mb-4">{title}</h3>
          <div className="space-y-5">
            {options.map((option, index) => (
              <motion.div
                key={option.id}
                className="flex items-center py-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <motion.input
                  type="checkbox"
                  id={`mobile-${title.toLowerCase()}-${option.id}`}
                  checked={selectedOptions.includes(option.id)}
                  onChange={() => onToggleOption(option.id)}
                  className="h-5 w-5 text-[#0F67B1] focus:ring-[#0F67B1] border-gray-300 rounded-3xl"
                  whileTap={{ scale: 1.2 }}
                />
                <motion.label
                  htmlFor={`mobile-${title.toLowerCase()}-${option.id}`}
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                >
                  {option.logo ? (
                    <img
                      src={option.logo || "/placeholder.svg"}
                      alt={option.name}
                      width={90}
                      height={45}
                      className="ml-8"
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

          <motion.div className="mt-6">
            <motion.button
              onClick={onApplyFilters}
              className="w-full bg-[#0F67B1] text-white py-3 px-4 rounded-full transition-colors duration-200 font-medium"
              whileHover={{ scale: 1.02, backgroundColor: "#0d4f91" }}
              whileTap={{ scale: 0.98 }}
            >
              Appliquer les filtres
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
