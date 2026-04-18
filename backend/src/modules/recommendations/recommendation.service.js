import Product from "../products/product.model.js";
import User from "../auth/user.model.js";
import Order from "../orders/order.model.js";
import mongoose from "mongoose";
import { cacheGet, cacheSet } from "../../utils/cache.js";

/**
 * Smart Recommendation Engine — Phase 3
 *
 * Scoring priority:
 *   1. Products in cartIds' categories  → high priority
 *   2. User preference categories       → medium priority
 *   3. Previously ordered categories    → medium priority
 *   4. Random fallback                  → low priority
 *
 * Always returns 4–6 products. Never crashes.
 */
export const getRecommendations = async (cartIds = [], userId = null) => {
  try {
    // ── Cache key ────────────────────────────────────────────────
    const cacheKey = `rec:${userId || "guest"}:${cartIds.sort().join(",")}`;
    const cached = cacheGet(cacheKey);
    if (cached) {
      console.log(`[Cache] HIT ${cacheKey}`);
      return cached;
    }

    // Normalise cartIds — only valid ObjectIds
    const validCartIds = (Array.isArray(cartIds) ? cartIds : [])
      .filter(id => mongoose.Types.ObjectId.isValid(id));

    const excludeIds = [...validCartIds];
    const FIELDS = "title price image category";
    // ── 1. Cart product categories (HIGH priority) ────────────
    let cartCategories = [];
    if (validCartIds.length > 0) {
      const cartProducts = await Product.find(
        { _id: { $in: validCartIds } },
        FIELDS
      );
      cartCategories = cartProducts.map(p => p.category).filter(Boolean);
    }

    // ── 2. User preference categories (MEDIUM) ───────────────
    let prefCategories = [];
    if (userId) {
      const user = await User.findById(userId, "preferences");
      if (user?.preferences?.categories?.length) {
        prefCategories = user.preferences.categories;
      }
    }

    // ── 3. Past order categories (MEDIUM) ────────────────────
    let orderCategories = [];
    if (userId) {
      try {
        const pastOrders = await Order.find({ userId }, "items");
        const pastProductIds = pastOrders
          .flatMap(o => o.items.map(i => i.productId))
          .filter(id => mongoose.Types.ObjectId.isValid(id));

        if (pastProductIds.length) {
          const pastProducts = await Product.find(
            { _id: { $in: pastProductIds } },
            "category"
          );
          orderCategories = pastProducts.map(p => p.category).filter(Boolean);
        }
      } catch (_) {
        // past orders optional — swallow
      }
    }

    // ── 4. Build candidate query from all known categories ────
    const allCategories = [
      ...new Set([...cartCategories, ...prefCategories, ...orderCategories])
    ].filter(Boolean);

    let recommended = [];

    if (allCategories.length > 0) {
      recommended = await Product.find({
        category: { $in: allCategories },
        _id: { $nin: excludeIds }
      })
        .select(FIELDS)
        .sort({ createdAt: -1 })
        .limit(6);
    }

    // ── 5. Pad with random products if not enough ─────────────
    if (recommended.length < 4) {
      const existingIds = [
        ...excludeIds,
        ...recommended.map(p => p._id)
      ];
      const random = await Product.aggregate([
        { $match: { _id: { $nin: existingIds } } },
        { $sample: { size: 6 - recommended.length } }
      ]);
      recommended = [...recommended, ...random];
    }

    const result = recommended.slice(0, 6);

    // Cache for 60s — short enough to stay fresh, long enough to save DB calls
    cacheSet(cacheKey, result, 60_000);
    console.log("RECOMMENDATION RESULT", result);
    return result;
  } catch (err) {
    console.error("[Recommendations] getRecommendations failed:", err.message);
    return [];   // fail-safe: never crash
  }
};

/**
 * Update user preference categories (called when user views a product or places an order)
 * - max 10 unique entries
 */
export const updateUserPreferences = async (userId, categories = []) => {
  if (!userId || !categories.length) return;

  try {
    const user = await User.findById(userId, "preferences");
    if (!user) return;

    const existing = user.preferences?.categories || [];
    const merged = [...new Set([...existing, ...categories.filter(Boolean)])];
    const trimmed = merged.slice(-10); // keep last 10

    await User.findByIdAndUpdate(userId, {
      $set: { "preferences.categories": trimmed }
    });
  } catch (err) {
    console.error("[Recommendations] updateUserPreferences failed:", err.message);
  }
};