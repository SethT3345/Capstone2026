import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function AuthSuccess() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // Get user data from URL parameter
        const userParam = searchParams.get('user');
        
        if (userParam) {
            try {
                // Decode and parse user data
                const userData = JSON.parse(decodeURIComponent(userParam));
                
                // Store in localStorage
                localStorage.setItem('user', JSON.stringify(userData));
                
                console.log('User data stored in localStorage:', userData);
                
                // Redirect to home page
                navigate('/', { replace: true });
            } catch (error) {
                console.error('Error parsing user data:', error);
                navigate('/login', { replace: true });
            }
        } else {
            // No user data, redirect to login
            navigate('/login', { replace: true });
        }
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
                <p className="text-gray-700 dark:text-gray-300">Completing authentication...</p>
            </div>
        </div>
    );
}
