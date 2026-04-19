export const MATERIAL_PRICING = {
  basic: 799,
  premium: 999,
  oversized: 1099
};

export function getTotalQuantity(sizes) {
  if (!sizes) return 0;
  return Object.values(sizes).reduce((total, qty) => total + qty, 0);
}

export function getUnitPrice(material) {
  return MATERIAL_PRICING[material] || MATERIAL_PRICING.basic;
}

export function calculateTotalPrice(sizes, material) {
  const totalQty = getTotalQuantity(sizes);
  const unitPrice = getUnitPrice(material);
  return totalQty * unitPrice;
}
