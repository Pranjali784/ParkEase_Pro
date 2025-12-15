import { useEffect, useState } from "react";
import api from "../api/axios";
import RadarMap from "../components/RadarMap";

export default function Services() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(false);

  // Default location (Bangalore)
  const lat = 12.9716;
  const lon = 77.5946;

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        setLoading(true);
        const res = await api.get("/parking-spaces/search", {
          params: { lat, lon },
        });
        setSpots(res.data.spots || []);
      } finally {
        setLoading(false);
      }
    };

    fetchSpots();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">

      {/* MAP */}
      <RadarMap latitude={lat} longitude={lon} />

      {/* RESULTS */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Nearby Parking</h2>

        {loading && <p>Loading parking spaces...</p>}

        {!loading && spots.length === 0 && (
          <p className="text-gray-500">No parking spaces found.</p>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {spots.map((s) => (
            <div
              key={s.id}
              className="border rounded-xl p-4 hover:shadow-md transition"
            >
              <p className="font-medium">{s.address}</p>
              <p className="text-sm text-gray-500">
                {s.vehicleTypes}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
