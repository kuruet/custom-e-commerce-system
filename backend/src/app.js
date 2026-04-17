import express from "express";
import cors from "cors";

import requestLogger from "./middleware/requestLogger.js";
import errorHandler from "./middleware/errorHandler.js";

import productRoutes from "./modules/products/product.routes.js";
import orderRoutes from "./modules/orders/order.routes.js";
import adminRoutes from "./admin/routes/adminRoutes.js";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

/* =========================================================
   BASIC DEBUG ROUTE (SAFE)
   ========================================================= */
app.get("/debug", (req, res) => {
  res.json({ message: "Debug route working" });
});

/* =========================================================
   CORS CONFIG (SAFE)
   ========================================================= */
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL
].filter(Boolean); // remove undefined

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

/* =========================================================
   BODY PARSER
   ========================================================= */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

/* =========================================================
   REQUEST LOGGER
   ========================================================= */
app.use(requestLogger);

/* =========================================================
   ROOT ROUTE
   ========================================================= */
app.get("/", (req, res) => {
  res.send("Custom E-Commerce Backend API Running");
});

/* =========================================================
   API ROUTES (ORDER MATTERS)
   ========================================================= */

// ✅ PRODUCT ROUTES
app.use("/api/products", productRoutes);

// ✅ ORDER ROUTES
app.use("/api/orders", orderRoutes);

// ✅ ADMIN ROUTES
app.use("/api/admin", adminRoutes);

// ✅ AUTH ROUTES
app.use("/api/auth", authRoutes);

/* =========================================================
   HEALTH CHECK
   ========================================================= */
app.get("/api/health", (req, res) => {
  res.json({ status: "Server running" });
});

/* =========================================================
   404 HANDLER (VERY IMPORTANT FIX)
   ========================================================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

/* =========================================================
   GLOBAL ERROR HANDLER
   ========================================================= */
app.use(errorHandler);

export default app;