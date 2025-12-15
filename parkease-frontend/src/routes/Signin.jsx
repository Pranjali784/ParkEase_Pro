import { useState } from "react";
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

  const googleSuccess = async (response) => {
    const res = await api.post("/auth/google", {
      idToken: response.credential,
    });
    login(res.data.accessToken);
    navigate("/services");
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-gray-50">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow space-y-6">
        <h2 className="text-2xl font-semibold text-center">
          Sign in to ParkEase
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            className="input"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-black text-white py-3 rounded-lg">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin onSuccess={googleSuccess} />
        </div>
      </div>
    </div>
  );
}
