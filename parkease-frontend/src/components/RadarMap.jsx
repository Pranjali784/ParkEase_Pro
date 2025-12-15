import { useEffect, useRef } from "react";
import Radar from "radar-sdk-js";
import { initRadar } from "../utils/initRadar";
import "radar-sdk-js/dist/radar.css";

export default function RadarMap({ latitude, longitude }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (
      mapInstance.current ||
      typeof latitude !== "number" ||
      typeof longitude !== "number" ||
      !mapRef.current
    ) {
      return;
    }

    initRadar();

    const map = Radar.ui.map({
      container: mapRef.current,
      center: [longitude, latitude],
      zoom: 14,
    });

    Radar.ui.marker({
      coordinates: [longitude, latitude],
      color: "#ffffff",
    }).addTo(map);

    mapInstance.current = map;
  }, [latitude, longitude]);

  return (
    <div className="w-full h-[420px] rounded-xl overflow-hidden border bg-gray-900 shadow-lg">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
