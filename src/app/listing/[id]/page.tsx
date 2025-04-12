'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ViewListingPage() {
  const { id } = useParams();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listings/${id}`);
        if (!res.ok) throw new Error('Failed to fetch listing');
        const data = await res.json();
        setListing(data);
      } catch (error) {
        console.error('Error loading listing:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!listing) return <div className="p-4 text-red-500">Listing not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
      <p className="mb-2 text-gray-700">{listing.description}</p>
      <p><strong>Location:</strong> {listing.location}</p>
      <p><strong>Category:</strong> {listing.category}</p>
      <p><strong>Status:</strong> {listing.status}</p>
      <p><strong>Created At:</strong> {new Date(listing.createdAt).toLocaleString()}</p>
      <p><strong>Expires At:</strong> {new Date(listing.expiresAt).toLocaleString()}</p>
    </div>
  );
}
