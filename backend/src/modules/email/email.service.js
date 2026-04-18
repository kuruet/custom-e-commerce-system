import User from "../auth/user.model.js";
import { sendEmail } from "../../utils/email.service.js";

// Basic deduplication cache (resets on restart; good for 1 instance or temporary dedupe)
const dedupeCache = new Map();

/**
 * Checks deduplication logic for "max 2 emails/day" per user or specific email type.
 * @returns boolean true if allowed, false if blocked
 */
const checkAndRegisterRateLimit = (userId, type) => {
  const key = `${userId}:${type}`;
  const now = Date.now();
  
  if (dedupeCache.has(key)) {
    const lastSent = dedupeCache.get(key);
    // Suppress if within last 24h
    if (now - lastSent < 24 * 60 * 60 * 1000) {
      return false;
    }
  }
  
  // Register sentiment
  dedupeCache.set(key, now);
  // Optional: Clean up memory limits here if scaled
  return true;
};

export const subscribeEmail = async (email, userId = null) => {
  console.log("📩 subscribeEmail called:", email);

  console.log("📨 Sending branded welcome email to:", email);

  // 🔥 Send welcome email
  await sendEmail({
    to: email,
    subject: "Welcome to Nynth Studio 🎉 Your style journey starts here",
    html: `
  <div style="font-family: Arial, sans-serif; background: #0f0f0f; color: #ffffff; padding: 30px; text-align: center;">
    
    <h1 style="color: #ffffff; font-size: 28px;">
      Welcome to Nynth Studio 🎉
    </h1>

    <p style="color: #cccccc; font-size: 16px; margin-top: 10px;">
      You're now part of a community that designs, customizes, and creates unique styles.
    </p>

    <div style="margin: 25px 0;">
      <p style="font-size: 15px; color: #dddddd;">
        ✨ Get early access to exclusive drops<br/>
        💸 Be the first to know about price drops<br/>
        🎯 Receive personalized recommendations
      </p>
    </div>

    <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" 
       style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: #ffffff; color: #000000; text-decoration: none; font-weight: bold; border-radius: 6px;">
       Start Exploring →
    </a>

    <p style="margin-top: 30px; font-size: 12px; color: #888888;">
      Nynth Studio — Designed for expression.
    </p>

  </div>
`
  });

  return {
    success: true,
    message: "Subscribed successfully"
  };
};

export const sendPriceDropEmail = async (user, product) => {
  if (!user.emailSubscribed || user.emailPreferences?.priceDrops === false) return;
  if (!checkAndRegisterRateLimit(user._id, "PRICE_DROP_" + product._id)) return;

  sendEmail({
    to: user.email,
    subject: `🚨 Price Drop Alert: The ${product.title} is on sale!`,
    html: `
      <div style="font-family: sans-serif; padding: 30px;">
        <h2 style="color: #000;">Great news, ${user.name}!</h2>
        <p style="color: #4b5563;">An item you were looking at has dropped in price.</p>
        <div style="border: 1px solid #e5e7eb; padding: 20px; border-radius: 12px; margin: 20px 0;">
          <h3 style="margin-top:0;">${product.title}</h3>
          <p style="font-size: 20px; font-weight: bold; color: #059669;">Now only ₹${product.price}</p>
        </div>
      </div>
    `
  });
};

export const sendBrowseReminder = async (user, product) => {
  if (!user.emailSubscribed) return;
  if (!checkAndRegisterRateLimit(user._id, "BROWSE_REMINDER_" + product._id)) return;

  sendEmail({
    to: user.email,
    subject: `Still thinking about the ${product.title}?`,
    html: `
      <div style="font-family: sans-serif; padding: 30px;">
        <h2 style="color: #000;">Hi ${user.name},</h2>
        <p style="color: #4b5563;">We noticed you checking out the <strong>${product.title}</strong>.</p>
        <p style="color: #4b5563;">It's a great choice! Grab it before it goes out of stock.</p>
        <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/product/${product._id}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #000; color: #fff; text-decoration: none; border-radius: 8px;">View Product</a>
      </div>
    `
  });
};

export const sendRecommendationEmail = async (user, products) => {
  if (!user.emailSubscribed || user.emailPreferences?.recommendations === false) return;
  if (!checkAndRegisterRateLimit(user._id, "RECOMMENDATIONS_WEEKLY")) return;
  if (!products || products.length === 0) return;

  const productHtml = products.slice(0,3).map(p => `
    <div style="margin-bottom: 15px;">
      <strong>${p.title}</strong> - ₹${p.price}
    </div>
  `).join("");

  sendEmail({
    to: user.email,
    subject: `Picked just for you, ${user.name} ✨`,
    html: `
      <div style="font-family: sans-serif; padding: 30px;">
        <h2 style="color: #000;">Check out our latest recommendations</h2>
        <p style="color: #4b5563;">Based on what you love:</p>
        <div style="padding: 20px; background: #f9fafb; border-radius: 12px; margin: 20px 0;">
          ${productHtml}
        </div>
      </div>
    `
  });
};
