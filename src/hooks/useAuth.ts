// // hooks/useAuth.ts
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { authService, LoginCredentials } from "../lib/api/authService";
// import {
//   useState,
//   useEffect,
//   createContext,
//   useContext,
//   ReactNode,
// } from "react";

// // Define the auth context type
// interface AuthContextType {
//   user: any | null;
//   isLoading: boolean;
//   isAuthenticated: boolean;
//   login: (credentials: LoginCredentials) => Promise<void>;
//   logout: () => Promise<void>;
//   error: Error | null;
// }

// // Create the auth context
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Auth provider props type
// interface AuthProviderProps {
//   children: ReactNode;
//   onLoginSuccess?: () => void;
//   onLogoutSuccess?: () => void;
// }

// // Auth provider component
// export const AuthProvider = ({
//   children,
//   onLoginSuccess,
//   onLogoutSuccess,
// }: AuthProviderProps) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
//     authService.isAuthenticated()
//   );
//   const queryClient = useQueryClient();

//   // Fetch current user if authenticated
//   const {
//     data: user,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["currentUser"],
//     queryFn: authService.getCurrentUser,
//     enabled: isAuthenticated,
//     staleTime: 1000 * 60 * 5, // 5 minutes
//     retry: 1,
//   });

//   // Login mutation
//   const loginMutation = useMutation({
//     mutationFn: (credentials: LoginCredentials) =>
//       authService.login(credentials),
//     onSuccess: (data) => {
//       setIsAuthenticated(true);
//       queryClient.setQueryData(["currentUser"], data.user);

//       // Call the onLoginSuccess callback if provided
//       if (onLoginSuccess) {
//         onLoginSuccess();
//       }
//     },
//   });

//   // Logout mutation
//   const logoutMutation = useMutation({
//     mutationFn: authService.logout,
//     onSuccess: () => {
//       setIsAuthenticated(false);
//       queryClient.clear(); // Clear all queries from cache

//       // Call the onLogoutSuccess callback if provided
//       if (onLogoutSuccess) {
//         onLogoutSuccess();
//       }
//     },
//   });

//   // Login function
//   const login = async (credentials: LoginCredentials) => {
//     await loginMutation.mutateAsync(credentials);
//   };

//   // Logout function
//   const logout = async () => {
//     await logoutMutation.mutateAsync();
//   };

//   // Check auth status on mount
//   useEffect(() => {
//     setIsAuthenticated(authService.isAuthenticated());
//   }, []);

//   // Create the context value
//   const value: AuthContextType = {
//     user,
//     isLoading: isLoading || loginMutation.isPending,
//     isAuthenticated,
//     login,
//     logout,
//     error: error as Error | null,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // Custom hook to use the auth context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
