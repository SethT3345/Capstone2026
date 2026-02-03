import React from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile.jsx';

export default function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome to Your Dashboard</h1>
                    <h3 
                        className="text-2xl font-semibold text-gray-800 cursor-pointer hover:text-blue-600 transition duration-200"
                        onClick={() => navigate('/profile')}
                    >
                        View Profile
                    </h3>
                    <button 
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Main Page</h2>
                    <p className="text-gray-600">
                        You've successfully logged in! This is your main page.
                    </p>
                </div>
            </main>
        </div>
    );
}
