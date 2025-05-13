// src/services/authService.ts
import axios, { AxiosError, AxiosInstance } from "axios";

// Define types with proper interfaces
export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
}
export interface Customer {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  birthDate?: string;
  civility?: string;
  address?: string;
  addresses?: Address[];
  orders?: any[];
  originWebsite?: string;
  enabled?: boolean;
  roles?: string[];
  createdAt?: string;
  updatedAt?: string;
  version?: number;
}

export interface Address {
  id?: number;
  street: string;
  houseNumber?: string | null;
  addressType: string;
  region: Region;
  city: City;
  zone: Zone;
}
export interface Region {
  id: number;
  name?: string;
  cities?: City[];
}

export interface City {
  id: number;
  name?: string;
  zones?: Zone[];
}

export interface Zone {
  id: number;
  name?: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  paymentMode: string;
  comment?: string;
  status: string;
  orderItems: OrderItem[];
  history: OrderHistory[];
  addressLivraison?: Address | null;
  createdAt?: string;
  updatedAt?: string;
  totalAmount?: number | null;
}

export interface OrderItem {
  productId?: number | null;
  product?: {
    id: number;
    nameFrench?: string;
    nameEnglish?: string;
    nameArabic?: string;
  };
  quantity: number;
  price: number;
}

export interface OrderHistory {
  id: number;
  date: string;
  comment: string;
  status: string;
  notifyClient: boolean;
}

// Request payload interfaces
export interface CreateOrderRequest {
  addressLivraison: {
    street: string;
    region: { id: number };
    city: { id: number };
    zone: { id: number };
  };
  comment?: string;
  orderItems: {
    productId: number;
    quantity: number;
    price: number;
  }[];
  paymentMode: string;
  period: number;
}

export interface AddressDTO {
  street: string;
  houseNumber?: string | null;
  addressType: string;
  region: { id: number };
  city: { id: number };
  zone: { id: number };
}

export interface CustomerUpdateDTO {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  addresses?: AddressDTO[];
  // Include other fields that might be updated
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  // These fields will have default values set by the service
  originWebsite: string;
}

export interface AuthResponse {
  jwtToken: string;
  tokenType: string;
  refreshToken?: string;
  user?: User;
}

// Create a custom error class for better error handling
export class AuthError extends Error {
  status?: number;
  code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = "AuthError";
    this.status = status;
    this.code = code;

    // This is needed for instanceof to work correctly with custom errors
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

// Auth service class with best practices
class AuthService {
  private api: AxiosInstance;
  private tokenKey = "auth_token";
  private refreshTokenKey = "refresh_token";
  private userKey = "user_data";
  private customerKey = "customer_data";

  constructor() {
    // Create API client with proper configuration
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "https://sidiharazem.ma/api",
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000, // 10 second timeout
    });

    // Add request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // Handle specific error cases
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const status = error.response.status;
          const data = error.response.data as any;

          if (status === 401) {
            // Unauthorized - clear auth data
            this.clearAuthData();
          }

          // Create a more informative error
          throw new AuthError(
            data?.message || "Authentication error",
            status,
            data?.code
          );
        } else if (error.request) {
          // The request was made but no response was received
          throw new AuthError("No response from server", 0, "NETWORK_ERROR");
        } else {
          // Something happened in setting up the request
          throw new AuthError(
            error.message || "Request error",
            0,
            "REQUEST_ERROR"
          );
        }
      }
    );

    // Initialize auth token on creation
    this.initializeAuth();
  }

  // Initialize authentication state from storage
  private initializeAuth(): void {
    const token = this.getToken();
    if (token) {
      this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }

  // Helper method to get token from storage
  private getToken(): string | null {
    return (
      localStorage.getItem(this.tokenKey) ||
      sessionStorage.getItem(this.tokenKey)
    );
  }

  // Store tokens based on remember me preference
  private storeTokens(
    token: string,
    refreshToken?: string,
    rememberMe = false
  ): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(this.tokenKey, token);

    if (refreshToken) {
      storage.setItem(this.refreshTokenKey, refreshToken);
    }
  }

  // Clear all auth data
  private clearAuthData(): void {
    // Remove from both storage types to be safe
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.customerKey);

    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.refreshTokenKey);

    // Clear Authorization header
    delete this.api.defaults.headers.common["Authorization"];
  }

  // Sign in user and get token
  public async signin(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Log the request payload for debugging
      console.log("Sending signin request with:", {
        email: credentials.email,
        // Don't log the actual password, just log that it's present
        hasPassword: !!credentials.password,
      });

      // Check the API documentation for the exact format expected
      // Adjust this payload to match your backend's expected format
      const payload = {
        email: credentials.email,
        password: credentials.password,
        // Include rememberMe if your backend expects it
        ...(credentials.rememberMe !== undefined && {
          rememberMe: credentials.rememberMe,
        }),
      };

      const response = await this.api.post<AuthResponse>(
        "/auth/signin",
        payload
      );

      const { jwtToken, refreshToken } = response.data;

      // Store tokens
      this.storeTokens(jwtToken, refreshToken, credentials.rememberMe);

      // Set the token for future API calls
      this.api.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

      return response.data;
    } catch (error) {
      // If error has response data, log it for debugging
      if (error instanceof AxiosError && error.response) {
        console.error("Signin error details:", error.response.data);
      }

      if (error instanceof AuthError) {
        throw error;
      }

      // Rethrow as AuthError for consistent error handling
      throw new AuthError(
        error instanceof Error ? error.message : "Signin error",
        error instanceof AxiosError ? error.response?.status || 0 : 0,
        "SIGNIN_ERROR"
      );
    }
  }

  // Get current user info
  public async getMe(): Promise<User> {
    try {
      const response = await this.api.get<User>("/auth/me");

      // Store user data
      localStorage.setItem(this.userKey, JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }

      throw new AuthError(
        error instanceof Error ? error.message : "Failed to get user info",
        0,
        "GET_USER_ERROR"
      );
    }
  }

  // Get customer details
  public async getCustomer(userId: number): Promise<Customer> {
    try {
      const response = await this.api.get<Customer>(`/customers/${userId}`);

      // Store customer data
      // localStorage.setItem(this.customerKey, JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }

      throw new AuthError(
        error instanceof Error ? error.message : "Failed to get customer info",
        0,
        "GET_CUSTOMER_ERROR"
      );
    }
  }

  public async register(userData: RegisterData): Promise<User> {
    try {
      // Add default values for the backend
      const payload = {
        ...userData,
        originWebsite: "AIN_SAISS", // Default value
        // No addresses, birthDate, or civility
      };

      const response = await this.api.post<User>("/customers", payload);
      return response.data;
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }

      throw new AuthError(
        error instanceof Error ? error.message : "Registration error",
        0,
        "REGISTER_ERROR"
      );
    }
  }

  // Complete login flow
  // Replace your login method with this improved version
  public async login(
    credentials: LoginCredentials
  ): Promise<{ user: User; customer: Customer | null }> {
    try {
      // Step 1: Sign in to get token
      const authResponse = await this.signin(credentials);
      const token = authResponse.jwtToken;
      console.log("authResponse received:", authResponse.jwtToken);

      // Make sure the token is set in headers for subsequent requests
      this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Step 2: Get user info with explicit token
      const userResponse = await this.api.get<User>("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = userResponse.data;

      // Store user data
      localStorage.setItem(this.userKey, JSON.stringify(user));

      // Step 3: Get customer info if user was fetched successfully
      let customer: Customer | null = null;
      if (user && user.id) {
        try {
          // Also use explicit token for customer request
          const customerResponse = await this.api.get<Customer>(
            `/customers/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          customer = customerResponse.data;

          // Store customer data
          localStorage.setItem(this.customerKey, JSON.stringify(customer));
        } catch (error) {
          // Continue without customer details
          console.warn("Could not fetch customer details:", error);
        }
      }

      return { user, customer };
    } catch (error) {
      // Just propagate the error without doing logout
      if (error instanceof AuthError) {
        throw error;
      }

      throw new AuthError(
        error instanceof Error ? error.message : "Login failed",
        0,
        "LOGIN_FLOW_ERROR"
      );
    }
  }
  // Logout user
  public logout(): void {
    // Attempt to call logout endpoint
    this.api.post("/auth/logout").catch((error) => {
      console.warn("Logout endpoint error:", error);
    });

    // Clear auth data regardless of API call result
    this.clearAuthData();
  }

  // Get stored user
  public getStoredUser(): User | null {
    try {
      const userJson = localStorage.getItem(this.userKey);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      return null;
    }
  }

  // Get stored customer
  public getStoredCustomer(): Customer | null {
    return null;
    try {
      const customerJson = localStorage.getItem(this.customerKey);
      return customerJson ? JSON.parse(customerJson) : null;
    } catch (error) {
      console.error("Error parsing stored customer:", error);
      return null;
    }
  }

  // Check if user is logged in
  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Get user display name
  public getUserDisplayName(): string {
    const user = this.getStoredUser();
    const customer = this.getStoredCustomer();

    if (customer?.firstName && customer?.lastName) {
      return `${customer.firstName} ${customer.lastName}`;
    } else if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    } else if (user?.email) {
      return user.email.split("@")[0];
    }

    return "User";
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;
