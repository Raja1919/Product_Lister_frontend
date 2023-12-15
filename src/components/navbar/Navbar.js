import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul className="left-links">
        <li>
          <Link to="/">Product</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
