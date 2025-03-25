import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* Auth */
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import OtpPage from "./pages/auth/OtpPage";
import ForgotPassPage from "./pages/auth/ForgotPassPage";
import ResetPassPage from "./pages/auth/ResetPassPage";
import SetGooglePasswordPage from "./pages/auth/SetGooglePasswordPage";

/* Customer */
import CustomerLayout from "./layouts/CustomerLayout";
import ProductsPage from "./pages/customer/product/pages/ProductsPage";
import ProductDetailPage from "./pages/customer/product/pages/ProductDetailPage";
import BlogsPage from "./pages/customer/CustomerBlogPage/BlogsPage";
import AboutUsPage from "./pages/customer/AboutUsPage";
import HomePage from "./pages/customer/CustomerHomePage/HomePage";
import ProfilePage from "./pages/customer/CustomerProfilePage/ProfilePage";
import BlogDetail from "./pages/customer/CustomerBlogPage/BlogDetail";
import SkinQuizPage from "./pages/customer/SkinQuizPage";
import BookingPage from "./pages/customer/BookingPage";

/* Admin */
import AdminLayout from "./layouts/AdminLayout";
import ProductManagement from "./pages/admin/ProductManagement";
import Dashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/forgot-password" element={<ForgotPassPage />} />
        <Route path="/reset-password" element={<ResetPassPage />} />
        <Route path="/set-google-password" element={<SetGooglePasswordPage />} />

        {/* Customer Routes */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="blog/:id" element={<BlogDetail />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="skin-quiz" element={<SkinQuizPage />} />
          <Route path="booking" element={<BookingPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductManagement />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
