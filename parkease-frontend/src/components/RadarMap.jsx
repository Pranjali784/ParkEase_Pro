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
      !mapRef.current
    ) {
      return;
    }

    const key = import.meta.env.VITE_RADAR_PUBLISHABLE_KEY;
    if (!key) return;

    // prevent double init
    if (mapInstance.current) return;

    Radar.initialize(key);

    try {
      mapInstance.current = Radar.ui.map({
        container: mapRef.current,
        center: [longitude, latitude],
        zoom: 14,
      });

      Radar.ui
        .marker({
          coordinates: [longitude, latitude],
          text: "You are here",
        })
        .addTo(mapInstance.current);
    } catch (e) {
      console.error("Radar map error:", e);
    }

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, [latitude, longitude]);

  return (
    <div className="w-full h-[420px] rounded-xl overflow-hidden border shadow">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
