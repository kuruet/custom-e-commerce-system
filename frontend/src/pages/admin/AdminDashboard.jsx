import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AnalyticsCard from "../../components/admin/AnalyticsCard";
import ChartsSection from "../../components/admin/ChartsSection";
import OrdersPreviewTable from "../../components/admin/OrdersPreviewTable";

const CARDS = [
  {
    title: "Total Orders",
    value: "1,284",
    subtitle: "All time orders",
    trend: 12.5,
    trendUp: true,
    delay: 0,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="9" y1="16" x2="13" y2="16" />
      </svg>
    ),
  },
  {
    title: "Total Revenue",
    value: " 4.2M",
    subtitle: "Lifetime earnings",
    trend: 8.3,
    trendUp: true,
    delay: 80,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    title: "Total Products",
    value: "348",
    subtitle: "Active in catalog",
    trend: 4.1,
    trendUp: true,
    delay: 160,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    title: "Pending Orders",
    value: "27",
    subtitle: "Awaiting fulfillment",
    trend: 3.2,
    trendUp: false,
    delay: 240,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .font-mono { font-family: 'DM Mono', monospace; }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fadeIn 0.4s ease-out both; }
      `}</style>

      <AdminSidebar />

      {/* Main content offset for sidebar */}
      <main className="lg:pl-60 min-h-screen">
        <div className="p-5 sm:p-6 lg:p-8 pt-16 lg:pt-8 max-w-[1400px]">

          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                  <span className="text-amber-400 text-xs font-medium uppercase tracking-widest">Live</span>
                </div>
                <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-slate-400 text-sm mt-1">Welcome to Nynth Studio Admin Panel</p>
              </div>
              <button
                onClick={() => navigate("/admin/orders")}
                className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-amber-400/20 active:scale-95"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                </svg>
                View Orders
              </button>
            </div>
            <div className="mt-6 h-px bg-gradient-to-r from-slate-700 via-slate-700/50 to-transparent" />
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {CARDS.map((card) => (
              <AnalyticsCard key={card.title} {...card} />
            ))}
          </div>

          {/* Quick Action */}
          <div
            className="mb-8 p-5 bg-slate-800/50 border border-slate-700/50 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            style={{ animation: "fadeSlideUp 0.5s ease-out 320ms both" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                  <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
                  <polyline points="13 2 13 9 20 9" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Order Management</p>
                <p className="text-slate-400 text-xs">View, update and manage all customer orders</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/admin/orders")}
              className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-slate-500 text-white text-sm font-medium rounded-lg transition-all duration-200 active:scale-95"
            >
              Manage Orders
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Charts */}
          <div className="mb-8" style={{ animation: "fadeSlideUp 0.5s ease-out 400ms both" }}>
            <h2 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-amber-400">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              Analytics Overview
            </h2>
            <ChartsSection />
          </div>

          {/* Recent Orders Table */}
          <div style={{ animation: "fadeSlideUp 0.5s ease-out 500ms both" }}>
            <h2 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-amber-400">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
              </svg>
              Recent Orders
            </h2>
            <OrdersPreviewTable />
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-slate-600 text-xs">© 2025 Nynth Studio — Admin Panel v1.0</p>
            <p className="text-slate-700 text-xs font-mono">build:prod</p>
          </div>

        </div>
      </main>
    </div>
  );
}