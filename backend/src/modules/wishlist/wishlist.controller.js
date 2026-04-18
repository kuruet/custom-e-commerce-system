import * as wishlistService from "./wishlist.service.js";

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    if (!productId || typeof productId !== "string") {
      return res.status(400).json({ success: false, message: "productId must be a non-empty string" });
    }

    const data = await wishlistService.addToWishlist(userId, productId.trim());
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const data = await wishlistService.getWishlist(userId);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    if (!productId || typeof productId !== "string") {
      return res.status(400).json({ success: false, message: "Invalid productId" });
    }

    const data = await wishlistService.removeFromWishlist(userId, productId.trim());
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};