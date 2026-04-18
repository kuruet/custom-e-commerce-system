import API from "../../../services/api.js";

export const fetchRecommendations = (cartIds = []) => {
  const query = cartIds.length ? `?cartIds=${cartIds.join(",")}` : "";
  return API.get(`/recommendations${query}`).then(r => r.data);
};
