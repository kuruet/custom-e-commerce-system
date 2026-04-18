import express from "express";
import { subscribe, testEmail } from "./email.controller.js";
import { authenticateUser } from "../auth/auth.middleware.js";

const router = express.Router();

// Optional auth to extract user if logged in!
const optionalAuth = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    return authenticateUser(req, res, next);
  }
  next();
};

router.post("/subscribe", optionalAuth, subscribe);
router.get("/test", testEmail);

export default router;
