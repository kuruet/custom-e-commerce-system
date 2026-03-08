import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders`
      );
      console.log(response.data);
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-xs font-semibold capitalize inline-flex items-center gap-1";
    if (status === "pending")
      return `${base} bg-yellow-50 text-yellow-700 border border-yellow-200`;
    if (status === "completed")
      return `${base} bg-green-50 text-green-700 border border-green-200`;
    if (status === "cancelled")
      return `${base} bg-red-50 text-red-700 border border-red-200`;
    return `${base} bg-gray-100 text-gray-600 border border-gray-200`;
  };

  const getStatusDot = (status) => {
    if (status === "pending") return "bg-yellow-400";
    if (status === "completed") return "bg-green-500";
    if (status === "cancelled") return "bg-red-500";
    return "bg-gray-400";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&display=swap');

        .orders-root {
          font-family: 'DM Sans', sans-serif;
          animation: pageFadeIn 0.35s ease both;
        }
        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .orders-title {
          font-family: 'DM Serif Display', serif;
        }
        .table-card {
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 16px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .table-header-row th {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #9ca3af;
          background: #fafafa;
          padding: 13px 20px;
          text-align: left;
          border-bottom: 1px solid #f0f0f0;
          white-space: nowrap;
        }
        .order-row {
          border-bottom: 1px solid #f9f9f9;
          transition: background 0.15s;
        }
        .order-row:last-child {
          border-bottom: none;
        }
        .order-row:hover {
          background: #fafafa;
        }
        .order-row td {
          padding: 15px 20px;
          font-size: 13.5px;
          color: #374151;
          vertical-align: middle;
        }
        .order-id {
          font-family: 'Courier New', monospace;
          font-size: 11.5px;
          color: #6b7280;
          background: #f3f4f6;
          padding: 3px 8px;
          border-radius: 6px;
          letter-spacing: 0.02em;
        }
        .customer-name {
          font-weight: 500;
          color: #111827;
        }
        .price-cell {
          font-weight: 600;
          color: #0f0f0f;
          font-variant-numeric: tabular-nums;
        }
        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
          flex-shrink: 0;
        }
        .view-link {
          font-size: 13px;
          font-weight: 600;
          color: #2563eb;
          text-decoration: none;
          padding: 6px 14px;
          border-radius: 8px;
          border: 1.5px solid #dbeafe;
          background: #eff6ff;
          transition: background 0.15s, border-color 0.15s, color 0.15s, transform 0.12s;
          display: inline-block;
        }
        .view-link:hover {
          background: #2563eb;
          color: #fff;
          border-color: #2563eb;
          transform: scale(1.03);
        }
        .view-link:active {
          transform: scale(0.97);
        }
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: #6b7280;
          background: none;
          border: none;
          cursor: pointer;
          padding: 7px 12px;
          border-radius: 8px;
          transition: background 0.15s, color 0.15s;
          font-family: inherit;
        }
        .back-btn:hover {
          background: #f3f4f6;
          color: #111827;
        }
        .page-accent {
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, #0f0f0f, #888);
          border-radius: 4px;
          margin-bottom: 8px;
        }
        .stats-row {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .stat-pill {
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 10px;
          padding: 10px 18px;
          font-size: 13px;
          color: #6b7280;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .stat-pill strong {
          color: #0f0f0f;
          font-weight: 700;
          font-size: 15px;
          display: block;
        }
        .empty-state {
          padding: 64px 24px;
          text-align: center;
        }
        .empty-icon {
          font-size: 36px;
          margin-bottom: 14px;
        }
        .empty-title {
          font-size: 16px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 6px;
        }
        .empty-sub {
          font-size: 13.5px;
          color: #9ca3af;
        }
        @media (max-width: 640px) {
          .stats-row { gap: 8px; }
          .stat-pill { padding: 8px 12px; }
        }
      `}</style>

      <div className="orders-root" style={{ padding: "36px 24px 80px", maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <button className="back-btn" onClick={() => navigate("/admin")}>
            ← Back to Dashboard
          </button>

          <div style={{ marginTop: 16 }}>
            <div className="page-accent" />
            <h1 className="orders-title" style={{ fontSize: 28, color: "#0f0f0f", marginBottom: 4 }}>
              Orders
            </h1>
            <p style={{ fontSize: 14, color: "#9ca3af" }}>
              Manage and review all customer orders
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        {Array.isArray(orders) && orders.length > 0 && (
          <div className="stats-row">
            <div className="stat-pill">
              <strong>{orders.length}</strong>
              Total Orders
            </div>
            <div className="stat-pill">
              <strong>{orders.filter(o => o.status === "pending").length}</strong>
              Pending
            </div>
            <div className="stat-pill">
              <strong>{orders.filter(o => o.status === "completed").length}</strong>
              Completed
            </div>
            <div className="stat-pill">
              <strong>
                ₹{orders.reduce((s, o) => s + (o.totalPrice || 0), 0).toLocaleString("en-IN")}
              </strong>
              Total Revenue
            </div>
          </div>
        )}

        {/* Table Card */}
        <div className="table-card" style={{ overflowX: "auto" }}>
          {Array.isArray(orders) && orders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <div className="empty-title">No orders yet</div>
              <div className="empty-sub">Orders placed by customers will appear here.</div>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr className="table-header-row">
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(orders) &&
                  orders.map((order, idx) => (
                    <tr
                      key={order._id}
                      className="order-row"
                      style={{ animationDelay: `${idx * 0.04}s` }}
                    >
                      {/* Order ID */}
                      <td>
                        <span className="order-id">#{order._id?.slice(-8).toUpperCase()}</span>
                      </td>

                      {/* Customer */}
                      <td>
                        <div className="customer-name">{order.customer?.name || "—"}</div>
                      </td>

                      {/* Total */}
                      <td>
                        <span className="price-cell">₹{order.totalPrice?.toLocaleString("en-IN")}</span>
                      </td>

                      {/* Status */}
                      <td>
                        <span className={getStatusBadge(order.status)}>
                          <span className={`status-dot ${getStatusDot(order.status)}`} />
                          {order.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td>
                        <Link to={`/admin/orders/${order._id}`} className="view-link">
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer count */}
        {Array.isArray(orders) && orders.length > 0 && (
          <p style={{ fontSize: 12.5, color: "#c4c9d4", marginTop: 14, textAlign: "right" }}>
            Showing {orders.length} order{orders.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </>
  );
};

export default OrdersList;