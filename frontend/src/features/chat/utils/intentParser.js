export const parseIntent = (message) => {
  if (!message) return { intent: "fallback", entities: {} };

  const lower = message.toLowerCase();
  
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return { intent: "greeting", entities: {} };
  }
  if (lower.includes("products") || lower.includes("what to buy")) {
    return { intent: "product_query", entities: {} };
  }
  if (lower.includes("price") || lower.includes("cost")) {
    return { intent: "price_query", entities: {} };
  }
  if (lower.includes("suggest") || lower.includes("recommend")) {
    return { intent: "recommendation", entities: {} };
  }
  if (lower.includes("order") || lower.includes("delivery")) {
    return { intent: "order_help", entities: {} };
  }
  
  return { intent: "fallback", entities: {} };
};
