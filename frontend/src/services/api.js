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

/* Global response interceptor */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Token expired or invalid — clear and redirect to home
      localStorage.removeItem("userToken");
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }

    if (status >= 500) {
      console.error("[API] Server error:", error.response?.data?.message || error.message);
    }

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
    `/recommendations?cartIds=${ids}`
  );

  return response.data;
};

export default API;