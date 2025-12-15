import { useEffect, useRef } from "react";
import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";

export default function RadarMap({ latitude, longitude }) {
  const mapRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    Radar.initialize(import.meta.env.VITE_RADAR_PUBLISHABLE_KEY);

    const map = Radar.ui.map({
      container: mapRef.current,
      style: "radar-default-v1",
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
      className="w-full h-[420px] rounded-2xl overflow-hidden shadow"
    />
  );
}
