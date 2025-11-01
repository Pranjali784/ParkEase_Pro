import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const VITE_API_BASE = import.meta.env.VITE_API_BASE;

export default function Profile() {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError("Not authenticated");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch user profile
        const userRes = await fetch(`${VITE_API_BASE}/users/me`, { headers });
        if (!userRes.ok) throw new Error("Could not fetch user profile.");
        const userData = await userRes.json();
        setUser(userData);

        // Fetch user's parking spaces
        const spacesRes = await fetch(`${VITE_API_BASE}/parking-spaces/my-spaces`, { headers });
        if (!spacesRes.ok) throw new Error("Could not fetch parking spaces.");
        const spacesData = await spacesRes.json();
        setSpaces(spacesData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">Error: {error}</div>;
  }

  return (
      <div className="flex-grow max-w-4xl mx-auto py-12 px-5">
        {/* ... (h1, user info div are unchanged) ... */}

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">My Parking Spaces</h2>
          {spaces.length > 0 ? (
            <div className="space-y-4">
              {spaces.map((space) => (
                <div key={space.id} className="p-4 border border-gray-200 rounded-md bg-gray-50">
                  <p className="font-bold text-lg">{space.address}</p>
                  {/* --- MODIFIED LINE --- */}
                  <p className="text-sm text-gray-600">
                    {space.vehicleTypes} {space.modelType ? `(${space.modelType})` : ''} | {space.capacity} spot(s)
                  </p>
                  <p className="text-sm text-gray-600">
                    {space.availableFrom} - {space.availableTo}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>You have not added any parking spaces yet.</p>
          )}
        </div>
      </div>
    );
  }