import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Radar from "radar-sdk-js";
import api from "../api/axios";

const VITE_RADAR_KEY = import.meta.env.VITE_RADAR_PUBLISHABLE_KEY;

export default function AddPark() {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [vehicleTypes, setVehicleTypes] = useState("");
  const [modelType, setModelType] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const autocompleteRef = useRef(null);
  const radarInitialized = useRef(false);

  useEffect(() => {
    if (radarInitialized.current) return;
    radarInitialized.current = true;

    Radar.initialize(VITE_RADAR_KEY);

    Radar.ui.autocomplete({
      container: autocompleteRef.current,
      placeholder: "Search address...",
      layers: ["place", "address"],
      near: { latitude: 13.0827, longitude: 80.2707 },
      onSelection: ({ formattedAddress, latitude, longitude }) => {
        setAddress(formattedAddress);
        setLatitude(latitude);
        setLongitude(longitude);
      },
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post("/parking-spaces", {
        address,
        latitude,
        longitude,
        vehicleTypes,
        modelType,
        availableFrom,
        availableTo,
      });

      alert("Parking space added!");
      navigate("/services");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add parking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
        {error && <div className="text-red-500">{error}</div>}
        <div ref={autocompleteRef} />
        <select value={vehicleTypes} onChange={(e) => setVehicleTypes(e.target.value)}>
          <option value="">Vehicle</option>
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
        </select>
        <input type="time" value={availableFrom} onChange={(e) => setAvailableFrom(e.target.value)} />
        <input type="time" value={availableTo} onChange={(e) => setAvailableTo(e.target.value)} />
        <button disabled={loading}>{loading ? "Saving..." : "Submit"}</button>
      </form>
    </div>
  );
}
