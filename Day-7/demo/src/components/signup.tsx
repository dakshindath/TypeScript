import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/signup.css";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const existingUser = localStorage.getItem(email);
    if (existingUser) {
      toast.error("User already exists! Please log in.");
      return;
    }

    const userDetails = { name, email, password };
    localStorage.setItem(email, JSON.stringify(userDetails));
    toast.success("Sign-Up Successful! Please log in.");
    navigate("/");
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Sign Up</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleSignup}>Sign Up</button>
        <p>
          Already have an account?{" "}
          <Link to="/" className="link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;