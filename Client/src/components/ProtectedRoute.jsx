import React from 'react';
import { Navigate } from 'react-router-dom';


const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin'); // Assuming we store admin status in localStorage

  if (!token || isAdmin !== 'true') {
    return <Navigate to="/admin/login" />; // Redirect to admin login page
  }

  return children;
}
export default AdminProtectedRoute;