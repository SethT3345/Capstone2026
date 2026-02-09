import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminPage() {
  const navigate = useNavigate()

  const revokeAdmin = () => {
    localStorage.removeItem('isAdmin')
    navigate('/settings')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Admin Dashboard</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">You are viewing admin-only content.</p>
        
      </div>
    </div>
  )
}
