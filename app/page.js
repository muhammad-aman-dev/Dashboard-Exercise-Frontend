'use client'
import Image from "next/image";
import { storeData } from "@/mockData/data";
import {
  LineChart,
  ReferenceLine,
  ReferenceDot,
  Area,
  AreaChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import StatCounter from "@/components/StateCounter";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  const total = storeData?.total || {};
  const monthlySales = total.monthlySales || [];
  const topProducts = total.topProducts || [];
  const departments = storeData?.departments || [];

  const bestMonth =
    monthlySales.length > 0
      ? monthlySales.reduce((max, curr) =>
          curr.revenue > max.revenue ? curr : max
        )
      : null;

  const avgRevenue =
    monthlySales.length > 0
      ? monthlySales.reduce((sum, m) => sum + m.revenue, 0) /
        monthlySales.length
      : 0;

  const CustomToolTip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value?.toLocaleString();
      return (
        <div className="bg-gray-900/95 border border-[#10b981]/50 rounded-lg px-4 py-2 shadow-lg backdrop-blur-sm">
          <p className="text-sm text-gray-400 uppercase tracking-wide">{label}</p>
          <p className="text-base font-semibold text-[#10b981] mt-1">
            Revenue: <span className="text-white ml-1">${value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (!storeData || !total) {
    return (
      <div className="w-full h-full flex justify-center items-center text-gray-400">
        Data not available.
      </div>
    );
  }

  if (monthlySales.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center text-gray-400">
        Not enough data to display dashboard yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3.5">
      {/* HEADER */}
      <header className="flex p-5">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-bold bg-gray-800/50 p-2 rounded-lg"
        >
          Dashboard
        </motion.h2>
      </header>

      <main className="flex flex-col w-full items-center gap-4">
        <div className="flex flex-col gap-8 sm:gap-0 sm:flex-row w-[90%] sm:w-[80%] bg-gray-800/30 p-2 pt-7 rounded-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full sm:w-1/2"
          >
            {monthlySales.length > 0 ? (
              <ResponsiveContainer width="100%" height={400} minHeight="350px">
                <BarChart data={monthlySales} margin={{ right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis dataKey="revenue" />
                  <Legend />
                  <Tooltip content={<CustomToolTip />} />
                  <defs>
                    <linearGradient id="glowGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                  <Bar
                    dataKey="revenue"
                    fill="url(#glowGreen)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[350px] flex items-center justify-center text-gray-400">
                No sales data available.
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full sm:w-1/2 flex flex-col justify-center items-center gap-6 p-6 bg-gray-800/40 rounded-2xl border border-[#10b981]/20 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-semibold text-white mb-2 border-b border-[#10b981]/30 pb-2 w-full text-center">
              Overview
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              <StatCounter target={total.revenue || 0} label="Revenue" />
              <StatCounter target={total.profit || 0} label="Profit" />
              <StatCounter target={total.customers || 0} label="Customers" />
              <StatCounter target={total.totalOrders || 0} label="Total Orders" />
            </div>
          </motion.div>
        </div>

        {monthlySales.length > 0 && bestMonth ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col w-[90%] sm:w-[80%] items-center bg-gray-800/30 rounded-2xl p-6 border border-[#10b981]/20 backdrop-blur-sm"
          >
            <h3 className="text-xl font-semibold text-white mb-6 border-b border-[#10b981]/30 pb-2 w-full text-center">
              Monthly Revenue Trend
            </h3>

            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={monthlySales}>
                <defs>
                  <linearGradient id="lineEmerald" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#064e3b" stopOpacity={0.1} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis
                  dataKey="month"
                  stroke="#9ca3af"
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                />
                <YAxis
                  stroke="#9ca3af"
                  tick={{ fontSize: 10 }}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(17, 24, 39, 0.95)",
                    border: "1px solid rgba(16, 185, 129, 0.5)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="url(#lineEmerald)"
                  strokeWidth={3}
                  dot={{ stroke: "#10b981", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#10b981" }}
                />
                <ReferenceLine
                  y={avgRevenue}
                  stroke="#3b82f6"
                  strokeDasharray="5 5"
                  label={{
                    value: `Avg: $${avgRevenue.toLocaleString()}`,
                    position: "top",
                    fill: "#60a5fa",
                    fontSize: 10,
                  }}
                />

                <ReferenceDot
                  x={bestMonth.month}
                  y={bestMonth.revenue}
                  r={6}
                  fill="#facc15"
                  stroke="#eab308"
                  label={{
                    value: `Best Month: ${bestMonth.month}`,
                    position: "bottom",
                    fill: "#facc15",
                    fontSize: 10,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        ) : null}

        {topProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col w-[90%] sm:w-[80%] items-center bg-gray-800/30 rounded-2xl p-6 border border-[#10b981]/20 backdrop-blur-sm"
          >
            <h3 className="text-xl font-semibold text-white mb-6 border-b border-[#10b981]/30 pb-2 w-full text-center">
              Top 5 Products (Last Month)
            </h3>

            <div className="flex flex-col sm:flex-row gap-6 w-full items-center justify-center">
              <div className="w-full sm:w-1/2">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <defs>
                      <linearGradient id="pieEmerald" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#065f46" stopOpacity={0.7} />
                      </linearGradient>
                      <linearGradient id="pieGreenDim" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#34d399" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#047857" stopOpacity={0.5} />
                      </linearGradient>
                      <linearGradient id="pieTeal" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#2dd4bf" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#0d9488" stopOpacity={0.5} />
                      </linearGradient>
                      <linearGradient id="pieSlate" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#64748b" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#334155" stopOpacity={0.6} />
                      </linearGradient>
                      <linearGradient id="pieGray" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#475569" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#1e293b" stopOpacity={0.7} />
                      </linearGradient>
                    </defs>

                    <Pie
                      data={topProducts}
                      dataKey="revenue"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius="45%"
                      outerRadius="75%"
                      labelLine={false}
                      label={({ name, percent }) => {
                        const shortName =
                          name.length > 14 ? name.slice(0, 14) + "…" : name;
                        return window.innerWidth > 500
                          ? `${shortName} ${(percent * 100).toFixed(0)}%`
                          : `${(percent * 100).toFixed(0)}%`;
                      }}
                    >
                      {topProducts.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`url(#${
                            ["pieEmerald", "pieGreenDim", "pieTeal", "pieSlate", "pieGray"][index]
                          })`}
                          stroke="#0f172a"
                          strokeWidth={1.5}
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const p = payload[0].payload;
                          return (
                            <div className="bg-gray-900/95 border border-[#10b981]/50 rounded-lg px-4 py-2 shadow-lg backdrop-blur-sm">
                              <p className="text-sm text-gray-400 uppercase tracking-wide">
                                {p.name}
                              </p>
                              <p className="text-base font-semibold text-[#10b981] mt-1">
                                Revenue:
                                <span className="text-white ml-1">
                                  ${p.revenue?.toLocaleString() || 0}
                                </span>
                              </p>
                              <p className="text-gray-400 text-sm">
                                Units Sold: {p.unitsSold || 0}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* AREA CHART */}
              <div className="w-full sm:w-1/2 h-full">
                <ResponsiveContainer height={350}>
                  <AreaChart
                    data={topProducts.map((item, i) => ({
                      name: item.name,
                      ProductA:
                        i === 0 ? item.revenue : 0,
                      ProductB:
                        i === 1 ? item.revenue : 0,
                      ProductC:
                        i === 2 ? item.revenue : 0,
                      ProductD:
                        i === 3 ? item.revenue : 0,
                      ProductE:
                        i === 4 ? item.revenue : 0,
                    }))}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorEmerald" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorTeal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#0f766e" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorGreenDim" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34d399" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#047857" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorSlate" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#64748b" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#334155" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorGray" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#475569" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#1e293b" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis
                      dataKey="name"
                      stroke="#9ca3af"
                      tick={{
                        fontSize: 8,
                        fill: "#9ca3af",
                        dy: 10,
                      }}
                      interval={0}
                      angle={10}
                      textAnchor="end"
                    />
                    <YAxis stroke="#9ca3af" tick={{ fontSize: 8 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(17, 24, 39, 0.95)",
                        border: "1px solid rgba(16, 185, 129, 0.5)",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Area type="monotone" dataKey="ProductA" stroke="#10b981" fill="url(#colorEmerald)" />
                    <Area type="monotone" dataKey="ProductB" stroke="#14b8a6" fill="url(#colorTeal)" />
                    <Area type="monotone" dataKey="ProductC" stroke="#34d399" fill="url(#colorGreenDim)" />
                    <Area type="monotone" dataKey="ProductD" stroke="#64748b" fill="url(#colorSlate)" />
                    <Area type="monotone" dataKey="ProductE" stroke="#475569" fill="url(#colorGray)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="w-full flex justify-center items-center text-gray-400">
            No product data available yet.
          </div>
        )}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-bold bg-gray-800/50 p-2 rounded-lg"
        >
          Departments
        </motion.h2>

        {departments.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[90%] sm:w-[80%]">
            {departments.map((dept) => (
              <motion.div
                key={dept.id}
                className="bg-gray-800/40 p-5 rounded-2xl border border-[#10b981]/20 hover:border-[#10b981]/50 transition cursor-pointer"
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{dept.icon}</span>
                  <h4 className="text-lg font-semibold">{dept.name}</h4>
                </div>
                <p className="text-gray-400 text-sm">
                  Revenue: ${dept.revenue?.toLocaleString() || 0}
                </p>
                <p className="text-gray-400 text-sm">
                  Profit: ${dept.profit?.toLocaleString() || 0}
                </p>
                <p className="text-gray-400 text-sm">
                  Growth: {dept.growth ?? 0}%
                </p>
                <div className="flex justify-end w-full">
                  <Link
                    href={`/${dept.id}`}
                    target="_blank"
                    className="border-[#10b981] border-b w-fit"
                  >
                    view details {'>'}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400">No departments available yet.</div>
        )}
      </main>

      <Footer />
    </div>
  );
}
