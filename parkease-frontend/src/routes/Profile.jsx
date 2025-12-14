import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const load = async () => {
      const userRes = await api.get("/users/me");
      const spacesRes = await api.get("/parking-spaces/my-spaces");

      setUser(userRes.data);
      setSpaces(spacesRes.data);
    };
    load();
  }, []);

  return (
    <div className="p-6">
      <h1>{user?.name}</h1>
      {spaces.map((s) => (
        <div key={s.id}>{s.address}</div>
      ))}
    </div>
  );
}
