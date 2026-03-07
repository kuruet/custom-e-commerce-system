import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CustomizeProduct from "./pages/CustomizeProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import OrdersList from "./pages/admin/OrdersList";
import OrderDetails from "./pages/admin/OrderDetails";

function App() {
  return (
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
  );
}

export default App;