// components/products/FilterSidebar.tsx
import { motion } from "framer-motion";
import { ProductFilter } from "./ProductFilter";

interface FilterOption {
  id: string;
  name: string;
  logo?: string;
}

interface FilterSidebarProps {
  brandOptions: FilterOption[];
  formatOptions: FilterOption[];
  selectedBrands: string[];
  selectedFormats: string[];
  onToggleBrand: (brandId: string) => void;
  onToggleFormat: (formatId: string) => void;
  isBrandsOpen: boolean;
  isFormatsOpen: boolean;
  onToggleBrandsSection: () => void;
  onToggleFormatsSection: () => void;
  onResetFilters: () => void;
}

export const FilterSidebar = ({
  brandOptions,
  formatOptions,
  selectedBrands,
  selectedFormats,
  onToggleBrand,
  onToggleFormat,
  isBrandsOpen,
  isFormatsOpen,
  onToggleBrandsSection,
  onToggleFormatsSection,
  onResetFilters,
}: FilterSidebarProps) => {
  return (
    <motion.div
      className="hidden lg:block w-80 shrink-0"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="bg-white rounded-3xl shadow-sm p-6 mb-6">
        {/* Brands Filter */}
        <ProductFilter
          title="Marques"
          options={brandOptions}
          selectedOptions={selectedBrands}
          onToggleOption={onToggleBrand}
          isFilterOpen={isBrandsOpen}
          onToggleFilter={onToggleBrandsSection}
        />

        {/* Formats Filter */}
        <ProductFilter
          title="Format"
          options={formatOptions}
          selectedOptions={selectedFormats}
          onToggleOption={onToggleFormat}
          isFilterOpen={isFormatsOpen}
          onToggleFilter={onToggleFormatsSection}
        />

        {/* Reset Filters Button */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.2 }}
        >
          <motion.button
            onClick={onResetFilters}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-full transition-colors duration-200 font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Réinitialiser les filtres
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};
