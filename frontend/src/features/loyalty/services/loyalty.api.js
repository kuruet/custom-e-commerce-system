import API from "../../../services/api.js";

export const fetchLoyalty = () =>
  API.get("/loyalty").then(r => r.data);

export const redeemPoints = (points) =>
  API.post("/loyalty/redeem", { points }).then(r => r.data);
