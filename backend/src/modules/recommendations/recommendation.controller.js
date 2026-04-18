import { getRecommendations } from "./recommendation.service.js";

export const getRecommendationsHandler = async (req, res) => {
  try {
    let cartIds = [];
    if (req.query.cartIds) {
      cartIds = req.query.cartIds.split(",").map(id => id.trim()).filter(Boolean);
    }

    // userId is optional — authenticated routes pass it; public ones won't
    const userId = req.user?._id || null;

    const data = await getRecommendations(cartIds, userId);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};