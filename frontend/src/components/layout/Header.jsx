import { useState } from "react";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PointsBadge from "../../features/loyalty/components/PointsBadge";
import WishlistDrawer from "../../features/wishlist/components/WishlistDrawer";

const navLinks = [

  
  { label: "CUSTOMIZE", href: "/customize" },
  { label: "CORPORATE", href: "/corporate" },
  { label: "GIFTING", href: "/gifting" },
];

const Header = ({ cartItemCount = 0 }) => {

  

  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("userToken");

  const closeAll = () => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  };

  const handleLogout = () => {
  localStorage.removeItem("userToken");
  navigate("/");
};
  return (
    <>
      {/* ── Header bar ── */}
      <header className="sticky top-0 z-50 h-[72px] bg-black border-b border-zinc-800 backdrop-blur-md">
        {/*
         * grid-cols-[1fr_auto_1fr] keeps brand perfectly centered
         * regardless of what expands in left / right columns
         */}
        <div className="h-full w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-[1fr_auto_1fr] items-center gap-2">

          {/* ── LEFT ── */}
          <div className="flex items-center gap-6">
            {/* Hamburger — mobile only */}
            <button
              className="md:hidden text-zinc-400 hover:text-white transition-colors duration-200 p-1 -ml-1"
              onClick={() => { setMobileMenuOpen((v) => !v); setMobileSearchOpen(false); }}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="relative text-xs tracking-[0.2em] font-medium text-zinc-400 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:bg-white after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── CENTER — brand always centered ── */}
          <div className="flex justify-center">
            <Link
              to="/"
              className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.2em] sm:tracking-[0.25em] text-white hover:tracking-[0.3em] hover:scale-105 transition-all duration-500 ease-out select-none whitespace-nowrap"
            >
              Nynth Studio
            </Link>
          </div>

          {/* ── RIGHT ── */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 md:gap-5">
            {/* Inline search — sm and above */}
            <div className="hidden sm:flex items-center relative">
              <Search size={15} className="absolute left-3 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="w-28 md:w-36 lg:w-52 h-8 md:h-9 pl-8 md:pl-9 pr-3 md:pr-4 text-xs bg-zinc-900 border border-zinc-700 rounded-full text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-white focus:border-white transition-all duration-300"
              />
            </div>

            {/* Search icon — xs only (opens overlay below header) */}
            <button
              className="sm:hidden text-zinc-400 hover:text-white transition-colors duration-200 p-1"
              onClick={() => { setMobileSearchOpen((v) => !v); setMobileMenuOpen(false); }}
              aria-label={mobileSearchOpen ? "Close search" : "Open search"}
              aria-expanded={mobileSearchOpen}
            >
              {mobileSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            {/* Profile */}
            <button
              aria-label="Profile"
              className="text-zinc-400 hover:text-white transition-colors duration-200 hover:scale-105 p-1"
            >
              <User size={20} />
            </button>

            {/* Wishlist icon */}
            {isLoggedIn && (
              <button
                onClick={() => setWishlistOpen(true)}
                aria-label="Open wishlist"
                className="text-zinc-400 hover:text-white transition-colors duration-200 p-1"
                style={{ fontSize: 18, background: "none", border: "none", cursor: "pointer" }}
              >
                ♡
              </button>
            )}

            {/* Loyalty points badge */}
            {isLoggedIn && (
              <PointsBadge />
            )}

            {/* Cart */}
          <button
  onClick={handleLogout}
  className="text-red-700 text-lg font-semibold hover:text-red-700 transition"
>
  Logout
</button>
          </div>
        </div>
      </header>

      {/*
       * ── Overlays rendered OUTSIDE the sticky header ──
       * Prevents sticky-context clipping and scroll glitches.
       *
       * Stacking:
       *   header            z-50
       *   mobile search     z-40
       *   mobile nav        z-30
       *   backdrop          z-20
       */}

      {/* Mobile search bar — xs only */}
      <div
        aria-hidden={!mobileSearchOpen}
        className={`sm:hidden fixed top-[72px] left-0 w-full z-40 bg-black border-b border-zinc-800
          transition-all duration-300 ease-in-out
          ${mobileSearchOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      >
        <div className="px-4 py-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              tabIndex={mobileSearchOpen ? 0 : -1}
              autoFocus={mobileSearchOpen}
              className="w-full h-9 pl-9 pr-4 text-xs bg-zinc-900 border border-zinc-700 rounded-full text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-white transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div
        id="mobile-nav"
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!mobileMenuOpen}
        className={`md:hidden fixed top-[72px] left-0 w-full z-30 bg-black border-b border-zinc-800
          transition-all duration-300 ease-in-out
          ${mobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-3 pointer-events-none"}`}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={closeAll}
              tabIndex={mobileMenuOpen ? 0 : -1}
              className="text-xs tracking-[0.2em] font-medium text-zinc-400 hover:text-white transition-colors duration-200 py-3 border-b border-zinc-900 last:border-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Backdrop */}
      {(mobileMenuOpen || mobileSearchOpen) && (
        <div
          aria-hidden="true"
          onClick={closeAll}
          className="md:hidden fixed inset-0 top-[72px] z-20 bg-black/50 backdrop-blur-sm"
        />
      )}

      {/* Wishlist Drawer — global, mounted per header */}
      <WishlistDrawer isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </>
  );
};

export default Header;