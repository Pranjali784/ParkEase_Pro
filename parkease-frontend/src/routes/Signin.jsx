import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", { email, password });
    login(res.data.accessToken);
    navigate("/services");
  };

  const googleSuccess = async (cred) => {
    const res = await api.post("/auth/google", {
      idToken: cred.credential,
    });
    login(res.data.accessToken);
    navigate("/services");
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Login</h2>

      <form onSubmit={submit} className="space-y-4 mb-6">
        <input
          placeholder="Email"
          className="w-full border p-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-black text-white py-2">
          Login
        </button>
      </form>

      <GoogleLogin onSuccess={googleSuccess} />
    </div>
  );
}
