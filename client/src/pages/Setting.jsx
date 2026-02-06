import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import DarkModeToggle from '../components/DarkModeToggle';

export default function Settings() {
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useTheme();

    const handleSaveSettings = () => {
        // Save to localStorage (backend will use API)
        alert('Settings saved successfully!');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                    >
                        ← Back
                    </button>
                </div>

                {/* Appearance Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                        Appearance
                    </h2>
                    
                    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                        <div>
                            <h3 className="font-medium text-gray-800 dark:text-white">Dark Mode</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {darkMode ? 'Dark theme is enabled' : 'Light theme is enabled'}
                            </p>
                        </div>
                        <DarkModeToggle />
                    </div>

                    <div className="flex items-center justify-between py-3">
                        <div>
                            <h3 className="font-medium text-gray-800 dark:text-white">Theme Preference</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Choose your preferred color scheme
                            </p>
                        </div>
                        <select 
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={darkMode ? 'dark' : 'light'}
                            onChange={(e) => {
                                if (e.target.value === 'dark' && !darkMode) {
                                    toggleDarkMode();
                                } else if (e.target.value === 'light' && darkMode) {
                                    toggleDarkMode();
                                }
                            }}
                        >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="system">System Default</option>
                        </select>
                    </div>
                </div>

                {/* Account Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                        Account Actions
                    </h2>
                    
                    <div className="space-y-3">
                        <button
                            onClick={() => navigate('/profile')}
                            className="w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-between"
                        >
                            <span>Edit Profile</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        
                        <button
                            className="w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-between"
                        >
                            <span>Change Password</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <button
                            className="w-full px-4 py-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center justify-between"
                        >
                            <span>Delete Account</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex gap-3">
                    <button
                        onClick={handleSaveSettings}
                        className="flex-1 bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium"
                    >
                        Save Settings
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}