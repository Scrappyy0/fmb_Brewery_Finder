import './globals.css';
import Navbar from '@/components/Navbar'; 

// Site metadata info
export const metadata = {
  title: 'FMB FindMyBrewery',
  description: 'Discover all greatest breweries around the world and near you!',
  keywords: ['brewery', 'FMB', 'beer', 'craft beer', 'grog'],
  authors: [{ name: 'Dylan' }],
};

// Navbar Positioning
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='rounded-lg shadow-lg overflow-hidden'>
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}