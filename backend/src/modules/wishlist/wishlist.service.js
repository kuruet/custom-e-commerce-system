import Wishlist from "./wishlist.model.js";
import mongoose from "mongoose";

export const addToWishlist = async (userId, productId) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid product ID");
  }

  const wishlist = await Wishlist.findOneAndUpdate(
    { userId },
    { $addToSet: { products: productId } },
    { new: true, upsert: true }
  ).populate("products");

  return wishlist;
};

export const getWishlist = async (userId) => {
  let wishlist = await Wishlist.findOne({ userId }).populate("products");
  if (!wishlist) {
    wishlist = await Wishlist.create({ userId, products: [] });
  }
  return wishlist;
};

export const removeFromWishlist = async (userId, productId) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid product ID");
  }

  const wishlist = await Wishlist.findOneAndUpdate(
    { userId },
    { $pull: { products: productId } },
    { new: true }
  ).populate("products");

  if (!wishlist) {
    throw new Error("Wishlist not found");
  }

  return wishlist;
};