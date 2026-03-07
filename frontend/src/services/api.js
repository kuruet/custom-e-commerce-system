import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export default API;

export const createOrder = async (orderData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/orders`,
    orderData
  );

  return response.data;
};