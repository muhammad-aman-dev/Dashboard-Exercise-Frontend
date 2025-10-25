'use client'
import { LineChart, ReferenceLine, ReferenceDot, Area, AreaChart, Line, BarChart, Bar, PieChart, Pie, Cell, Tooltip, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import StatCounter from "@/components/StateCounter";
import Footer from "@/components/Footer";
import { storeData } from "@/mockData/data";
import { useParams } from "next/navigation";
import { useState, useEffect, useEffectEvent } from "react";


const page = () => {
    const params = useParams()
    const [isLoading, setisLoading] = useState(false);
    const [departData, setdepartData] = useState({});
    const { department } = params;
    useEffect(() => {
      setisLoading(true);
      const data =storeData.departments.filter((data)=>{
    if(data.id==department) return data;
    })
    console.log(data[0])
     setdepartData(data[0]);
     setisLoading(false);
    }, [])
    
    
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



if(isLoading || !departData.monthlySales){
  return <><div className="w-full h-full flex justify-center items-center">Loading...</div></>
}
const bestMonth = departData.monthlySales.reduce((max, curr) =>
 curr.revenue > max.revenue ? curr : max
);
const avgRevenue =
 departData.monthlySales.reduce((sum, m) => sum + m.revenue, 0) /
 departData.monthlySales.length;

  return (
   <div className="flex flex-col gap-3.5">
     <header className="flex p-5">
       <motion.h2 initial={{opacity:0, y:30}}
          animate={{opacity:1, y:0}}
          transition={{duration : 0.8}} className="text-lg sm:text-2xl font-bold bg-gray-800/50 p-2 rounded-lg">{departData.name + ' Insights'}</motion.h2>
     </header>
     <main className="flex flex-col w-full items-center gap-4">
           <div className="flex flex-col gap-8 sm:gap-0 sm:flex-row w-[90%] sm:w-[80%] bg-gray-800/30 p-2 pt-7 rounded-2xl">
               <motion.div 
               initial={{opacity:0, y:30}}
               animate={{opacity:1, y:0}}
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
                 animate={{ opacity: 1, y: 0 }}
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
  animate={{ opacity: 1, y: 0 }}
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
     </main>
     </div>
  )
}

export default page
