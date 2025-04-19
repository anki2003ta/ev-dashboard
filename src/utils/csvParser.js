import Papa from "papaparse";

export async function fetchEVData() {
  try {
    const response = await fetch("/Electric_Vehicle_Population_Data.csv");
    const csvText = await response.text();

    const parsedData = await new Promise((resolve) => {
      Papa.parse(csvText, {
        header: true, // Treat the first row as headers
        dynamicTyping: true, // Automatically detect numbers, booleans, etc.
        complete: (results) => resolve(results.data),
      });
    });

    return parsedData;
  } catch (error) {
    console.error("Error fetching EV data:", error);
    return [];
  }
}
