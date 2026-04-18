import Order from "./order.model.js";
import eventBus from "../../utils/eventBus.js";
import { addPoints } from "../loyalty/loyalty.service.js";
import { updateUserPreferences } from "../recommendations/recommendation.service.js";
import Product from "../products/product.model.js";
import mongoose from "mongoose";

export const createOrder = async (orderData) => {
  const order = new Order(orderData);
  const saved = await order.save();

  console.log(`[EVENT] ORDER_CREATED orderId=${saved._id} userId=${saved.userId || "guest"} total=₹${saved.totalPrice}`);
  console.log("ORDER CREATED", saved);

  // ── STEP 1: Loyalty points (direct call, non-blocking) ────────
  const shouldEarnPoints =
    saved.paymentMethod === "COD" ||
    saved.paymentStatus === "PAID";

  if (shouldEarnPoints) {
    setImmediate(async () => {
      await addPoints(saved.userId, saved.totalPrice);

      // Also emit event for any other listeners (e.g. future webhooks)
      eventBus.emit("ORDER_CREATED", {
        userId: saved.userId,
        orderId: saved._id,
        totalPrice: saved.totalPrice,
        pointsEarned: Math.floor((saved.totalPrice || 0) / 100)
      });
    });
  }

  // ── STEP 3: Update user preferences from ordered categories ───
  if (saved.userId) {
    setImmediate(async () => {
      try {
        const productIds = (saved.items || [])
          .map(i => i.productId)
          .filter(id => mongoose.Types.ObjectId.isValid(id));

        if (productIds.length > 0) {
          const products = await Product.find({ _id: { $in: productIds } }, "category");
          const categories = products.map(p => p.category).filter(Boolean);
          if (categories.length > 0) {
            await updateUserPreferences(saved.userId, categories);
            console.log(`[Recommendations] Preferences updated for userId=${saved.userId} → [${categories.join(", ")}]`);
          }
        }
      } catch (err) {
        console.error("[Order] updateUserPreferences failed:", err.message);
      }
    });
  }

  return saved;
};

export const getAllOrders = async () => {
  return await Order.find().sort({ createdAt: -1 });
};

export const getOrderById = async (id) => {
  return await Order.findById(id);
};