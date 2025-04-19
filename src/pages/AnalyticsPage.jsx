import React from "react";

import Header from "../components/common/Header";
import CompanyAreaGraph from "../components/Charts/CompanyAreaGraph";
import { MakerCountChart } from "../components/Charts/MakerCountChart";
import { CountryCountChart } from "../components/Charts/CountryCountChart";
import { CityCountChart } from "../components/Charts/CityCountChart";
import HybridCarsBrands from "../components/Charts/HybridCarsBrands";
import EVCityMap from "../components/EVCityMap";
// import EVCityMap2 from "../components/EVCityMap2";

const AnalyticsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Analytics" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 space-y-8">
        <CompanyAreaGraph />
        <EVCityMap/>
        {/* <EVCityMap2/> */}
        <HybridCarsBrands/>
        <MakerCountChart />
        <CountryCountChart />
        <CityCountChart />
      </main>
    </div>
  );
};

export default AnalyticsPage;
