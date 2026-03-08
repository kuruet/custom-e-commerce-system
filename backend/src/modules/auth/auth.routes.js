import express from "express";
import { signupUser, loginUser } from "./auth.controller.js";

const router = express.Router();

/* Signup */
router.post("/signup", signupUser);

/* Login */
router.post("/login", loginUser);

export default router;