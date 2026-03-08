import { useNavigate } from "react-router-dom";

const MOCK_ORDERS = [
  { id: "#ORD-0041", customer: "Zara Ahmed", total: "PKR 3,200", status: "Delivered" },
  { id: "#ORD-0040", customer: "Hassan Raza", total: "PKR 1,850", status: "Processing" },
  { id: "#ORD-0039", customer: "Nida Malik", total: "PKR 5,600", status: "Pending" },
  { id: "#ORD-0038", customer: "Bilal Sheikh", total: "PKR 2,400", status: "Delivered" },
  { id: "#ORD-0037", customer: "Amna Tariq", total: "PKR 980", status: "Cancelled" },
];

const STATUS_STYLES = {
  Delivered: "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20",
  Processing: "bg-amber-400/10 text-amber-400 border border-amber-400/20",
  Pending: "bg-blue-400/10 text-blue-400 border border-blue-400/20",
  Cancelled: "bg-rose-400/10 text-rose-400 border border-rose-400/20",
};

export default function OrdersPreviewTable() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50">
        <div>
          <h3 className="text-white font-semibold text-sm">Recent Orders</h3>
          <p className="text-slate-500 text-xs mt-0.5">Latest 5 transactions</p>
        </div>
        <button
          onClick={() => navigate("/admin/orders")}
          className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1.5 transition-colors duration-200"
        >
          View All
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/30">
              <th className="text-left text-slate-500 font-medium text-xs uppercase tracking-wider px-5 py-3">Order ID</th>
              <th className="text-left text-slate-500 font-medium text-xs uppercase tracking-wider px-5 py-3">Customer</th>
              <th className="text-left text-slate-500 font-medium text-xs uppercase tracking-wider px-5 py-3">Total</th>
              <th className="text-left text-slate-500 font-medium text-xs uppercase tracking-wider px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map((order, i) => (
              <tr
                key={order.id}
                className="border-b border-slate-700/20 last:border-0 hover:bg-slate-700/30 transition-colors duration-150 cursor-pointer"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <td className="px-5 py-3.5">
                  <span className="text-slate-300 font-mono text-xs">{order.id}</span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 text-xs font-semibold flex-shrink-0">
                      {order.customer.charAt(0)}
                    </div>
                    <span className="text-slate-200 text-sm">{order.customer}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-white font-semibold text-sm">{order.total}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status]}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}