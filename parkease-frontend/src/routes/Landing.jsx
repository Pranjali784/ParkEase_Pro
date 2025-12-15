import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <section className="flex-grow flex items-center justify-center bg-gray-50">
      <div className="max-w-5xl text-center px-6">
        <h1 className="text-6xl font-bold mb-6">
          Smart Parking. Simplified.
        </h1>

        <p className="text-lg text-gray-600 mb-10">
          Find and book nearby parking spaces in real-time using location intelligence.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/signin")}
            className="bg-black text-white px-8 py-3 rounded-full text-lg"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/services")}
            className="border px-8 py-3 rounded-full text-lg"
          >
            View Parking
          </button>
        </div>
      </div>
    </section>
  );
}
