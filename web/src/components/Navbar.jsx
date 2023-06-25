import React, { useState, useContext } from "react";
import "./Navbar.css";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import { Context } from "../context/userContext/Context";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
//   const { user } = useContext(Context);
const user = JSON.parse(localStorage.getItem("user"))
  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">Tourer</h1>
      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => (
          <li key={index}>
            <Link className={item.cName} to={item.url}>
              <i className={item.icon}></i>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      {!user && (
  <Link to="/register">
    <button>Sign Up</button>
  </Link>
)}

      {user && (
        <Link to="/login">
          <button onClick={() => { localStorage.clear() }}>Log Out</button>
        </Link>
      )}

      {user && isAdmin && (
  <Link to="/admin/dashboard">Admin Dashboard</Link>
)}

      
    </nav>
  );
};

export default Navbar;
