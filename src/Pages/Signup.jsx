import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const response = await API.post("/user/signup", data);

      alert("Account created successfully!");

      navigate("/signin");

    } catch (error) {
  console.log("Signup Error:", error);
  console.log("Response:", error.response);
  alert(error.response?.data?.mssg || "Signup failed");
}
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h1>Sign Up</h1>

        <input name="name" placeholder="Name" className="input-box" onChange={handleChange} />
        <input name="email" placeholder="Email" className="input-box" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="input-box" onChange={handleChange} />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" className="input-box" onChange={handleChange} />

        <button className="auth-btn" onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
};

export default Signup;
