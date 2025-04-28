'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Listing {
  id: number;
  title: string;
  description: string;
  category?: string;
  location?: string;
  status?: string;
  createdAt?: string;
  expiresAt?: string;
}

export default function EditListingPage() {
  const { id } = useParams();
  const router = useRouter();

  const [listing, setListing] = useState<Listing>({
    id: 0,
    title: '',
    description: '',
    category: '',
    location: '',
    status: '',
    createdAt: '',
    expiresAt: '',
  });

  const [loading, setLoading] = useState(true);

  // Fetch listing data
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listings/${id}`);
        if (res.ok) {
          const data = await res.json();
          setListing({
            id: data.id || 0,
            title: data.title || '',
            description: data.description || '',
            category: data.category || '',
            location: data.location || '',
            status: data.status || '',
            createdAt: data.createdAt || '',
            expiresAt: data.expiresAt || '',
          });
        } else {
          console.error('Failed to fetch listing');
        }
      } catch (error) {
        console.error('Error fetching listing:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchListing();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setListing((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listing),
      });

      if (res.ok) {
        router.push('/dashboard');
      } else {
        console.error('Failed to update listing');
      }
    } catch (error) {
      console.error('Error updating listing:', error);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Listing</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={listing.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            id="description"
            name="description"
            value={listing.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

