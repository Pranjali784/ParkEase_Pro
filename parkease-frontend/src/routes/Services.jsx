import { useState, useRef, useEffect } from "react";
import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";

const API_BASE = import.meta.env.VITE_API_BASE;
const RADAR_KEY = import.meta.env.VITE_RADAR_PUBLISHABLE_KEY;

export default function Services() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const autocompleteRef = useRef(null);
  const initialized = useRef(false);

  const [spots, setSpots] = useState([]);
  const [selectedLat, setSelectedLat] = useState(null);
  const [selectedLon, setSelectedLon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ---------------- INIT MAP + AUTOCOMPLETE ---------------- */
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    Radar.initialize(RADAR_KEY);

    mapInstance.current = Radar.ui.map({
      container: mapRef.current,
      style: "radar-dark-v1",
      center: [80.1275, 12.9249], // Tambaram default
      zoom: 11,
    });

    Radar.ui.autocomplete({
      container: autocompleteRef.current,
      placeholder:
        "Search eg: Tambaram Station, Guduvancheri Station",
      layers: ["place", "address"],
      near: { latitude: 12.9249, longitude: 80.1275 },

      onSelection: ({ formattedAddress, latitude, longitude }) => {
        setSelectedLat(latitude);
        setSelectedLon(longitude);

        const input =
          autocompleteRef.current.querySelector("input");
        if (input) input.value = formattedAddress;

        handleSearch(null, latitude, longitude);
      },
    });
  }, []);

  /* ---------------- SEARCH HANDLER ---------------- */
  const handleSearch = async (e, lat = selectedLat, lon = selectedLon) => {
    if (e) e.preventDefault();
    if (!lat || !lon) {
      setError("Please select a location");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_BASE}/parking-spaces/search?lat=${lat}&lon=${lon}`
      );
      const data = await res.json();

      // clear old markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      if (!data.spots || data.spots.length === 0) {
        setSpots([]);
        setError("No parking spaces found");
        return;
      }

      setSpots(data.spots);

      // ✅ ONE MARKER PER ROW (NO GROUPING)
      data.spots.forEach((spot) => {
        const popup = Radar.ui.popup({
          html: `
            <div style="font-size:14px">
              <strong>${spot.address}</strong><br/>
              ${spot.vehicleTypes} ${spot.modelType || ""}<br/>
              Capacity: ${spot.capacity}<br/>
              ${spot.availableFrom} - ${spot.availableTo}
            </div>
          `,
        });

        const marker = Radar.ui
          .marker({ color: "#007AFF", size: 28 })
          .setLngLat([spot.longitude, spot.latitude])
          .setPopup(popup)
          .addTo(mapInstance.current);

        markersRef.current.push(marker);
      });

      mapInstance.current.flyTo({
        center: [lon, lat],
        zoom: 14,
      });
    } catch (err) {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="flex-grow flex flex-col w-full max-w-6xl mx-auto px-5 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Find Parking
      </h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <div ref={autocompleteRef} className="flex-grow" />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-md"
        >
          {loading ? "..." : "Search"}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
          {error}
        </div>
      )}

      {/* ✅ MAP SIZE FIXED HERE */}
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "420px",
          borderRadius: "12px",
          overflow: "hidden",
        }}
        className="mb-6"
      />

      {/* LIST VIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {spots.map((spot) => (
          <div
            key={spot.id}
            className="border rounded-lg p-4 cursor-pointer hover:bg-blue-50"
            onClick={() =>
              mapInstance.current.flyTo({
                center: [spot.longitude, spot.latitude],
                zoom: 16,
              })
            }
          >
            <h3 className="font-semibold">{spot.address}</h3>
            <p>
              {spot.vehicleTypes} | {spot.capacity} spots
            </p>
            <p className="text-sm text-gray-600">
              {spot.availableFrom} - {spot.availableTo}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
