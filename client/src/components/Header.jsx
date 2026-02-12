import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header({ onSearch, searching, searchError }) {
    const [searchQuery, setSearchQuery] = useState('');
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
        <header className="fixed top-0 right-0 left-64 bg-gradient-to-r from-purple-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 z-10 px-8 py-6 shadow-sm">
            <div className="max-w-7xl mx-auto">
                <form onSubmit={handleSearch} className="relative">
                    <div className="flex items-stretch gap-3">
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
                                className="w-full h-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                disabled={searching}

                            />
                        </div>
                        
                        {/* Filter Button */}
                        <button
                            type="button"
                            className="flex items-center justify-center px-4 py-3 bg-purple-600 dark:bg-purple-700 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-all duration-200 shadow-sm hover:shadow-md"
                            aria-label="Filter"
                        >
                            <svg 
                                className="h-5 w-5" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
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
                    <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
                        Searching...
                    </div>
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
