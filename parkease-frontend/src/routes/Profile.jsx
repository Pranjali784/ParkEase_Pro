import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [spaces, setSpaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const userRes = await api.get("/users/me");
      const spacesRes = await api.get("/parking-spaces/my-spaces");
      setUser(userRes.data);
      setSpaces(spacesRes.data || []);
    };
    load();
  }, []);

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      {/* USER CARD */}
      <div className="bg-white rounded-xl shadow p-6 flex items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-xl font-semibold">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h1 className="text-xl font-semibold">{user.name}</h1>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 shadow">
          <p className="text-gray-500 text-sm">Total Parking Spots</p>
          <p className="text-2xl font-semibold">{spaces.length}</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <p className="text-gray-500 text-sm">Account Type</p>
          <p className="text-2xl font-semibold">Owner</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow flex items-center">
          <button
            onClick={() => navigate("/add-park")}
            className="bg-black text-white px-6 py-2 rounded-lg w-full"
          >
            + Add Parking
          </button>
        </div>
      </div>

      {/* PARKING LIST */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Parking Spaces</h2>

        {spaces.length === 0 && (
          <p className="text-gray-500">
            You haven’t added any parking spaces yet.
          </p>
        )}

        {spaces.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{s.address}</p>
              <p className="text-sm text-gray-500">{s.vehicleTypes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
