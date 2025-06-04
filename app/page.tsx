'use client';

import { useState } from 'react';
import FilterPanel from '@/components/FilterPanel';
import BreweryTable from '@/components/BreweryTable';
import SearchBar from '@/components/SearchBar';

export default function HomePage() {
  // State to hold filter values (by name and city)
  const [filters, setFilters] = useState({ name: '', city: '' });

  return (
    <div className="flex w-full max-w-6xl mx-auto h-screen">
      <main className="flex-1 overflow-y-auto p-6 pb-40 bg-[#F9F9F9]">
        <div className="flex flex-col gap-6">

          {/* Positioning for SearchBar and FilterPanel side by side and on top of BreweryTable */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
            <SearchBar />
            <FilterPanel onFilter={setFilters} />
          </div>

          {/* Brewery list rendered based on active filters */}
          <BreweryTable {...filters} />
        </div>
      </main>
    </div>
  );
}
