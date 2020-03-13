import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const SimpleMap = ({position_center, marker_massage}) => {
  const _position = (position_center) ? position_center : [20.678416, -101.354231];
  const _message = (marker_massage) ? marker_massage : 'Zincri Mendoza'; 
  
  return (
    <Map center={_position} zoom={13} style={{ width: "100%", height: "100vh" }}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={_position}>
        <Popup>
          {_message}
        </Popup>
      </Marker>
    </Map>
  );
};
export default SimpleMap;