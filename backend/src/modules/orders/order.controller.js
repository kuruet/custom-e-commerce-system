import mongoose from "mongoose";
import * as orderService from "./order.service.js";

export const createOrder = async (req, res) => {
  try {
    const { customer, items, totalPrice } = req.body;

    // Log the payload to catch the problematic ID
    console.log("PAYLOAD CHECK:", { customer, itemCount: items?.length, totalPrice });

    // 1. Structural Validation
    if (!customer || !items || items.length === 0) {
      console.log("REJECTED: Missing customer or empty items array");
      return res.status(400).json({ success: false, message: "Invalid order data" });
    }

    // 2. Customer Field Validation
    if (!customer.name || !customer.phone || !customer.address) {
      console.log("REJECTED: Missing customer fields", customer);
      return res.status(400).json({ success: false, message: "Missing customer information" });
    }

    // 3. Item Validation (Simplified)
    for (const item of items) {
      // Check only if the essential data exists
      if (!item.productId || item.quantity == null) {
        console.log("REJECTED: Item missing productId or quantity", item);
        return res.status(400).json({ success: false, message: "Invalid item in order" });
      }
      
      // REMOVED: mongoose.Types.ObjectId.isValid check
      // This allows 'custom-xxx', '1', and standard ObjectIds to all pass through.
    }

    const order = await orderService.createOrder(req.body);
    
    res.status(201).json({
      success: true,
      data: order,
    });
    
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};

// ... keep getAllOrders and getOrderById exactly as they were

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
    const { id } = req.params;

    // Safety check for the Order ID itself (must be valid MongoDB ID)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await orderService.getOrderById(id);

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