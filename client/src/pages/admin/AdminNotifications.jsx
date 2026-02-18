import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompletions();
  }, []);

  const fetchCompletions = async () => {
    try {
      setLoading(true);
      console.log('Fetching completions from API...');
      
      const response = await fetch('/api/getCompletions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch completions');
      }

      const data = await response.json();
      console.log('Fetched completions:', data);
      
      // Data already has title (username) and body (course_title) from server
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching completions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCompletion = async (completion_id) => {
    try {
      console.log('Verifying completion:', completion_id);
      
      const response = await fetch('/api/adminVerify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completion_id }),
      });

      if (!response.ok) {
        throw new Error('Failed to verify completion');
      }

      const data = await response.json();
      console.log('Completion verified:', data);
      
      // Refresh the completions list
      fetchCompletions();
    } catch (error) {
      console.error('Error verifying completion:', error);
      alert('Failed to verify completion. Please try again.');
    }
  };

  return (
    <div className="flex">
      <Navbar />

      <div className="right-side flex-1 min-h-screen bg-gray-50 dark:bg-gray-900 ml-64">
        <Header />

        <main className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8 pt-28">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                  Notifications
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                  Recent system notifications for administrators.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {loading ? (
                <p className="text-center text-gray-600 dark:text-gray-300 py-8">Loading completion requests...</p>
              ) : notifications.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-300 py-8">No pending completion requests.</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.completion_id}
                    className="p-4 rounded-md border border-purple-500 bg-purple-50/30 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 dark:text-white">{n.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{n.body}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleVerifyCompletion(n.completion_id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                      >
                        Complete Class
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
