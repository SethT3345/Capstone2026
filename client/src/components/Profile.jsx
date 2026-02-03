import react from 'react';
import { useState } from 'react';

export default function Profile() {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    return(
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
                <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
                {user ? (
                    <p className="mt-4 text-gray-600">Email: {user.email}</p>
                ) : (
                    <p className="mt-4 text-gray-600">No user data found</p>
                )}
                <h3 className="mt-6 text-2xl font-semibold text-gray-800 cursor-pointer hover:text-blue-600 transition duration-200">
                    <a href="/">Return Home</a>
                </h3>
            </div>
        </div>
    )
}