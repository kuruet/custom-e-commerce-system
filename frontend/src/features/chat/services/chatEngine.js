import { parseIntent } from "../utils/intentParser.js";
import { getProducts, getRecommendations } from "./chat.api.js";

// Basic smart memory
let lastIntent = null;

const handleGreeting = () => {
  return "👋 Hi there! I can help you find products, check prices, get recommendations, or help with your orders. What are you looking for today?";
};

const handleProductQuery = async () => {
  try {
    const res = await getProducts();
    const products = res.data?.products || res.data || [];
    
    if (products.length === 0) {
      return "We are currently out of stock on most items. Please check back later!";
    }

    const titles = products
      .slice(0, 3)
      .map((p, i) => `${i + 1}. ${p.title} – ₹${p.price}`)
      .join("\n");

    return `Here are some popular products right now:\n\n${titles}\n\nWant recommendations based on your style?`;
  } catch (error) {
    return "I am having trouble fetching the products right now. Please try again later.";
  }
};

const handlePriceQuery = async () => {
  try {
    const res = await getProducts();
    const products = res.data?.products || res.data || [];
    
    if (products.length === 0) {
      return "Our products usually range from ₹500 to ₹3000 depending on the category.";
    }

    const prices = products.map(p => Number(p.price));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return `Our product prices generally range from ₹${minPrice} to ₹${maxPrice}. Can I help you find something within a specific budget?`;
  } catch (error) {
    return "Our prices range from ₹500 to ₹3000. Let me know if you want to see specific products!";
  }
};

const handleRecommendation = async () => {
  try {
    const res = await getRecommendations();
    const products = res.data || [];
    
    if (products.length === 0) {
      return "I would recommend checking out our latest arrivals on the home page!";
    }

    const titles = products
      .slice(0, 3)
      .map((p, i) => `${i + 1}. ${p.title} – ₹${p.price}`)
      .join("\n");

    return `🛍️ Here are some top picks you might love:\n\n${titles}`;
  } catch (error) {
    return "I would definitely recommend looking at our bestsellers in the catalog!";
  }
};

const handleOrderHelp = () => {
  return `📦 Order Help:
• Delivery: Usually takes 3-5 business days.
• Payment: We accept COD, UPI, Cards, and Net Banking securely via Razorpay.
• Returns: Accepted within 7 days for non-custom items.`;
};

const handleFallback = () => {
  return `I can help you with products, pricing, orders, and recommendations. Try asking:
* 'Show me trending products'
* 'What are your prices?'
* 'Suggest something for me'`;
};

export const generateResponse = async (message) => {
  const parsed = parseIntent(message);
  
  // Basic memory: if the user said "prices" after "products", we could use lastIntent.
  // For context, we just store it.
  let currentIntent = parsed.intent;
  
  // Use memory if the current intent is fallback but we have context
  if (currentIntent === "fallback" && lastIntent === "product_query" && message.toLowerCase().includes("price")) {
    currentIntent = "price_query";
  }
  
  lastIntent = currentIntent;

  switch (currentIntent) {
    case "greeting":
      return handleGreeting();
    case "product_query":
      return await handleProductQuery();
    case "price_query":
      return await handlePriceQuery();
    case "recommendation":
      return await handleRecommendation();
    case "order_help":
      return handleOrderHelp();
    case "fallback":
    default:
      return handleFallback();
  }
};
