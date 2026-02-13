import React from 'react';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const userString = localStorage.getItem('user');
  
  if (!userString) {
    return <Navigate to="/admin/verification" replace />;
  }
  
  const user = JSON.parse(userString);
  const isAdmin = user.admin === true;
  
  if (!isAdmin) {
    return <Navigate to="/admin/verification" replace />;
  }
  
  return children;
}
