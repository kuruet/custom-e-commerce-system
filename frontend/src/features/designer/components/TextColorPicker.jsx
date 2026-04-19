const TEXT_COLORS = [
  { label: "Black",  value: "black",   bg: "bg-black" },
  { label: "White",  value: "white",   bg: "bg-white border border-gray-300" },
  { label: "Red",    value: "#e53e3e", bg: "bg-red-600" },
  { label: "Blue",   value: "#3182ce", bg: "bg-blue-600" },
  { label: "Green",  value: "#38a169", bg: "bg-green-600" },
  { label: "Yellow", value: "#d69e2e", bg: "bg-yellow-500" },
  { label: "Purple", value: "#805ad5", bg: "bg-purple-600" },
  { label: "Gray",   value: "#718096", bg: "bg-gray-500" },
];

export default function TextColorPicker({ textColor, onChange }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-2">Text Color</p>
      <div className="flex flex-wrap gap-2">
        {TEXT_COLORS.map(({ label, value, bg }) => (
          <button
            key={value}
            title={label}
            onClick={() => onChange(value)}
            className={`w-7 h-7 rounded-full transition-transform hover:scale-110 focus:outline-none ${bg} ${
              textColor === value
                ? "ring-2 ring-offset-2 ring-gray-800 scale-110"
                : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
