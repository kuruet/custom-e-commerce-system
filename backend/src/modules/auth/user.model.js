import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    points: {
      type: Number,
      default: 0,
      min: 0
    },

    emailSubscribed: {
      type: Boolean,
      default: false
    },

    emailPreferences: {
      priceDrops: { type: Boolean, default: true },
      recommendations: { type: Boolean, default: true }
    },

    preferences: {
      categories: [String],
      lastViewed: [String] // product IDs as string for compatibility
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

export default User;