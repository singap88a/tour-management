import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component }) => {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  return isLoggedIn ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;
