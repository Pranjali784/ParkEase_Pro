import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <section className="flex-grow bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Find. Book. Park.
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            A real-time, location-aware parking platform connecting drivers
            and space owners seamlessly.
          </p>

          <div className="mt-10 flex gap-4">
            <button
              onClick={() => navigate("/signin")}
              className="bg-black text-white px-8 py-3 rounded-full text-lg hover:bg-gray-800"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/services")}
              className="border border-gray-300 px-8 py-3 rounded-full text-lg hover:bg-gray-100"
            >
              Live Search
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="h-[420px] rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500">
          Live Map Preview
        </div>
      </div>
    </section>
  );
}
