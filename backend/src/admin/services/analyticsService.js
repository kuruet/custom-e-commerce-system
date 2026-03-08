import Order from "../../modules/orders/order.model.js";
import Product from "../../modules/products/product.model.js";

export const getAnalyticsData = async () => {

  const totalOrders = await Order.countDocuments();

  const totalProducts = await Product.countDocuments();

  const pendingOrders = await Order.countDocuments({
    status: "pending"
  });

  const revenueResult = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" }
      }
    }
  ]);

  const totalRevenue =
    revenueResult.length > 0
      ? revenueResult[0].totalRevenue
      : 0;

  return {
    totalOrders,
    totalProducts,
    pendingOrders,
    totalRevenue
  };

};