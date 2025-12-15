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
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-6">
        <h2 className="text-2xl font-semibold text-center">Sign in</h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            placeholder="Email"
            className="input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-black text-white py-3 rounded-lg">
            Login
          </button>
        </form>

        <div className="flex justify-center">
          <GoogleLogin onSuccess={googleSuccess} />
        </div>
      </div>
    </div>
  );
}
