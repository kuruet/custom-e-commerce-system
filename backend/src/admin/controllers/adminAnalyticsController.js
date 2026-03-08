import { getAnalyticsData } from "../services/analyticsService.js";

export const getAdminAnalytics = async (req, res) => {

  try {

    const analytics = await getAnalyticsData();

    res.json({
      success: true,
      data: analytics
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics"
    });

  }

};