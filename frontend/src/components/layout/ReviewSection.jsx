/**
 * ReviewSection.jsx
 * src/components/layout/ReviewSection.jsx
 *
 * Ratings & Reviews section matching themerchlist.com reference.
 * - Average rating + star breakdown bar chart
 * - Circular user satisfaction indicators
 * - Testimonial cards with thumbs-up badges
 * - Fully responsive, no external libraries
 */

import { Link } from "react-router-dom";

// ─── Static data ──────────────────────────────────────────────────────────────

const RATING = 4.2;
const TOTAL_REVIEWS = 23;

const starBreakdown = [
  { stars: 5, pct: 70 },
  { stars: 4, pct: 9 },
  { stars: 3, pct: 0 },
  { stars: 2, pct: 0 },
  { stars: 1, pct: 22 },
];

const satisfaction = [
  { label: "Response", pct: 90 },
  { label: "Quality",  pct: 87 },
  { label: "Delivery", pct: 88 },
];

const reviews = [
  {
    id: 1,
    name: "Deepak Pandey",
    initial: "D",
    location: "New Delhi, Delhi",
    rating: 5,
    product: "Promotional Polo T-Shirts",
    comment: "Excellent quality and fast delivery.",
    badges: ["Response", "Quality", "Delivery"],
  },
  {
    id: 2,
    name: "Anil Gopal Sawant",
    initial: "A",
    location: "Mumbai, Maharashtra",
    rating: 5,
    product: "Polo Men T-Shirt",
    comment: "",
    badges: [],
  },
  {
    id: 3,
    name: "Saeeda Shaikh",
    initial: "S",
    location: "Mumbai, Maharashtra",
    rating: 5,
    product: "Corporate Diaries",
    comment: "Great response and service.",
    badges: ["Response", "Quality", "Delivery"],
  },
  {
    id: 4,
    name: "Rahul Mehta",
    initial: "R",
    location: "Bengaluru, Karnataka",
    rating: 5,
    product: "Classic T-Shirt",
    comment: "Very satisfied with the product.",
    badges: ["Quality", "Delivery"],
  },
  {
    id: 5,
    name: "Priya Nair",
    initial: "P",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    product: "Corporate Uniform",
    comment: "Professional finish and on-time delivery.",
    badges: ["Response", "Delivery"],
  },
  {
    id: 6,
    name: "Vikram Singh",
    initial: "V",
    location: "Pune, Maharashtra",
    rating: 4,
    product: "Sports Jersey",
    comment: "Good quality, will order again.",
    badges: ["Quality"],
  },
];

// Stagger delays (cycles across 3 columns)
const cardDelays = ["delay-0", "[animation-delay:80ms]", "[animation-delay:160ms]"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Render n filled + (5−n) empty stars */
const Stars = ({ rating, size = "text-base" }) => {
  const filled = Math.round(rating);
  return (
    <span className={`${size} leading-none select-none`} aria-label={`${rating} out of 5 stars`}>
      <span className="text-amber-400">{"★".repeat(filled)}</span>
      <span className="text-gray-300">{"★".repeat(5 - filled)}</span>
    </span>
  );
};

/** Fractional star overlay — exact % from rating */
const FractionalStars = ({ rating, size = "text-4xl" }) => {
  const pct = (rating / 5) * 100;
  return (
    <div className={`relative inline-block ${size} leading-none select-none`} aria-label={`${rating} out of 5 stars`}>
      <span className="text-gray-200">★★★★★</span>
      <span
        className="absolute inset-0 overflow-hidden text-amber-400"
        style={{ width: `${pct}%` }}
        aria-hidden="true"
      >
        ★★★★★
      </span>
    </div>
  );
};

/** Circular SVG progress ring */
const CircleProgress = ({ pct, label }) => {
  const r = 30;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72" aria-hidden="true">
          <circle cx="36" cy="36" r={r} fill="none" stroke="#e5e7eb" strokeWidth="6" />
          <circle
            cx="36" cy="36" r={r}
            fill="none"
            stroke="#111827"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-900">
          {pct}%
        </span>
      </div>
      <p className="text-xs font-medium text-gray-600 tracking-wide">{label}</p>
    </div>
  );
};

/** Thumbs-up SVG icon */
const ThumbsUp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1.34 6H3.34V14H1.34A.67.67 0 0 1 .67 13.33V6.67A.67.67 0 0 1 1.34 6ZM4.87 5.14L9.13.87a.67.67 0 0 1 .86.08l.57.43c.16.12.28.28.35.47l.07.42-.77 3.02H14a1 1 0 0 1 1 1V8.07c0 .17-.03.34-.1.51L12.83 13.6a.67.67 0 0 1-.63.4H5.34A.67.67 0 0 1 4.67 13.33V5.61a.67.67 0 0 1 .2-.47Z" fill="#2F333A"/>
  </svg>
);

// ─── Testimonial Card ─────────────────────────────────────────────────────────

const ReviewCard = ({ review, index }) => (
  <article
    className={[
      "bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.07)]",
      "p-5 flex flex-col gap-3",
      "hover:-translate-y-1 hover:shadow-lg transition-all duration-300",
      "opacity-0 animate-[fadeUp_0.45s_ease-out_forwards]",
      cardDelays[index % 3],
    ].join(" ")}
  >
    {/* Avatar + name + location */}
    <div className="flex items-start gap-3">
      <div
        className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0"
        aria-hidden="true"
      >
        {review.initial}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-900 leading-tight">{review.name}</span>
        <span className="text-xs text-gray-500 leading-tight">{review.location}</span>
      </div>
    </div>

    {/* Stars + count */}
    <div className="flex items-center gap-1.5">
      <Stars rating={review.rating} size="text-sm" />
      <span className="text-xs text-gray-500">({review.rating})</span>
    </div>

    {/* Product name */}
    <p className="text-xs text-gray-700 leading-snug">
      <span className="font-semibold text-gray-900">Product: </span>
      {review.product}
    </p>

    {/* Comment */}
    {review.comment && (
      <p className="text-xs text-gray-600 leading-relaxed italic">"{review.comment}"</p>
    )}

    {/* Thumbs-up badges */}
    {review.badges.length > 0 && (
      <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100">
        {review.badges.map((badge) => (
          <span
            key={badge}
            className="flex items-center gap-1 text-[11px] text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-2 py-0.5"
          >
            <ThumbsUp />
            {badge}
          </span>
        ))}
      </div>
    )}
  </article>
);

// ─── Main Section ─────────────────────────────────────────────────────────────

const ReviewSection = () => (
  <>
    <style>{`
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `}</style>

    <section aria-label="Ratings and Reviews" className="w-full bg-white py-12 md:py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">

        {/* ── Section header ── */}
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 tracking-tight">
            Ratings &amp; Reviews
          </h2>
          <Link
            to="/reviews"
            className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200"
            aria-label="View all reviews"
          >
            View All
            <svg width="6" height="10" viewBox="0 0 7 10" fill="none" aria-hidden="true">
              <path d="M3.89 5 0 1.11 1.11 0l5 5-5 5L0 8.89 3.89 5Z" fill="currentColor"/>
            </svg>
          </Link>
        </div>

        {/* ── Rating summary row ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pb-10 border-b border-gray-100">

          {/* Average rating */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-end gap-1 leading-none">
              <span className="text-6xl font-bold text-gray-900">{RATING}</span>
              <span className="text-2xl text-gray-400 mb-1">/</span>
              <span className="text-2xl text-gray-400 mb-1">5</span>
            </div>
            <FractionalStars rating={RATING} size="text-4xl" />
            <p className="text-sm text-gray-500">{TOTAL_REVIEWS} reviews</p>
          </div>

          {/* Star breakdown bars */}
          <div className="flex flex-col gap-2.5">
            {starBreakdown.map(({ stars, pct }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="w-10 text-xs text-gray-600 text-right flex-shrink-0">{stars} star</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${stars} star: ${pct}%`}>
                  <div
                    className="h-full bg-gray-900 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-10 text-xs text-gray-500 flex-shrink-0">({pct}%)</span>
              </div>
            ))}
          </div>

          {/* Satisfaction circles */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-gray-900 text-center md:text-left">User Satisfaction</h3>
            <div className="flex justify-around md:justify-start md:gap-6">
              {satisfaction.map(({ label, pct }) => (
                <CircleProgress key={label} pct={pct} label={label} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Testimonial cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* ── View More button ── */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/reviews"
            className="inline-block border border-black text-black text-xs font-semibold uppercase tracking-widest px-8 py-3 rounded-md hover:bg-black hover:text-white transition-all duration-300"
          >
            View More Reviews
          </Link>
        </div>

      </div>
    </section>
  </>
);

export default ReviewSection;