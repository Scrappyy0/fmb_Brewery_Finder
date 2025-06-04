'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Brewery = {
  id: string;
  name: string;
  brewery_type: string;
  city: string;
  country: string;
  website_url: string;
  phone: string;
};

type Props = {
  name?: string;
  city?: string;
};

// ✅ Move this outside to avoid re-declaring it every render
async function fetchBreweryData(
  page: number,
  name: string,
  city: string,
  setBreweries: React.Dispatch<React.SetStateAction<Brewery[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsLoading(true);

  const queryParams = new URLSearchParams({
    per_page: '15',
    page: page.toString(),
  });

  if (name) queryParams.append('by_name', name);
  if (city) queryParams.append('by_city', city);

  const res = await fetch(`https://api.openbrewerydb.org/v1/breweries?${queryParams.toString()}`);
  const data = await res.json();

  setBreweries(data);
  setIsLoading(false);
}

export default function BreweryTable({ name = '', city = '' }: Props) {
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // ✅ No more ESLint warning
  useEffect(() => {
    fetchBreweryData(page, name, city, setBreweries, setIsLoading);
  }, [page, name, city]);

  useEffect(() => {
    setPage(1);
  }, [name, city]);

  // ... rest of your code stays the same


  return (
    <div className="mt-6">
      {isLoading ? (
        // Loading state with skeleton cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="bg-[#faedcd] animate-pulse rounded-lg p-5 shadow-md"
            >
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        // Brewery cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {breweries.map((brewery) => (
            <div
              key={brewery.id}
              className="bg-[#faedcd] text-black shadow-md rounded-lg p-5 hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{brewery.name}</h2>
                <p><strong>Type:</strong> {brewery.brewery_type}</p>
                <p><strong>City:</strong> {brewery.city}</p>
                <p><strong>Country:</strong> {brewery.country}</p>
                <p>
                  <strong>Website:</strong>{' '}
                  {brewery.website_url ? (
                    <a
                      href={brewery.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                      onClick={(e) => e.stopPropagation()} // Prevent card click
                    >
                      Click here to visit
                    </a>
                  ) : (
                    'N/A'
                  )}
                </p>
              </div>

              {/* Footer with phone + details button */}
              <div className="flex justify-between items-center mt-4">
                <p><strong>Phone:</strong> {brewery.phone || 'N/A'}</p>
                <button
                  onClick={() => router.push(`/breweries/${brewery.id}`)}
                  className="bg-[#0079c2] text-white px-3 py-1 rounded text-sm hover:bg-gray-100 cursor-pointer transition"
                >
                  More Info
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination controls */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="bg-[#0079c2] px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-10"
        >
          Previous
        </button>
        <span className="self-center text-black">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="bg-[#0079c2] px-4 py-2 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
