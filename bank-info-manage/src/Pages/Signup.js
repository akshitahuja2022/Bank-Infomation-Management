import React from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/AuthContext";
import { handleError, handleSuccess } from "../Component/Notify/Notification";
function Signup() {
  const navigate = useNavigate();
  const { user, setUser, setIsLogin } = useUser();

  const handleSubmit = async () => {
    const payload = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    // http://localhost:4000/auth/signup
    try {
      const response = await fetch(
        "https://bank-infomation-management.vercel.app/auth/signup",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      const { message, success, error } = result;
      if (success) {
        handleSuccess(message);
        setIsLogin(true);
        setUser({
          name: result?.user?.name,
          email: result?.user?.email,
        });
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/login");
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!error) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
      console.log("error", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="heading">
        <h4>Create your account</h4>
      </div>

      <form action="">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            type="text"
            placeholder="Enter Your Name"
            required
          />
        </div>
        <div className="field input">
          <label htmlFor="email">Email</label>
          <input
            value={user.email}
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter Your Email"
            required
          />
        </div>
        <div className="field input">
          <label htmlFor="password">Password</label>
          <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            placeholder="Enter Your Password"
            required
          />
        </div>

        <div className="field input">
          <button onClick={handleSubmit} className="btn">
            Create Account
          </button>
        </div>

        <div
          className="account"
          onClick={() => {
            navigate("/login");
          }}
        >
          <p>Do you have an Account?Login</p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
