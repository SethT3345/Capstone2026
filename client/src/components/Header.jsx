import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header({ onSearch, searching, searchError }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = async (e) => {
    e.preventDefault();

    // If not on courses page, navigate to it first
    if (location.pathname !== '/courses') {
      navigate('/courses');
    }

    // Perform the search
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      // Fallback for when Header is used on other pages
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className="md:fixed md:top-0 md:right-0 md:left-64 bg-linear-to-r from-purple-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 z-10 px-4 md:px-8 py-4 md:py-6 shadow-sm">
      <div className="max-w-7xl mx-auto">
        {/* Mobile hamburger to open small nav when sidebar hidden */}
        <div className="flex items-center justify-between mb-3 md:hidden">
          <button
            onClick={() => setMobileOpen((s) => !s)}
            aria-label="Open navigation"
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="text-lg font-semibold">Course Manager</div>
        </div>

        {/* Mobile nav overlay */}
        {mobileOpen && (
          <div className="md:hidden mb-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
              <nav className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    navigate('/');
                    setMobileOpen(false);
                  }}
                  className="text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <span className="material-icons-outlined text-purple-600 dark:text-purple-400 text-lg">
                    home
                  </span>
                  Home
                </button>
                <button
                  onClick={() => {
                    navigate('/profile');
                    setMobileOpen(false);
                  }}
                  className="text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <span className="material-icons-outlined text-purple-600 dark:text-purple-400 text-lg">
                    person
                  </span>
                  Profile
                </button>
                <button
                  onClick={() => {
                    navigate('/courses');
                    setMobileOpen(false);
                  }}
                  className="text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <span className="material-icons-outlined text-purple-600 dark:text-purple-400 text-lg">
                    menu_book
                  </span>
                  Courses
                </button>
                <button
                  onClick={() => {
                    navigate('/admin');
                    setMobileOpen(false);
                  }}
                  className="text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <span className="material-icons-outlined text-purple-600 dark:text-purple-400 text-lg">
                    admin_panel_settings
                  </span>
                  Admin
                </button>
                <hr className="border-gray-200 dark:border-gray-700 my-1" />
                <button
                  onClick={() => {
                    navigate('/settings');
                    setMobileOpen(false);
                  }}
                  className="text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <span className="material-icons-outlined text-purple-600 dark:text-purple-400 text-lg">
                    settings
                  </span>
                  Settings
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('user');
                    sessionStorage.removeItem('user');
                    navigate('/login');
                    setMobileOpen(false);
                  }}
                  className="text-left p-2 rounded bg-linear-to-r from-purple-600 to-indigo-600 text-white font-medium flex items-center gap-2 mt-1"
                >
                  <span className="material-icons-outlined text-lg">logout</span>
                  Logout
                </button>
              </nav>
            </div>
          </div>
        )}
        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-stretch gap-3 flex-col sm:flex-row">
            {/* Search Input with Icon */}
            <div className="relative flex-1">
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-500 dark:text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch(e);
                  }
                }}
                placeholder="Search your courses here..."
                className="w-full h-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm md:text-base"
                disabled={searching}
              />
            </div>

            {/* Filter Button */}
            <button
              type="button"
              className="flex items-center justify-center px-4 py-3 bg-purple-600 dark:bg-purple-700 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-all duration-200 shadow-sm hover:shadow-md w-full sm:w-auto"
              aria-label="Filter"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </button>
          </div>
        </form>

        {/* Loading State */}
        {searching && (
          <div className="mt-4 text-center text-gray-600 dark:text-gray-400">Searching...</div>
        )}

        {/* Error Message */}
        {searchError && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg text-red-700 dark:text-red-400">
            {searchError}
          </div>
        )}
      </div>
    </header>
  );
}
