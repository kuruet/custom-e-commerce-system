/**
 * Loyalty Event Handler
 * Listens to ORDER_CREATED event and awards points to the user.
 * Must be imported once at server startup.
 */
import eventBus from "../../utils/eventBus.js";
import Loyalty from "./loyalty.model.js";
import User from "../auth/user.model.js";

const handleOrderCreated = async ({ userId, orderId, totalPrice, pointsEarned }) => {
  if (!userId) {
    // Guest order — no loyalty tracking
    return;
  }

  try {
    // Update User.points
    await User.findByIdAndUpdate(userId, {
      $inc: { points: pointsEarned }
    });

    // Upsert Loyalty record
    const loyalty = await Loyalty.findOneAndUpdate(
      { userId },
      {
        $inc: { points: pointsEarned },
        $push: {
          history: {
            type: "EARNED",
            points: pointsEarned,
            date: new Date()
          }
        }
      },
      { upsert: true, new: true }
    );

    console.log(
      `[Loyalty] +${pointsEarned} pts → userId=${userId} (orderId=${orderId}) | total=${loyalty.points}`
    );
  } catch (err) {
    // Must NEVER throw — order is already saved
    console.error("[Loyalty] Failed to award points:", err.message);
  }
};

// Register the listener exactly once
eventBus.on("ORDER_CREATED", handleOrderCreated);

export default {};  // import side-effect only
