// src/features/account/components/AccountSidebar.tsx
import { Link, useNavigate } from "@tanstack/react-router";
import { User, Package, LogOut } from "lucide-react";
import { useAuthStore } from "../store/authStore";

interface AccountSidebarProps {
  currentPath: string;
}

export default function AccountSidebar({ currentPath }: AccountSidebarProps) {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    logout();
    // Redirect to home page or login page
    navigate({ to: "/" });
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <h2 className="text-xl font-medium mb-6">Mon compte</h2>

      <nav className="space-y-2">
        <Link
          to="/account"
          className={`flex items-center px-4 py-2 rounded-full ${
            currentPath === "/account"
              ? "bg-blue-50 text-primary-default"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <User className="h-5 w-5 mr-3" />
          Profil
        </Link>

        <Link
          to="/account/orders"
          className={`flex items-center px-4 py-2 rounded-full ${
            currentPath === "/account/orders"
              ? "bg-blue-50 text-primary-default"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Package className="h-5 w-5 mr-3" />
          Mes commandes
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-gray-700 rounded-full hover:bg-gray-100"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Déconnexion
        </button>
      </nav>
    </div>
  );
}
