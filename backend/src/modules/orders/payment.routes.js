import express from "express";
import { authenticateUser } from "../auth/auth.middleware.js";
import {
  createRazorpayOrder,
  verifyPaymentAndCreateOrder,
} from "./payment.controller.js";

const router = express.Router();

router.post("/create-order", authenticateUser, createRazorpayOrder);
router.post("/verify", authenticateUser, verifyPaymentAndCreateOrder);


export default router;