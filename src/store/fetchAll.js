import { create } from "zustand";
import { fetchEVData } from "../utils/csvParser";

export const useStore = create((set) => ({
  evData: [],
  countyCount: {},
  cityCount: {},
  totalVehicles: 0,
  totalBEV: 0,
  totalPHEV: 0,
  averageElectricRange: 0,
  topCAFV: [],
  vehiclesByYear: [],
  vehiclesByMake: [],
  vehicleLocations: [],
  vehiclesByCompanyAndYear: [],
  isFetching: false,
  modelTableData: [],
  countryTop: [],
  cityTop: [],
  cityEvAdoption: [],
  productionTrendYrbasis: [],
  cityTotal:[],

  fetchData: async () => {
    set({ isFetching: true });
    let b4Error =0
    let parsedData
    try {
     parsedData = await fetchEVData();
      const countryCount = {},
        cityCount = {};
      const cafvCount = {};
      let totalBEV = 0;
      let totalPHEV = 0;
      let totalRange = 0;
      let rangeCount = 0;
      const yearCount = {};
      const makeCount = {};
      const companyYearData = {};
      const modelInfo = {};
      const electricUtility = {};
      const cityYearlyData = {};
      const bevPhevByYear = {};

      parsedData.forEach((ev,index) => {
        b4Error=index
        if(index== parsedData.length-1){
          return null
        }

        // for bev and phev trend
        const year = ev["Model Year"];
        const evType = ev["Electric Vehicle Type"];

        if (year && evType) {
          if (!bevPhevByYear[year]) {
            bevPhevByYear[year] = { year: Number(year), BEV: 0, PHEV: 0 };
          }

          if (evType === "Battery Electric Vehicle (BEV)") {
            bevPhevByYear[year].BEV++;
          } else if (evType === "Plug-in Hybrid Electric Vehicle (PHEV)") {
            bevPhevByYear[year].PHEV++;
          }
        }

        // to get ev registration based on per yr for top 10 cities
        const city = ev.City;

        if (city && year) {
          if (!cityYearlyData[city]) {
            cityYearlyData[city] = { total: 0, yearlyData: {} };
          }
          cityYearlyData[city].total++;
          cityYearlyData[city].yearlyData[year] =
            (cityYearlyData[city].yearlyData[year] || 0) + 1;
        }

        // to get the electric utility
        const utility = ev["Electric Utility"];
        electricUtility[utility] = (electricUtility[utility] || 0) + 1;

        // to get the model and its associated details
        const model = ev.Model;
        if (!modelInfo[model]) {
          modelInfo[model] = {
            count: 1,
            make: ev.Make,
            evType:
              ev["Electric Vehicle Type"] === "Battery Electric Vehicle (BEV)"
                ? "BEV"
                : "PHEV",
          };
        } else {
          modelInfo[model].count += 1;
        }
        // to get vehicles in country and city
        countryCount[ev.County] = (countryCount[ev.County] || 0) + 1;

        function extractCoordinates(inputString) {
          const coordinatesString = inputString.slice(7);
          const [longitudeStr, latitudeStr] = coordinatesString.split(' ');
          const longitude = parseFloat(longitudeStr);
          const latitude = parseFloat(latitudeStr);
          return { longitude, latitude };
        }
        // console.log(ev['Vehicle Location'])
        // if(!ev['Vehicle Location'])
        // console.log(ev['Vehicle Location'].slice(7))
        if (!cityCount[ev.City] && ev['Vehicle Location']) {
          const { longitude, latitude } = extractCoordinates(ev['Vehicle Location']);        
          cityCount[ev.City] = { count: 0, latitude, longitude };
        }
        else if(ev.City !=null){

          cityCount[ev.City].count += 1;
        }

        // to count number of BEV and PHEV
        if (ev["Electric Vehicle Type"] === "Battery Electric Vehicle (BEV)") {
          totalBEV++;
        } else if (
          ev["Electric Vehicle Type"] ===
          "Plug-in Hybrid Electric Vehicle (PHEV)"
        ) {
          totalPHEV++;
        }

        // to get yr and number of models

        if (year) {
          yearCount[year] = (yearCount[year] || 0) + 1;
        }

        //this is for data in aread graph
        const company = ev.Make;
        if (year && company) {
          if (!companyYearData[company]) {
            companyYearData[company] = {};
          }
          companyYearData[company][year] =
            (companyYearData[company][year] || 0) + 1;
        }

        //to get maker and count of cars they made
        const make = ev.Make;
        if (make) {
          makeCount[make] = (makeCount[make] || 0) + 1;
        }

        // Count each CAFV (Clean Alternative Fuel Vehicle) type
        if (ev["Clean Alternative Fuel Vehicle (CAFV) Eligibility"]) {
          const cafvType =
            ev["Clean Alternative Fuel Vehicle (CAFV) Eligibility"];
          cafvCount[cafvType] = (cafvCount[cafvType] || 0) + 1;
        }

        // Calculate total range
        const range = Number(ev["Electric Range"]);
        if (!isNaN(range) && range > 0) {
          totalRange += range;
          rangeCount++;
        }
      });

      // ----------------------------------end of parsedData--------------------------

      // for bev and phev analysis
      const bevPhevTrend = Object.values(bevPhevByYear).sort((a, b) => a.year - b.year);


      // for production trend on a yrly basis
      const productionTrendYrbasis = Object.entries(companyYearData)
        .map(([company, years]) => {
          let total = 0;
          const completeData = [];

          for (const year in years) {
            const count = years[year];
            if (count > 0) {
              total += count;
              completeData.push({ year: Number(year), count });
            }
          }

          return { company, total, data: completeData };
        })
        .sort((a, b) => b.total - a.total) 
        .slice(0, 10);


      // Get top 10 cities based on total EV registrations
      const cityEvAdoption = Object.entries(cityYearlyData)
        .map(([city, { total, yearlyData }]) => ({
          city,
          total,
          yearlyData: Object.entries(yearlyData)
            .map(([year, count]) => ({ year: Number(year), count }))
            .sort((a, b) => a.year - b.year),
        }))
        .sort((a, b) => b.total - a.total) // Sort by total EV registrations
        .slice(0, 10); // Take only top 10 cities

      //Object to table Model Table data
      const modelTableData = Object.entries(modelInfo)
        .map(([model, details]) => ({
          model,
          ...details,
        }))
        .sort((a, b) => b.count - a.count);
      //Country and state counts to array
      const countryTop = Object.entries(countryCount)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10);

      const cityTotal = Object.entries(cityCount)
        .map(([name, value]) => ({ name, value:value.count,latitude:value.latitude,longitude:value.longitude }))
        
       ;
       const cityTop=cityTotal.sort((a,b)=> b.value - a.value).slice(0,10);
      //  console.log(cityTotal[0])
      //  console.log(cityTop)

      // Compute average electric range
      const averageElectricRange =
        rangeCount > 0 ? (totalRange / rangeCount).toFixed(2) : 0;

      // Convert cfva to array
      const topCAFV = Object.entries(cafvCount)
        // .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([name, value]) => ({
          name: name.includes("unknown")
            ? "CAFV Unknown"
            : name.includes("Eligible")
            ? "CAFV Eligible"
            : "CAFV Not Eligible",
          value,
        }));

      const vehiclesByYear = Object.entries(yearCount)
        .map(([year, count]) => ({ year: Number(year), count }))
        .sort((a, b) => a.year - b.year);

      const vehiclesByMake = Object.entries(makeCount)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10); // Get top 10 makes

      // Convert object into array format for plotting
      const vehiclesByCompanyAndYear = Object.entries(companyYearData).map(
        ([company, years]) => {
          const minYear = 1998;
          const maxYear = 2024;
          const completeData = [];

          for (let year = minYear; year <= maxYear; year++) {
            completeData.push({ year, count: years[year] || 0 });
          }

          return { company, data: completeData };
        }
      );

      set({
        evData: parsedData,

        totalVehicles: parsedData.length-1,
        totalBEV,
        totalPHEV,
        averageElectricRange,
        topCAFV,
        vehiclesByYear,
        vehiclesByMake,
        vehiclesByCompanyAndYear,
        isFetching: false,
        modelTableData,
        cityTop,
        countryTop,
        cityEvAdoption,
        productionTrendYrbasis,bevPhevTrend,cityTotal
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      console.log(parsedData[b4Error])
      set({ isFetching: false });
    }
  },
}));
