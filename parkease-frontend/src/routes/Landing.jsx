import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <section className="h-[calc(100vh-64px)] overflow-hidden flex items-center justify-center bg-white">
      <div className="max-w-7xl w-full px-6 text-center">

        <h1 className="text-[64px] md:text-[72px] font-extrabold tracking-tight text-black mb-6">
          FIND.BOOK.PARK
        </h1>

        <p className="text-[18px] md:text-[20px] text-gray-600 max-w-2xl mx-auto mb-14 leading-relaxed">
          Discover nearby parking and share available spaces in real time using
          location intelligence.
        </p>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center bg-gray-100 rounded-full px-6 py-4 shadow-sm">
            <span className="text-gray-400 mr-3">📍</span>
            <input
              placeholder="Tambaram Station, Guduvancheri Station"
              className="flex-grow bg-transparent outline-none text-black"
              onFocus={() => navigate("/services")}
            />
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/signin")}
            className="bg-black text-white px-10 py-4 rounded-full"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/services")}
            className="bg-gray-100 px-10 py-4 rounded-full"
          >
            View Parking
          </button>
        </div>

        <p className="mt-20 text-sm text-gray-400">
          Powered by Spring Boot · React · MySQL · Radar API
        </p>
      </div>
    </section>
  );
}
