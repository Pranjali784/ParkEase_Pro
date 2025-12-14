import React, { useEffect, useRef, useState } from "react";
import Radar from "radar-sdk-js";
import api from "../api/axios";

export default function Services() {
  const [spots, setSpots] = useState([]);

  const search = async (lat, lon) => {
    const res = await api.get("/parking-spaces/search", {
      params: { lat, lon },
    });
    setSpots(res.data.spots);
  };

  return (
    <div>
      {spots.map((s) => (
        <div key={s.id}>{s.address}</div>
      ))}
    </div>
  );
}
