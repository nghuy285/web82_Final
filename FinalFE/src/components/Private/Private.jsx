import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div>
        <Navigate to="/login" />
        alert('login')
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
