'use client'; // This is a client-side component

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter(); // Hook for navigation

  return (
    // Button that navigates back to the previous page
    <button
      onClick={() => router.back()}
      className="text-white font-weight: 500 mb-6 px-4 py-2 bg-[#0079c2] hover:bg-gray-300 rounded"
    >
      ← Back
    </button>
  );
}