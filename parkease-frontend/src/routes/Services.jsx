import { useState, useRef, useEffect } from "react";
import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";

const VITE_API_BASE = import.meta.env.VITE_API_BASE;
const VITE_RADAR_KEY = import.meta.env.VITE_RADAR_PUBLISHABLE_KEY;

export default function Services() {
  const [selectedLat, setSelectedLat] = useState(null);
  const [selectedLon, setSelectedLon] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const autocompleteRef = useRef(null);
  const radarInitialized = useRef(false);

  useEffect(() => {
    if (radarInitialized.current) {
      return;
    }
    radarInitialized.current = true;

    if (!VITE_RADAR_KEY) {
      setError("Failed to load map: Missing API key.");
      return;
    }
    Radar.initialize(VITE_RADAR_KEY);

    // Initialize Map
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = Radar.ui.map({
        container: mapRef.current,
        style: "radar-light-v1",
        center: [80.27, 13.08],
        zoom: 10,
      });
    }

    // Initialize Autocomplete
    if (autocompleteRef.current) {
      Radar.ui.autocomplete({
        container: autocompleteRef.current,
        placeholder: "Search for a location (e.g., Tambaram)",
        layers: ['place', 'address'],
        near: {
          latitude: 13.0827,
          longitude: 80.2707
        },
        onSelection: (result) => {
          const { formattedAddress, latitude, longitude } = result;
          setSelectedLat(latitude);
          setSelectedLon(longitude);

          const input = autocompleteRef.current.querySelector('input');
          if (input) input.value = formattedAddress;
        },
      });
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!selectedLat || !selectedLon) {
      setError("Please select a location from the list.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${VITE_API_BASE}/parking-spaces/search?lat=${selectedLat}&lon=${selectedLon}`
      );

      if (!res.ok) {
        throw new Error(`Search failed (${res.status})`);
      }

      const data = await res.json();

      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      if (!data.center || data.spots.length === 0) {
        setError("No parking spots found near that location.");
        if (data.center) {
           mapInstance.current.flyTo({
            center: [data.center.longitude, data.center.latitude],
            zoom: 14,
          });
        }
        return;
      }

      // --- MODIFIED JITTER LOGIC ---
      // Increased jitter from 0.0001 to 0.0008 (about ~90 meters)
      // This will make markers spread out more.
      const jitterAmount = 0.0008;
      const coordinateMap = new Map();

      for (const spot of data.spots) {
        const {
          id, address, latitude, longitude,
          vehicleTypes, modelType,
          capacity, availableFrom, availableTo,
        } = spot;

        const originalLat = parseFloat(latitude);
        const originalLon = parseFloat(longitude);

        let finalLat = originalLat;
        let finalLon = originalLon;

        const coordKey = `${originalLat},${originalLon}`;
        if (coordinateMap.has(coordKey)) {
          // Apply a random jitter
          finalLat = originalLat + (Math.random() - 0.5) * jitterAmount;
          finalLon = originalLon + (Math.random() - 0.5) * jitterAmount;
        }
        coordinateMap.set(coordKey, true);

        const popupHTML = `
          <div style="font-family: sans-serif; font-size: 14px; color: #333;">
            <strong style="font-size: 16px;">${address}</strong>
            <p>Type: ${vehicleTypes} ${modelType ? `(${modelType})` : ''} | Spots: ${capacity}</p>
            <p>Time: ${availableFrom} - ${availableTo}</p>
            <a href="/parking/${id}" style="color: #007bff; text-decoration: none;">View Details</a>
          </div>
        `;

        const popup = Radar.ui.popup({ html: popupHTML });

        const marker = Radar.ui.marker({ color: "#007AFF", size: 30 })
          .setLngLat([finalLon, finalLat])
          .setPopup(popup)
          .addTo(mapInstance.current);

        markersRef.current.push(marker);
      }
      // -------------------------

      mapInstance.current.flyTo({
        center: [data.center.longitude, data.center.latitude],
        zoom: 14,
      });

    } catch (err) {
      console.error(err);
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow w-full max-w-5xl mx-auto px-5 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Find Parking</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <div ref={autocompleteRef} className="flex-grow" />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-500"
        >
          {loading ? "..." : "Search"}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-md mb-4 text-center">
          {error}
        </div>
      )}

      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "600px",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#e5e5e5",
        }}
      />
    </div>
  );
}