/**
 * Cron Jobs — runs lightweight background checks
 * Non-blocking: all failures are caught and logged only.
 *
 * Schedule: every 5 minutes (simple setInterval — no heavy cron lib needed)
 */
import Product from "../modules/products/product.model.js";
import Wishlist from "../modules/wishlist/wishlist.model.js";
import Activity from "../modules/activity/activity.model.js";
import User from "../modules/auth/user.model.js";
import { sendNotification } from "./notification.service.js";
import { sendPriceDropEmail, sendBrowseReminder } from "../modules/email/email.service.js";

// In-memory price/stock snapshot for change detection
// (resets on server restart — acceptable for this phase)
const priceSnapshot = new Map();   // productId -> last known price
const stockSnapshot = new Map();   // productId -> last known stock

const checkWishlistAlerts = async () => {
  try {
    const products = await Product.find({}, "_id price stock title");

    for (const product of products) {
      const id = product._id.toString();
      const currentPrice = product.price;
      const currentStock = product.stock;

      // ── Price Drop Detection ─────────────────────────────────
      if (priceSnapshot.has(id)) {
        const lastPrice = priceSnapshot.get(id);
        if (currentPrice < lastPrice) {
          // Find all wishlists that contain this product
          const wishlists = await Wishlist.find({ products: product._id }).populate("userId");
          for (const wl of wishlists) {
            sendNotification(
              wl.userId._id || wl.userId,
              `💸 Price drop on "${product.title}"! Now ₹${currentPrice} (was ₹${lastPrice})`
            );
            if (wl.userId && wl.userId.emailSubscribed) {
              sendPriceDropEmail(wl.userId, product);
            }
          }

        }
      }

      // ── Restock Detection ────────────────────────────────────
      if (stockSnapshot.has(id)) {
        const lastStock = stockSnapshot.get(id);
        if (lastStock === 0 && currentStock > 0) {
          const wishlists = await Wishlist.find({ products: product._id });
          for (const wl of wishlists) {
            sendNotification(
              wl.userId,
              `✅ "${product.title}" is back in stock!`
            );
          }
        }
      }

      // Update snapshots
      priceSnapshot.set(id, currentPrice);
      stockSnapshot.set(id, currentStock);
    }
  } catch (err) {
    console.error("[CronJobs] checkWishlistAlerts failed:", err.message);
  }
};

const checkBrowseAbandonment = async () => {
  try {
    // Over 12 hours ago (shorter for testing if needed, keeping sensible)
    const cutoff = new Date(Date.now() - 12 * 60 * 60 * 1000); 
    
    // Find views older than 12 hours where type was VIEW
    const oldViews = await Activity.find({ type: "VIEW", updatedAt: { $lt: cutoff } }).sort({ updatedAt: -1 }).limit(100);
    
    for (const view of oldViews) {
      // Find the user and product
      const user = await User.findById(view.userId);
      const product = await Product.findById(view.productId);
      
      if (user && product) {
        await sendBrowseReminder(user, product);
        // Clear activity or upgrade type so we don't spam indefinitely
         await Activity.findByIdAndDelete(view._id);
      }
    }
  } catch (err) {
    console.error("[CronJobs] checkBrowseAbandonment failed:", err.message);
  }
};

export const startCronJobs = () => {
  console.log("[CronJobs] Starting background jobs...");

  // Run immediately on start to seed snapshots
  checkWishlistAlerts();
  checkBrowseAbandonment();

  // Then every 5 minutes
  setInterval(checkWishlistAlerts, 5 * 60 * 1000);
  // Then every hour for abandonment
  setInterval(checkBrowseAbandonment, 60 * 60 * 1000);
};
