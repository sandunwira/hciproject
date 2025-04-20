import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Component to protect routes that require authentication
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  
  // If user is not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // If user is authenticated, render the children components
  return children;
}

export default ProtectedRoute;
