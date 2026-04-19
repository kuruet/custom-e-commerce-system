import { POINT_TO_RUPEE } from "./loyaltyConfig.js";

export function calculateDiscount(points) {
  if (!points || points < 0) return 0;
  return points * POINT_TO_RUPEE;
}
