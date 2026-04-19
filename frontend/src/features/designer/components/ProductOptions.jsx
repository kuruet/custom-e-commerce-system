import React from 'react';

export default function ProductOptions({
  sizes,
  setSizes,
  material,
  setMaterial,
  notes,
  setNotes
}) {
  const handleSizeChange = (size, change) => {
    setSizes(prev => {
      const newVal = prev[size] + change;
      if (newVal < 0) return prev;
      return { ...prev, [size]: newVal };
    });
  };

  return (
    <div className="space-y-5">
      {/* Sizes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
        <div className="space-y-2">
          {Object.keys(sizes).map((size) => (
            <div key={size} className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-100">
              <span className="font-medium text-gray-800 w-8">{size}</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleSizeChange(size, -1)}
                  className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded text-gray-600 hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
                >
                  -
                </button>
                <span className="w-4 text-center font-medium text-sm">{sizes[size]}</span>
                <button
                  onClick={() => handleSizeChange(size, 1)}
                  className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded text-gray-600 hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Material */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
        <select
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-black bg-white"
        >
          <option value="basic">Basic Cotton</option>
          <option value="premium">Premium Cotton</option>
          <option value="oversized">Oversized Fit</option>
        </select>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add special instructions"
          className="w-full border border-gray-300 rounded p-2 text-sm h-20 resize-none focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>
    </div>
  );
}
