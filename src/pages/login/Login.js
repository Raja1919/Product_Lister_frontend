import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fields = { email, password };

  const navigate = useNavigate();

  const resetHandler = () => {
    setEmail("");
    setPassword("");
  };

  const loginHandler = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:9000/api/login`, fields)
      .then((result) => {
        console.log(result.data);

        if (result.data.user) {
          resetHandler();
          localStorage.setItem("user", JSON.stringify(result.data.user));
          setLoggedIn(true);
          navigate("/");
        } else {
          // Handle incorrect login details
          alert("Wrong Details. Fill correct details.");
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle network or server errors
        alert("An error occurred. Please try again later.");
      });
  };

  return (
    <div className="login">
      <form onSubmit={loginHandler}>
        <h1>Login</h1>
        <div className="login-form">
          <div className="form-field">
            <span>Email:</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input-field"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-field">
            <span>Password:</span>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input-field"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          <button type="submit" id="login">
            Log in
          </button>
          <button id="reset" onClick={resetHandler}>
            Reset
          </button>
          <br />
          <Link to="/signup">Don't have an account? Sign up Now</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
