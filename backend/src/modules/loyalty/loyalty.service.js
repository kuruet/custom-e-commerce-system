import Loyalty from "./loyalty.model.js";
import User from "../auth/user.model.js";

/**
 * addPoints — canonical point-awarding function.
 * Called directly by order.service (Step 1) AND by loyalty.events (event path).
 * Safe: returns silently if userId missing; never throws upward.
 */
export const addPoints = async (userId, totalPrice) => {
  if (!userId) return; // guest order — skip silently

  const pointsEarned = Math.floor((totalPrice || 0) / 100);
  if (pointsEarned <= 0) return;

  try {
    await User.findByIdAndUpdate(userId, { $inc: { points: pointsEarned } });

    const loyalty = await Loyalty.findOneAndUpdate(
      { userId },
      {
        $inc: { points: pointsEarned },
        $push: { history: { type: "EARNED", points: pointsEarned, date: new Date() } }
      },
      { upsert: true, new: true }
    );

    console.log(`[Loyalty] addPoints: +${pointsEarned} pts → userId=${userId} | total=${loyalty.points}`);
    console.log("POINTS ADDED", userId, pointsEarned);
  } catch (err) {
    console.error("[Loyalty] addPoints failed:", err.message);
  }
};

export const getUserPoints = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  
  let loyalty = await Loyalty.findOne({ userId });
  if (!loyalty) {
    loyalty = await Loyalty.create({ userId, points: user.points || 0, history: [] });
  }
  
  return loyalty;
};

export const redeemPoints = async (userId, pointsToRedeem) => {
  if (pointsToRedeem == null || pointsToRedeem <= 0) {
    throw new Error("Invalid points amount");
  }

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if ((user.points || 0) < pointsToRedeem) {
    throw new Error("Insufficient points");
  }

  // Update User
  user.points -= pointsToRedeem;
  await user.save();

  // Update Loyalty record
  let loyalty = await Loyalty.findOne({ userId });
  if (!loyalty) {
    loyalty = new Loyalty({ userId, points: user.points, history: [] });
  } else {
    loyalty.points = user.points;
  }

  loyalty.history.push({
    type: "REDEEMED",
    points: pointsToRedeem,
    date: new Date()
  });
  
  await loyalty.save();

  return { pointsRemaining: user.points };
};