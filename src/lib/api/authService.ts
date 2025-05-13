// // lib/api/authService.ts
// import apiClient from "./client";

// export interface LoginCredentials {
//   email: string;
//   password: string;
//   rememberMe?: boolean;
// }

// export interface AuthResponse {
//   token: string;
//   refreshToken?: string;
//   user: {
//     id: number;
//     email: string;
//     firstName: string;
//     lastName: string;
//     roles: string[];
//   };
// }

// export const authService = {
//   async login(credentials: LoginCredentials): Promise<AuthResponse> {
//     try {
//       const response = await apiClient.post("/auth/login", credentials);

//       // Store tokens
//       if (credentials.rememberMe) {
//         localStorage.setItem("authToken", response.data.token);
//         if (response.data.refreshToken) {
//           localStorage.setItem("refreshToken", response.data.refreshToken);
//         }
//       } else {
//         // For session-only storage
//         sessionStorage.setItem("authToken", response.data.token);
//         if (response.data.refreshToken) {
//           sessionStorage.setItem("refreshToken", response.data.refreshToken);
//         }
//       }

//       return response.data as AuthResponse;
//     } catch (error) {
//       console.error("Login error:", error);
//       throw error;
//     }
//   },

//   async logout(): Promise<void> {
//     try {
//       // Call backend logout endpoint if available
//       await apiClient.post("/auth/logout");
//     } catch (error) {
//       console.error("Logout error:", error);
//       // Continue with local cleanup even if API call fails
//     } finally {
//       // Clear stored tokens
//       localStorage.removeItem("authToken");
//       localStorage.removeItem("refreshToken");
//       sessionStorage.removeItem("authToken");
//       sessionStorage.removeItem("refreshToken");
//     }
//   },

//   async getCurrentUser() {
//     try {
//       const response = await apiClient.get("/auth/me");
//       return response.data;
//     } catch (error) {
//       console.error("Get current user error:", error);
//       throw error;
//     }
//   },

//   isAuthenticated(): boolean {
//     return !!(
//       localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
//     );
//   },
// };
