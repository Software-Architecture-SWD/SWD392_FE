/* Customer */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerLayout from "./layouts/CustomerLayout";
import ProductsPage from "./pages/customer/ProductsPage";
import BlogsPage from "./pages/customer/BlogsPage";
import AboutUsPage from "./pages/customer/AboutUsPage";
import HomePage from "./pages/customer/CustomerHomePage/HomePage";

/****************************************************************************/

/* Staff */

/****************************************************************************/

/* Manager */

/****************************************************************************/

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />}/>
          <Route path="blogs" element={<BlogsPage />}/>
          <Route path="about-us" element={<AboutUsPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
