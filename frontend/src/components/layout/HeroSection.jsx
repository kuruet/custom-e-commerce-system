import { Link } from "react-router-dom";
import heroBanner from "../../assets/images/hero-banner.jpg";

/**
 * HeroSection — Full-width hero banner for the homepage.
 * Features a background image, dark overlay, headline, and CTA button.
 */
const HeroSection = () => {
  return (
<section
  className="relative w-full min-h-[450px] md:min-h-[600px] xl:min-h-[700px] flex items-center justify-center bg-cover bg-bottom bg-no-repeat"
  style={{
    backgroundImage: `url(${heroBanner})`,
  }}
>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content container */}
      <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center animate-fade-in">
        
        {/* Hero heading */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
          Custom T-shirts,
          <br />
          Merchandise &amp; Gifts
        </h1>

        {/* CTA button */}
        <Link
          to="/customize/tshirt-white"
          className="inline-block bg-black text-white px-8 py-4 rounded-md text-sm md:text-lg font-semibold tracking-[0.12em] hover:opacity-85 hover:scale-105 transition-all duration-300 ease-in-out"
        >
          CUSTOMIZE NOW
        </Link>

      </div>
    </section>
  );
};

export default HeroSection;