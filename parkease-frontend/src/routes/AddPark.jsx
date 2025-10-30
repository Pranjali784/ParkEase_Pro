import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Radar from "radar-sdk-js";
// --- REMOVED react-time-picker imports ---

const VITE_API_BASE = import.meta.env.VITE_API_BASE;
const VITE_RADAR_KEY = import.meta.env.VITE_RADAR_PUBLISHABLE_KEY;

export default function AddPark() {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [vehicleTypes, setVehicleTypes] = useState("");
  const [modelType, setModelType] = useState("");

  // --- REVERTED state to simple strings ---
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const autocompleteRef = useRef(null);
  const radarInitialized = useRef(false);

  useEffect(() => {
    if (radarInitialized.current) {
      return;
    }
    radarInitialized.current = true;

    if (!VITE_RADAR_KEY) {
      console.error("Radar key is missing");
      setError("Failed to load address search.");
      return;
    }
    Radar.initialize(VITE_RADAR_KEY);

    if (autocompleteRef.current) {
      Radar.ui.autocomplete({
        container: autocompleteRef.current,
        placeholder: "Search for your address or place...",
        layers: ['place', 'address'],
        near: {
          latitude: 13.0827,  // Chennai Latitude
          longitude: 80.2707 // Chennai Longitude
        },
        onSelection: (result) => {
          const { formattedAddress, latitude, longitude } = result;
          setAddress(formattedAddress);
          setLatitude(latitude);
          setLongitude(longitude);

          const input = autocompleteRef.current.querySelector('input');
          if (input) {
            input.value = formattedAddress;
          }
        },
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("You must be logged in to add a space.");
      setLoading(false);
      navigate("/signin");
      return;
    }

    if (!availableFrom || !availableTo || !vehicleTypes || !address || !latitude || !longitude) {
      setError("Please fill out all fields, including selecting an address from the list.");
      setLoading(false);
      return;
    }

    const payload = {
      address,
      latitude,
      longitude,
      vehicleTypes,
      modelType,
      availableFrom,
      availableTo,
    };

    try {
      const res = await fetch(`${VITE_API_BASE}/parking-spaces`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to add parking space.");
      }

      alert("Parking space added successfully!");
      navigate("/services");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectStyle = "w-full px-4 py-3 bg-transparent border-b-2 border-orange-400 text-white text-lg focus:outline-none focus:border-orange-300";

  // --- NEW STYLE FOR TIME INPUT ---
  // This style will make the browser's built-in clock icon visible
  const timeInputStyle = "w-full px-4 py-3 bg-transparent border-b-2 border-orange-400 text-white text-lg focus:outline-none focus:border-orange-300";

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4" style={{ background: "#1a1a1a" }}>
      <div className="w-full max-w-lg p-10 rounded-xl" style={{ background: "rgba(0,0,0,0.3)" }}>
        <h1 className="text-4xl font-bold text-white mb-8 text-left">
          ADD YOUR PARKING INFO
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-red-900 text-red-100 border border-red-700 rounded-md">
              {error}
            </div>
          )}

          <p className="text-gray-300 text-sm">
            Your registered name will be automatically set as the owner.
          </p>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Address</label>
            <div ref={autocompleteRef} id="address-autocomplete" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Vehicle Type</label>
            <select
              value={vehicleTypes}
              onChange={(e) => setVehicleTypes(e.target.value)}
              className={selectStyle}
              style={{ backgroundColor: "#333" }}
            >
              <option value="">Select a vehicle type</option>
              <option value="Car">Car</option>
              <option value="Bike">Bike / Motorcycle</option>
              <option value="Van">Van / Truck</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Model Type (Optional)</label>
            <select
              value={modelType}
              onChange={(e) => setModelType(e.target.value)}
              className={selectStyle}
              style={{ backgroundColor: "#333" }}
            >
              <option value="">Select a model</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Mini-SUV">Mini-SUV</option>
              <option value="Motorcycle">Motorcycle</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* --- REVERTED to <input type="time"> --- */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Available From</label>
              <input
                type="time"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
                className={timeInputStyle}
                style={{ colorScheme: "dark" }} // Hint for dark mode clock
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Available To</label>
              <input
                type="time"
                value={availableTo}
                onChange={(e) => setAvailableTo(e.target.value)}
                className={timeInputStyle}
                style={{ colorScheme: "dark" }} // Hint for dark mode clock
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-8 bg-orange-500 text-black text-lg font-bold rounded-lg shadow-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}