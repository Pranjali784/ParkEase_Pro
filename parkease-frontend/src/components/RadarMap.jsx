import { useEffect, useRef } from "react";
import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";

export default function RadarMap({ latitude = 12.92, longitude = 80.13 }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const radarKey = import.meta.env.VITE_RADAR_PUBLISHABLE_KEY;
    console.log("Radar key:", radarKey);
    console.log("Radar key:", import.meta.env.VITE_RADAR_PUBLISHABLE_KEY);
    if (!radarKey) return;

    Radar.initialize(radarKey);

    if (mapRef.current) {
      const map = Radar.ui.map({
        container: mapRef.current,
        style: "radar-dark",
        center: [longitude, latitude],
        zoom: 15,
      });

      Radar.ui.marker({
        coordinates: [longitude, latitude],
        text: "Parking Spot",
      }).addTo(map);
    }
  }, [latitude, longitude]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    />
  );
}
