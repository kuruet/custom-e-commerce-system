import Chat from "./chat.model.js";
import { getRecommendations } from "../recommendations/recommendation.service.js";
import Order from "../orders/order.model.js";

// ── Rule-Based AI Response Engine ────────────────────────────────────────────
const AI_RULES = [
  {
    keywords: ["order", "track", "delivery", "shipped", "status"],
    response: "__LATEST_ORDER__"   // special key — live DB lookup
  },
  {
    keywords: ["size", "fit", "measurements", "chart"],
    response:
      "📏 Size guidance: S (chest 36\"), M (chest 38\"), L (chest 40\"), XL (chest 42\"). For custom designs, you can specify custom dimensions at checkout. When in doubt, size up!"
  },
  {
    keywords: ["return", "refund", "exchange", "cancel"],
    response:
      "↩️ Returns are accepted within 7 days of delivery for unused items. Customised products are non-refundable unless defective. Contact support with your order ID to initiate a return."
  },
  {
    keywords: ["pay", "payment", "upi", "card", "razorpay", "cod"],
    response:
      "💳 We accept Cash on Delivery (COD) and online payments via Razorpay (UPI, debit/credit cards, net banking). Payments are 100% secure."
  },
  {
    keywords: ["recommend", "suggest", "what should", "show me", "best"],
    response: "__RECOMMENDATIONS__" // special key — handled below
  },
  {
    keywords: ["hello", "hi", "hey", "help"],
    response:
      "👋 Hi there! I can help you with orders, sizing, payments, returns, and product recommendations. What do you need?"
  }
];

const getAIResponse = async (messageText, userId) => {
  const lower = messageText.toLowerCase();

  for (const rule of AI_RULES) {
    if (rule.keywords.some(kw => lower.includes(kw))) {

      // ── Live: latest order lookup ──────────────────────────
      if (rule.response === "__LATEST_ORDER__") {
        try {
          const latestOrder = await Order.findOne({ userId }).sort({ createdAt: -1 });
          if (!latestOrder) {
            return "📦 We couldn't find any orders linked to your account yet. Once you place one, you can track it here!";
          }
          return (
            `📦 Your latest order:\n` +
            `• Status: ${latestOrder.status}\n` +
            `• Payment: ${latestOrder.paymentMethod} (${latestOrder.paymentStatus})\n` +
            `• Total: ₹${latestOrder.totalPrice}\n` +
            `• Placed: ${latestOrder.createdAt.toDateString()}`
          );
        } catch (_) {
          return "🚚 To track your order, head to your Orders page in the app.";
        }
      }

      // ── Live: recommendations lookup ───────────────────────
      if (rule.response === "__RECOMMENDATIONS__") {
        const products = await getRecommendations([], userId);
        if (products.length === 0) {
          return "🛍️ Check out our latest collection on the home page — we update it regularly!";
        }
        const titles = products
          .slice(0, 4)
          .map((p, i) => `${i + 1}. ${p.title} — ₹${p.price}`)
          .join("\n");
        return `🛍️ Here are some products you might love:\n${titles}`;
      }

      return rule.response;
    }
  }

  return "🤖 I'm not sure about that yet. Try asking about orders, sizing, payments, or recommendations — I'm still learning!";
};

// ── Public Service Functions ──────────────────────────────────────────────────
export const sendMessage = async (userId, messageText) => {
  if (!messageText || messageText.length > 500) {
    throw new Error("Message is invalid or too long (max 500 chars)");
  }

  let chat = await Chat.findOne({ userId });
  if (!chat) {
    chat = new Chat({ userId, messages: [] });
  }

  // 1. Save user message
  chat.messages.push({
    sender: "USER",
    text: messageText,
    createdAt: new Date()
  });

  // 2. Generate & save AI response (never throw — always respond)
  try {
    const aiText = await getAIResponse(messageText, userId);
    chat.messages.push({
      sender: "AI",
      text: aiText,
      createdAt: new Date()
    });
  } catch (err) {
    console.error("[Chat] AI response failed:", err.message);
    chat.messages.push({
      sender: "AI",
      text: "Sorry, I'm having trouble right now. Please try again in a moment.",
      createdAt: new Date()
    });
  }

  await chat.save();
  return chat;
};

export const getChatHistory = async (userId) => {
  let chat = await Chat.findOne({ userId });
  if (!chat) {
    chat = await Chat.create({ userId, messages: [] });
  }
  return chat;
};