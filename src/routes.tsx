import {
  Router,
  Route,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import NotFoundPage from "./pages/NotFoundPage";
import BlogPostPage from "./pages/BlogPostPage";
import AbonnementPage from "./pages/Abonnement";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AccountPage from "./pages/AccountPage";
import OrdersPage from "./pages/OrdersPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import Test from "./pages/testapi";
import ProtectedRoute from "./components/ProtectedRoute";

// Create a context for the router
type RouterContext = {
  queryClient: QueryClient;
};

// Create the root route with context
const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

// Define routes
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const productsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "produits",
  component: ProductsPage,
});

const abonnementRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "abonnement",
  component: AbonnementPage,
});

const accountRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "account",
  component: () => (
    <ProtectedRoute>
      <AccountPage />
    </ProtectedRoute>
  ),
});

const ordersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "account/orders",
  component: () => (
    <ProtectedRoute>
      <OrdersPage />
    </ProtectedRoute>
  ),
});

const contactRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "contact",
  component: ContactPage,
});
const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "login",
  component: LoginPage,
});
const SignupRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "signup",
  component: SignupPage,
});

const productsByCategoryRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "products/category/$categoryId",
  component: ProductsPage,
});

const productDetailRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "products/$productId",
  component: ProductDetailPage,
  loader: async ({ params, context }) => {
    // Prefetch product data using TanStack Query
    return context.queryClient.ensureQueryData({
      queryKey: ["product", params.productId],
      queryFn: () => fetchProductById(params.productId),
    });
  },
});

const cartRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "cart",
  component: CartPage,
});

const orderSuccessRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "order-success",
  component: OrderSuccessPage,
});

const checkoutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "checkout",
  component: CheckoutPage,
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "about",
  component: AboutPage,
});

const blogRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "blog",
  component: BlogPage,
});

const blogPostRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "blog/$postId",
  component: BlogPostPage,
});

const test = new Route({
  getParentRoute: () => rootRoute,
  path: "/test",
  component: Test,
});

const notFoundRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFoundPage,
});

// Create the router
const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute,
  productsByCategoryRoute,
  productDetailRoute,
  cartRoute,
  checkoutRoute,
  aboutRoute,
  blogRoute,
  blogPostRoute,
  abonnementRoute,
  contactRoute,
  loginRoute,
  SignupRoute,
  accountRoute,
  orderSuccessRoute,
  ordersRoute,
  test,
  notFoundRoute,
]);

// Mock function for product data
async function fetchProductById(id: string) {
  // In a real app, this would be an API call
  // For now, returning a basic mock
  return {
    id,
    name: `Product ${id}`,
    price: 22.0,
    // More fields...
  };
}

// Create and export the router
export const router = new Router({
  routeTree,
  defaultPreload: "intent",
  context: {
    queryClient: new QueryClient(),
  },
});

// Register the router for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
