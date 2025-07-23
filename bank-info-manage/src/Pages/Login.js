import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/AuthContext";
import { handleError, handleSuccess } from "../Component/Notify/Notification";
function Login() {
  const navigate = useNavigate();

  const { user, setUser, setIsLogin } = useUser();

  const handleLogin = async (e) => {
    console.log("login button click");
    e.preventDefault();

    const payload = {
      email: user.email,
      password: user.password,
    };

    try {
      const response = await fetch(
        "https://bank-infomation-management.vercel.app/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const { message, success, error } = await response.json();
      if (success) {
        setIsLogin(true);
        setTimeout(() => navigate("/"), 2000);

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
    <div className="signup-container">
      <div className="heading">
        <h4>Log in to your account</h4>
      </div>

      <form action="">
        <div className="field input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter Your Email"
            required
          />
        </div>
        <div className="field input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter Your Password"
            required
          />
        </div>

        <div className="forget">
          <p>Forget Password?</p>
        </div>

        <div className="field input">
          <button onClick={handleLogin} className="btn">
            Log in
          </button>
        </div>

        <div
          className="account"
          onClick={() => {
            navigate("/signup");
          }}
        >
          <p>Don't have an Account?Signup</p>
        </div>
      </form>
    </div>
  );
}

export default Login;
