import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import { seedIfEmpty, getNotifications, markAllRead } from '../../utils/notificationStore';

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // ensure there are seeded notifications
    seedIfEmpty();
    setNotifications(getNotifications());

    // when page mounts, mark all as read and notify listeners
    const updated = markAllRead();
    setNotifications(updated);
    window.dispatchEvent(new CustomEvent('notifications-updated'));
  }, []);

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
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-4 rounded-md border ${n.read ? 'border-gray-100 bg-gray-50 dark:bg-gray-900' : 'border-purple-500 bg-purple-50/30'} dark:border-gray-700`}
                >
                  <h3 className="font-semibold text-gray-800 dark:text-white">{n.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{n.body}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
