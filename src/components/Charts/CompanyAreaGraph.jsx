import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useStore } from "../../store/fetchAll";
import { motion } from "framer-motion";

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

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-gray-800 p-3 border border-gray-700 rounded-md shadow-lg text-gray-200">
      <p className="text-sm font-semibold mb-2">{`Year: ${label}`}</p>
      <div className="grid grid-cols-3 gap-2 text-xs">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.name}:</span>
            <span className="font-semibold">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CompanyAreaGraph = () => {
  const { vehiclesByCompanyAndYear } = useStore();
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minYear, setMinYear] = useState(1998);
  const [maxYear, setMaxYear] = useState(2024);

  // Assign colors to companies
  const companyColors = vehiclesByCompanyAndYear.reduce((acc, item, index) => {
    acc[item.company] = colors[index % colors.length];
    return acc;
  }, {});

  // Handle brand selection
  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Filtered data based on year selection
  const filteredData = vehiclesByCompanyAndYear.map((companyData) => ({
    ...companyData,
    data: companyData.data.filter(
      (entry) => entry.year >= minYear && entry.year <= maxYear
    ),
  }));

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100 text-center">
        Total Vehicles By Model Year
      </h2>

      <div className="flex items-end justify-between flex-wrap">
        {/* Year Range Selector */}
        <div className="flex gap-4 mb-4">
          <div>
            <label className="block text-gray-400 text-sm">Min Year</label>
            <select
              value={minYear}
              onChange={(e) => setMinYear(Number(e.target.value))}
              className="p-2 bg-gray-700 text-gray-200 rounded-md"
            >
              {Array.from(
                { length: maxYear - 1998 + 1 },
                (_, i) => 1998 + i
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-sm">Max Year</label>
            <select
              value={maxYear}
              onChange={(e) => {
                const selectedYear = Number(e.target.value);
                setMaxYear(minYear > selectedYear ? 2024 : selectedYear);
              }}
              className="p-2 bg-gray-700 text-gray-200 rounded-md"
            >
              {Array.from(
                { length: 2024 - minYear + 1 },
                (_, i) => minYear + i
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Brand Selector */}
        <div className="mb-4">
          <select
            onChange={(e) => toggleBrand(e.target.value)}
            className="p-2 bg-gray-700 text-gray-200 rounded-md"
          >
            <option value="">Select a brand</option>
            {vehiclesByCompanyAndYear.map((companyData) => (
              <option key={companyData.company} value={companyData.company}>
                {companyData.company}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Brands */}
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedBrands.length > 0 ? (
          selectedBrands.map((brand) => (
            <div
              key={brand}
              className="flex items-center bg-gray-700 text-gray-200 px-3 py-1 rounded-full"
            >
              {brand}
              <button
                className="ml-2 text-red-400 hover:text-red-600"
                onClick={() => toggleBrand(brand)}
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400">Showing all brands</p>
        )}
      </div>

      <div className="pr-2">
        <ResponsiveContainer width="100%" height={500}>
          <AreaChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              type="number"
              domain={[minYear, maxYear]} // Dynamic range update
              interval={"preserveStartEnd"}
              tick={{ fontSize: 13, fill: "#9ca3af" }}
            />
            <YAxis tick={{ fontSize: 13, fill: "#9ca3af" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "12px", fontWeight: "thin" }} />

            {filteredData
              .filter(
                (companyData) =>
                  selectedBrands.length === 0 ||
                  selectedBrands.includes(companyData.company)
              )
              .map((companyData) => (
                <Area
                  key={companyData.company}
                  type="monotone"
                  data={companyData.data}
                  dataKey="count"
                  name={companyData.company}
                  stackId="1"
                  stroke={companyColors[companyData.company]}
                  fill={companyColors[companyData.company]}
                  fillOpacity={0.7}
                />
              ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CompanyAreaGraph;
