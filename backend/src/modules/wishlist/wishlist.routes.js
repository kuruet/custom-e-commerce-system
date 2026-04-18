import express from "express";
import { authenticateUser } from "../auth/auth.middleware.js";
import * as wishlistController from "./wishlist.controller.js";

const router = express.Router();

router.post("/", authenticateUser, wishlistController.addToWishlist);
router.get("/", authenticateUser, wishlistController.getWishlist);
router.delete("/:productId", authenticateUser, wishlistController.removeFromWishlist);

export default router;