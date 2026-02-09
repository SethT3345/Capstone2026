// client/src/App.jsx

import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Courses from './pages/Courses.jsx'
import NotLoggedIn from './pages/NotLoggedIn.jsx'

// Protected Route component
function ProtectedRoute({ children }) {
  const user = localStorage.getItem('user')
  return user ? children : <NotLoggedIn />;
}

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
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
          path="/courses" 
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          } 
        />
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotLoggedIn />} />
      </Routes>
    </Router>
  )
}

export default App

