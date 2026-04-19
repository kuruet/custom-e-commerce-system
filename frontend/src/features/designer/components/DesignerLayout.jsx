import React from "react";
import ProductCanvas from "./ProductCanvas";
import DesignerSidebar from "./DesignerSidebar";

const DesignerLayout = ({
    color,
    setColor,
    canvasInstance,
    setCanvasInstance,
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
        <div className="min-h-screen bg-gray-50">
            <div className="flex flex-col lg:flex-row gap-0 lg:gap-6 p-4 lg:p-6 max-w-screen-xl mx-auto transition-all duration-300">

                {/* LEFT: Sidebar */}
                <aside className="w-full lg:w-[280px] lg:min-w-[280px] lg:sticky lg:top-6 lg:self-start transition-all duration-300">
                    <DesignerSidebar
                        setColor={setColor}
                        canvas={canvasInstance}
                        setPreview={setPreview}
                        sizes={sizes}
                        setSizes={setSizes}
                        material={material}
                        setMaterial={setMaterial}
                        notes={notes}
                        setNotes={setNotes}
                        textColor={textColor}
                        setTextColor={setTextColor}
                    />
                </aside>

                {/* RIGHT: Canvas */}
                <main className="flex-1 flex flex-col items-center justify-start mt-4 lg:mt-0">
                    <div className="w-full bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-center justify-center p-6 bg-gradient-to-b from-white to-gray-50 min-h-[400px] lg:min-h-[520px]">
                            <ProductCanvas
                                color={color}
                                setCanvasInstance={setCanvasInstance}
                            />
                        </div>
                    </div>
                </main>

            </div>
        </div>
    );
};

export default DesignerLayout;