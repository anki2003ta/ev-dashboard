import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { useStore } from "../../store/fetchAll";
import { motion } from "framer-motion";

// Define a consistent color palette for different years
const colors = [
    "#6366F1",
    "#8B5CF6",
    "#EC4899",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#3B82F6",
    "#22C55E",
    "#EAB308",
    "#DB2777",
    "#14B8A6",
    "#9333EA",
    "#F87171",
    "#FACC15",
    "#4ADE80",
    "#60A5FA",
  ];

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-gray-900 p-3 border border-gray-700 rounded-lg shadow-lg text-gray-200">
      <p className="text-sm font-semibold mb-2">{payload[0].payload.company}</p>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span>{entry.name}:</span>
            <span className="font-semibold">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const EVProductionChart = () => {
  const { productionTrendYrbasis } = useStore();

  // Process Data
  const chartData = useMemo(() => {
    if (!productionTrendYrbasis.length) return [];

    // Extract all unique years
    const allYears = [...new Set(productionTrendYrbasis.flatMap(company => company.data.map(d => d.year)))].sort();

    return productionTrendYrbasis.map(({ company, data }) => {
      const yearMap = Object.fromEntries(data.map(({ year, count }) => [year, count]));
      return { company, ...Object.fromEntries(allYears.map(year => [year, yearMap[year] || 0])) };
    });
  }, [productionTrendYrbasis]);

  return (
    <motion.div
      className="py-6 px-2 sm:px-6 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-semibold text-gray-100 text-center mb-4 ">
        EV Production Trends in Top 10 Companies
      </h2>
      
      <ResponsiveContainer width="100%" height={450}>
        <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis dataKey="company" angle={-30} textAnchor="end" height={60} tick={{ fontSize: 13, fill: "#9ca3af" }} />
          <YAxis tick={{ fontSize: 13, fill: "#9ca3af" }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: "12px", fontWeight: "thin" }} />

          {Object.keys(chartData[0] || {}).filter(key => key !== "company").map((year, index) => (
            <Bar
              key={year}
              dataKey={year}
              stackId="a"
              stroke={colors[index % colors.length]}
              fill={colors[index % colors.length]}
              fillOpacity={0.8}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <p className=" my-4 text-gray-400 text-center">
      This chart illustrates the growth trends of top EV manufacturers, highlighting production changes over the years.
      </p>
    </motion.div>
  );
};

export default EVProductionChart;
