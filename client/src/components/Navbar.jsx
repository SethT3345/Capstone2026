import react from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Profile from './Profile.jsx';

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return(
        <>
        <nav className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg flex flex-col p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
            </div>
            
            {/* Navigation Items */}
            <div className="flex flex-col space-y-4">
                <h6
                    className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-600 hover:bg-gray-100 p-3 rounded-lg transition duration-200"
                    onClick={() => navigate('/profile')}>
                    Profile
                </h6>
            </div>
            
            {/* Logout Button at Bottom */}
            <button 
                onClick={handleLogout} 
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:cursor-pointer transition duration-200 mt-auto">
                Logout
            </button>
        </nav>
        </>
    )
}