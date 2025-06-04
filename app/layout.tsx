import './globals.css';
import Navbar from '@/components/Navbar'; // adjust path as needed

export const metadata = {
  title: 'FMB FindMyBrewery',
  description: 'Discover all greatest breweries around the world and near you!',
  keywords: ['brewery', 'FMB', 'beer', 'craft beer', 'grog'],
  authors: [{ name: 'Dylan' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='bg-[#F5F5F5] rounded-lg shadow-lg overflow-hidden'>
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}