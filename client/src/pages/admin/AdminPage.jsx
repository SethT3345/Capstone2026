import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import Button from '../../components/Button';
export default function AdminPage() {
  const navigate = useNavigate();
  // Notifications removed — no local unread count.

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
            <div className="flex flex-wrap gap-4 mt-4">
              <Button
                onClick={() => navigate('/admin/users')}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
              >
                Manage Users
              </Button>

              <Button onClick={() => navigate('/admin/courses')} className="px-4 py-2 rounded">
                Manage Courses
              </Button>

              {/* Notifications bell button */}
              <Button
                onClick={() => navigate('/admin/notifications')}
                className="px-3 py-2 flex items-center gap-2 rounded relative"
                aria-label="Admin Notifications"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-50"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10 2a4 4 0 00-4 4v2.586l-.707.707A1 1 0 005 11v1h10v-1a1 1 0 00-.293-.707L14 8.586V6a4 4 0 00-4-4z" />
                  <path d="M9 16a2 2 0 104 0H9z" />
                </svg>
                <span className="hidden sm:inline text-sm">Notifications</span>

                {/* notification badge removed */}
              </Button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
