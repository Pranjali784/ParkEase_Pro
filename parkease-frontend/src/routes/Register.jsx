import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", { name, email, password });
    navigate("/signin");
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Register</h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          placeholder="Name"
          className="w-full border p-2"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          className="w-full border p-2"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-black text-white py-2">
          Register
        </button>
      </form>
    </div>
  );
}
