import rateLimit from "express-rate-limit";

const make = (windowMs, max, message) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({ success: false, message });
    },
  });

// Auth: 10 login/signup attempts per minute per IP
export const authLimiter = make(
  60 * 1000,
  10,
  "Too many authentication attempts. Please try again in a minute."
);

// Chat: 30 messages per minute per IP
export const chatLimiter = make(
  60 * 1000,
  30,
  "Slow down! You're sending messages too quickly."
);

// Wishlist: 60 reads/writes per minute per IP
export const wishlistLimiter = make(
  60 * 1000,
  60,
  "Too many wishlist requests. Please wait a moment."
);
