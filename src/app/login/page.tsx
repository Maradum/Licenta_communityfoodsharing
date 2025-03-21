'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Form, Input } from '@/components/Form/Form';
import { Button } from '@/components/Button/Button';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Basic validation
    if (!formData.email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      return;
    }
    if (!formData.password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
      return;
    }

    try {
      console.log('Attempting login with:', formData.email);
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful, user role:', data.user.role);

      // Redirect based on user role
      if (data.user.role === 'admin') {
        console.log('Redirecting admin to dashboard...');
        // Try both redirection methods for robustness
        try {
          router.push('/admin/dashboard');
        } catch (routerError) {
          console.error('Router push failed, using window.location fallback', routerError);
          window.location.href = '/admin/dashboard';
        }
      } else {
        console.log('Redirecting user to dashboard...');
        try {
          router.push('/dashboard');
        } catch (routerError) {
          console.error('Router push failed, using window.location fallback', routerError);
          window.location.href = '/dashboard';
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors(prev => ({
        ...prev,
        general: 'Invalid email or password',
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link
            href="/signup"
            className="font-medium text-yellow-500 hover:text-yellow-400"
          >
            create a new account
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
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-yellow-500 hover:text-yellow-400"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <Button type="submit" fullWidth>
              Sign in
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
} 