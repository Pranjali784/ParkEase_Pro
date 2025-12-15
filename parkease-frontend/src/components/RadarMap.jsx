import { useEffect, useRef } from "react";
import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";
import { initRadar } from "../utils/radar";

export default function RadarMap({ latitude, longitude }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (
      typeof latitude !== "number" ||
      typeof longitude !== "number" ||
      !mapRef.current ||
      mapInstance.current
    ) {
      return;
    }

    initRadar();

    // ✅ Create map ONCE
    mapInstance.current = Radar.ui.map({
      container: mapRef.current,
      center: [longitude, latitude],
      zoom: 14,
    });

    Radar.ui.marker({
      coordinates: [longitude, latitude],
      color: "#ffffff",
    }).addTo(mapInstance.current);
  }, [latitude, longitude]);

  return (
    <div className="relative w-full h-[420px] rounded-xl overflow-hidden border bg-gray-900 shadow-lg">
      <div ref={mapRef} className="w-full h-full" />
      {/* Dark overlay for Uber-like contrast */}
      <div className="pointer-events-none absolute inset-0 bg-black/25" />
    </div>
  );
}
