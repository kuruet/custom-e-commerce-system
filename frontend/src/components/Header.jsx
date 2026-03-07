
import { useState } from "react";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";


const navLinks = [
  { label: "CUSTOMIZE", href: "/customize" },
  { label: "CORPORATE GIFTING", href: "/corporate-gifting" },
];

const Header = ({ cartItemCount = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 h-[72px] bg-header border-b border-header-border backdrop-blur-md">
      <div className="container mx-auto h-full px-4 md:px-6 flex items-center justify-between">
        {/* LEFT — Nav links (desktop) / Hamburger (mobile) */}
        <div className="flex items-center gap-8 w-1/3">
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-header-foreground hover:text-header-muted transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="relative text-xs tracking-[0.2em] font-medium text-header-muted hover:text-header-foreground transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:bg-header-foreground after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* CENTER — Brand */}
        <div className="flex items-center justify-center w-1/3">
          <Link
            to="/"
            className="font-serif text-2xl md:text-3xl tracking-[0.25em] text-header-foreground hover:tracking-[0.3em] hover:scale-105 transition-all duration-500 ease-out select-none"
          >
            Nynth
          </Link>
        </div>

        {/* RIGHT — Search, Profile, Cart */}
        <div className="flex items-center justify-end gap-3 md:gap-5 w-1/3">
          {/* Search bar — desktop */}
          <div className="hidden sm:flex items-center relative">
            <Search
              size={16}
              className="absolute left-3 text-header-muted pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="w-36 lg:w-52 h-9 pl-9 pr-4 text-xs bg-header-search-bg border border-header-search-border rounded-full text-header-foreground placeholder:text-header-muted focus:outline-none focus:ring-1 focus:ring-ring focus:border-header-foreground transition-all duration-300"
            />
          </div>

          {/* Profile */}
          <button
            aria-label="Profile"
            className="text-header-muted hover:text-header-foreground transition-colors duration-200 hover:scale-105"
          >
            <User size={20} />
          </button>

          {/* Cart */}
          <button
            aria-label="Shopping cart"
            className="relative text-header-muted hover:text-header-foreground transition-colors duration-200 hover:scale-105"
          >
            <ShoppingBag size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-semibold leading-none bg-badge text-badge-foreground rounded-full">
                {cartItemCount > 99 ? "99+" : cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-[72px] left-0 w-full bg-header border-b border-header-border overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs tracking-[0.2em] font-medium text-header-muted hover:text-header-foreground transition-colors duration-200 py-2"
            >
              {link.label}
            </Link>
          ))}
          {/* Mobile search */}
          <div className="relative sm:hidden mt-2">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-header-muted pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="w-full h-9 pl-9 pr-4 text-xs bg-header-search-bg border border-header-search-border rounded-full text-header-foreground placeholder:text-header-muted focus:outline-none focus:ring-1 focus:ring-ring transition-all duration-300"
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
