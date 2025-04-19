import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useStore } from "../../store/fetchAll";
import { motion } from "framer-motion";

const HybridCarsBrands = () => {
  const { modelTableData } = useStore();

  const extractData = (data, type) => {
    return Object.entries(
      data
        .filter((item) => item.evType === type)
        .reduce((acc, { make, count }) => {
          acc[make] = (acc[make] || 0) + count;
          return acc;
        }, {})
    )
      .map(([make, count]) => ({ make, count })) // Convert object to array
      .sort((a, b) => b.count - a.count).slice(0,10); // Sort by count (descending)
  };

  const bevData = extractData(modelTableData, "BEV");
  const phevData = extractData(modelTableData, "PHEV");

  return (
    <div className="space-y-8">
      {/* BEV Chart */}
      <motion.div
        className="bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl py-6 px-2 sm:px-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg font-semibold text-gray-100 text-center mb-4">
          Top BEV (Battery Electric Vehicle) Brands
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={bevData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="make"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              angle={-30}
              height={60}
              textAnchor="end"
            />
            <YAxis tick={{ fontSize: 13, fill: "#9ca3af" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Bar dataKey="count" fill="#F59E0B"  />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* PHEV Chart */}
      <motion.div
        className="bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl py-6 px-2 sm:px-6 border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg font-semibold text-gray-100 text-center mb-4">
          Top PHEV (Plug-in Hybrid Electric Vehicle) Brands
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={phevData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="make"
              height={50}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              angle={-30}
              textAnchor="end"
            />
            <YAxis tick={{ fontSize: 13, fill: "#9ca3af" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Bar dataKey="count" fill="#3B82F6"  />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default HybridCarsBrands;
