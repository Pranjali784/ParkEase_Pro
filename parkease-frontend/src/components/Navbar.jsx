import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          ParkEase
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/services">Services</Link>

          {isAuthenticated && (
            <Link
              to="/add-park"
              className="px-4 py-1.5 rounded-lg border hover:bg-gray-100"
            >
              Add Parking
            </Link>
          )}

          {isAuthenticated ? (
            <>
              <Link to="/profile">Profile</Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="text-sm text-gray-600 hover:text-black"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register">Register</Link>
              <button
                onClick={() => navigate("/signin")}
                className="bg-black text-white px-4 py-1.5 rounded-lg"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
