export default function ColorSelector() {
  return (
    <div>

      <h3 className="font-semibold mb-2">
        Choose Color
      </h3>

      <div className="flex gap-3">

        <button className="w-8 h-8 rounded-full bg-white border"></button>

        <button className="w-8 h-8 rounded-full bg-black"></button>

        <button className="w-8 h-8 rounded-full bg-red-500"></button>

        <button className="w-8 h-8 rounded-full bg-blue-500"></button>

      </div>

    </div>
  );
}