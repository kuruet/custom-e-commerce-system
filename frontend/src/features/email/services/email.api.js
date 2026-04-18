import API from "../../../services/api.js";

export const subscribeEmail = (email) => {
  return API.post("/email/subscribe", { email }).then(r => r.data);
};

export const trackProductView = (productId) => {
  return API.post("/activity/view", { productId }).then(r => r.data).catch(() => {});
};
