import express from "express";
import { authenticateUser } from "../auth/auth.middleware.js";
import * as chatController from "./chat.controller.js";

const router = express.Router();

router.post("/", authenticateUser, chatController.sendMessage);
router.get("/", authenticateUser, chatController.getChatHistory);

export default router;