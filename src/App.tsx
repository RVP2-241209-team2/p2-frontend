import { Route, Routes } from "react-router-dom";
// Bootsrtrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Layout components
import AuthLayout from "./components/auth/layout";
import AdminLayout from "./components/admin/layout";
import MainLayout from "./components/main/layout";

// Auth pages
import LoginPage from "./pages/auth/login-page";
import RegisterPage from "./pages/auth/register-page";

// Admin pages
import ManageUsersPage from "./pages/admin/manage-users-page";

// Store owner pages
import DashboardPage from "./pages/store-owner/dashboard-page";
import OrdersPage from "./pages/admin/orders-page";
import StoreOwnerProductsPage from "./pages/store-owner/products";
import EditProductsPage from "./pages/store-owner/edit-product-page";

// Main pages
import HomePage from "./pages/main/home-page";
import ProductsPage from "./pages/main/products-page";
import ProductDetailPage from "./pages/main/product-details-page";
import CartPage from "./pages/main/cart-page";
import CheckoutPage from "./pages/main/checkout-page";
import FAQPage from "./pages/main/faq-page";
import AccountPage from "./pages/main/account-page";
import CategoryPage from "./pages/main/category-page";
import ProtectedRoute from "./components/shared/protected-route";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Admin routes */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<ManageUsersPage />} />
          </Route>
        </Route>

        {/* Shop owner routes */}
        <Route
          element={<ProtectedRoute allowedRoles={["STORE_OWNER", "ADMIN"]} />}
        >
          <Route path="/store-owner" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="products/:id" element={<EditProductsPage />} />
            <Route path="products" element={<StoreOwnerProductsPage />} />
            <Route path="orders" element={<OrdersPage />} />
          </Route>
        </Route>

        {/* User routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/category/:slug" element={<CategoryPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
