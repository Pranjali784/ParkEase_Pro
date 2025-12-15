import { useEffect, useRef } from "react";
import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";

export default function RadarMap({ latitude, longitude }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!latitude || !longitude || !mapRef.current) return;

    const key = import.meta.env.VITE_RADAR_PUBLISHABLE_KEY;
    if (!key) return;

    Radar.initialize(key);

    const map = Radar.ui.map({
      container: mapRef.current,
      style: "radar-light",
      center: [longitude, latitude],
      zoom: 14,
    });

    Radar.ui
      .marker({
        coordinates: [longitude, latitude],
        text: "You are here",
      })
      .addTo(map);

    return () => map.remove();
  }, [latitude, longitude]);

  return (
    <div className="w-full h-[420px] rounded-xl overflow-hidden shadow border">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
