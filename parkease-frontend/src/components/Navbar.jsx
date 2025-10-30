import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home after logout
  };

  // Base link style
  const linkStyle = "text-base text-gray-600 hover:text-black";
  // Active link style
  const activeLinkStyle = "text-base text-black font-medium";

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
      {/* Increased padding: py-5 */}
      <div className="mx-auto max-w-7xl px-5 py-5 flex items-center justify-between">

        {/* Increased logo size: text-3xl */}
        <Link to="/" className="text-3xl font-semibold tracking-wide text-black">
          ParkEase
        </Link>

        {/* Increased gap: gap-10 */}
        <div className="flex items-center gap-10 text-base">
          <Link
            className={pathname === "/" ? activeLinkStyle : linkStyle}
            to="/"
          >
            Home
          </Link>
          <Link
            className={pathname === "/services" ? activeLinkStyle : linkStyle}
            to="/services"
          >
            Services
          </Link>
          <Link
            className={pathname === "/add-park" ? activeLinkStyle : linkStyle}
            to="/add-park"
          >
            Add Park
          </Link>

          {/* DYNAMIC AUTH LINKS */}
          {isAuthenticated ? (
            <>
              <Link
                className={pathname === "/profile" ? activeLinkStyle : linkStyle}
                to="/profile"
              >
                Profile
              </Link>
              {/* Increased button size: px-6 py-2.5 and text-base */}
              <button
                onClick={handleLogout}
                className="rounded-full bg-red-600 text-white px-6 py-2.5 text-base font-medium hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Increased button size: px-6 py-2.5 and text-base */}
              <button
                onClick={() => navigate("/signin")}
                className="rounded-full bg-black text-white px-6 py-2.5 text-base font-medium hover:bg-gray-800"
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