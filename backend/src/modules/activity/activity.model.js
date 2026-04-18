import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    type: { type: String, enum: ["VIEW", "CART"], default: "VIEW" }
  },
  { timestamps: true }
);

// Keep records lean by only explicitly finding the most recent per user-product
activitySchema.index({ userId: 1, productId: 1, type: 1 });

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
