import API from "../../../services/api.js";

export const fetchWishlist = () =>
  API.get("/wishlist").then(r => r.data);

export const addToWishlist = (productId) =>
  API.post("/wishlist", { productId }).then(r => r.data);

export const removeFromWishlist = (productId) =>
  API.delete(`/wishlist/${productId}`).then(r => r.data);
