import { useEffect, useState } from "react";
import api from "../api/axios";
import OSMMap from "../components/OSMMap";
import OSMAutocomplete from "../components/OSMAutocomplete";

export default function Services() {
  const [spots, setSpots] = useState([]);
  const [location, setLocation] = useState(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

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

  const handleLocationSelect = ({ latitude, longitude }) => {
    if (typeof latitude !== "number" || typeof longitude !== "number") return;
    
    setLocation({ lat: latitude, lon: longitude });

    api
      .get("/parking-spaces/search", {
        params: { lat: latitude, lon: longitude },
      })
      .then((res) => setSpots(res.data.spots || []))
      .catch(() => setError("Failed to load parking spaces"));
  };

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

        <div className="flex flex-col gap-3 relative z-50">
          <OSMAutocomplete
            placeholder="Search a location or landmark..."
            onSelection={handleLocationSelect}
          />
        </div>

        {location && (
          <div className="z-0">
            <OSMMap
              latitude={location.lat}
              longitude={location.lon}
              spots={spots}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[35vh] overflow-auto">
          {spots.map((s) => (
            <div key={s.id} className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold">{s.address}</h3>
              <p className="text-sm text-gray-500">{s.vehicleTypes}</p>
              {s.pricePerHour && (
                <p className="text-sm font-semibold text-green-600 mt-1">
                  Est. Rate: ${s.pricePerHour}/hr
                </p>
              )}
            </div>
          ))}
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
