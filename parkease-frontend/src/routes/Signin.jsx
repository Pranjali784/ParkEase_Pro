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
    <div>
      <form onSubmit={submit}>
        <input onChange={(e) => setEmail(e.target.value)} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button>Login</button>
      </form>

      <GoogleLogin onSuccess={googleSuccess} />
    </div>
  );
}
