import Image from "next/image";
import Link from 'next/link';
import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/Card';

const mockListings = [
  {
    id: '1',
    title: 'Fresh Vegetables',
    description: 'Carrots, broccoli, spinach from local farm.',
    expiry: '1 day',
    location: 'London',
    postedBy: 'Donor User 1',
    imageUrl: '/images/vegetables.jpg'
  },
  {
    id: '2',
    title: 'Baked Goods',
    description: 'Bread, pastries from local bakery.',
    expiry: '3 days',
    location: 'Manchester',
    postedBy: 'Donor User 2',
    imageUrl: '/images/bakery.jpg'
  }
] as const;

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-yellow-400 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Share food to receive love.
              </h1>
              <p className="text-xl text-gray-800 mb-8">
                Join our community in reducing food waste and helping those in need across the UK.
              </p>
              <div className="space-x-4">
                <Link href="/add-listing">
                  <Button size="lg">
                    Share Food
                  </Button>
                </Link>
                <Link href="/search-listings">
                  <Button variant="outline" size="lg">
                    Find Food
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/hero-image.png"
                alt="Community Food Sharing"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Listings Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Recent Food Listings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockListings.map((listing) => (
              <Card
                key={listing.id}
                {...listing}
              >
                <Button size="sm" variant="secondary">
                  View Details
                </Button>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/search-listings">
              <Button variant="outline" size="lg">
                View All Listings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">List Your Food</h3>
              <p className="text-gray-600">
                Share your surplus food with the community.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">
                Match with people who need your food.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share</h3>
              <p className="text-gray-600">
                Arrange pickup and share the food.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
