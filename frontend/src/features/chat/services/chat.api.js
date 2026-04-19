import API from "../../../services/api.js";

export const fetchChatHistory = () =>
  API.get("/chat").then(r => r.data);

export const sendChatMessage = (message) =>
  API.post("/chat", { message }).then(r => r.data);

export const getProducts = () =>
  API.get("/products").then(r => r.data);

export const getRecommendations = () =>
  API.post("/recommendations/chat", {}).then((r) => r.data).catch(() => ({ success: true, data: [] }));
