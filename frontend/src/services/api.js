import axios from "axios";

/* Create axios instance */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

/* Automatically attach JWT token to every request */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* Create Order */
export const createOrder = async (orderData) => {
  const response = await API.post("/orders", orderData);
  return response.data;
};

/* Get Recommendations */
export const getRecommendations = async (cartProductIds) => {
  const ids = Array.isArray(cartProductIds)
    ? cartProductIds.join(",")
    : "";

  const response = await API.get(
    `/products/recommendations?cartProductIds=${ids}`
  );

  return response.data;
};

export default API;