// src/features/auth/authStore.ts
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import authService, {
  User,
  Customer,
  LoginCredentials,
  AuthError,
} from "../lib/api/client";

interface AuthState {
  user: User | null;
  customer: Customer | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateCustomer: (updatedCustomer: Customer) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: authService.getStoredUser(),
        customer: authService.getStoredCustomer(),
        isAuthenticated: authService.isLoggedIn(),
        isLoading: false,
        error: null,

        login: async (credentials: LoginCredentials) => {
          set({ isLoading: true, error: null });

          try {
            // Use the complete login flow from authService
            const { user, customer } = await authService.login(credentials);

            set({
              user,
              customer,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error) {
            let errorMessage = "Une erreur s'est produite lors de la connexion";

            if (error instanceof AuthError) {
              errorMessage = error.message;
            } else if (error instanceof Error) {
              errorMessage = error.message;
            }

            set({
              isLoading: false,
              error: errorMessage,
              isAuthenticated: false,
            });

            throw error;
          }
        },

        logout: () => {
          authService.logout();
          set({
            user: null,
            customer: null,
            isAuthenticated: false,
            error: null,
          });
        },

        clearError: () => {
          set({ error: null });
        },

        updateCustomer: (updatedCustomer: Customer) => {
          // Just update the store state
          set({
            customer: updatedCustomer,
          });
        },
      }),
      {
        name: "auth-storage",
        // Only persist these fields
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          customer: state.customer,
          user: state.user,
        }),
      }
    )
  )
);

export default useAuthStore;
