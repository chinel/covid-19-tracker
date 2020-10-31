import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataMap } from "./utils";

const Map = ({ countries, casesType, zoom, center }) => {
  return (
    <div className="map">
      <LeafletMap zoom={zoom} center={center}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/**Loop through all the countries and display the covid cases for each countries */}
        {showDataMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
};

export default Map;
