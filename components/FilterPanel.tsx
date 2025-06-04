
'use client';

import { useState } from 'react';

type Props = {
  // Callback to send current filters back to parent component
  onFilter: (filters: { name: string; city: string }) => void;
};

export default function FilterPanel({ onFilter }: Props) {
  // Local state for the name filter input
  const [name, setName] = useState('');
  // Local state for the city filter input
  const [city, setCity] = useState('');

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Input for filtering by name */}
      <input
        type="text"
        placeholder="Filter by Name"
        className="border border-black text-black px-3 py-2 rounded w-full sm:w-48"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {/* Input for filtering by city */}
      <input
        type="text"
        placeholder="Filter by City"
        className="border border-black text-black px-3 py-2 rounded w-full sm:w-48"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {/* Input search button */}
      <button
        className="bg-[#0079c2] text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-300 cursor-pointer"
        onClick={() => onFilter({ name, city })}
      >
        Search
      </button>
    </div>
  );
}
