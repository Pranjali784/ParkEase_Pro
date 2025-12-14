import React, { useState } from "react";
import api from "../api/axios";

export default function Services() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async () => {
    try {
      setLoading(true);
      setError(null);

      // TEMP default location (Chennai)
      const lat = 13.0827;
      const lon = 80.2707;

      const res = await api.get("/parking-spaces/search", {
        params: { lat, lon },
      });

      setSpots(res.data.spots || []);
    } catch (e) {
      setError("Failed to load parking spaces");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Find Parking</h1>

      <button
        onClick={search}
        className="mb-4 px-6 py-2 bg-black text-white rounded"
      >
        Search Parking
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {spots.length === 0 && !loading && !error && (
        <div className="text-center text-gray-500 mb-4">
          Search a location to find nearby parking spaces
        </div>
      )}

      {spots.map((s) => (
        <div
          key={s.id}
          className="border rounded p-3 mb-2 bg-white"
        >
          <p className="font-semibold">{s.address}</p>
          <p className="text-sm text-gray-600">
            {s.vehicleTypes} | {s.availableFrom} – {s.availableTo}
          </p>
        </div>
      ))}
    </div>
  );
}
