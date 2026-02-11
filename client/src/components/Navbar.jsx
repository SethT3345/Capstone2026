import react from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return(
        <>
        <div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-purple-50 via-white to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 shadow-2xl flex flex-col p-6">
            {/* Header */}
            <div className="mb-8 pb-6 border-b border-purple-100 dark:border-gray-700">
                <img src="Logo.png" alt="Logo" className="w-full h-auto mb-2 object-cover object-center" style={{ objectFit: 'contain', maxHeight: '120px' }} />
                <p className="text-xs text-gray-500 dark:text-gray-400">Course Manager</p>
            </div>
            
            {/* Navigation Items */}
            <div className="flex flex-col space-y-2">
                <h6
                    className="text-base font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-800 p-3 rounded-xl transition duration-200 flex items-center gap-3"
                    onClick={() => navigate('/')}>
                    <span className="material-icons-outlined text-purple-600 dark:text-purple-400">home</span>
                    Home
                </h6>
                <h6
                    className="text-base font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-800 p-3 rounded-xl transition duration-200 flex items-center gap-3"
                    onClick={() => navigate('/profile')}>
                    <span className="material-icons-outlined text-purple-600 dark:text-purple-400">person</span>
                    Profile
                </h6>
                <h6
                    className="text-base font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-800 p-3 rounded-xl transition duration-200 flex items-center gap-3"
                    onClick={() => navigate('/courses')}>
                    <span className="material-icons-outlined text-purple-600 dark:text-purple-400">menu_book</span>
                    Courses
                </h6>
            </div>
            {/*admin page */}
            <div className="flex flex-col space-y-2">
                <h6
                    className="text-base font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-800 p-3 rounded-xl transition duration-200 flex items-center gap-3"
                    onClick={() => navigate('/admin')}>
                    <span className="material-icons-outlined text-purple-600 dark:text-purple-400">admin_panel_settings</span>
                    Admin
                </h6>
            </div>

            <div className="flex flex-col justify-between mt-auto pt-6 border-t border-purple-100 dark:border-gray-700">
                <div 
                    className="text-base font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-800 p-3 rounded-xl transition duration-200 mb-4 flex items-center gap-3"
                    onClick={() => navigate('/settings')}>
                    <span className="material-icons-outlined text-purple-600 dark:text-purple-400">settings</span>
                    Settings
                </div>

                {/* Logout Button at Bottom */}
                <button 
                    onClick={handleLogout} 
                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 text-white font-medium rounded-xl hover:from-purple-700 hover:to-indigo-700 dark:hover:from-purple-600 dark:hover:to-indigo-600 hover:shadow-lg transform hover:scale-105 transition duration-200 mt-auto">
                    Logout
                </button>
            </div>
        </div>
        </>
    )
}