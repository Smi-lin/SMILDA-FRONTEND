import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const SellerProtectedRoute = ({ children }) => {
  const seller = useSelector((state) => state);
  const navigate = useNavigate();
 

  if (seller === true) {
    navigate("/dashboard")
    
    
  } else {
    if (seller) {
       <Navigate to={`/shopLogin`} replace />;
    }

    return children;
  }
};

export default SellerProtectedRoute;
