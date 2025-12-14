import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // 🔐 NORMAL LOGIN
  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", { email, password });
    login(res.data.accessToken);
    navigate("/services");
  };

  // 🔥 GOOGLE LOGIN (THIS IS THE ONLY THING THAT MUST HAPPEN)
  const googleSuccess = async (response) => {
    try {
      const idToken = response.credential;

      const res = await api.post("/auth/google", {
        idToken: idToken,
      });

      login(res.data.accessToken);
      navigate("/services");
    } catch (err) {
      console.error("Google login failed", err);
      alert("Google login failed");
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      {/* ✅ NO REDIRECT, NO BACKEND OAUTH */}
      <GoogleLogin
        onSuccess={googleSuccess}
        onError={() => alert("Google Login Failed")}
      />
    </div>
  );
}
