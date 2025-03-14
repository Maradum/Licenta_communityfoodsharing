'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Textarea, Select } from '@/components/Form/Form';
import { Button } from '@/components/Button/Button';

const CITIES = [
  { value: 'london', label: 'London' },
  { value: 'manchester', label: 'Manchester' },
  { value: 'birmingham', label: 'Birmingham' },
  { value: 'glasgow', label: 'Glasgow' },
  { value: 'leeds', label: 'Leeds' },
  { value: 'liverpool', label: 'Liverpool' },
];

const EXPIRY_OPTIONS = [
  { value: '1 day', label: '1 Day' },
  { value: '3 days', label: '3 Days' },
  { value: '1 week', label: '1 Week' },
];

export default function AddListingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    expiry: '1 day',
    image: null as File | null,
  });

  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    location?: string;
    image?: string;
    general?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      // Basic validation
      if (!formData.title) {
        setErrors(prev => ({ ...prev, title: 'Title is required' }));
        return;
      }
      if (!formData.description) {
        setErrors(prev => ({ ...prev, description: 'Description is required' }));
        return;
      }
      if (!formData.location) {
        setErrors(prev => ({ ...prev, location: 'Location is required' }));
        return;
      }

      // In a real app, you would:
      // 1. Upload the image to a storage service
      // 2. Create the listing in the database
      // 3. Handle proper error cases
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to the listings page
      router.push('/search-listings');
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: 'Failed to create listing. Please try again.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          image: 'Image size should be less than 5MB',
        }));
        return;
      }
      setFormData(prev => ({
        ...prev,
        image: file,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Add New Food Listing
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Share your surplus food with the community.
            </p>
          </div>

          {errors.general && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {errors.general}
            </div>
          )}

          <Form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
              placeholder="e.g., Fresh Vegetables from Local Farm"
            />

            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
              placeholder="Describe the food items, quantity, and any special instructions..."
              rows={4}
            />

            <Select
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              options={CITIES}
              error={errors.location}
            />

            <Select
              label="Expiry Time"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              options={EXPIRY_OPTIONS}
            />

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-yellow-50 file:text-yellow-700
                  hover:file:bg-yellow-100"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-500">{errors.image}</p>
              )}
              <p className="text-xs text-gray-500">
                Maximum file size: 5MB. Recommended dimensions: 1200x800 pixels.
              </p>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating listing...' : 'Create Listing'}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
} 