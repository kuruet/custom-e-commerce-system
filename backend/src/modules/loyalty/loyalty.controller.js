import * as loyaltyService from "./loyalty.service.js";

export const getUserPoints = async (req, res) => {
  try {
    const userId = req.user._id;
    const data = await loyaltyService.getUserPoints(userId);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const redeemPoints = async (req, res) => {
  try {
    const userId = req.user._id;
    const { points } = req.body;

    const amount = Number(points);
    if (!Number.isInteger(amount) || amount <= 0 || amount > 10_000) {
      return res.status(400).json({
        success: false,
        message: "Points must be a positive integer no greater than 10,000"
      });
    }

    const data = await loyaltyService.redeemPoints(userId, amount);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};