'use client'
import { LineChart, Line, PieChart, Pie, Cell, AreaChart, Area , ReferenceLine, ReferenceDot, BarChart, Bar, Tooltip, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import StatCounter from "@/components/StateCounter";
import Footer from "@/components/Footer";
import { storeData } from "@/mockData/data";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

const page = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [departData, setDepartData] = useState(null);
  const { department } = params;

  useEffect(() => {
    setIsLoading(true);
    const data = storeData.departments?.filter((d) => d.id == department);
    const selected = data?.[0] || null;
    setDepartData(selected);
    setIsLoading(false);
  }, [department]);

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

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!departData) {
    return (
      <div className="w-full h-full flex justify-center items-center text-gray-400">
        Department data not found.
      </div>
    );
  }

  const monthlySales = departData.monthlySales || [];

  if (monthlySales.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center text-gray-400">
        Not enough data to display charts yet.
      </div>
    );
  }

  const bestMonth = monthlySales.reduce((max, curr) =>
    curr.revenue > max.revenue ? curr : max
  );
  const avgRevenue =
    monthlySales.reduce((sum, m) => sum + m.revenue, 0) / monthlySales.length;

    
  const topProducts = departData.topProductsLastMonth || [];

  return (
    <div className="flex flex-col gap-3.5">
      <header className="flex p-5">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-lg sm:text-2xl flex gap-1 items-center font-bold bg-gray-800/50 p-2 rounded-lg"
        >
           <Link href={'/'} ><img src="/back.svg" alt="Back to Home Page" /></Link>
          {departData.name + " Insights"}
        </motion.h2>
      </header>
     <main className="flex flex-col w-full items-center gap-4">
           <div className="flex flex-col gap-8 sm:gap-0 sm:flex-row w-[90%] sm:w-[80%] bg-gray-800/30 p-2 pt-7 rounded-2xl">
               <motion.div 
               initial={{opacity:0, y:30}}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{duration : 0.8}}
               className="w-full sm:w-1/2"
               >
<div className="h-full"> 
           <ResponsiveContainer width={"100%"} height={400} minHeight={"350px"}>
            <BarChart
            width = {500}
            height = {300}
            data = {departData.monthlySales}
            margin = {{
              right : 30, 
            }}>
             <CartesianGrid strokeDasharray="3 3"/>
             <XAxis dataKey={"month"}/>
             <YAxis dataKey={"revenue"}/>
             <Legend/>
             <Tooltip content={<CustomToolTip/>}/>
             <defs>
            <linearGradient id="glowGreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0.3} />
           </linearGradient>
           </defs>
            <Bar dataKey="revenue" fill="url(#glowGreen)" radius={[8, 8, 0, 0]} />
            </BarChart>
           </ResponsiveContainer>
           </div>


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
                   <StatCounter target={departData.revenue} label="Revenue" />
                   <StatCounter target={departData.profit} label="Profit" />
                   <StatCounter target={departData.orders} label="Orders" />
                   <StatCounter target={departData.avgBasket} label="Avg Basket" />
                 </div>
                   </motion.div>
               </div>
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
    <LineChart data={departData.monthlySales}>
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

     </main>
     <Footer/>
     </div>
  )
}

export default page
