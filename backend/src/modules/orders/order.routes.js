import express from "express";
import * as orderController from "./order.controller.js";
import { authenticateUser } from "../auth/auth.middleware.js";

console.log("Orders router loaded");

const router = express.Router();

/* Protected order creation */
router.post("/", authenticateUser, orderController.createOrder);

/* Get all orders */
router.get("/", orderController.getAllOrders);

/* Get order by ID */
router.get("/:id", orderController.getOrderById);

export default router;