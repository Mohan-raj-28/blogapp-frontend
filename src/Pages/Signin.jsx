import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/signin.css";

const Signin = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSignin = async () => {
    try {
      const res = await API.post("/user/signin", data);

      // store JWT token
      localStorage.setItem("token", res.data.token);

      alert("Logged in successfully!");

      navigate("/home");

    } catch (err) {
      alert(err.response?.data?.mssg || "Invalid email or password");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h1>Sign In</h1>

        <input name="email" placeholder="Email" className="input-box" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="input-box" onChange={handleChange} />

        <button className="auth-btn" onClick={handleSignin}>Sign In</button>

        <Link to="/signup" className="link">
          Don't have an account? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Signin;
