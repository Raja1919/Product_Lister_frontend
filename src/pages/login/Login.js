import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fields = { email, password };

  const navigate = useNavigate();

  const loginHandler = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:9000/api/user/login`, fields)
      .then((result) => {
        console.log(result.data);
        if (result.data.name) {
          resetHandler();
          localStorage.setItem("user", JSON.stringify(result.data));
          navigate("/profile");
        } else {
          alert("Wrong Details. Fill correct details.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const resetHandler = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-form">
      <form onSubmit={loginHandler}>
        <h1 className="title">Login</h1>
        <div>
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
          <button id="reset" className="mt-3" onClick={resetHandler}>
            Reset
          </button>
          <br />
          <div className="mt-3 text-center">
            <Link to="/signup">Don't have an account? Sign up Now</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
