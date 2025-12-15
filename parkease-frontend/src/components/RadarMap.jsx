import { useEffect, useRef } from "react";
import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";

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

    const key = import.meta.env.VITE_RADAR_PUBLISHABLE_KEY;
    if (!key) return;

    Radar.initialize(key);

    // ✅ NO style property (Radar default only)
    mapInstance.current = Radar.ui.map({
      container: mapRef.current,
      center: [longitude, latitude],
      zoom: 14,
    });

    Radar.ui
      .marker({
        coordinates: [longitude, latitude],
        color: "#ffffff", // bright marker for contrast
      })
      .addTo(mapInstance.current);

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, [latitude, longitude]);

  return (
    <div className="relative w-full h-[420px] rounded-xl overflow-hidden border bg-gray-900 shadow-lg">

      {/* MAP */}
      <div ref={mapRef} className="w-full h-full" />

      {/* DARK OVERLAY (Uber-style look) */}
      <div className="pointer-events-none absolute inset-0 bg-black/20" />
    </div>
  );
}
