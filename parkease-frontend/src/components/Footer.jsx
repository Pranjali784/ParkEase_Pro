export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 py-8 text-center text-sm text-gray-500">
      <div className="mx-auto max-w-7xl px-5">
        © {new Date().getFullYear()} ParkEase — Spring Boot • React • MySQL • Radar
      </div>
    </footer>
  );
}