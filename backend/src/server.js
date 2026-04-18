import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./config/database.js";

// ── Phase 3-4: Intelligence Layer ─────────────────────────────
import "./modules/loyalty/loyalty.events.js";   // ORDER_CREATED → award points
import "./modules/wishlist/wishlist.events.js"; // PRODUCT_UPDATED → wishlist alerts
import { startCronJobs } from "./utils/cronJobs.js";


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    // Start background jobs AFTER DB is ready
    startCronJobs();



    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();