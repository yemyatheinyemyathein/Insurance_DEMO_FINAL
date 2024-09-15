import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
