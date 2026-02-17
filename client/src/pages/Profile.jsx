import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Header from '../components/Header.jsx';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [numClasses, setNumClasses] = useState(0);
  const [completedClasses, setCompletedClasses] = useState(0);
  const cuser = localStorage.getItem('user');

  useEffect(() => {
    // Get user from storage
    const userString = localStorage.getItem('user') || sessionStorage.getItem('user');
    const userData = userString ? JSON.parse(userString) : null;
    setUser(userData);
  }, []);

  useEffect(() => {
    // Fetch number of enrolled classes
    const fetchClassCount = async () => {
      if (!user || !user.id) return;

      try {
        const response = await fetch('/api/numOfClasses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: user.id }),
        });

        const data = await response.json();
        if (response.ok) {
          setNumClasses(data.numClasses);
        }
      } catch (error) {
        console.error('Error fetching class count:', error);
      }
    };

    fetchClassCount();
  }, [user]); // Add user as dependency to re-run when user data is available

  useEffect(() => {
    // Fetch number of completed (admin verified) classes
    const fetchCompletedCount = async () => {
      if (!user || !user.id) return;

      try {
        const response = await fetch('/api/getCompletedCount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: user.id }),
        });

        const data = await response.json();
        if (response.ok) {
          setCompletedClasses(data.completedCount);
        }
      } catch (error) {
        console.error('Error fetching completed count:', error);
      }
    };

    fetchCompletedCount();
  }, [user]);

  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="right-side flex-1 min-h-screen bg-gray-100 dark:bg-gray-900 ml-64">
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 pt-28">
            {/* Profile Header Section */}
            <div className="bg-linear-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 rounded-lg shadow-lg p-8 mb-6">
              <div className="flex items-center gap-6">
                {/* Profile Avatar */}
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-16 h-16 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {user && user.username ? user.username.split('@')[0] : 'User'}
                  </h1>
                  <p className="text-purple-100 text-lg"></p>
                </div>

                {/* Edit Button */}
                <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition duration-200 shadow-md">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Account Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Account Details Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <svg
                    className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Account Details
                  </h2>
                </div>
                {user ? (
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email Address</p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {user.username || 'N/A'}
                      </p>
                    </div>
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Account Type</p>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                        {user.admin === true ? 'Admin' : 'Student'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Member Since</p>
                      <p className="text-gray-900 dark:text-white font-medium">February 2026</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">No user data found</p>
                )}
              </div>

              {/* Activity Stats Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <svg
                    className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Learning Stats
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Enrolled Courses</p>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {numClasses}
                      </p>
                    </div>
                    <svg
                      className="w-12 h-12 text-purple-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Completed Courses</p>
                      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        {completedClasses}
                      </p>
                    </div>
                    <svg
                      className="w-12 h-12 text-indigo-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button className="flex items-center justify-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition duration-200">
                  <svg
                    className="w-6 h-6 text-purple-600 dark:text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Browse Courses
                  </span>
                </button>
                <button className="flex items-center justify-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition duration-200">
                  <svg
                    className="w-6 h-6 text-purple-600 dark:text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Settings</span>
                </button>
                <Link
                  to="/my-learning"
                  className="flex items-center justify-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition duration-200"
                >
                  <svg
                    className="w-6 h-6 text-purple-600 dark:text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <span className="font-medium text-gray-700 dark:text-gray-300">My Learning</span>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
