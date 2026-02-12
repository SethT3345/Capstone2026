import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import Button from '../../components/Button';

export default function AdminPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex">
        <Navbar />

        <div className="right-side flex-1 min-h-screen bg-gray-50 dark:bg-gray-900 ml-64">
          <Header />

          <main className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8 pt-28">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                You are viewing admin-only content.
              </p>
            </div>
            <div>
              <Button
                onClick={() => navigate('/admin/users')}
                className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
              >
                Manage Users
              </Button>
              <Button onClick={() => navigate('/admin/courses')} className="mt-4 ml-4 px-4 py-2">
                Manage Courses
              </Button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
