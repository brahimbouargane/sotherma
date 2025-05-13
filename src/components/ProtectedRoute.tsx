// src/components/ProtectedRoute.tsx
import { ReactNode, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../store/authStore";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * A component that protects routes by checking if the user is authenticated.
 * If not authenticated, redirects to the login page or a specified route.
 */
export default function ProtectedRoute({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Save the attempted URL to redirect back after login
      const currentPath = window.location.pathname;

      // Redirect to login with the current path as a parameter
      navigate({
        to: redirectTo,
        search: { redirect: currentPath },
      });
    }
  }, [isAuthenticated, navigate, redirectTo]);

  // If user is authenticated, render children
  return isAuthenticated ? <>{children}</> : null;
}
