import React from 'react';
import { Link } from 'react-router-dom';

export default function NotLoggedIn() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="mb-6">
                    <svg 
                        className="mx-auto h-16 w-16 text-red-500" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor">
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                        />
                    </svg>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Not Logged In
                </h1>
                
                <p className="text-gray-600 mb-8">
                    You need to be logged in to access this page. Please log in to continue.
                </p>
                
                <Link 
                    to="/login"
                    className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg">
                    Go to Login
                </Link>
            </div>
        </div>
    );
}
