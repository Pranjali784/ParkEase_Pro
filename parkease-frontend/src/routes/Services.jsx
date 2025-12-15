import { useEffect, useState } from "react";
import api from "../api/axios";
import RadarMap from "../components/RadarMap";

export default function Services() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setLocation({ lat, lon });

        try {
          const res = await api.get("/parking-spaces/search", {
            params: { lat, lon },
          });
          setSpots(res.data.spots || []);
        } catch {
          setError("Failed to load parking spaces");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location access denied");
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Nearby Parking Spaces</h1>

      {loading && <p>Loading parking spaces…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {location && (
        <RadarMap latitude={location.lat} longitude={location.lon} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {spots.map((s) => (
          <div
            key={s.id}
            className="border rounded-lg p-4 bg-white shadow"
          >
            <h3 className="font-semibold">{s.address}</h3>
            <p className="text-sm text-gray-600">
              {s.vehicleTypes}
            </p>
          </div>
        ))}
      </div>

      {spots.length === 0 && !loading && (
        <p className="mt-4 text-gray-500">
          No parking spaces found nearby.
        </p>
      )}
    </div>
  );
}
