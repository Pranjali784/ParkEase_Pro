import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix default Leaflet icon issue in React
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Red Icon for actual parking spots
const parkingIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Sub-component to re-center the map when coordinates update
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function OSMMap({ latitude, longitude, spots = [] }) {
  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return (
      <div className="w-full h-[420px] rounded-xl flex items-center justify-center bg-gray-200 border text-gray-500 shadow-inner">
        Map Unavailable
      </div>
    );
  }

  const center = [latitude, longitude];

  return (
    <div className="w-full h-[420px] rounded-xl overflow-hidden border shadow-lg relative z-0">
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <ChangeView center={center} zoom={14} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Render the searched location marker in blue */}
        <Marker position={center}>
          <Popup>Searched Area</Popup>
        </Marker>

        {/* Render all surrounding parking spaces in green */}
        {spots.map((spot) => (
          spot.latitude && spot.longitude && (
            <Marker 
              key={spot.id} 
              position={[spot.latitude, spot.longitude]} 
              icon={parkingIcon}
            >
              <Popup>
                <div className="text-sm">
                  <h3 className="font-bold text-gray-900">{spot.address}</h3>
                  <p className="text-gray-600 my-1">{spot.vehicleTypes}</p>
                  {spot.pricePerHour && (
                    <p className="text-green-600 font-semibold mt-1">Est. Rate: ${spot.pricePerHour}/hr</p>
                  )}
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
}