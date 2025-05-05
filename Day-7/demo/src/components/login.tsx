import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = localStorage.getItem(email);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.password === password) {
        toast.success("Login Successful!");
        localStorage.setItem("currentUser", JSON.stringify(user)); 
        navigate("/home");
      } else {
        toast.error("Invalid password!");
        setPassword(""); 
      }
    } else {
      toast.error("User not found. Please sign up first.");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
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
        <button onClick={handleLogin}>Login</button>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="link">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;