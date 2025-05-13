// src/services/productService.ts
import axios, { AxiosInstance } from "axios";

// Define product-related types
export interface Product {
  id: number;
  nameEnglish: string;
  nameArabic?: string;
  nameFrench?: string;
  price: number;
  sku: string;
  brand?: string;
  status: boolean;
  lightDescriptionEnglish?: string;
  detailedDescriptionEnglish?: string;
  unit?: string;
  volume?: number;
  images?: any;
  categories?: Category[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductImage {
  id: number;
  name?: string;
  imageType?: string;
  url?: string;
}

export interface Category {
  id: number;
  nameEnglish: string;
  nameArabic?: string;
  nameFrench?: string;
  descriptionEnglish?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  empty: boolean;
}

export interface ProductQueryParams {
  query?: string;
  size?: number;
  page?: number;
  orderBy?: string;
  order?: "ASC" | "DESC";
  categoryId?: number;
  brands?: string; // Add this for brand filtering
}

class ProductService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "https://sidiharazem.ma/api",
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    // Add request interceptor for authentication
    this.api.interceptors.request.use(
      (config) => {
        const token =
          localStorage.getItem("auth_token") || sessionStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  /**
   * Get a paginated list of products
   */
  public async getProducts(
    params: ProductQueryParams = {}
  ): Promise<PaginatedResponse<Product>> {
    try {
      const response = await this.api.get("/products", {
        params: {
          query: params.query || "",
          size: params.size || 10,
          page: params.page || 0,
          orderBy: params.orderBy || "id",
          order: params.order || "ASC",
          categoryId: params.categoryId,
          brands: params.brands, // Add this parameter
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  /**
   * Get a single product by ID
   */
  public async getProductById(id: number): Promise<Product> {
    try {
      const response = await this.api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get products by category ID
   */
  public async getProductsByCategory(
    categoryId: number,
    params: Omit<ProductQueryParams, "categoryId"> = {}
  ): Promise<PaginatedResponse<Product>> {
    try {
      const response = await this.api.get(
        `/categories/${categoryId}/products`,
        {
          params: {
            query: params.query || "",
            size: params.size || 10,
            page: params.page || 0,
            orderBy: params.orderBy || "id",
            order: params.order || "ASC",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        `Error fetching products for category ${categoryId}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Get list of all categories
   */
  public async getCategories(): Promise<Category[]> {
    try {
      const response = await this.api.get("/categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  /**
   * Get a single category by ID
   */
  public async getCategoryById(id: number): Promise<Category> {
    try {
      const response = await this.api.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get related products for a specific product
   */
  public async getRelatedProducts(productId: number): Promise<Product[]> {
    try {
      const response = await this.api.get(`/products/${productId}/related`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching related products for ${productId}:`, error);
      throw error;
    }
  }

  /**
   * Search products by keyword
   */
  public async searchProducts(
    keyword: string,
    params: Omit<ProductQueryParams, "query"> = {}
  ): Promise<PaginatedResponse<Product>> {
    try {
      return await this.getProducts({
        ...params,
        query: keyword,
      });
    } catch (error) {
      console.error(`Error searching products with keyword ${keyword}:`, error);
      throw error;
    }
  }
}

const productService = new ProductService();
export default productService;
