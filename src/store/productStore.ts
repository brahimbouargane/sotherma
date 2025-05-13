// src/features/products/productStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import productService, {
  Product,
  ProductQueryParams,
  Category,
} from "../lib/api/productService";

interface ProductState {
  // Products state
  products: Product[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    number: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };

  // Selected product
  selectedProduct: Product | null;
  isLoadingProduct: boolean;
  productError: string | null;

  // Categories
  categories: Category[];
  isLoadingCategories: boolean;
  categoriesError: string | null;

  // Search and filter state
  searchTerm: string;
  selectedCategory: number | null;
  sortBy: string;
  sortOrder: "ASC" | "DESC";

  // Actions
  fetchProducts: (params?: ProductQueryParams) => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchProductsByCategory: (categoryId: number) => Promise<void>;
  searchProducts: (keyword: string) => Promise<void>;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (categoryId: number | null) => void;
  setSorting: (field: string, order: "ASC" | "DESC") => void;
  clearErrors: () => void;
}

export const useProductStore = create<ProductState>()(
  devtools(
    (set, get) => ({
      // Products state
      products: [],
      isLoading: false,
      error: null,
      pagination: {
        number: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0,
      },

      // Selected product
      selectedProduct: null,
      isLoadingProduct: false,
      productError: null,

      // Categories
      categories: [],
      isLoadingCategories: false,
      categoriesError: null,

      // Search and filter state
      searchTerm: "",
      selectedCategory: null,
      sortBy: "id",
      sortOrder: "ASC",

      // Fetch products with optional query parameters
      fetchProducts: async (params: ProductQueryParams = {}) => {
        try {
          set({ isLoading: true, error: null });

          // Use current state for any parameters not explicitly provided
          const currentState = get();
          const queryParams: ProductQueryParams = {
            query: params.query ?? currentState.searchTerm,
            page: params.page ?? currentState.pagination.number,
            size: params.size ?? currentState.pagination.size,
            orderBy: params.orderBy ?? currentState.sortBy,
            order: params.order ?? currentState.sortOrder,
            categoryId:
              params.categoryId ?? currentState.selectedCategory ?? undefined,
            brands: params.brands,
          };

          const response = await productService.getProducts(queryParams);

          set({
            products: response.content,
            pagination: {
              number: response.number,
              size: response.size,
              totalPages: response.totalPages,
              totalElements: response.totalElements,
            },
            isLoading: false,
          });
        } catch (error) {
          console.error("Error in fetchProducts:", error);
          set({
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch products",
          });
        }
      },

      // Fetch a single product by ID
      fetchProductById: async (id: number) => {
        try {
          set({ isLoadingProduct: true, productError: null });

          const product = await productService.getProductById(id);

          set({
            selectedProduct: product,
            isLoadingProduct: false,
          });
        } catch (error) {
          console.error(`Error in fetchProductById for ID ${id}:`, error);
          set({
            isLoadingProduct: false,
            productError:
              error instanceof Error
                ? error.message
                : `Failed to fetch product #${id}`,
          });
        }
      },

      // Fetch all categories
      fetchCategories: async () => {
        try {
          set({ isLoadingCategories: true, categoriesError: null });

          const categories = await productService.getCategories();

          set({
            categories,
            isLoadingCategories: false,
          });
        } catch (error) {
          console.error("Error in fetchCategories:", error);
          set({
            isLoadingCategories: false,
            categoriesError:
              error instanceof Error
                ? error.message
                : "Failed to fetch categories",
          });
        }
      },

      // Fetch products by category ID
      fetchProductsByCategory: async (categoryId: number) => {
        try {
          set({ isLoading: true, error: null, selectedCategory: categoryId });

          const currentState = get();
          const response = await productService.getProductsByCategory(
            categoryId,
            {
              page: currentState.pagination.number,
              size: currentState.pagination.size,
              orderBy: currentState.sortBy,
              order: currentState.sortOrder,
              query: currentState.searchTerm,
            }
          );

          set({
            products: response.content,
            pagination: {
              number: response.number,
              size: response.size,
              totalPages: response.totalPages,
              totalElements: response.totalElements,
            },
            isLoading: false,
          });
        } catch (error) {
          console.error(
            `Error in fetchProductsByCategory for ID ${categoryId}:`,
            error
          );
          set({
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : `Failed to fetch products for category #${categoryId}`,
          });
        }
      },

      // Search products by keyword
      searchProducts: async (keyword: string) => {
        try {
          set({ isLoading: true, error: null, searchTerm: keyword });

          const currentState = get();
          const response = await productService.searchProducts(keyword, {
            page: currentState.pagination.number,
            size: currentState.pagination.size,
            orderBy: currentState.sortBy,
            order: currentState.sortOrder,
            categoryId: currentState.selectedCategory ?? undefined,
          });

          set({
            products: response.content,
            pagination: {
              number: response.number,
              size: response.size,
              totalPages: response.totalPages,
              totalElements: response.totalElements,
            },
            isLoading: false,
          });
        } catch (error) {
          console.error(
            `Error in searchProducts with keyword "${keyword}":`,
            error
          );
          set({
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : `Failed to search products with term "${keyword}"`,
          });
        }
      },

      // Update search term (without triggering API call)
      setSearchTerm: (term: string) => {
        set({ searchTerm: term });
      },

      // Update selected category (without triggering API call)
      setSelectedCategory: (categoryId: number | null) => {
        set({ selectedCategory: categoryId });
      },

      // Update sorting (without triggering API call)
      setSorting: (field: string, order: "ASC" | "DESC") => {
        set({ sortBy: field, sortOrder: order });
      },

      // Clear all errors
      clearErrors: () => {
        set({ error: null, productError: null, categoriesError: null });
      },
    }),
    { name: "ProductStore" } // Name for the devtools
  )
);
export default useProductStore;
