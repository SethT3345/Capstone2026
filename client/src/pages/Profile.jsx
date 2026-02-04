import react from 'react';
import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Header from '../components/Header.jsx';

export default function Profile() {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    return(
        <>
            <div className='flex'>
                <Navbar />
                <div className="right-side flex-1 min-h-screen bg-gray-100">
                    {/* Header */}
                    <Header />
                    
                    {/* Main Content */}
                    <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-6">User Profile</h1>
                            {user ? (
                                <div>
                                    <p className="text-gray-600 text-lg">
                                        <span className="font-semibold">Email:</span> {user.email}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-gray-600">No user data found</p>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
