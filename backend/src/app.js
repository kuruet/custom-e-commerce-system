import express from "express";
import cors from "cors";
import requestLogger from "./middleware/requestLogger.js";
import errorHandler from "./middleware/errorHandler.js";
import productRoutes from "./modules/products/product.routes.js";
import orderRoutes from "./modules/orders/order.routes.js";


const app = express();

app.get("/debug", (req, res) => {
  res.json({ message: "Debug route working" });
});

const allowedOrigins = [
  "http://localhost:5173",          // Vite dev frontend
  process.env.FRONTEND_URL          // Vercel production frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server or browser direct requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("Custom E-Commerce Backend API Running");
});
app.use("/api/products", productRoutes);

console.log("Registering order routes");
app.use("/api/orders", orderRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "Server running" });
});

app.use(errorHandler);

export default app;