import React, { useEffect } from "react";
import { CircleMarker, MapContainer, TileLayer, Tooltip, useMap,} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { scaleSqrt } from "d3-scale";
import { useStore } from "../store/fetchAll";

// Color scale for EV density
const colorScale = scaleSqrt()
  .domain([100, 50000])
  .range(["#84cc16", "#d97706", "#dc2626"]);

  const SetView = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
  };

const EVCityMap = () => {
  const { cityTotal: cityEVData = [] } = useStore();
  const defaultCenter = [ 47.61036, -122.30839];
  const defaultZoom = 6.5;

  return (
    <div className="relative bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700">
      <h2 className="text-lg font-semibold text-gray-100 text-center mb-4">
        EV Distribution by City
      </h2>
      <MapContainer  center={[37.8, -96]} zoom={4} className="h-[500px] w-full rounded-lg">
      <SetView center={defaultCenter} zoom={defaultZoom} />
        <TileLayer
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=nzOS3ztYuFXYB3JneTHO"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
        
        {cityEVData
          .filter(({ latitude, longitude,value: count}) => latitude !== undefined && longitude !== undefined && count >0)
          .map(({ city, latitude, longitude, value: count },index) => (
            <CircleMarker
              key={index}
              center={[latitude, longitude]}
              radius={Math.sqrt(count) / 20}
              fillColor={colorScale(count)}
              color={colorScale(count)}
              weight={1}
              fillOpacity={0.8}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                <span><strong>{city}</strong> {count} EVs</span>
              </Tooltip>
            </CircleMarker>
          ))}
      </MapContainer>
    </div>
  );
};

export default EVCityMap;

// import React from 'react'
// import { useStore } from '../store/fetchAll';
// import { scaleSqrt } from "d3-scale";
// // import { MapContainer, TileLayer,} from "react-leaflet";
// import { MapContainer, TileLayer } from 'react-leaflet'
// import "leaflet/dist/leaflet.css";
// // Color scale for EV density
// const colorScale = scaleSqrt()
//   .domain([100, 50000])
//   .range(["#84cc16", "#d97706", "#dc2626"]);

  
  
//   const EVCityMap = () => {
//   const { cityTotal: cityEVData = [] } = useStore();
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default EVCityMap

