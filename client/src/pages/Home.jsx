import React from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile.jsx';
import Navbar from '../components/Navbar.jsx';
import Header from '../components/Header.jsx';

export default function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
     <>
        <div className='flex'>
        <Navbar />
        <div className="right-side flex-1 min-h-screen bg-gray-100 dark:bg-gray-900 ml-64">
            {/* Header */}
            <Header />
            
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 pt-28">
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 rounded-lg shadow-lg p-8 mb-8 text-white">
                    <h1 className="text-4xl font-bold mb-4">Welcome Back! 👋</h1>
                    <p className="text-xl text-purple-100">
                        Continue your learning journey and explore new courses
                    </p>
                </div>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Card 1 */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">0</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Active Courses</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Continue learning where you left off</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                                <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">0</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Completed</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Courses you've finished</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">0h</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Learning Time</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Total hours invested</p>
                    </div>
                </div>

                {/* Continue Learning Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Continue Learning</h2>
                    <div className="text-center py-12">
                        <svg className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No courses in progress</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Start learning by enrolling in a course</p>
                        <button 
                            onClick={() => navigate('/courses')}
                            className="px-6 py-3 bg-purple-600 dark:bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-700 dark:hover:bg-purple-600 transition duration-200 shadow-md"
                        >
                            Browse Courses
                        </button>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Recommended Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex items-center mb-4">
                            <svg className="w-6 h-6 text-purple-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            <h3 className="text-xl font-bold text-gray-900">Recommended for You</h3>
                        </div>
                        <p className="text-gray-600 mb-4">Based on your interests and goals</p>
                        <button 
                            onClick={() => navigate('/courses')}
                            className="text-purple-600 font-semibold hover:text-purple-700 transition duration-200"
                        >
                            View Recommendations →
                        </button>
                    </div>

                    {/* Achievements Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center mb-4">
                            <svg className="w-6 h-6 text-purple-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                            <h3 className="text-xl font-bold text-gray-900">Your Achievements</h3>
                        </div>
                        <p className="text-gray-600 mb-4">Earn badges as you complete courses</p>
                        <button 
                            onClick={() => navigate('/profile')}
                            className="text-purple-600 font-semibold hover:text-purple-700 transition duration-200"
                        >
                            View Profile →
                        </button>
                    </div>
                </div>
            </main>
        </div>
        </div>
     </>
    );
}
