import React, { useState } from 'react';

export default function Header({ onSearch, searching, searchError }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        
        // If onSearch prop is provided (from Courses page), use it
        if (onSearch) {
            onSearch(searchQuery);
        } else {
            // Fallback for when Header is used on other pages
            console.log('Searching for:', searchQuery);
        }
    };

    return (
        <header className=" px-6 py-4">
            <div className="max-w-7xl mx-auto">
                <form onSubmit={handleSearch} className="relative">
                    <div className="flex items-center gap-3">
                        {/* Search Input with Icon */}
                        <div className="relative flex-1 shadow-xl">
                            <svg 
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" 
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
                                placeholder="Search your courses here..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white transition duration-200"
                                disabled={searching}
                            />
                        </div>
                        
                        {/* Filter Button */}
                        <button
                            type="button"
                            className="p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition duration-200"
                            aria-label="Filter"
                        >
                            <svg 
                                className="h-5 w-5 text-gray-600" 
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
                    <div className="mt-4 text-center text-gray-600">
                        Searching...
                    </div>
                )}
                
                {/* Error Message */}
                {searchError && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        {searchError}
                    </div>
                )}
            </div>
        </header>
    );
}
