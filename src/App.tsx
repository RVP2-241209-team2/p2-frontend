import {Route, Routes } from "react-router-dom";
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
import DashboardPage from "./pages/admin/dashboard-page";
import ManageUsersPage from "./pages/admin/manage-users-page";
import OrdersPage from "./pages/admin/orders-page";

// Main pages
import HomePage from "./pages/main/home-page";
import ProductsPage from "./pages/main/products-page";
import ProductDetailPage from "./pages/main/product-details-page";
import CartPage from "./pages/main/cart-page";
import CheckoutPage from "./pages/main/checkout-page";
import FAQPage from "./pages/main/faq-page";
import AccountPage from "./pages/main/account-page";
import CategoryPage from "./pages/main/category-page";
import ProductDetailsPage from "./pages/admin/product-details-page";
import { ModalProvider } from "./Modal/Modal";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <ModalProvider>
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Shop owner routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="products/:id" element={<ProductDetailsPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="users" element={<ManageUsersPage />} />
        <Route path="orders" element={<OrdersPage />} />
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
    </ModalProvider>
  );
}

export default App;
