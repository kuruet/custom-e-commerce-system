import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const ordersData = [
  { day: "Mon", orders: 12 },
  { day: "Tue", orders: 19 },
  { day: "Wed", orders: 8 },
  { day: "Thu", orders: 27 },
  { day: "Fri", orders: 34 },
  { day: "Sat", orders: 41 },
  { day: "Sun", orders: 22 },
];

const revenueData = [
  { day: "Mon", revenue: 3200 },
  { day: "Tue", revenue: 5100 },
  { day: "Wed", revenue: 2400 },
  { day: "Thu", revenue: 7300 },
  { day: "Fri", revenue: 8900 },
  { day: "Sat", revenue: 11200 },
  { day: "Sun", revenue: 6100 },
];

const productTypeData = [
  { name: "Ready Products", value: 63 },
  { name: "Custom Products", value: 37 },
];

const PIE_COLORS = ["#f59e0b", "#6366f1"];

const tooltipStyle = {
  backgroundColor: "#1e293b",
  border: "1px solid #334155",
  borderRadius: "8px",
  color: "#f1f5f9",
  fontSize: "12px",
};

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-5 hover:border-slate-600 transition-all duration-300">
      <div className="mb-4">
        <h3 className="text-white font-semibold text-sm">{title}</h3>
        {subtitle && <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export default function ChartsSection() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Orders Line Chart */}
      <ChartCard title="Orders per Day" subtitle="Last 7 days activity">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={ordersData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "#f59e0b22" }} />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#f59e0b"
              strokeWidth={2.5}
              dot={{ fill: "#f59e0b", r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#fbbf24" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Revenue Bar Chart */}
      <ChartCard title="Revenue per Day" subtitle="PKR earnings this week">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={revenueData} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(v) => [`PKR ${v.toLocaleString()}`, "Revenue"]}
            />
            <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Pie Chart — spans full width on xl */}
      <div className="xl:col-span-2">
        <ChartCard title="Product Type Distribution" subtitle="Custom vs ready-made orders">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={productTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  animationBegin={200}
                  animationDuration={800}
                >
                  {productTypeData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, ""]} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(val) => <span style={{ color: "#94a3b8", fontSize: "12px" }}>{val}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-row sm:flex-col gap-4 sm:gap-3 flex-shrink-0">
              {productTypeData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                  <div>
                    <p className="text-white text-lg font-bold leading-none">{item.value}%</p>
                    <p className="text-slate-500 text-xs mt-0.5">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}