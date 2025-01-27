import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline, Box } from '@mui/material';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import UserProtectedRoute from './components/UserProtectedRoute'; // Ensure this import is correct
import AdminProtectedRoute from './components/ProtectedRoute'; // Ensure this import is correct
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
function App() {
  return (
    <Router>
      
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <UserProtectedRoute>
                  <DashboardPage />
                </UserProtectedRoute>
              }
            />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />
          </Routes>
   
    </Router>
  );
}

export default App;