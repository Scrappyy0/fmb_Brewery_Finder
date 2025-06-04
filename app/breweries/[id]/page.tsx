import { notFound } from 'next/navigation';
import BackButton from '@/components/BackButton';

// Type for brewery data
type Brewery = {
  id: string;
  name: string;
  website_url: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  latitude: string;
  longitude: string;
};

// ✅ Correct props typing via Next.js App Router convention
interface BreweryPageProps {
  params: { id: string };
}

// Fetch brewery data
async function getBrewery(id: string): Promise<Brewery | null> {
  const res = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

// ✅ Vercel-compatible component export with correct props structure
export default async function BreweryDetailsPage({ params }: BreweryPageProps) {
  const brewery = await getBrewery(params.id);
  if (!brewery) return notFound();

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-6 bg-white text-black overflow-y-auto">
      <div className="bg-white shadow-md rounded-xl p-6 border space-y-6">
        <BackButton />
        <h1 className="text-3xl font-bold">{brewery.name}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><strong>Street:</strong> {brewery.street || 'N/A'}</div>
          <div><strong>City:</strong> {brewery.city}</div>
          <div><strong>State:</strong> {brewery.state || 'N/A'}</div>
          <div><strong>Postal Code:</strong> {brewery.postal_code || 'N/A'}</div>
          <div><strong>Country:</strong> {brewery.country}</div>
          <div>
            <strong>Website:</strong>{' '}
            {brewery.website_url ? (
              <a href={brewery.website_url} target="_blank" className="text-blue-600 underline">
                Visit site
              </a>
            ) : (
              'N/A'
            )}
          </div>
        </div>

        {brewery.latitude && brewery.longitude ? (
          <iframe
            className="w-full h-64 rounded-lg border"
            loading="lazy"
            allowFullScreen
            src={`https://maps.google.com/maps?q=${brewery.latitude},${brewery.longitude}&z=15&output=embed`}
          />
        ) : (
          <p>Map not available.</p>
        )}
      </div>
    </div>
  );
}
