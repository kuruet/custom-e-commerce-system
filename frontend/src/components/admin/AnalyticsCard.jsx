export default function AnalyticsCard({ title, value, subtitle, icon, trend, trendUp, delay = 0 }) {
  return (
    <div
      className="bg-slate-800 border border-slate-700/50 rounded-xl p-5 hover:border-slate-600 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 group"
      style={{
        animation: `fadeSlideUp 0.5s ease-out ${delay}ms both`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-slate-700/60 flex items-center justify-center text-amber-400 group-hover:bg-amber-400/10 transition-colors duration-300">
          {icon}
        </div>
        {trend !== undefined && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1
              ${trendUp ? "bg-emerald-400/10 text-emerald-400" : "bg-rose-400/10 text-rose-400"}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`w-3 h-3 ${trendUp ? "" : "rotate-180"}`}>
              <polyline points="18 15 12 9 6 15" />
            </svg>
            {trend}%
          </span>
        )}
      </div>

      <div>
        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1.5">{title}</p>
        <p className="text-white text-2xl font-bold tracking-tight">{value}</p>
        {subtitle && (
          <p className="text-slate-500 text-xs mt-1.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}