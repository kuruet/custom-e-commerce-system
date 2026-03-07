import express from "express";
import cors from "cors";
import requestLogger from "./middleware/requestLogger.js";
import errorHandler from "./middleware/errorHandler.js";
import productRoutes from "./modules/products/product.routes.js";
const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
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

app.get("/api/health", (req, res) => {
  res.json({ status: "Server running" });
});

app.use(errorHandler);

export default app;