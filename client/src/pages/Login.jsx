import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Aurora from '../components/Aurora.jsx';

// Login Component
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
    setError('');

    const emailTrim = email.trim();
    if (!emailTrim || !password) {
      setError('Please enter both email and password');
      return;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(emailTrim)) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
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
          createdAt: data.user.created_at,
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

      <div className="relative w-full max-w-md">
        {/* neon rim / glow behind the card */}
        <div className="pointer-events-none absolute -inset-1 rounded-xl bg-linear-to-r from-purple-600/20 via-sky-400/18 to-white/6 blur-3xl -z-10" />

        {/* soft highlight / sheen */}
        <div className="pointer-events-none absolute -left-1/4 -top-1/4 w-2/3 h-2/3 transform -rotate-12 rounded-full bg-linear-to-t from-white/40 to-transparent blur-3xl opacity-90 -z-10" />

        {/* Actual glass panel */}
        <div className="relative z-10 rounded-xl border border-white/10 bg-white/4 backdrop-blur-[20px] backdrop-saturate-150 py-8 px-6 shadow-[0_36px_100px_rgba(6,8,20,0.86)] transition-transform duration-220 ease-[cubic-bezier(.2,.9,.2,1)] hover:-translate-y-1.5 hover:scale-[1.01]">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Welcome Back</h1>
            <p className="text-sm text-black/70 dark:text-white">Please sign in to your account</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
            onInvalid={(e) => e.preventDefault()}
          >
            {error && (
              <div className="px-4 py-3 rounded-lg bg-red-600/10 border border-red-500/20 text-red-100">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black dark:text-white mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-white/3 border border-white/6 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/60 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-300/20 transition duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black dark:text-white mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg bg-white/3 border border-white/6 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/60 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-300/20 transition duration-200"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-black dark:text-white">
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-purple-600 dark:text-purple-300 hover:text-black dark:hover:text-white transition duration-200"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-semibold py-3 rounded-lg bg-linear-to-r from-purple-600 to-sky-500 shadow-lg hover:shadow-2xl transform-gpu hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 flex items-center">
            <div className="flex-1 border-t border-black/10 dark:border-white/6"></div>
            <span className="px-4 text-sm text-black/70 dark:text-white/70">OR</span>
            <div className="flex-1 border-t border-black/10 dark:border-white/6"></div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-black/70 dark:text-white/80">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-blue-400 font-semibold hover:text-blue-600 dark:hover:text-white transition duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
