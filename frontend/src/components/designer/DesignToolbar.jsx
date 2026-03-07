import ColorSelector from "./ColorSelector";

export default function DesignToolbar() {
  return (
    <div className="space-y-6">

      <ColorSelector />

      <button className="w-full bg-black text-white py-2 rounded">
        Add Text
      </button>

      <button className="w-full bg-gray-800 text-white py-2 rounded">
        Upload Logo
      </button>

    </div>
  );
}