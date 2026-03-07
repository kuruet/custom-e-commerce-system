/**
 * Footer.jsx
 * src/components/layout/Footer.jsx
 *
 * - Full-width background image with dark overlay (matching themerchlist reference)
 * - 5-column desktop layout → 2-column tablet → 1-column mobile accordion
 * - Brand info + address + social icons in col 1
 * - Company / Create / Services / Gifting nav columns
 * - Mobile accordion menus with smooth height animation
 * - Lucide React social icons
 * - Copyright bar
 * - fadeUp animation on mount
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Youtube, Twitter, ChevronDown } from "lucide-react";

// ─── Navigation data ─────────────────────────────────────────────────────────

const NAV_COLUMNS = [
  {
    id: "company",
    title: "Company",
    links: [
      { label: "About Us",          to: "/about" },
      { label: "Contact Us",        to: "/contact" },
      { label: "Track Order",       to: "/track-order" },
      { label: "Size Chart",        to: "/size-chart" },
      { label: "Printing Methods",  to: "/printing-methods" },
      { label: "Blog",              to: "/blog" },
      { label: "Privacy Policy",    to: "/privacy-policy" },
      { label: "Return Policy",     to: "/return-policy" },
      { label: "Shipping Policy",   to: "/shipping-policy" },
      { label: "Terms & Conditions",to: "/terms" },
    ],
  },
  {
    id: "create",
    title: "Create",
    links: [
      { label: "T-Shirts",          to: "/merchandise/tshirts" },
      { label: "Hoodies",           to: "/merchandise/hoodies" },
      { label: "Bags",              to: "/merchandise/bags" },
      { label: "Bottles",           to: "/merchandise/bottles" },
      { label: "Caps",              to: "/merchandise/caps" },
      { label: "Uniforms",          to: "/merchandise/uniforms" },
      { label: "Jerseys",           to: "/merchandise/jerseys" },
      { label: "Office Supplies",   to: "/merchandise/office" },
    ],
  },
  {
    id: "services",
    title: "Services",
    links: [
      { label: "Create Custom Products", to: "/merchandise" },
      { label: "Private Label",          to: "/private-label" },
      { label: "Corporate Merchandise",  to: "/corporate-merchandise" },
      { label: "Bulk Orders",            to: "/bulk-orders" },
      { label: "Gifts",                  to: "/gifts" },
      { label: "Cash Back",              to: "/cash-back" },
      { label: "DTF Printing",           to: "/printing/dtf" },
      { label: "DTG Printing",           to: "/printing/dtg" },
      { label: "UV Printing",            to: "/printing/uv" },
    ],
  },
  {
    id: "gifting",
    title: "Gifting",
    links: [
      { label: "Corporate Gifting",        to: "/corporate-gifting" },
      { label: "Employee Gift Ideas",      to: "/employee-gifts" },
      { label: "Budget Gifts",             to: "/gifts/budget" },
      { label: "Luxury Gifts",             to: "/gifts/luxury" },
      { label: "Premium Gifts",            to: "/gifts/premium" },
      { label: "Eco Friendly Gifts",       to: "/gifts/eco-friendly" },
      { label: "Home & Wellness",          to: "/gifts/home-wellness" },
      { label: "Promotional Giveaways",    to: "/gifts/giveaways" },
    ],
  },
];

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: <Instagram size={18} />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: <Linkedin size={18} />,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: <Youtube size={18} />,
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: <Twitter size={18} />,
  },
];

// ─── Accordion nav column (mobile) / Static column (desktop) ─────────────────

const NavColumn = ({ col, isOpen, onToggle }) => (
  <div className="border-b border-white/10 lg:border-none">
    {/* Column title — clickable on mobile, static on desktop */}
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-3 lg:py-0 lg:cursor-default lg:pointer-events-none"
      aria-expanded={isOpen}
      aria-controls={`footer-nav-${col.id}`}
    >
      <h4 className="text-sm font-semibold text-white uppercase tracking-widest">
        {col.title}
      </h4>
      <ChevronDown
        size={16}
        className={[
          "text-gray-400 transition-transform duration-300 lg:hidden",
          isOpen ? "rotate-180" : "rotate-0",
        ].join(" ")}
        aria-hidden="true"
      />
    </button>

    {/* Links — always visible on desktop, accordion on mobile */}
    <div
      id={`footer-nav-${col.id}`}
      className={[
        "overflow-hidden transition-all duration-300 ease-in-out",
        "lg:!max-h-none lg:!opacity-100",
        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
      ].join(" ")}
    >
      <ul className="flex flex-col gap-2 pb-4 lg:pb-0 lg:mt-4">
        {col.links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200 leading-relaxed"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// ─── Main Footer ──────────────────────────────────────────────────────────────

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggle = (id) =>
    setOpenSection((prev) => (prev === id ? null : id));

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .footer-fadein { animation: fadeUp 0.6s ease-out forwards; }
      `}</style>

      <footer
        aria-label="Site footer"
        className="relative w-full bg-cover bg-center text-white overflow-hidden"
        style={{
          backgroundImage:
            "url('https://themerchlist.com/wp-content/uploads/2020/06/Merchlist-Website-Footer.webp')",
        }}
      >
        {/* Dark overlay — matches reference bg-black/70 */}
        <div className="absolute inset-0 bg-black/72" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 footer-fadein">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-12 md:py-16">

            {/* ── 5-column grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">

              {/* ── Col 1 — Brand ── */}
              <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-5">

                {/* Logo text */}
                <div>
                  <span className="text-2xl font-bold tracking-wide text-white">
                    Nynth Studio
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-300 leading-relaxed">
                  Nynth Studio helps businesses craft unique promotional
                  merchandise that elevates brand visibility. From
                  custom-branded goods to corporate gifts, we create products
                  that customers remember.
                </p>

                {/* Addresses */}
                <div className="flex flex-col gap-3 text-xs text-gray-400 leading-relaxed">
                  <div>
                    <p className="font-semibold text-gray-200 underline mb-0.5">Office:</p>
                    <p>Nynth Studio Pvt Ltd</p>
                    <p>Andheri East, Mumbai,</p>
                    <p>Maharashtra, India</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-200 underline mb-0.5">Factory:</p>
                    <p>Nynth Studio Manufacturing</p>
                    <p>Bhiwandi Industrial Area</p>
                    <p>Mumbai, Maharashtra, India</p>
                  </div>
                </div>

                {/* Social icons */}
                <div className="flex gap-4 mt-1" role="list" aria-label="Social media links">
                  {SOCIAL.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="listitem"
                      aria-label={label}
                      className="text-gray-300 hover:text-white hover:scale-110 transition-all duration-200"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* ── Cols 2–5 — Nav columns ── */}
              {NAV_COLUMNS.map((col) => (
                <div key={col.id} className="flex flex-col">
                  {/* Desktop heading (shown via CSS, non-interactive) */}
                  <h4 className="hidden lg:block text-sm font-semibold text-white uppercase tracking-widest mb-4">
                    {col.title}
                  </h4>
                  {/* Desktop links */}
                  <ul className="hidden lg:flex flex-col gap-2">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.to}
                          className="text-sm text-gray-300 hover:text-white transition-colors duration-200 leading-relaxed"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* Mobile accordion */}
                  <div className="lg:hidden">
                    <NavColumn
                      col={col}
                      isOpen={openSection === col.id}
                      onToggle={() => toggle(col.id)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* ── Copyright bar ── */}
            <div className="border-t border-white/10 mt-12 pt-6 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} Nynth Studio. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;