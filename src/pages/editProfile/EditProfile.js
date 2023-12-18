import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

const EditProfile = ({ user }) => {
  const userID = user._id;
  const navigate = useNavigate();

  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");

  const handleSaveChanges = async (event) => {
    event.preventDefault();

    const updatedFields = { name, email, password };

    try {
      const result = await axios.put(
        `https://product-lister-backend.onrender.com/api/user-details/${userID}`,
        updatedFields
      );

      console.log(result.data);

      navigate("/product");
    } catch (error) {
      console.error(error);
    }
  };

  const resetHandler = () => {
    setName(user.name || "");
    setEmail(user.email || "");
    setPassword("");
  };

  useEffect(() => {
    const getUserDetails = () => {
      axios
        .get(
          `https://product-lister-backend.onrender.com/api/user-details/${userID}`
        )
        .then((result) => {
          setName(result.data.name);
          setEmail(result.data.email);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getUserDetails();
  }, [userID]);

  return (
    <form onSubmit={handleSaveChanges}>
      <div className="signup-form">
        <div className="form-field">
          <span>Name:</span>
          <input
            type="text"
            name="name"
            placeholder="Change your name"
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
            placeholder="Change your email"
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
            placeholder="Change your password"
            className="input-field"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
          />
        </div>

        <button type="submit" className="saveChanges">
          Save Changes
        </button>
        <br />
        <button type="button" className="reset" onClick={resetHandler}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
