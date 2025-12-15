import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <section className="flex-grow flex items-center justify-center bg-white">
      <div className="max-w-7xl w-full px-6 py-28 text-center">

        {/* HEADLINE */}
        <h1 className="text-[64px] md:text-[72px] font-extrabold tracking-tight text-black mb-6">
          FIND.BOOK.PARK
        </h1>

        {/* SUBTEXT */}
        <p className="text-[18px] md:text-[20px] text-gray-600 max-w-2xl mx-auto mb-14 leading-relaxed">
          A location-aware parking platform that helps drivers discover nearby
          parking and enables owners to share available spaces in real time.
        </p>

        {/* SEARCH BAR (UBER STYLE) */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center bg-gray-100 rounded-full px-6 py-4 shadow-sm">
            <span className="text-gray-400 mr-3">📍</span>
            <input
              type="text"
              placeholder="Enter your location"
              className="flex-grow bg-transparent outline-none text-[16px] text-black placeholder-gray-400"
              onFocus={() => navigate("/services")}
            />
          </div>

          <p className="text-sm text-gray-400 mt-3 text-left pl-2">
            Try searching a location to see available parking nearby
          </p>
        </div>

        {/* CTA BUTTONS */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/signin")}
            className="bg-black text-white px-10 py-4 rounded-full text-[16px] font-medium hover:opacity-90 transition"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/services")}
            className="bg-gray-100 text-black px-10 py-4 rounded-full text-[16px] font-medium hover:bg-gray-200 transition"
          >
            View Parking
          </button>
        </div>

        {/* TRUST FOOTER */}
        <p className="mt-20 text-sm text-gray-400">
          Powered by Spring Boot · React · MySQL · Radar API
        </p>
      </div>
    </section>
  );
}
