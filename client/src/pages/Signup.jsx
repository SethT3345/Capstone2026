import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Aurora from '../components/Aurora.jsx';
import './Login.css';

// Signup Component
export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        // Validation
        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);

        try {
            // Call the API to create user
            const response = await fetch('/api/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify({ 
                    id: data.user.id,
                    email: data.user.username,
                    name
                }));
                // Navigate to home
                navigate('/');
            } else {
                setError(data.error || 'Failed to create account');
            }
        } catch (err) {
            console.error('Signup error:', err);
            setError('Network error. Please make sure the server is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 glass-outer">
            <Aurora colorStops={["#3B82F6", "#8B5CF6", "#FFFFFF"]} />
            <div className="relative z-10 glass-card w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold glass-title mb-2">Create Account</h1>
                    <p className="text-sm text-gray-200">Sign up to get started</p>
                </div>

                {/* Signup Form */}
                <form onSubmit={handleSubmit} className="space-y-6" noValidate onInvalid={(e) => e.preventDefault()}>
                    {/* Error Message */}
                    {error && (
                        <div className="glass-error px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Name
                        </label>
                        <input 
                            type="text" 
                            id="name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe" 
                            required 
                            className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition duration-200 placeholder:text-gray-300 glass-input" 
                        />
                    </div>
                    
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com" 
                            required 
                            className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition duration-200 placeholder:text-gray-300 glass-input" 
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input 
                            type="password" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password" 
                            required 
                            className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition duration-200 glass-input" 
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <input 
                            type="password" 
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password" 
                            required 
                            className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition duration-200 glass-input" 
                        />
                    </div>

                    {/* Sign Up Button */}
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full text-white font-semibold py-3 glass-cta hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                {/* Divider */}
                <div className="mt-6 flex items-center">
                    <div className="flex-1 border-t border-transparent"></div>
                    <span className="px-4 text-sm glass-divider">OR</span>
                    <div className="flex-1 border-t border-transparent"></div>
                </div>

                {/* Login Link */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-200">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-400 font-semibold hover:text-blue-200 transition duration-200">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
