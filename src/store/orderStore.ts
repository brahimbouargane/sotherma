// src/features/orders/orderStore.ts
import { create } from "zustand";
import orderService, {
  Order,
  OrderStatus,
  Address,
  OrderQueryParams,
  CreateOrderRequest,
} from "../lib/api/orderService";

interface OrderState {
  // Orders list
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };

  // Selected order
  selectedOrder: Order | null;
  orderHistory: any[];
  isLoadingOrder: boolean;
  orderError: string | null;

  // Addresses
  addresses: Address[];
  isLoadingAddresses: boolean;
  addressError: string | null;

  // Filter state
  statusFilter: OrderStatus | null;
  dateRange: {
    fromDate: string | null;
    toDate: string | null;
  };

  // Actions
  fetchOrders: (params?: OrderQueryParams) => Promise<void>;
  fetchOrderById: (id: number) => Promise<void>;
  fetchOrderHistory: (orderId: number) => Promise<void>;
  fetchAddresses: () => Promise<void>;
  createOrder: (orderData: CreateOrderRequest) => Promise<Order>;
  cancelOrder: (orderId: number, reason?: string) => Promise<void>;
  addAddress: (addressData: Partial<Address>) => Promise<Address>;

  // Filter actions
  setStatusFilter: (status: OrderStatus | null) => void;
  setDateRange: (fromDate: string | null, toDate: string | null) => void;

  // Helpers
  clearErrors: () => void;
  clearSelectedOrder: () => void;
}

export const useOrderStore = create<OrderState>()((set, get) => ({
  // Orders list
  orders: [],
  isLoading: false,
  error: null,
  pagination: {
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0,
  },

  // Selected order
  selectedOrder: null,
  orderHistory: [],
  isLoadingOrder: false,
  orderError: null,

  // Addresses
  addresses: [],
  isLoadingAddresses: false,
  addressError: null,

  // Filter state
  statusFilter: null,
  dateRange: {
    fromDate: null,
    toDate: null,
  },

  // Fetch orders with optional filters
  fetchOrders: async (params: OrderQueryParams = {}) => {
    try {
      set({ isLoading: true, error: null });

      // Use current state for any parameters not explicitly provided
      const currentState = get();
      const queryParams: OrderQueryParams = {
        page: params.page ?? currentState.pagination.page,
        size: params.size ?? currentState.pagination.size,
        status: params.status ?? currentState.statusFilter ?? undefined,
        fromDate:
          params.fromDate ?? currentState.dateRange.fromDate ?? undefined,
        toDate: params.toDate ?? currentState.dateRange.toDate ?? undefined,
      };

      const response = await orderService.getUserOrders(queryParams);

      set({
        orders: response.content,
        pagination: {
          page: response.page,
          size: response.size,
          totalPages: response.totalPages,
          totalElements: response.totalElements,
        },
        isLoading: false,
      });
    } catch (error) {
      console.error("Error in fetchOrders:", error);
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch orders",
      });
    }
  },

  // Fetch a single order by ID
  fetchOrderById: async (id: number) => {
    try {
      set({ isLoadingOrder: true, orderError: null });

      const order = await orderService.getOrderById(id);

      set({
        selectedOrder: order,
        isLoadingOrder: false,
      });
    } catch (error) {
      console.error(`Error in fetchOrderById for ID ${id}:`, error);
      set({
        isLoadingOrder: false,
        orderError:
          error instanceof Error
            ? error.message
            : `Failed to fetch order #${id}`,
      });
    }
  },

  // Fetch order history
  fetchOrderHistory: async (orderId: number) => {
    try {
      set({ isLoadingOrder: true, orderError: null });

      const history = await orderService.getOrderHistory(orderId);

      set({
        orderHistory: history,
        isLoadingOrder: false,
      });
    } catch (error) {
      console.error(`Error in fetchOrderHistory for ID ${orderId}:`, error);
      set({
        isLoadingOrder: false,
        orderError:
          error instanceof Error
            ? error.message
            : `Failed to fetch history for order #${orderId}`,
      });
    }
  },

  // Fetch user addresses
  fetchAddresses: async () => {
    try {
      set({ isLoadingAddresses: true, addressError: null });

      const addresses = await orderService.getUserAddresses();

      set({
        addresses,
        isLoadingAddresses: false,
      });
    } catch (error) {
      console.error("Error in fetchAddresses:", error);
      set({
        isLoadingAddresses: false,
        addressError:
          error instanceof Error ? error.message : "Failed to fetch addresses",
      });
    }
  },

  // Create a new order
  createOrder: async (orderData: CreateOrderRequest) => {
    try {
      set({ isLoading: true, error: null });

      const newOrder = await orderService.createOrder(orderData);

      // Refresh orders list
      get().fetchOrders();

      return newOrder;
    } catch (error) {
      console.error("Error in createOrder:", error);
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Failed to create order",
      });
      throw error;
    }
  },

  // Cancel an order
  cancelOrder: async (orderId: number, reason?: string) => {
    try {
      set({ isLoadingOrder: true, orderError: null });

      await orderService.cancelOrder(orderId, reason);

      // Refresh selected order and orders list
      await get().fetchOrderById(orderId);
      await get().fetchOrders();

      set({ isLoadingOrder: false });
    } catch (error) {
      console.error(`Error in cancelOrder for ID ${orderId}:`, error);
      set({
        isLoadingOrder: false,
        orderError:
          error instanceof Error
            ? error.message
            : `Failed to cancel order #${orderId}`,
      });
      throw error;
    }
  },

  // Add a new address
  addAddress: async (addressData: Partial<Address>) => {
    try {
      set({ isLoadingAddresses: true, addressError: null });

      const newAddress = await orderService.addAddress(addressData);

      // Update addresses list
      set((state) => ({
        addresses: [...state.addresses, newAddress],
        isLoadingAddresses: false,
      }));

      return newAddress;
    } catch (error) {
      console.error("Error in addAddress:", error);
      set({
        isLoadingAddresses: false,
        addressError:
          error instanceof Error ? error.message : "Failed to add address",
      });
      throw error;
    }
  },

  // Update status filter
  setStatusFilter: (status: OrderStatus | null) => {
    set({ statusFilter: status });
  },

  // Update date range filter
  setDateRange: (fromDate: string | null, toDate: string | null) => {
    set({
      dateRange: {
        fromDate,
        toDate,
      },
    });
  },

  // Clear all errors
  clearErrors: () => {
    set({ error: null, orderError: null, addressError: null });
  },

  // Clear selected order
  clearSelectedOrder: () => {
    set({ selectedOrder: null, orderHistory: [] });
  },
}));

export default useOrderStore;
