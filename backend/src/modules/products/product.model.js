import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    description: {
      type: String,
      required: true
    },

    image: {
      type: String,
      required: true
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },

    /* =========================================================
       NEW: Category (SAFE ADDITION)
       ========================================================= */
    category: {
      type: String,
      trim: true,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;