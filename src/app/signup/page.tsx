'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Form, Input, Select } from '@/components/Form/Form';
import { Button } from '@/components/Button/Button';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'donor',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const roleOptions = [
    { value: 'donor', label: 'Donor' },
    { value: 'beneficiary', label: 'Beneficiary' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Basic validation
    if (!formData.name) {
      setErrors(prev => ({ ...prev, name: 'Name is required' }));
      return;
    }
    if (!formData.email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      return;
    }
    if (!formData.password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
      return;
    }
    if (formData.password.length < 8) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters' }));
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();
      
      // Handle successful signup - redirect to home page or specified redirect
      window.location.href = data.redirectTo || '/';
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: 'Failed to create account. Please try again.',
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-yellow-500 hover:text-yellow-400"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {errors.general && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {errors.general}
            </div>
          )}

          <Form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Full name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              autoComplete="name"
            />

            <Input
              label="Email address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="new-password"
            />

            <Input
              label="Confirm password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              autoComplete="new-password"
            />

            <Select
              label="I want to"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={roleOptions}
            />

            <Button type="submit" fullWidth>
              Create account
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
} 