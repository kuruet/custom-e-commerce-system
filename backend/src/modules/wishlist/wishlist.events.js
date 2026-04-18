/**
 * Wishlist Alert Event Handler — Phase 4, Step 2
 * Listens to PRODUCT_UPDATED and fires notifications for:
 *   - Price drops
 *   - Restock (0 → >0)
 *
 * Must be imported once at server startup (side-effect import).
 */
import eventBus from "../../utils/eventBus.js";
import Wishlist from "./wishlist.model.js";
import { sendNotification } from "../../utils/notification.service.js";

const handleProductUpdated = async ({ productId, title, oldPrice, newPrice, oldStock, newStock }) => {
  try {
    const priceDrop = newPrice < oldPrice;
    const restocked = oldStock === 0 && newStock > 0;

    if (!priceDrop && !restocked) return; // nothing to alert

    // Find all wishlists containing this product
    const wishlists = await Wishlist.find({ products: productId }, "userId");

    if (!wishlists.length) return; // nobody has it wishlisted

    for (const wl of wishlists) {
      if (priceDrop) {
        sendNotification(
          wl.userId,
          `💸 Price drop on "${title}"! Now ₹${newPrice} (was ₹${oldPrice})`
        );
      }
      if (restocked) {
        sendNotification(
          wl.userId,
          `✅ "${title}" is back in stock! Grab it before it's gone.`
        );
      }
    }
  } catch (err) {
    // Must never crash — product update already succeeded
    console.error("[WishlistAlerts] handleProductUpdated failed:", err.message);
  }
};

// Register exactly once
eventBus.on("PRODUCT_UPDATED", handleProductUpdated);

export default {}; // side-effect import only
