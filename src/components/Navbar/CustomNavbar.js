import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from '../../Images/icons/NinjaCoHead.png';
import { NavLink, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar } from 'react-bootstrap';
import axios from "axios";
import { useAuth } from "../../hooks/AuthProvider";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/constants';
import "./navbar.scss";

const CustomNavbar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNavBar, setShowNavbar] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("loggedinUser");
  const auth = useAuth();

  useEffect(() => {
   
      axios.get(API_BASE_URL + '/api/getMenuItems',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          if (response.data && Array.isArray(response.data)) {
            setMenuItems(response.data);

          } else {
            console.log('Invalid data format:', response.data);
            setError('Data format is incorrect');
          }
          setLoading(false);
        })
        .catch(err => {
          console.log('Error fetching data:', err);
          setError(err.message);
          setLoading(false);
        });
    
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;

  }

  if (showNavBar) {
    return (<div>
      <Navbar >
        <Navbar.Brand href="#home"> <img src={logo} className=' ms-1 logo' height="50" alt="Logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            {menuItems.map(item => (
              <NavLink key={item.id} to={"/" + item.name.toLowerCase()} className='nav-item nav-link' >{item.name}</NavLink>
            ))}
            <NavLink to={"/signout"} className='nav-item nav-link nav-link-signout' onClick={() => auth.logOut()} >Sign Out</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    );
  }


};

export default CustomNavbar;

