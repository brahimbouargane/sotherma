// src/services/orderService.ts
import axios, { AxiosInstance } from "axios";
import { Product } from "./productService";
import { AddressDTO } from "./client";

// Define order-related types
export interface Order {
  id: number;
  orderNumber: string;
  status: OrderStatus;
  paymentMode: PaymentMode;
  comment?: string;
  createdAt?: string;
  updatedAt?: string;
  client?: User;
  agent?: User;
  address?: Address;
  items: OrderItem[];
  totalAmount: number;
}

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum PaymentMode {
  CASH = "CASH",
  CREDIT_CARD = "CREDIT_CARD",
  PAYPAL = "PAYPAL",
  BANK_TRANSFER = "BANK_TRANSFER",
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface Address {
  id: number;
  houseNumber?: string | null;
  street: string;
  addressType: string;
  region: {
    id: number;
    name: string;
  };
  city: {
    id: number;
    name: string;
  };
  zone: {
    id: number;
    name: string;
  };
}

export interface Zone {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  zones: Zone[];
}

export interface Region {
  id: number;
  name: string;
  cities: City[];
}

export interface PaginatedOrderResponse {
  content: Order[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  empty: boolean;
}

export interface OrderQueryParams {
  page?: number;
  size?: number;
  status?: OrderStatus;
  fromDate?: string;
  toDate?: string;
}

export interface CreateOrderRequest {
  addressId: number;
  items: {
    productId: number;
    quantity: number;
  }[];
  paymentMode: PaymentMode;
  comment?: string;
}

export interface CustomerDetails {
  originWebsite: any;
  birthDate: any;
  civility: any;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  enabled: boolean;
  address: string;
  roles: string[];
  addresses: Address[];
}

export interface DetailedAddressDTO {
  id: number;
  street: string;
  houseNumber?: string | null;
  addressType: string;
  region: {
    id: number;
  };
  city: {
    id: number;
  };
  zone: {
    id: number;
  };
}

export interface CustomerUpdateDTO {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  addresses?: DetailedAddressDTO[];
  civility?: string;
  birthDate?: string;
  originWebsite?: string;
  email?: string;
  password?: string;
}

class OrderService {
  private api: AxiosInstance;
  private authToken: string | null = null;

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
        // Check for token in both localStorage and sessionStorage
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          this.authToken = token;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor to handle auth errors
    this.api.interceptors.response.use(
      (response) => response,
      (error: any) => {
        if (error.response?.status === 403) {
          console.error(
            "Access forbidden. You might need to log in again.",
            error
          );
          // You could trigger a re-authentication here
        }
        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    console.log();
    return (
      localStorage.getItem("auth_token") ||
      localStorage.getItem("token") ||
      sessionStorage.getItem("auth_token") ||
      sessionStorage.getItem("token")
    );
  }

  /**
   * Check if the user is authenticated
   */
  public isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  /**
   * Get all orders for the current authenticated user
   */
  public async getUserOrders(
    params: OrderQueryParams = {}
  ): Promise<PaginatedOrderResponse> {
    try {
      if (!this.isAuthenticated()) {
        throw new Error("User is not authenticated");
      }

      const response = await this.api.get("/orders", {
        params: {
          page: params.page || 0,
          size: params.size || 10,
          status: params.status,
          fromDate: params.fromDate,
          toDate: params.toDate,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching user orders:", error);
      throw error;
    }
  }

  /**
   * Get a specific order by ID
   */
  public async getOrderById(id: number): Promise<Order> {
    try {
      const response = await this.api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error);
      throw error;
    }
  }
  /**
   * Create a new order
   */
  public async createOrder(orderData: any): Promise<Order> {
    try {
      const response = await this.api.post("/orders", orderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  /**
   * Cancel an existing order
   */
  public async cancelOrder(id: number, reason?: string): Promise<Order> {
    try {
      const response = await this.api.post(`/orders/${id}/cancel`, { reason });
      return response.data;
    } catch (error) {
      console.error(`Error cancelling order ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get order history/status updates
   */
  public async getOrderHistory(orderId: number): Promise<any[]> {
    try {
      const response = await this.api.get(`/orders/${orderId}/history`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching history for order ${orderId}:`, error);
      throw error;
    }
  }

  /**
   * Get customer details including addresses
   */
  public async getCustomerDetails(
    customerId: number
  ): Promise<CustomerDetails> {
    try {
      if (!this.isAuthenticated()) {
        throw new Error("User is not authenticated");
      }
      const response = await this.api.get(`/customers/${customerId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching customer details for ID ${customerId}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Update customer details including adding new addresses
   */
  public async updateCustomer(
    customerId: number,
    customerData: CustomerUpdateDTO
  ): Promise<CustomerDetails> {
    try {
      // First, get the current customer data to ensure we have all fields
      const currentCustomer = await this.getCustomerDetails(customerId);

      // Create a complete update payload by merging current customer data with updates
      // This ensures we don't lose any existing fields
      const completeUpdatePayload = {
        // Keep all current customer fields
        firstName: currentCustomer.firstName,
        lastName: currentCustomer.lastName,
        email: currentCustomer.email,
        phoneNumber: currentCustomer.phoneNumber,
        civility: currentCustomer.civility,
        birthDate: currentCustomer.birthDate,
        originWebsite: currentCustomer.originWebsite,

        // Merge with the requested updates
        ...customerData,
      };

      // Make the update request with complete data
      const response = await this.api.put(
        `/customers/${customerId}`,
        completeUpdatePayload
      );

      return response.data;
    } catch (error) {
      console.error(`Error updating customer ${customerId}:`, error);
      throw error;
    }
  }

  /**
   * Add a new address for the customer preserving all existing customer data
   */
  public async addAddress(
    customerId: number,
    addressData: any
  ): Promise<Address> {
    try {
      // First get current customer data
      const customer = await this.getCustomerDetails(customerId);

      // Create a new addresses array with the existing addresses and the new one
      const updatedAddresses = [...(customer.addresses || []), addressData];

      // Create update payload preserving all existing customer data
      const updatePayload = {
        // Keep all current customer fields
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        civility: customer.civility,
        birthDate: customer.birthDate,
        originWebsite: customer.originWebsite,

        // Update only the addresses
        addresses: updatedAddresses,
      };

      // Update customer with new address
      const response = await this.api.put(
        `/customers/${customerId}`,
        updatePayload
      );

      // Return the newly added address
      return response.data.addresses[response.data.addresses.length - 1];
    } catch (error) {
      console.error("Error adding address:", error);
      throw error;
    }
  }

  /**
   * Updates or creates a single address for the customer, replacing any existing addresses
   * This method should be added to your OrderService class in orderService.ts
   */
  public async updateSingleAddress(
    customerId: number,
    addressData: any
  ): Promise<CustomerDetails> {
    try {
      // First get current customer data
      const customer = await this.getCustomerDetails(customerId);

      // Check if customer already has an address
      const hasExistingAddress =
        customer.addresses && customer.addresses.length > 0;

      let updatedAddresses = [];

      if (hasExistingAddress) {
        // If customer has existing address(es), update the first one while preserving its ID
        const existingAddress = customer.addresses[0];
        updatedAddresses = [
          {
            ...addressData,
            id: existingAddress.id, // Keep the existing ID
          },
        ];
        console.log("Updating existing address with ID:", existingAddress.id);
      } else {
        // If no existing address, create a new one
        updatedAddresses = [addressData];
        console.log("Creating new address for customer");
      }

      // Create update payload preserving all existing customer data
      const updatePayload = {
        // Keep all current customer fields
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        civility: customer.civility,
        birthDate: customer.birthDate,
        originWebsite: customer.originWebsite,

        // Set addresses to be only the one address (replacing any existing ones)
        addresses: updatedAddresses,
      };

      console.log("Updating customer with payload:", updatePayload);

      // Update customer with the single address
      const response = await this.api.put(
        `/customers/${customerId}`,
        updatePayload
      );

      // If the API doesn't return the complete customer data, get it
      if (!response.data || !response.data.addresses) {
        console.log(
          "API response doesn't include complete customer data, fetching it separately"
        );
        // Fetch fresh customer data
        return await this.getCustomerDetails(customerId);
      }

      return response.data;
    } catch (error) {
      console.error("Error updating customer address:", error);
      throw error;
    }
  }
  /**
   * Get all regions with cities and zones
   */
  public async getRegions(): Promise<Region[]> {
    try {
      if (!this.isAuthenticated()) {
        throw new Error("User is not authenticated");
      }
      const response = await this.api.get("/regions");
      return response.data;
    } catch (error) {
      console.error("Error fetching regions:", error);
      throw error;
    }
  }
}

const orderService = new OrderService();
export default orderService;
