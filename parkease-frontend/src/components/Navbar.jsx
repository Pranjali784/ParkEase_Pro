import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="border-b p-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">ParkEase</Link>

      <div className="flex gap-6 items-center">
        <Link to="/services">Services</Link>

        {isAuthenticated ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={() => { logout(); navigate("/"); }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <button
              onClick={() => navigate("/signin")}
              className="bg-black text-white px-4 py-1 rounded"
            >
              Get Started
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
