import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex-grow flex items-center justify-center">
      {/* MODIFICATION:
        The grid layout is changed to 'flex flex-col' for centering.
        The "Location-based discovery" box has been removed.
      */}
      <div className="mx-auto max-w-7xl px-5 py-20 flex flex-col items-center text-center">

        {/* Text Content */}
        <div>
          <h1 className="text-6xl font-bold text-black mb-6 leading-tight">
            Find. Book. Park.
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
            A location-aware parking network connecting space owners and
            drivers in real time.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/signin")}
              className="bg-black text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-800"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/services")}
              className="bg-gray-200 text-black px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-300"
            >
              Try Live Search
            </button>
          </div>
        </div>

        {/* This is where the other grid item used to be. It's now gone. */}

      </div>
    </div>
  );
}