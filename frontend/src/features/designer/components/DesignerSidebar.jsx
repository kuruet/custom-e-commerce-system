import React from "react";
import ColorSelector from "./ColorSelector";
import DesignToolbar from "./DesignToolbar";
import ProductOptions from "./ProductOptions";
import PricingSummary from "./PricingSummary";

const SectionCard = ({ title, icon, children }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
        {title && (
            <div className="flex items-center gap-2 px-4 pt-4 pb-2">
                {icon && <span className="text-base">{icon}</span>}
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>
            </div>
        )}
        <div className="px-4 pb-4">{children}</div>
    </div>
);

const DesignerSidebar = ({
    setColor,
    canvas,
    setPreview,
    sizes,
    setSizes,
    material,
    setMaterial,
    notes,
    setNotes,
    textColor,
    setTextColor
}) => {
    return (
        <div className="w-full lg:w-[280px] flex flex-col space-y-4 p-1">
            {/* Sidebar header */}
            <div className="px-1 pb-1">
                <h2 className="text-base font-bold text-gray-800 tracking-tight">Customize</h2>
                <p className="text-xs text-gray-400 mt-0.5">Style your product below</p>
            </div>

            {/* Color Selection */}
            <SectionCard title="Color" icon="🎨">
                <ColorSelector setColor={setColor} />
            </SectionCard>

            {/* Design Tools */}
            <SectionCard title="Design Tools" icon="✏️">
                <DesignToolbar 
                  canvas={canvas} 
                  setPreview={setPreview}
                  textColor={textColor}
                  setTextColor={setTextColor}
                />
            </SectionCard>

            {/* Product Options */}
            <SectionCard title="Product Options" icon="📦">
                <ProductOptions
                    sizes={sizes}
                    setSizes={setSizes}
                    material={material}
                    setMaterial={setMaterial}
                    notes={notes}
                    setNotes={setNotes}
                />
            </SectionCard>

            {/* Order Summary */}
            <SectionCard title="Order Summary" icon="🧾">
                <PricingSummary sizes={sizes} material={material} />
            </SectionCard>

            {/* Footer hint */}
            <p className="text-[11px] text-gray-300 text-center px-2 pb-1 select-none">
                Changes apply instantly to the preview
            </p>
        </div>
    );
};

export default DesignerSidebar;