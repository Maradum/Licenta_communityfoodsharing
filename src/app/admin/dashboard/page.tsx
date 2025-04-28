'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  _id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  lastLogin: string | null;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  const fetchUsers = async () => {
    try {
      const response = await fetch(`/api/admin/users?page=${pagination.page}&limit=${pagination.limit}`, {
        method: 'GET',
        credentials: 'include', // ✅ Very important to send the cookie (token)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.users);
      setPagination(prev => ({
        ...prev,
        totalPages: data.pagination.pages,
      }));

    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [pagination.page]);

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead>
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Last Login</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="p-3">{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setPagination(prev => ({ ...prev, page: Math.max(prev.page - 1, 1) }))}
          disabled={pagination.page === 1}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-4 py-2">
          Page {pagination.page} of {pagination.totalPages}
        </span>

        <button
          onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.page + 1, pagination.totalPages) }))}
          disabled={pagination.page === pagination.totalPages}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
