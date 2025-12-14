import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.accessToken);
      navigate("/services");
    } catch {
      setError("Invalid email or password");
    }
  };

  const googleSuccess = async (cred) => {
    try {
      const res = await api.post("/auth/google", {
        idToken: cred.credential,
      });
      login(res.data.accessToken);
      navigate("/services");
    } catch {
      setError("Google login failed on the server");
    }
  };

  return (
    <div className="auth-card">
      <h2>Sign In</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={submit}>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>

      <GoogleLogin onSuccess={googleSuccess} />
    </div>
  );
}
