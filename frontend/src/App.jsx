import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CustomizeProduct from "./pages/CustomizeProduct";
import Cart from "./pages/Cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/customize/:productId" element={<CustomizeProduct />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;