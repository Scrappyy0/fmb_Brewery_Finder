'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useDebounce from '@/app/hooks/useDebounce';

// Type for brewery suggestions returned from the API
type BrewerySuggestion = {
  id: string;
  name: string;
};

export default function SearchBar() {
  // Track user input and search suggestions
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<BrewerySuggestion[]>([]);
  const router = useRouter();

  // Debounce input to reduce API calls while typing
  const debouncedTerm = useDebounce(searchTerm, 250);

  // Fetch suggestions when the debounced term changes
  useEffect(() => {
    if (!debouncedTerm) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      const res = await fetch(
        `https://api.openbrewerydb.org/v1/breweries/autocomplete?query=${debouncedTerm}`
      );
      const data = await res.json();
      setSuggestions(data);
    };

    fetchSuggestions();
  }, [debouncedTerm]);

  return (
    <div className="relative max-w-md mb-6">
      {/* Search input */}
      <input
        type="text"
        placeholder="🔎 Search Breweries..."
        className="border border-black text-black px-4 py-2 w-full rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Autocomplete suggestion list */}
      {suggestions.length > 0 && (
        <ul className="absolute text-black bg-white shadow-lg border rounded w-full z-10 max-h-60 overflow-y-auto">
          {suggestions.map((brewery) => (
            <li
              key={brewery.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => router.push(`/breweries/${brewery.id}`)}
            >
              {brewery.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
