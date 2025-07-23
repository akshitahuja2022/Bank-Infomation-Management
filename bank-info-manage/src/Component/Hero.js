import React from "react";
import "./Hero.css";
import { assests } from "../assests/assests";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/AuthContext";

function Hero() {
  const { user, isLogin } = useUser();
  const navigate = useNavigate();

  return (
    <div className="hero-container">
      <div className="heading">
        {isLogin ? (
          <h2>{user.name ? `Welcome Back, ${user.name}` : "Welcome!"}</h2>
        ) : (
          <h2>Welcome Guest</h2>
        )}

        <p>
          A secure and user-friendly platform designed to simplify your banking
          experience. Users can effortlessly register, log in, and manage their
          personal bank account details with complete privacy.
        </p>

        <button onClick={() => navigate("/signup")} className="btn">
          Get Started
        </button>
      </div>
      <div className="img">
        <img src={assests.hero} alt="" />
      </div>
    </div>
  );
}

export default Hero;
