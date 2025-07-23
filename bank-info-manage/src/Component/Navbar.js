import React, { useState } from "react";
import "./Navbar.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useUser } from "../Context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { handleError, handleSuccess } from "../Component/Notify/Notification";
function Navbar() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { isLogin, setLogout, setIsLogin } = useUser();
  const [profile, setProfile] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(),
      });
      const { message, success, error } = await response.json();
      if (success) {
        setLogout(true);
        setTimeout(() => navigate("/login"), 2000);
        setIsLogin(false);
        setProfile(false);
        handleSuccess(message);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  return (
    <div className="navbar-container">
      <div className="logo">
        <Link to="/" className="logo-heading">
          SecureBank
        </Link>
      </div>
      <div className="nav">
        <ul>
          <NavLink to="/" className="nav-list">
            Home
          </NavLink>
          <NavLink className="nav-list">About</NavLink>
          <NavLink to="/dashboard" className="nav-list">
            Dashboard
          </NavLink>
          <NavLink to="/account" className="nav-list">
            Accounts
          </NavLink>
        </ul>
      </div>
      {isLogin ? (
        <div onClick={() => setProfile(!profile)} className="user">
          <FaUserCircle />
        </div>
      ) : (
        <div className="button">
          <Link to="/signup" className="btn">
            Login
          </Link>
        </div>
      )}

      {profile && (
        <div className="profile-box">
          <h3>{user.name}</h3>
          <p>{user.email}</p>

          <div className="profile-button">
            <button onClick={handleLogout} className="btn">
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
