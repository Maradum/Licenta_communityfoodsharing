'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function EditListingPage() {
  const { id } = useParams();
  const router = useRouter();

  const [listing, setListing] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);

  // Fetch listing data from backend
  useEffect(() => {
    const fetchListing = async () => {
      const res = await fetch(`/api/listings/${id}`);
      const data = await res.json();
      setListing(data);
      setLoading(false);
    };
    fetchListing();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setListing({ ...listing, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/listings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(listing),
    });
    router.push('/dashboard');
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={listing.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Title"
        />
        <textarea
          name="description"
          value={listing.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Description"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
}
