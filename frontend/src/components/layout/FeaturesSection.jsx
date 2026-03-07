/**
 * FeaturesSection.jsx
 * Trust badges / store benefits strip — matches themerchlist.com reference.
 * React + Vite + TailwindCSS + lucide-react
 *
 * Add to tailwind.config.js → theme.extend.animation / keyframes:
 *   keyframes: { fadeUp: { '0%': { opacity:'0', transform:'translateY(20px)' }, '100%': { opacity:'1', transform:'translateY(0)' } } },
 *   animation: { fadeUp: 'fadeUp 0.5s ease-out forwards' }
 */

import { Star, ShoppingBag, BadgePercent, Truck, Headphones } from "lucide-react";

const features = [
  {
    icon: Star,
    title: "5,000+ Happy Customers",
    description: "Trusted by thousands worldwide",
  },
  {
    icon: ShoppingBag,
    title: "1000+ Custom Products",
    description: "High Quality. No Minimums!",
  },
  {
    icon: BadgePercent,
    title: "Affordable Prices",
    description: "Up to 40% bulk discounts",
  },
  {
    icon: Truck,
    title: "Fast & Free Shipping",
    description: "Global delivery. On-time!",
  },
  {
    icon: Headphones,
    title: "Worry Free!",
    description: "Instant 24/7 support",
  },
];

// Animation delay steps per card (staggered entrance)
const delays = ["delay-0", "delay-75", "delay-150", "delay-200", "delay-300"];

const FeaturesSection = () => {
  return (
    <>
      {/* Keyframe injection — static string, runs once */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp { animation: fadeUp 0.5s ease-out forwards; }
        .delay-0   { animation-delay: 0ms; }
        .delay-75  { animation-delay: 75ms; }
        .delay-150 { animation-delay: 150ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>

      <section
        aria-label="Store features"
        className="w-full border-y border-gray-200 bg-white py-10 md:py-14 lg:py-16 px-4 md:px-8 lg:px-16"
      >
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className={`opacity-0 animate-fadeUp ${delays[index]} flex flex-col items-center text-center gap-3 p-4 md:p-5 rounded-xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-md cursor-default`}
              >
                {/* Icon container */}
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 flex-shrink-0">
                  <Icon size={24} className="text-black" aria-hidden="true" />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm md:text-base font-semibold text-black leading-snug">
                    {title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesSection;