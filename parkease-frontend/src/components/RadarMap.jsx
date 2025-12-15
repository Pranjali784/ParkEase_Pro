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

    mapInstance.current = Radar.ui.map({
      container: mapRef.current,
      center: [longitude, latitude],
      zoom: 14,
    });

    Radar.ui.marker({
      coordinates: [longitude, latitude],
      color: "#000000",
    }).addTo(mapInstance.current);

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, [latitude, longitude]);

  return (
    <div className="w-full h-[420px] rounded-xl overflow-hidden border bg-gray-900 shadow-lg">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
