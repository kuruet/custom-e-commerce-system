import express from "express";
import { trackProductView } from "./activity.controller.js";
import { authenticateUser } from "../auth/auth.middleware.js";

const router = express.Router();

router.post("/view", authenticateUser, trackProductView);

export default router;
