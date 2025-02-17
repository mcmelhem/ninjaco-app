import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../constants/constants';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("loggedinUser") || "");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const logIn = async (data) => {
    try {
      const res = await axios.post(
        API_BASE_URL + '/api/login',
        data,
        {
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
          withCredentials: false,
        }
      );

     
      if (res.data) {
        setUser(res.data.data.username);
        setToken(res.data.data.token);
        localStorage.setItem("loggedinUser", res.data.data.token);
       
       /*  if (token) {
          axios
            .get( API_BASE_URL + '/api/user', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              setUser(response.data);
            })
            .catch((error) => {
              console.error("Error fetching user", error);
            });
        } */
      
        navigate("/");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      
      if (!err?.response) {
        alert("Login Failed");
      } else if (err.response?.status === 409) {
        alert("Username Taken");
      } else if (err.response.status === 404) {
        alert("Login Failed");
      } 
    }
   
   
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };
  return (
    <AuthContext.Provider value={{ token, user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );


}


export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};