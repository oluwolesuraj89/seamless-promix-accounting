import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, allowedRoutes, ...rest }) => {
  const { pathname } = window.location;
  const isAllowed = allowedRoutes.includes(pathname);

  return (
    <Route
      {...rest}
      element={isAllowed ? <Component /> : <Navigate to="/forbidden" />}
    />
  );
};

export default ProtectedRoute;
