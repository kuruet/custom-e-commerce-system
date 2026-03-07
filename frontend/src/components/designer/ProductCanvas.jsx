import shirtWhite from "../../assets/mockups/shirt-white.png";

export default function ProductCanvas() {
  return (
    <div className="relative">

      {/* Shirt Mockup */}
      <img
        src={shirtWhite}
        alt="shirt"
        className="w-[450px]"
      />

      {/* Printable Area Guide */}
      <div className="absolute top-[120px] left-[140px] w-[170px] h-[170px] border-2 border-dashed border-gray-400 pointer-events-none"></div>

    </div>
  );
}