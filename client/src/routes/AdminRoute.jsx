import React from 'react'
import { Navigate } from 'react-router-dom'

export default function AdminRoute({ children }) {
  const isAdmin = localStorage.getItem('isAdmin') === 'true'
  if (!isAdmin) return <Navigate to="/admin/verification" replace />
  return children
}
