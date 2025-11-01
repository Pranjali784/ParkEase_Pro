import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google"; // <-- This is correct

const VITE_API_BASE = import.meta.env.VITE_API_BASE;

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/services";

  // Handler for Manual Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${VITE_API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Login failed. Check email or password.");
      }

      const data = await res.json();
      login(data.accessToken);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // --- MODIFIED GOOGLE HANDLER ---
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    setLoading(true);
    setError(null);

    // Send the ID Token (credential) to the backend
    const googleIdToken = credentialResponse.credential;

    try {
      const res = await fetch(`${VITE_API_BASE}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send the ID token, not an access token
        body: JSON.stringify({ idToken: googleIdToken }),
      });

      if (!res.ok) {
        throw new Error("Google login failed on the server.");
      }

      const data = await res.json();
      login(data.accessToken);
      navigate(from, { replace: true });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginError = () => {
    setError("Google login failed. Please try again.");
  };

  return (
    <div
      className="flex-grow flex items-center justify-center py-12 px-4"
      style={{ background: "#222" }}
    >
      <div className="relative w-full max-w-md mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-orange-400 rounded-xl shadow-2xl transform -rotate-3"></div>

        <div className="relative bg-white text-black p-8 rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>

          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="remember" className="ml-2 text-gray-600">
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="font-medium text-red-600 hover:text-red-500"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:from-red-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or With</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                  useOneTap={false}
                  // --- REMOVED flow="implicit" ---
                />
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-red-600 hover:text-red-500"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}