import React from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile.jsx';
import Navbar from '../components/Navbar.jsx';
import Header from '../components/Header.jsx';

export default function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {

        
        const rememberMeEnabled = localStorage.getItem('remember-me');
        
        console.log('Remember me value:', rememberMeEnabled); // Debug log
        
        // Always remove user from sessionStorage
        sessionStorage.removeItem('user');
        
        // Only remove from localStorage if remember me is enabled
        if (rememberMeEnabled) {
            console.log('Keeping user data - remember me is enabled');
            // Keep the user data in localStorage
        } else {
            console.log('Removing user data - remember me is not enabled');
            localStorage.removeItem('user');
        }
        
        navigate('/login');
    };

    return (
     <>
        <div className='flex'>
        <Navbar />
        <div className="right-side flex-1 min-h-screen bg-gray-100">
            {/* Header */}
            <Header />
            
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Main Page</h2>
                <p className="text-gray-600">
                    You've successfully logged in! This is your main page.
                </p>
            </main>
        </div>
        </div>
     </>
    );
}
