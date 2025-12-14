import { useState } from "react";
import api from "../api/axios";

export default function Services() {
  const [spots, setSpots] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const search = async (lat, lon) => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/parking-spaces/search", {
        params: { lat, lon },
      });
      setSpots(res.data.spots);
    } catch {
      setError("Failed to load parking spaces");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

      {spots.length === 0 && !loading && !error && (
        <p>Search a location to find nearby parking spaces</p>
      )}

      {spots.map((s) => (
        <div key={s.id}>{s.address}</div>
      ))}
    </div>
  );
}
