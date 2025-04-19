import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useStore } from "../../store/fetchAll";

// const countData = [
// 	{ year: "Jul", count: 4200 },
// 	{ year: "Aug", count: 3800 },
// 	{ year: "Sep", count: 5100 },
// 	{ year: "Oct", count: 4600 },
// 	{ year: "Nov", count: 5400 },
// 	{ year: "Dec", count: 7200 },
// 	{ year: "Jan", count: 6100 },
// 	{ year: "Feb", count: 5900 },
// 	{ year: "Mar", count: 6800 },
// 	{ year: "Apr", count: 6300 },
// 	{ year: "May", count: 7100 },
// 	{ year: "Jun", count: 7500 },
// ];

const YrVsCountLineChart = () => {
  const { vehiclesByYear: countData } = useStore();
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl py-6 px-2 sm:px-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100 text-center">
        Total Vehicles By Model Year
      </h2>

      <div className="h-96">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={countData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis
              dataKey={"year"}
              stroke="#9ca3af"
              tick={{ fontSize: 13, fill: "#9ca3af" }}
            />
            <YAxis stroke="#9ca3af" tick={{ fontSize: 13, fill: "#9ca3af" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#6366F1"
              strokeWidth={3}
              // dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
export default YrVsCountLineChart;
