import { Cable, Car, PlugZap,  Zap } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import Cafv from "../components/Charts/Cafv";
import VehicleType from "../components/Charts/VehicleType";
import YrVsCountLineChart from "../components/Charts/YrVsCountLineChart";
import { useStore } from "../store/fetchAll";
import EVTypeYearly from "../components/Charts/EVTypeYearly";

const OverviewPage = () => {
  const {totalVehicles,totalBEV,
    totalPHEV,averageElectricRange}=useStore()
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Overview" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Vehicles"
            icon={Car}
            value={totalVehicles}
            color="#6366F1"
          />
          <StatCard
            name="Average Electric Range"
            icon={Zap}
            value={averageElectricRange}
            color="#8B5CF6"
          />
          <StatCard
            name="Total BEV Vehicles"
            icon={Cable}
            value={totalBEV}
            color="#EC4899"
          />
          <StatCard
            name="Total PHEV Vehicles"
            icon={PlugZap}
            value={totalPHEV}
            color="#10B981"
          />
        </motion.div>

        {/* CHARTS */}
        <YrVsCountLineChart />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-8 gap-4 my-8">
          <Cafv />
          <VehicleType />
        </div>
        <EVTypeYearly/>
      </main>
    </div>
  );
};
export default OverviewPage;
