import { Bounce, Slide, ToastContainer } from "react-toastify";

/* Customer */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerLayout from "./layouts/CustomerLayout";
import ProductsPage from "./pages/customer/ProductsPage";
import BlogsPage from "./pages/customer/CustomerBlogPage/BlogsPage";
import AboutUsPage from "./pages/customer/AboutUsPage";
import HomePage from "./pages/customer/CustomerHomePage/HomePage";

/****************************************************************************/
/* Staff */

/****************************************************************************/
/* Manager */

/****************************************************************************/
/* Auth */
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import BlogDetail from "./pages/customer/CustomerBlogPage/BlogDetail";
import OtpPage from "./pages/auth/OtpPage";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
      <BrowserRouter>
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<CustomerLayout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="blogs" element={<BlogsPage />} />
            <Route path="blogs/:id" element={<BlogDetail />} />
            <Route path="about-us" element={<AboutUsPage />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp" element={<OtpPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
