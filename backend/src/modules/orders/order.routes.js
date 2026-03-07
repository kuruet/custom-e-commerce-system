import express from "express";
import * as orderController from "./order.controller.js";
console.log("Orders router loaded");
const router = express.Router();

router.post("/", orderController.createOrder);

router.get("/", orderController.getAllOrders);

router.get("/:id", orderController.getOrderById);

 
export default router;