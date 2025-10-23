'use client'
import Image from "next/image";
import { storeData } from "@/mockData/data";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, Tooltip, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import StatCounter from "@/components/StateCounter";

export default function Home() {
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

  return (
    <div className="flex flex-col gap-3.5">
     <header className="flex p-5">
       <h2 className="text-2xl font-bold bg-gray-800/50 p-2 rounded-lg">Dashboard</h2>
     </header>
     <main className="flex flex-col w-full items-center">
      <div className="flex flex-col gap-8 sm:gap-0 sm:flex-row w-[90%] sm:w-[80%] bg-gray-800/30 p-2 pt-7 rounded-2xl">
          <motion.div 
          initial={{opacity:0, y:30}}
          animate={{opacity:1, y:0}}
          transition={{duration : 0.8}}
          className="w-full sm:w-1/2"
          >
            <div className="h-[300px] sm:h-[400px] w-full">
           <ResponsiveContainer width={"100%"} height={"100%"}>
            <BarChart
            width = {500}
            height = {300}
            data = {storeData.total.monthlySales}
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
    <StatCounter target={storeData.total.revenue} label="Revenue" />
    <StatCounter target={storeData.total.profit} label="Profit" />
    <StatCounter target={storeData.total.customers} label="Customers" />
    <StatCounter target={storeData.total.totalOrders} label="Total Orders" />
  </div>
    </motion.div>

      </div>
       
     </main>
    </div>
  );
}
