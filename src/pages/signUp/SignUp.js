import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";

const SignUp = ({ setLoggedIn, signed }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (signed) {
      navigate("/profile");
    }
  }, [signed, navigate]);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("https://product-lister-backend.onrender.com/api/signup", {
        name,
        email,
        password,
      });

      resetHandler();
      localStorage.setItem("user", JSON.stringify(result.data));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const resetHandler = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="Signup">
      <form onSubmit={submitHandler}>
        <h1>Register Now</h1>
        <div className="signup-form">
          <div className="form-field">
            <span>Name:</span>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input-field"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              required
            />
          </div>

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

          <button type="submit" className="signUp">
            Sign Up
          </button>
          <button className="reset" onClick={resetHandler}>
            Reset
          </button>
          <br />
          <Link to="/login">Already have an account? Login Now</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
