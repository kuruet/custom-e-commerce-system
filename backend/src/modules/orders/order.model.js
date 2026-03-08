import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: String,
      phone: String,
      address: String,
      city: String,
      postalCode: String,
    },

   items: [
  {
    productId: {
      type: String,
      required: false
    },

        title: String,
        price: Number,

        color: String,
        quantity: Number,

        previewImage: String,

        designJSON: Object,
      },
    ],

    totalPrice: Number,

    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);