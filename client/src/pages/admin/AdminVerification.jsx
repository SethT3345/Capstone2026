import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminVerification() {
  const navigate = useNavigate()
  const [adminCode, setAdminCode] = useState('')
  const [message, setMessage] = useState('')

  // If already verified, go straight to admin page
  useEffect(() => {
    if (localStorage.getItem('isAdmin') === 'true') {
      navigate('/admin', { replace: true })
    }
  }, [navigate])

  const handleVerify = () => {
    const expected = 'admin123'
    const code = (adminCode || '').trim()
    if (code === expected) {
      localStorage.setItem('isAdmin', 'true')
      setMessage('Verified as admin.')
      // SPA navigation, with a fallback forced redirect
      navigate('/admin', { replace: true })
      setTimeout(() => {
        if (window.location.pathname !== '/admin') window.location.href = '/admin'
      }, 200)
    } else {
      setMessage('Invalid admin code.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Admin Verification</h1>
        <form className="space-y-3" onSubmit={(e)=>e.preventDefault()}>
          <input
            type="password"
            placeholder="Enter admin code"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
            className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:text-white"
          />
          <div className="flex gap-2">
            <button type="button" onClick={handleVerify} className="px-4 py-2 bg-blue-600 text-white rounded">Verify</button>
            <button
              type="button"
              onClick={() => { localStorage.removeItem('isAdmin'); setMessage('Admin revoked'); }}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
            >
              Revoke
            </button>
          </div>
          {message && <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>}
        </form>
      </div>
    </div>
  )
}
