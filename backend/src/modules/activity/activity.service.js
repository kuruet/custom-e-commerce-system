import Activity from "./activity.model.js";

export const trackActivity = async (userId, productId, type = "VIEW") => {
  if (!userId || !productId) return;

  try {
    // Upsert equivalent: find existing identical record for today, or create new.
    // simpler approach: just update the timestamp
    await Activity.findOneAndUpdate(
      { userId, productId, type },
      { $set: { updatedAt: new Date() } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  } catch (error) {
    console.error(`[Activity] Failed recording ${type} for ${productId}:`, error.message);
  }
};
