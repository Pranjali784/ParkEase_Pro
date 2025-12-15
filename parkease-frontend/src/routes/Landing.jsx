import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <section className="flex-grow flex items-center justify-center bg-white">
      <div className="max-w-6xl text-center px-6 py-32">
        {/* HEADLINE */}
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
          FIND.BOOK.PARK
        </h1>

        {/* SUBTITLE */}
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          A smart, location-aware parking platform that helps drivers find
          nearby parking and enables owners to share available spaces —
          instantly and securely.
        </p>

        {/* CTA */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/signin")}
            className="bg-black text-white px-10 py-4 rounded-full text-lg font-medium hover:opacity-90 transition"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/services")}
            className="bg-gray-100 text-black px-10 py-4 rounded-full text-lg font-medium hover:bg-gray-200 transition"
          >
            View Parking
          </button>
        </div>

        {/* TRUST LINE */}
        <p className="mt-16 text-sm text-gray-400">
          Built with Spring Boot · React · MySQL · Radar API
        </p>
      </div>
    </section>
  );
}
