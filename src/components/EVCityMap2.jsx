import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { scaleSqrt } from "d3-scale";
import { useStore } from "../store/fetchAll";

// Color scale for EV density
const colorScale = scaleSqrt()
  .domain([100, 50000]) // Adjust based on max count
  .range(["#84cc16", "#d97706", "#dc2626"]); // Green to red gradient

const EVCityMap2 = () => {
  const { cityTotal: cityEVData = [] } = useStore();
  const [tooltip, setTooltip] = useState({ visible: false, city: "", count: 0, x: 0, y: 0 });

  return (
    <div className="relative bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700">
      <h2 className="text-lg font-semibold text-gray-100 text-center mb-4">
        EV Distribution by City
      </h2>

      <ComposableMap projection="geoAlbersUsa" width={800} height={500}>
        <ZoomableGroup zoom={1} minZoom={1} maxZoom={15}>
          <Geographies geography="https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1F2937"
                  stroke="#4B5563"
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#374151" },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Plot each city as a circle */}
          {cityEVData
            .filter(({ latitude, longitude }) => latitude !== undefined && longitude !== undefined)
            .map(({ city, latitude, longitude, value: count }) => (
              <Marker key={city} coordinates={[longitude, latitude]}>
                <circle
                  r={Math.sqrt(count) / 20}
                  fill={colorScale(count)}
                  stroke="#fff"
                  strokeWidth={1}
                  onMouseEnter={(e) =>
                    setTooltip({
                      visible: true,
                      city,
                      count,
                      x: e.pageX,
                      y: e.pageY,
                    })
                  }
                  onMouseLeave={() => setTooltip({ visible: false })}
                />
              </Marker>
            ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip for city info */}
      {tooltip.visible && (
        <div
          className="absolute bg-gray-900 text-white p-2 rounded shadow-md text-sm"
          style={{
            left: `${tooltip.x + 10}px`,
            top: `${tooltip.y + 10}px`,
            pointerEvents: "none",
          }}
        >
          <strong>{tooltip.city}</strong>: {tooltip.count} EVs
        </div>
      )}
    </div>
  );
};

export default EVCityMap2;
