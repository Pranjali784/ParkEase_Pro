import { useState, useEffect } from "react";

export default function OSMAutocomplete({ onSelection, placeholder }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Basic debounce
    const timerId = setTimeout(() => {
      if (query.trim().length > 2) {
        setLoading(true);
        // Direct call to Nominatim open-source free geocoding API
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&countrycodes=in&limit=5`)
          .then((res) => res.json())
          .then((data) => {
            setResults(data || []);
            setLoading(false);
          })
          .catch(() => {
            setResults([]);
            setLoading(false);
          });
      } else {
        setResults([]);
      }
    }, 600); // 600ms debounce to respect the API limits

    return () => clearTimeout(timerId);
  }, [query]);

  const handleSelect = (r) => {
    setQuery(r.display_name);
    setResults([]);
    onSelection({
      formattedAddress: r.display_name,
      latitude: parseFloat(r.lat),
      longitude: parseFloat(r.lon),
    });
  };

  return (
    <div className="relative w-full z-10">
      <input
        type="text"
        className="w-full px-4 py-3 border rounded-lg shadow-sm outline-none focus:ring-2 bg-white"
        placeholder={placeholder || "Search location..."}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      {loading && <p className="absolute right-4 top-3 text-sm text-gray-400">Loading...</p>}

      {results.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white border rounded-lg max-h-60 overflow-y-auto shadow-xl z-50">
          {results.map((r, i) => (
            <li
              key={i}
              onClick={() => handleSelect(r)}
              className="px-4 py-3 hover:bg-black hover:text-white cursor-pointer text-sm truncate transition-colors"
            >
              {r.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}