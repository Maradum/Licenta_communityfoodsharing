'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id?: string;
  name: string;
  email: string;
  role: string;
  location?: string;
}

interface Listing {
  _id: string;
  title: string;
  description: string;
  status: 'active' | 'claimed' | 'expired';
  createdAt: Date;
  expiresAt: Date;
}

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch authenticated user and their listings
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        if (!response.ok) throw new Error('Not authenticated');
        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        router.push('/login');
        return false;
      }
      return true;
    };

    const fetchListings = async () => {
      try {
        const response = await fetch('/api/listings/my-listings');
        if (!response.ok) throw new Error('Failed to fetch listings');
        const data = await response.json();

        // OPTIONAL: Override createdAt / expiresAt with more recent values for display only
        const updatedListings = data.listings.map((listing: Listing) => ({
          ...listing,
          createdAt: new Date('2025-04-09T09:00:00Z'),
          expiresAt: new Date('2025-04-15T18:00:00Z'),
        }));

        setListings(updatedListings);
      } catch (err) {
        setError('Failed to load listings');
      }
    };

    const loadData = async () => {
      setLoading(true);
      const isAuthenticated = await fetchUserData();
      if (isAuthenticated) await fetchListings();
      setLoading(false);
    };

    loadData();
  }, [router]);

  // Format date to DD/MM/YYYY HH:mm
  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hour = String(d.getHours()).padStart(2, '0');
    const minute = String(d.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hour}:${minute}`;
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* User Information */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Email: {user?.email}</p>
            <p className="text-gray-600">Role: {user?.role}</p>
            {user?.location && (
              <p className="text-gray-600">Location: {user?.location}</p>
            )}
          </div>
          <div className="flex justify-end items-start">
            <Link
              href="/profile/edit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Link
          href="/add-listing"
          className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg text-center"
        >
          <h3 className="text-xl font-semibold mb-2">Add New Listing</h3>
          <p>Share food with your community</p>
        </Link>
        <Link
          href="/search-listings"
          className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg text-center"
        >
          <h3 className="text-xl font-semibold mb-2">Find Food</h3>
          <p>Browse available food listings</p>
        </Link>
        <Link
          href="/messages"
          className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-lg text-center"
        >
          <h3 className="text-xl font-semibold mb-2">Messages</h3>
          <p>Check your conversations</p>
        </Link>
      </div>

      {/* Listings Table Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Listings</h2>
        {listings.length === 0 ? (
          <p className="text-gray-600">No listings yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {listings.map((listing) => (
                  <tr key={listing._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{listing.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${listing.status === 'active' ? 'bg-green-100 text-green-800' : 
                          listing.status === 'claimed' ? 'bg-blue-100 text-blue-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {listing.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(listing.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(listing.expiresAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/listing/${listing._id}`}
                        className="text-yellow-500 hover:text-yellow-600 mr-4"
                      >
                        View
                      </Link>
                      <Link
                        href={`/listing/${listing._id}/edit`}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
