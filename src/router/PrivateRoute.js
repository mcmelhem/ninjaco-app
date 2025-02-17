import React from "react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import Home from "../pages/Home/Home";
import HomeCenter from "../pages/Home/HomeCenter";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../constants/constants';
const PrivateRoute = () => {
  const user = useAuth();
  const [userType, setUserType] = useState(null);
 
  useEffect(() => {
  const token = localStorage.getItem("loggedinUser");
  if (token) {
    axios.get( API_BASE_URL + '/api/user', {
      headers: {
         Authorization: `Bearer ${token}`
        },

      }).then((response) => {
            if(response.hasOwnProperty("data")== true){
              const data = response.data;
              const userType = data["user_type_id"];
              setUserType(userType);
             
            }
          })
          .catch((error) => {
            console.error("Error fetching user", error);
          });
   } 
  }, []);
  if (!user.token){
    return <Navigate to="/login" />;
  } 
  if (userType === 2) {
   return <HomeCenter />;
  } else if (userType === 1) {
    return <Home />;
  } else {
    // Handle case for undefined or invalid user type
    return <div>Error: Invalid user type</div>;
  }
};

export default PrivateRoute;
