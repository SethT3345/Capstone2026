import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Aurora from '../components/ReactBitsBackground';

// Login Component
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    // This runs when the component loads
    useEffect(() => {
        // Check if remember-me is enabled
        const rememberMeEnabled = localStorage.getItem('remember-me') === 'true';
        
        if (rememberMeEnabled) {
            // Get saved user data
            const savedUser = localStorage.getItem('user');
            
            if (savedUser) {
                const userData = JSON.parse(savedUser);
                setEmail(userData.email || userData.username || '');
                setPassword(userData.password || '');
                setRememberMe(true);
            }
        }
    }, []); 

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        const emailTrim = email.trim();
        if (!emailTrim || !password) {
            setError("Please enter both email and password");
            return;
        }
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(emailTrim)) {
            setError("Please enter a valid email address");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            // Call the login API
            const response = await fetch('/api/loginUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailTrim, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const userData = { 
                    id: data.user.id,
                    email: data.user.username,
                    password: data.user.password,
                    createdAt: data.user.created_at
                    
                
                };
                
                localStorage.setItem('user', JSON.stringify(userData));

                // Store in localStorage or sessionStorage based on remember me
                if (rememberMe) {
                    localStorage.setItem('user', JSON.stringify(userData));
                    localStorage.setItem('remember-me', 'true');
                } else {
                    localStorage.removeItem('remember-me');
                }
                
                // Navigate to home
                navigate('/');
            } else {
                // Show error message from server
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Network error. Please make sure the server is running.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="relative min-h-screen flex items-center justify-center p-4">
            <Aurora colorStops={['#3B82F6', '#8B5CF6', '#FFFFFF']} />
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Please sign in to your account</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6" noValidate onInvalid={(e) => e.preventDefault()}>
                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}
                    
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
                            /* removed required to avoid native browser validation */
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 placeholder:text-gray-400 text-black" />
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
                            placeholder="Enter your password" 
                            /* removed required to avoid native browser validation */
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 text-black" 
                        />
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <a href="#" className="text-sm text-purple-600 hover:text-blue-800 transition duration-200">
                            Forgot password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 transition duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                {/* Divider */}
                <div className="mt-6 flex items-center">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-4 text-sm text-gray-500">OR</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* Sign Up Link */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-800 transition duration-200">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
