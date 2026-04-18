import express from "express";
import { authenticateUser } from "../auth/auth.middleware.js";
import * as loyaltyController from "./loyalty.controller.js";

const router = express.Router();

router.get("/", authenticateUser, loyaltyController.getUserPoints);
router.post("/redeem", authenticateUser, loyaltyController.redeemPoints);

export default router;