// client/src/App.jsx

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Courses from './pages/Courses.jsx';
import Settings from './pages/Setting.jsx';
import NotLoggedIn from './pages/NotLoggedIn.jsx';
import MyLearning from './pages/MyLearning.jsx';
import AuthSuccess from './pages/AuthSuccess.jsx';
import AdminRoute from './routes/AdminRoute';
import AdminPage from './pages/admin/AdminPage.jsx';
import AdminVerification from './pages/admin/AdminVerification.jsx';
import AdminUsers from './pages/admin/AdminUsers.jsx';
import AdminCourses from './pages/admin/AdminCourses.jsx';

// Protected Route component

function ProtectedRoute({ children }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // First check localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuth(true);
      setAuthChecked(true);
      return;
    }

  // If not in localStorage, ask the server if there's an authenticated session
  fetch('/api/auth/current-user', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
      })
      .then((data) => {
        if (data && data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          setIsAuth(true);
        }
      })
      .catch(() => {
        // not authenticated
      })
      .finally(() => setAuthChecked(true));
  }, []);

  if (!authChecked) {
    // Optionally render a spinner while we check
    return null;
  }

  return isAuth ? children : <NotLoggedIn />;
}

// (Use the imported AdminRoute from ./routes/AdminRoute)

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-learning"
          element={
            <ProtectedRoute>
              <MyLearning />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/verification"
          element={
            <ProtectedRoute>
              <AdminVerification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminCourses />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
  {/* OAuth redirect landing page - stores user data then navigates to home */}
  <Route path="/auth-success" element={<AuthSuccess />} />
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotLoggedIn />} />
      </Routes>
    </Router>
  );
}

export default App;
