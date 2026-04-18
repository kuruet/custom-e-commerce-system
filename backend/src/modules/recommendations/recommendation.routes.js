import express from "express";
import { authenticateUser } from "../auth/auth.middleware.js";
import { getRecommendationsHandler } from "./recommendation.controller.js";

const router = express.Router();

// Optional auth: attach user if token present, but don't block guests
const optionalAuth = (req, res, next) => {
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer ")) {
    return authenticateUser(req, res, next);
  }
  next();
};

router.get("/", optionalAuth, getRecommendationsHandler);

export default router;