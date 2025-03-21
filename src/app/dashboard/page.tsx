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
  createdAt: string;
  expiresAt: string;
}

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log("UserDashboard component mounted");
    
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data from /api/auth/verify");
        const response = await fetch('/api/auth/verify');
        
        if (!response.ok) {
          console.error("Auth verification failed with status:", response.status);
          throw new Error('Not authenticated');
        }
        
        const data = await response.json();
        console.log("User data received:", data);
        setUser(data.user);
      } catch (err) {
        console.error("Authentication error:", err);
        console.log("Redirecting to login page");
        router.push('/login');
        return false;
      }
      return true;
    };

    const fetchListings = async () => {
      try {
        console.log("Fetching listings");
        const response = await fetch('/api/listings/my-listings');
        
        if (!response.ok) {
          console.error("Failed to fetch listings with status:", response.status);
          throw new Error('Failed to fetch listings');
        }
        
        const data = await response.json();
        console.log("Listings data received:", data);
        setListings(data.listings);
      } catch (err) {
        console.error("Listings error:", err);
        setError('Failed to load listings');
      }
    };

    const loadData = async () => {
      setLoading(true);
      const isAuthenticated = await fetchUserData();
      
      if (isAuthenticated) {
        await fetchListings();
      }
      
      setLoading(false);
    };

    loadData();
  }, [router]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* User Info Section */}
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

      {/* Quick Actions */}
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

      {/* My Listings Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">My Listings</h2>
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