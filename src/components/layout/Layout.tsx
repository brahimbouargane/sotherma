import { ReactNode, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import authService from "../../lib/api/client";
import useAuthStore from "../../store/authStore";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    const initializeData = async () => {
      if (authService.isLoggedIn()) {
        try {
          const user = await authService.getMe();
          if (user?.id) {
            const customer = await authService.getCustomer(user.id);
            useAuthStore.getState().updateCustomer(customer);
          }
        } catch (error) {
          console.error("Failed to initialize user data", error);
        }
      }
    };

    initializeData();
  }, []);
  return (
    <div className="max-w-[98%] mx-auto flex flex-col min-h-screen ">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
