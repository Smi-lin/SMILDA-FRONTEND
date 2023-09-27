import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { register, isLoggedIn } = useSelector((state) => state.authReducer);

  // Check if registration is required and if the user is not authenticated
  if (register === false && !isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  // Return the children only if the user is authenticated
  // This ensures that the component always returns a React element
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;

