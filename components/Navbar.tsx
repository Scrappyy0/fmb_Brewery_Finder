
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="w-full p-4 bg-white shadow-md">
        {/* Image for navbar present throughout site */}
  <div className="max-w-6xl mx-auto flex items-center">
    <Image
      src="/images/FMB.png"
      alt="Next.js Logo"
      width={90}
      height={40}
      priority
    />
    <h1 className="text-2xl text-black font-bold ml-4">FMB Brewery Directory</h1>
  </div>
</nav>

  );
}
