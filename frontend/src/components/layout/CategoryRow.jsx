import { Link } from "react-router-dom";

const categories = [
  { label: "Best Sellers", link: "/category/best-sellers" },
  { label: "New Arrivals", link: "/category/new-arrivals" },
  { label: "T-Shirts", link: "/category/tshirts" },
  { label: "Hoodies", link: "/category/hoodies" },
  { label: "Uniforms", link: "/category/uniforms" },
  { label: "Jerseys", link: "/category/jerseys" },
  { label: "Bottles & Mugs", link: "/category/bottles" },
  { label: "Caps", link: "/category/caps" },
  { label: "Bags", link: "/category/bags" },
  { label: "Office", link: "/category/office" },
  { label: "Gifting", link: "/category/gifting" },
  { label: "Tech", link: "/category/tech" },
];

const CategoryRow = () => {
  return (
    <section className="hidden md:block w-full border-b border-border bg-card animate-in fade-in duration-500">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-12">
          {/* Category tags */}
          <nav
            aria-label="Product categories"
            className="flex items-center gap-4 lg:gap-6 overflow-x-auto scrollbar-none"
          >
            {categories.map((cat) => (
              <Link
                key={cat.link}
                to={cat.link}
                className="text-xs tracking-[0.08em] font-medium text-muted-foreground hover:text-foreground whitespace-nowrap transition-all duration-200 hover:scale-105"
              >
                {cat.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            to="/customize"
            className="ml-6 shrink-0 bg-foreground text-background text-xs font-semibold tracking-[0.12em] px-5 py-2 rounded-md hover:opacity-85 transition-all duration-200"
          >
            CUSTOMIZE NOW
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryRow;
