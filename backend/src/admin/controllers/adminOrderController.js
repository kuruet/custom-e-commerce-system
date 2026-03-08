import Order from "../../modules/orders/order.model.js";
export const getAllOrders = async (req, res) => {

  try {

    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders"
    });

  }

};