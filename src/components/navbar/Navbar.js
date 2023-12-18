import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ loggedIn, setLoggedIn }) => {
  const handleLogout = () => {
    localStorage.removeItem("user");

    setLoggedIn(false);
  };

  return (
    <nav>
      <ul className="left-links">
        <li>
          <Link to="/product">Product</Link>
        </li>
      </ul>
      <ul className="right-links">
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          {loggedIn ? (
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
