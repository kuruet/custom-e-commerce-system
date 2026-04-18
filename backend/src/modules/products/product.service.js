import Product from "./product.model.js";
import mongoose from "mongoose";
import eventBus from "../../utils/eventBus.js";


// Create new product
export const createProduct = async (productData) => {
  const product = await Product.create(productData);
  return product;
};


// Get all products
export const getAllProducts = async () => {
  const products = await Product.find()
    .select("title price image category stock description")
    .sort({ createdAt: -1 })
    .limit(50);
  return products;
};



// Get single product by ID

export const getProductById = async (productId) => {
  // 🔥 CRITICAL FIX: prevent invalid ObjectId crash
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return null; // safely return instead of crashing
  }

  const product = await Product.findById(productId);
  return product;
};


// Update product — emits PRODUCT_UPDATED for wishlist alert detection
export const updateProduct = async (productId, updateData) => {
  // Snapshot BEFORE update for comparison
  const before = await Product.findById(productId, "price stock title");

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updateData,
    { new: true }
  );

  // Emit non-blocking so update response is never delayed
  if (before && updatedProduct) {
    setImmediate(() => {
      eventBus.emit("PRODUCT_UPDATED", {
        productId,
        title: before.title,
        oldPrice: before.price,
        newPrice: updatedProduct.price,
        oldStock: before.stock,
        newStock: updatedProduct.stock
      });
    });
  }

  return updatedProduct;
};


// Delete product
export const deleteProduct = async (productId) => {
  const deletedProduct = await Product.findByIdAndDelete(productId);
  return deletedProduct;
};


/* =========================================================
   NEW: Get Recommended Products (SAFE ADDITION)
   ========================================================= */

export const getRecommendedProducts = async (cartProductIds = []) => {
  try {
    // 1. Ensure array
    if (!Array.isArray(cartProductIds)) {
      cartProductIds = [];
    }

    // 2. 🔥 CRITICAL FIX: filter valid Mongo ObjectIds only
    const validIds = cartProductIds.filter(id =>
      mongoose.Types.ObjectId.isValid(id)
    );

    // 3. If no valid IDs → return random products
    if (validIds.length === 0) {
      const randomProducts = await Product.aggregate([
        { $sample: { size: 4 } }
      ]);
      return randomProducts;
    }

    // 4. Fetch cart products safely
    const cartProducts = await Product.find({
      _id: { $in: validIds }
    });

    // 5. Extract categories (if exists)
    const categories = cartProducts
      .map(p => p.category)
      .filter(Boolean);

    let recommendedProducts = [];

    // 6. If category exists → find similar products
    if (categories.length > 0) {
      recommendedProducts = await Product.find({
        category: { $in: categories },
        _id: { $nin: validIds } // exclude cart items
      })
        .limit(4)
        .sort({ createdAt: -1 });
    }

    // 7. Fallback → random (excluding cart items)
    if (!recommendedProducts || recommendedProducts.length === 0) {
      recommendedProducts = await Product.aggregate([
        {
          $match: {
            _id: { $nin: validIds }
          }
        },
        { $sample: { size: 4 } }
      ]);
    }

    return recommendedProducts;

  } catch (error) {
    console.error("Error in getRecommendedProducts:", error);

    // 🔒 NEVER crash API
    return [];
  }
};