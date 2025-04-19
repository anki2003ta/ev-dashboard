import React from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useStore } from "../../store/fetchAll";

const EVTypeYearly = () => {
  const { bevPhevTrend } = useStore();

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl py-6 px-2 sm:px-6  border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-lg font-semibold text-gray-100 text-center mb-4">
        BEV vs PHEV Trends Over Time
      </h2>

      <div className="pr-2"> 

      <ResponsiveContainer width="100%" height={500}>
        <AreaChart
          data={bevPhevTrend}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
            
          <defs>
            <linearGradient id="colorBEV" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPHEV" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="year"
            tick={{ fontSize: 13, fill: "#9ca3af" }}
            axisLine={{ stroke: "#4b5563" }}
            tickLine={{ stroke: "#4b5563" }}
          />
          <YAxis
            tick={{ fontSize: 13, fill: "#9ca3af" }}
            axisLine={{ stroke: "#4b5563" }}
            tickLine={{ stroke: "#4b5563" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              borderColor: "#374151",
              color: "#e5e7eb",
            }}
            itemStyle={{ color: "#f3f4f6" }}
          />
                      <Legend wrapperStyle={{ fontSize: "12px", fontWeight: "thin" }} />
          
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

          <Area
            type="monotone"
            dataKey="BEV"
            stroke="#EC4899"
            fillOpacity={1}
            fill="url(#colorBEV)"
          />
          <Area
            type="monotone"
            dataKey="PHEV"
            stroke="#10B981"
            fillOpacity={1}
            fill="url(#colorPHEV)"
          />
        </AreaChart>
      </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default EVTypeYearly;
