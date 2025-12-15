import { useEffect, useRef, useState } from "react";
import Radar from "radar-sdk-js";
import api from "../api/axios";
import RadarMap from "../components/RadarMap";
import { initRadar } from "../utils/initRadar";

export default function Services() {
  const [spots, setSpots] = useState([]);
  const [location, setLocation] = useState(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const searchRef = useRef(null);
  const radarReady = useRef(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await api.get("/parking-spaces/search-by-text", {
        params: { q: query },
      });
      setSpots(res.data.spots || []);
    } catch {
      setError("Failed to search location");
    }
  };

  useEffect(() => {
    if (!searchRef.current || radarReady.current) return;

    radarReady.current = true;
    initRadar();

    Radar.ui.autocomplete({
      container: searchRef.current,
      placeholder: "Tambaram Station, Guduvancheri Station",
      onSelection: ({ latitude, longitude }) => {
        if (
          typeof latitude !== "number" ||
          typeof longitude !== "number"
        ) {
          return;
        }

        setLocation({ lat: latitude, lon: longitude });

        api
          .get("/parking-spaces/search", {
            params: { lat: latitude, lon: longitude },
          })
          .then((res) => setSpots(res.data.spots || []))
          .catch(() => setError("Failed to load parking spaces"));
      },
    });
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        }),
      () => setError("Location permission denied")
    );
  }, []);

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
        <h1 className="text-3xl font-bold">Nearby Parking</h1>

        <div className="flex gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Tambaram Station, Guduvancheri Station"
            className="flex-1 px-5 py-3 rounded-lg border"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-black text-white rounded-lg"
          >
            Enter
          </button>
        </div>

        <div
          ref={searchRef}
          className="border rounded-lg px-4 py-3 bg-white shadow"
        />

        {location && (
          <RadarMap
            latitude={location.lat}
            longitude={location.lon}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[35vh] overflow-auto">
          {spots.map((s) => (
            <div key={s.id} className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold">{s.address}</h3>
              <p className="text-sm text-gray-500">{s.vehicleTypes}</p>
            </div>
          ))}
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
