import React, { useState } from "react";
import { useStore } from "../../store/fetchAll";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const ModelsPerBrand = () => {
  const { modelTableData } = useStore();
  const [selectedBrand, setSelectedBrand] = useState("TESLA");

  // Extract unique brands for dropdown
  const brands = [...new Set(modelTableData.map((ev) => ev.make))];

  // Filter models based on selected brand
  const filteredModels = modelTableData
    .filter((ev) => ev.make === selectedBrand)
    .map((ev) => ({
      name: ev.model,
      count: ev.count,
    }));

  return (
    <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
         <div className="flex justify-between items-center flex-wrap my-4 gap-2">

      <h1 className="text-lg font-medium  text-gray-100">
        EV Model Distribution ({selectedBrand})
      </h1>

      {/* Brand Selection Dropdown */}
      <select
        value={selectedBrand}
        onChange={(e) => setSelectedBrand(e.target.value)}
        className=" p-2 border border-gray-300 rounded bg-gray-700 text-gray-300 text-sm"
      >
        {brands.map((brand,index) => (
          <option key={brand+index} value={brand}>
            {brand}
          </option>
        ))}
      </select>
         </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={filteredModels}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          
          <XAxis dataKey="name" angle={-30} textAnchor="end" height={60} tick={{ fontSize: 13, fill: "#9ca3af" }} />
          <YAxis   tick={{ fontSize: 13, fill: "#9ca3af" }}/>
          <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
          <Bar dataKey="count" fill="#9333EA" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default ModelsPerBrand;
