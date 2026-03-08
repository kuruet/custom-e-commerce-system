import express from "express";

import { adminLogin } from "../controllers/adminAuthController.js";
import { getAllOrders } from "../controllers/adminOrderController.js";
import { getAdminAnalytics } from "../controllers/adminAnalyticsController.js";

import { adminAuthMiddleware } from "../middlewares/adminAuthMiddleware.js";

const router = express.Router();

router.post("/login", adminLogin);

router.get("/analytics", adminAuthMiddleware, getAdminAnalytics);

router.get("/orders", adminAuthMiddleware, getAllOrders);

export default router;