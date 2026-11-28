// [GIỮ NGUYÊN] Các import trang gốc của nhóm
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/HomePage";
import MenuPage from "../pages/MenuPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import OrdersPage from "../pages/OrdersPage";
import AboutPage from "../pages/AboutPage";
import NotFoundPage from "../pages/NotFoundPage";
import AdminProductsPage from "../pages/AdminProductsPage";
import AdminRoute from "../components/admin/AdminRoute";
import AdminLayout from "../components/admin/AdminLayout";

// [THÊM MỚI] Import 2 trang Đăng nhập/Đăng ký và Tài khoản Khách hàng
import LoginPage from "../pages/LoginPage";
import AccountPage from "../pages/AccountPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* [GIỮ NGUYÊN] Toàn bộ route cửa hàng gốc */}
        <Route index element={<HomePage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="menu/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="about" element={<AboutPage />} />

        {/* [THÊM MỚI] Route Đăng nhập/Đăng ký chung và Trang Khách hàng */}
        <Route path="login" element={<LoginPage />} />
        <Route path="account" element={<AccountPage />} />

        {/* [CẬP NHẬT] Giữ đường dẫn /admin/login cũ nhưng trỏ về LoginPage mới */}
        <Route path="admin/login" element={<Navigate to="/login" replace />} />

        {/* [GIỮ NGUYÊN] Route 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* [GIỮ NGUYÊN] Toàn bộ cụm route bảo vệ trang Admin */}
      <Route element={<AdminRoute />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminProductsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
