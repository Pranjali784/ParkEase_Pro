import { useEffect, useRef, useState } from "react";
import Radar from "radar-sdk-js";
import api from "../api/axios";
import RadarMap from "../components/RadarMap";

export default function Services() {
  const [spots, setSpots] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const searchRef = useRef(null);
  const radarReady = useRef(false);

  useEffect(() => {
    const key = import.meta.env.VITE_RADAR_PUBLISHABLE_KEY;
    if (!key) {
      console.error("Radar key missing");
      return;
    }

    // ✅ Prevent double init / null ref
    if (!searchRef.current || radarReady.current) return;

    radarReady.current = true;
    Radar.initialize(key);

    Radar.ui.autocomplete({
      container: searchRef.current,
      placeholder: "Search location...",
      onSelection: async ({ latitude, longitude }) => {
        // ✅ SAFETY CHECK (CRITICAL)
        if (
          typeof latitude !== "number" ||
          typeof longitude !== "number"
        ) {
          console.warn("Radar selection missing coordinates");
          return;
        }

        setLocation({ lat: latitude, lon: longitude });

        try {
          const res = await api.get("/parking-spaces/search", {
            params: { lat: latitude, lon: longitude },
          });
          setSpots(res.data.spots || []);
        } catch {
          setError("Failed to load parking spaces");
        }
      },
    });

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => setError("Location permission denied")
    );
  }, []);

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">

        <h1 className="text-3xl font-bold">Nearby Parking</h1>

        {/* SEARCH BAR */}
        <div
          ref={searchRef}
          className="border rounded-lg px-4 py-3 bg-white shadow"
        />

        {/* MAP */}
        {location && (
          <RadarMap
            latitude={location.lat}
            longitude={location.lon}
          />
        )}

        {/* RESULTS (internal scroll if needed) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-auto max-h-[35vh] pr-2">
          {spots.map((s) => (
            <div
              key={s.id}
              className="bg-white border rounded-xl p-4 shadow"
            >
              <h3 className="font-semibold">{s.address}</h3>
              <p className="text-sm text-gray-500">{s.vehicleTypes}</p>
            </div>
          ))}
        </div>

        {spots.length === 0 && !error && (
          <p className="text-gray-500">No parking spaces found.</p>
        )}

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
