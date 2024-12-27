import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import LoginPage from "./pages/auth/login-page";
import RegisterPage from "./pages/auth/register-page";
import AdminLayout from "./components/admin/layout";
import MainLayout from "./components/main/layout";
import DashboardPage from "./pages/admin/dashboard-page";
import EditProductPage from "./pages/admin/edit-product-page";
import HomePage from "./pages/main/home-page";
import ProductsPage from "./pages/main/products-page";
import ProductDetailPage from "./pages/main/product-details-page";
import CartPage from "./pages/main/cart-page";
import CheckoutPage from "./pages/main/checkout-page";
import FAQPage from "./pages/main/faq-page";
import AccountPage from "./pages/main/account-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Shop owner routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="products/:id" element={<EditProductPage />} />
        </Route>

        {/* User/Public routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
