import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import DarkModeToggle from '../components/DarkModeToggle';

export default function Settings() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [adminCode, setAdminCode] = useState('');
  const [message, setMessage] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (userStr) {
      try {
        const u = JSON.parse(userStr);
        setCurrentUser(u);
        setProfileForm({
          username: u.username || '',
          email: u.email || u.username || '',
          password: '',
          confirmPassword: '',
        });
      } catch (e) {
        // ignore parse errors
      }
    }
  }, []);

  const handleVerifyAdmin = (e) => {
    e.preventDefault();
    // Use env var if provided, fallback to a dev code (replace or remove for prod)
    const expected = process.env.REACT_APP_ADMIN_CODE || 'admin123';
    if (adminCode === expected) {
      localStorage.setItem('isAdmin', 'true');
      setMessage('Verified as admin.');
      navigate('/admin');
    } else {
      setMessage('Invalid admin code.');
    }
  };

  const revokeAdmin = () => {
    localStorage.removeItem('isAdmin');
    setMessage('Admin access revoked.');
  };

  const handleDeleteAccount = async () => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (!confirmed) return;

    try {
      // Get user from storage
      const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (!userStr) {
        alert('No user logged in');
        return;
      }

      const user = JSON.parse(userStr);
      const user_id = user.id;

      // Call delete API
      const response = await fetch('/api/deleteUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Account deleted successfully:', data);
        // Clear all user data
        localStorage.clear();
        sessionStorage.clear();
        alert('Your account has been deleted successfully.');
        // Redirect to login
        navigate('/login');
      } else {
        console.error('Error deleting account:', data.error);
        alert(data.error || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account. Please try again.');
    }
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
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Appearance</h2>

          <div className="flex items-center justify-between py-3">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white">Dark Mode</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {darkMode ? 'Dark theme is enabled' : 'Light theme is enabled'}
              </p>
            </div>
            <DarkModeToggle />
          </div>
        </div>

        {/* Admin Verification */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Admin Verification
            </h2>

            <div className="space-y-3">
              <button
                onClick={() => navigate('/admin/verification')}
                className="w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>Manage Verification Requests</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Account Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Account Actions</h2>

          <div className="space-y-3">
            <button
              onClick={() => setIsEditingProfile(true)}
              className="w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-between"
            >
              <span>Edit Profile</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {isEditingProfile && (
              <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  Edit Profile
                </h3>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();

                    // validate password confirmation
                    if (
                      profileForm.password &&
                      profileForm.password !== profileForm.confirmPassword
                    ) {
                      // Show a popup alert and also set the inline message
                      alert('New password and confirmation do not match.');
                      setMessage('New password and confirmation do not match.');
                      return;
                    }

                    const payload = {
                      user_id: currentUser?.id,
                      username: profileForm.username,
                      email: profileForm.email,
                      password: profileForm.password || undefined,
                    };

                    // Try updating backend, but always update localStorage
                    try {
                      const res = await fetch('/api/updateUser', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                      });
                      if (res.ok) {
                        const data = await res.json();
                        // if server returns updated user, use it
                        if (data.user) {
                          localStorage.setItem('user', JSON.stringify(data.user));
                          setCurrentUser(data.user);
                        } else {
                          const updated = {
                            ...(currentUser || {}),
                            username: profileForm.username,
                            email: profileForm.email,
                          };
                          localStorage.setItem('user', JSON.stringify(updated));
                          setCurrentUser(updated);
                        }
                        setMessage('Profile updated successfully.');
                      } else {
                        const err = await res.json().catch(() => ({}));
                        setMessage(
                          err.error || 'Failed to update profile on server; saved locally.'
                        );
                        const updated = {
                          ...(currentUser || {}),
                          username: profileForm.username,
                          email: profileForm.email,
                        };
                        localStorage.setItem('user', JSON.stringify(updated));
                        setCurrentUser(updated);
                      }
                    } catch (err) {
                      console.warn('Update API failed, saved locally:', err);
                      const updated = {
                        ...(currentUser || {}),
                        username: profileForm.username,
                        email: profileForm.email,
                      };
                      localStorage.setItem('user', JSON.stringify(updated));
                      setCurrentUser(updated);
                      setMessage('Saved locally (server unreachable).');
                    }

                    // clear password fields and hide editor
                    setProfileForm((p) => ({ ...p, password: '', confirmPassword: '' }));
                    setIsEditingProfile(false);
                  }}
                >
                  <div className="mb-2">
                    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                      Username
                    </label>
                    <input
                      value={profileForm.username}
                      onChange={(e) => setProfileForm((p) => ({ ...p, username: e.target.value }))}
                      className="w-full px-3 py-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      value={profileForm.email}
                      onChange={(e) => setProfileForm((p) => ({ ...p, email: e.target.value }))}
                      className="w-full px-3 py-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                      Current Password
                    </label>
                    {currentUser && currentUser.password ? (
                      <div className="flex items-center">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={currentUser.password}
                          readOnly
                          className="w-full px-3 py-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword((s) => !s)}
                          className="ml-2 px-3 py-2 rounded border"
                          aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
                        >
                          {showCurrentPassword ? 'Hide' : 'Show'}
                        </button>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value="Not available"
                        readOnly
                        className="w-full px-3 py-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-400"
                      />
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                      New Password (optional)
                    </label>
                    <input
                      type="password"
                      value={profileForm.password}
                      onChange={(e) => setProfileForm((p) => ({ ...p, password: e.target.value }))}
                      className="w-full px-3 py-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={profileForm.confirmPassword}
                      onChange={(e) =>
                        setProfileForm((p) => ({ ...p, confirmPassword: e.target.value }))
                      }
                      className="w-full px-3 py-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-3 py-2 rounded border"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="px-3 py-2 bg-purple-600 text-white rounded">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
            <button
              onClick={handleDeleteAccount}
              className="w-full px-4 py-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center justify-between"
            >
              <span>Delete Account</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
