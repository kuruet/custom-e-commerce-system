import Order from "./order.model.js";

export const createOrder = async (orderData) => {
  const order = new Order(orderData);
  return await order.save();
};

export const getAllOrders = async () => {
  return await Order.find().sort({ createdAt: -1 });
};

export const getOrderById = async (id) => {
  return await Order.findById(id);
};