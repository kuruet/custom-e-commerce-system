import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CustomizeProduct from "./pages/CustomizeProduct";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

import OrdersList from "./pages/admin/OrdersList";
import OrderDetails from "./pages/admin/OrderDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";

import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";

function App() {
  return (
    <Routes>

      <Route element={<MainLayout />}>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shopping-cart" element={<Cart />} />
        <Route path="/order-checkout" element={<Checkout />} />
        <Route path="/success-page" element={<OrderSuccess />} />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/customize/:productId" element={<CustomizeProduct />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        {/* Admin Orders */}
        <Route
          path="/admin/orders"
          element={
            <AdminProtectedRoute>
              <OrdersList />
            </AdminProtectedRoute>
          }
        />

      </Route>

    </Routes>
  );
}

export default App;