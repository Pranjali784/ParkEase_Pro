import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Radar from "radar-sdk-js";
import api from "../api/axios";

export default function AddPark() {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [vehicleTypes, setVehicleTypes] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const key = import.meta.env.VITE_RADAR_PUBLISHABLE_KEY;
    if (!key) return;

    Radar.initialize(key);

    Radar.ui.autocomplete({
      container: searchRef.current,
      placeholder: "Search parking location...",
      onSelection: ({ formattedAddress, latitude, longitude }) => {
        setAddress(formattedAddress);
        setLatitude(latitude);
        setLongitude(longitude);
      },
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/parking-spaces", {
        address,
        latitude,
        longitude,
        vehicleTypes,
        availableFrom,
        availableTo,
      });
      navigate("/profile");
    } catch {
      setError("Failed to add parking space");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-gray-50">
      <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow space-y-6">
        <h2 className="text-2xl font-semibold text-center">
          Add Parking Space
        </h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={submit} className="space-y-4">
          {/* LOCATION */}
          <div
            ref={searchRef}
            className="border rounded-lg px-4 py-3"
          />

          {/* VEHICLE */}
          <select
            className="input"
            value={vehicleTypes}
            onChange={(e) => setVehicleTypes(e.target.value)}
            required
          >
            <option value="">Select Vehicle Type</option>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
          </select>

          {/* TIME */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="time"
              className="input"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
              required
            />
            <input
              type="time"
              className="input"
              value={availableTo}
              onChange={(e) => setAvailableTo(e.target.value)}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            {loading ? "Saving..." : "Add Parking"}
          </button>
        </form>
      </div>
    </div>
  );
}
