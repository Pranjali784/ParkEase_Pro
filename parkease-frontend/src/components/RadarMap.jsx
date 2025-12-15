import { useEffect, useRef } from "react";
import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";

export default function RadarMap({ latitude, longitude }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const key = import.meta.env.VITE_RADAR_PUBLISHABLE_KEY;
    if (!key || !mapRef.current) return;

    Radar.initialize(key);

    const map = Radar.ui.map({
      container: mapRef.current,
      style: "radar-light",
      center: [longitude, latitude],
      zoom: 14,
    });

    Radar.ui.marker({
      coordinates: [longitude, latitude],
      text: "You are here",
    }).addTo(map);
  }, [latitude, longitude]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[400px] rounded-xl shadow mb-6"
    />
  );
}
