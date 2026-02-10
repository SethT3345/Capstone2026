import React from 'react'
import Navbar from '../../components/Navbar'
import Header from '../../components/Header'

export default function AdminUsers() {
  return (
    <div className="flex">
      <Navbar />

      <div className="right-side flex-1 min-h-screen bg-gray-50 dark:bg-gray-900 ml-64">
        <Header />

        <main className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8 pt-28">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Manage Users</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">Add, edit, or remove users here.</p>
          </div>
        </main>
      </div>
    </div>
  )
}
