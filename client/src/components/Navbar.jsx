import react from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return(
        <>
        <div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-purple-50 via-white to-white shadow-2xl flex flex-col p-6">
            {/* Header */}
            <div className="mb-8 pb-6 border-b border-purple-100">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">Logo</h1>
                <p className="text-xs text-gray-500">Course Manager</p>
            </div>
            
            {/* Navigation Items */}
            <div className="flex flex-col space-y-2">
                <h6
                    className="text-base font-medium text-gray-700 cursor-pointer hover:text-purple-600 hover:bg-purple-50 p-3 rounded-xl transition duration-200 flex items-center gap-3"
                    onClick={() => navigate('/')}>
                    <span className="text-purple-600">🏠</span>
                    Home
                </h6>
                <h6
                    className="text-base font-medium text-gray-700 cursor-pointer hover:text-purple-600 hover:bg-purple-50 p-3 rounded-xl transition duration-200 flex items-center gap-3"
                    onClick={() => navigate('/profile')}>
                    <span className="text-purple-600">👤</span>
                    Profile
                </h6>
                <h6
                    className="text-base font-medium text-gray-700 cursor-pointer hover:text-purple-600 hover:bg-purple-50 p-3 rounded-xl transition duration-200 flex items-center gap-3"
                    onClick={() => navigate('/courses')}>
                    <span className="text-purple-600">📚</span>
                    Courses
                </h6>
            </div>

            <div className="flex flex-col justify-between mt-auto pt-6 border-t border-purple-100">
                <div className="text-base font-medium text-gray-700 cursor-pointer hover:text-purple-600 hover:bg-purple-50 p-3 rounded-xl transition duration-200 mb-4 flex items-center gap-3">
                    <span className="text-purple-600">⚙️</span>
                    Settings
                </div>

                {/* Logout Button at Bottom */}
                <button 
                    onClick={handleLogout} 
                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg transform hover:scale-105 transition duration-200 mt-auto">
                    Logout
                </button>
            </div>
        </div>
        </>
    )
}