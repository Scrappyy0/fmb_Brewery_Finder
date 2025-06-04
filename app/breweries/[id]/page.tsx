import { notFound } from 'next/navigation';

export default async function BreweryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) return notFound();

  const brewery = await res.json();

  return (
    <div>
      <h1>{brewery.name}</h1>
      <p>
        {brewery.city}, {brewery.country}
      </p>
    </div>
  );
}
