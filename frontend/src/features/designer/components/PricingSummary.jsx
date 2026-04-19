import React from 'react';
import { getTotalQuantity, getUnitPrice, calculateTotalPrice } from '../utils/pricingEngine';

export default function PricingSummary({ sizes, material }) {
  const totalQuantity = getTotalQuantity(sizes);
  const unitPrice = getUnitPrice(material);
  const totalPrice = calculateTotalPrice(sizes, material);

  return (
    <div className="flex flex-col space-y-2 p-1">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Total Quantity</span>
        <span className="font-medium text-gray-800">{totalQuantity}</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Price per Item</span>
        <span className="font-medium text-gray-800">₹{unitPrice}</span>
      </div>
      <div className="border-t border-gray-100 my-1 pt-2 flex justify-between items-center">
        <span className="font-semibold text-gray-800">Total Price</span>
        <span className="font-bold text-lg text-black">₹{totalPrice}</span>
      </div>
    </div>
  );
}
