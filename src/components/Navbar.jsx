import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";


const Navbar = ({ onOpenCreate }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-3">
      <div className="container-fluid">

        {/* Logo */}
        <Link className="navbar-brand fw-bold fs-3" to="/home">
          BlogApp
        </Link>

        {/* Right Buttons */}
        <div className="d-flex gap-3">

          {/* Create Blog Button */}
          <button 
            className="btn btn-dark"
            onClick={onOpenCreate}
          >
            + Create Blog
          </button>

          <button className="btn btn-outline-dark" onClick={() => {
                 document.body.classList.toggle("dark-mode");
             }}>
  🌙
    </button>


          {/* Logout */}
          <button 
            className="btn btn-outline-danger"
            onClick={logout}
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
