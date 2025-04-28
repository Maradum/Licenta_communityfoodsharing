'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Listing {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  status: string;
  createdAt: string;
  expiresAt: string;
}

export default function ViewListingPage() {
  const { id } = useParams();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await fetch(`/api/listings/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch listing');
        }
        const data = await res.json();
        setListing(data);
      } catch (error) {
        console.error('Error fetching listing:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchListing();
    }
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;

  if (!listing) return <div className="p-4">Listing not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{listing.title}</h1>
      <p className="mb-2"><strong>Description:</strong> {listing.description}</p>
      <p className="mb-2"><strong>Category:</strong> {listing.category}</p>
      <p className="mb-2"><strong>Location:</strong> {listing.location}</p>
      <p className="mb-2"><strong>Status:</strong> {listing.status}</p>
      <p className="mb-2"><strong>Created At:</strong> {new Date(listing.createdAt).toLocaleString()}</p>
      <p className="mb-2"><strong>Expires At:</strong> {new Date(listing.expiresAt).toLocaleString()}</p>
    </div>
  );
}

