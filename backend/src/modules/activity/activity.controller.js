import * as activityService from "./activity.service.js";
import mongoose from "mongoose";

export const trackProductView = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(200).json({ success: true, message: "Skipped guest tracking" });
    }

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    // Call service without blocking response
    activityService.trackActivity(userId, productId, "VIEW");

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
