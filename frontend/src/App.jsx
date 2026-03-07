import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CustomizeProduct from "./pages/CustomizeProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import OrdersList from "./pages/admin/OrdersList";
import OrderDetails from "./pages/admin/OrderDetails";
import Header from "./components/layout/Header";
import Category from './components/layout/CategoryRow';
import HeroSection from './components/layout/HeroSection';
import FeaturesSection from './components/layout/FeaturesSection';
import ProductCatalog from './components/layout/ProductCatalog';
import ReviewSection from './components/layout/ReviewSection';
import Footer from './components/layout/Footer';







function App() {
  return (
    <>
      {/* Global Header */}
      <Header />
      <Category/>
      <HeroSection/>
      <FeaturesSection/>
      <ProductCatalog/>
      <ReviewSection/>
      <Footer/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/customize/:productId" element={<CustomizeProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/admin/orders" element={<OrdersList />} />
        <Route path="/admin/orders/:id" element={<OrderDetails />} />
      </Routes>
    </>
  );
}

export default App;