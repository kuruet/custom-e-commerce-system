import * as orderService from "./order.service.js";

export const createOrder = async (req, res) => {
  try {
    const { customer, items, totalPrice } = req.body;

    // Basic validation
    if (!customer || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data",
      });
    }

    if (!customer.name || !customer.phone || !customer.address) {
      return res.status(400).json({
        success: false,
        message: "Missing customer information",
      });
    }

    // Validate items
    for (const item of items) {
      if (!item.productId || !item.quantity) {
        return res.status(400).json({
          success: false,
          message: "Invalid item in order",
        });
      }
    }

    const order = await orderService.createOrder(req.body);

    res.status(201).json({
      success: true,
      data: order,
    });

  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();

    res.json({
      success: true,
      data: orders,
    });

  } catch (error) {
    console.error("Get orders error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      data: order,
    });

  } catch (error) {
    console.error("Get order error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    });
  }
};