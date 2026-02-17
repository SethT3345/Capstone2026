import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student',
    admin: false,
  });

  // Get current user from localStorage
  const cuser = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/getUsers');

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const getUserRole = (user) => {
    if (!user) return 'Student';

    // admin flags are authoritative
    if (user.admin) return 'Admin';

    // check common role string fields or the first role in an array
    const role = user.role;
    if (typeof role === 'string') {
      const r = role.toLowerCase();
      return role.charAt(0).toUpperCase() + role.slice(1);
    }

    // default
    return 'Student';
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch('/api/deleteUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Refresh the user list
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user: ' + err.message);
    }
  };

  return (
    <div className="flex">
      <Navbar />

      <div className="right-side flex-1 min-h-screen bg-gray-50 dark:bg-gray-900 ml-64">
        <Header />

        <div className="mt-4"></div>

        <main className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8 pt-28">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white mb-4"
          >
            ← Back to Admin Dashboard
          </button>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Manage Users</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Add, edit, or remove users here.
                </p>
              </div>

              <div>
                <button
                  type="button"
                  aria-label="Create User"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  + Create User
                </button>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="text-gray-600 dark:text-gray-400">Loading users...</div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-md mb-4">
                <p>Error: {error}</p>
              </div>
            )}

            {/* Users Table */}
            {!loading && !error && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Username
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Classes
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {users.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                        >
                          No users found
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => {
                        const isCurrentUser = user.id === cuser.id;
                        return (
                          <tr
                            key={user.id}
                            className={`${
                              isCurrentUser
                                ? 'bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/40'
                                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                              {user.id}
                              {isCurrentUser && (
                                <span className="ml-2 text-xs font-semibold text-purple-600 dark:text-purple-400">
                                  (You)
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                              {user.username}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                              {user.classes ? JSON.parse(user.classes).length : 0}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {getUserRole(user)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                disabled={isCurrentUser}
                              >
                                {isCurrentUser ? 'Delete User In Settings' : 'Delete'}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black opacity-40"
                onClick={() => setIsModalOpen(false)}
              ></div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log('User form submit (UI-only):', form);
                  setIsModalOpen(false);
                  // keep UI-only: no API calls here
                }}
                className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-4 p-6 z-10"
              >
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Create User
                </h2>

                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-300">
                  Username
                </label>
                <input
                  name="username"
                  value={form.username}
                  onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
                  className="w-full px-3 py-2 mb-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                />

                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-300">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full px-3 py-2 mb-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />

                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-300">Role</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                  className="w-full px-3 py-2 mb-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>

                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-300">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  className="w-full px-3 py-2 mb-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />

                <label className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <input
                    type="checkbox"
                    checked={form.admin}
                    onChange={(e) => setForm((p) => ({ ...p, admin: e.target.checked }))}
                    className="mr-2"
                  />
                  Grant admin privileges
                </label>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mr-2 px-4 py-2 rounded border"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
                    Create
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
