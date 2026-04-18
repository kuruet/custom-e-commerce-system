export default function ColorSelector({ setColor }) {
  return (
    <div>
      <h3 className="font-semibold mb-3">
        Choose Color
      </h3>

      <div className="flex gap-3">

        {/* White */}
        <button
          onClick={() => setColor("white")}
          className="w-8 h-8 rounded-full bg-white border border-gray-300"
        />

        {/* Black */}
        <button
          onClick={() => setColor("black")}
          className="w-8 h-8 rounded-full bg-black"
        />

        {/* Red */}
        <button
          onClick={() => setColor("red")}
          className="w-8 h-8 rounded-full bg-red-500"
        />

        {/* Blue */}
        <button
          onClick={() => setColor("blue")}
          className="w-8 h-8 rounded-full bg-blue-500"
        />

      </div>
    </div>
  );
}