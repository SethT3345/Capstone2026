import React from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile.jsx';
import Navbar from './Navbar.jsx';

export default function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <>
        <Navbar />
        <div className="min-h-screen bg-gray-50">
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
    </>
    );
}
