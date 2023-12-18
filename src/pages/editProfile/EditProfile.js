// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// EditProfile component
const EditProfile = ({ user }) => {
  // Extract user ID and set up navigation
  const userID = user._id;
  const navigate = useNavigate();

  // Initialize state with user data
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");

  // Function to handle saving changes
  const handleSaveChanges = async (event) => {
    event.preventDefault();

    // Ensure that the fields object is updated with the latest values
    const updatedFields = { name, email, password };

    try {
      const result = await axios.put(
        `https://product-lister-backend.onrender.com/api/user-details/${userID}`,
        updatedFields
      );

      console.log(result.data);

      // After successfully saving changes, navigate to the profile page
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle resetting form fields
  const resetHandler = () => {
    setName(user.name || "");
    setEmail(user.email || "");
    setPassword("");
  };

  // Effect hook to get user details on component mount
  useEffect(() => {
    const getUserDetails = () => {
      axios
        .get(`https://product-lister-backend.onrender.com/api/user-details/${userID}`)
        .then((result) => {
          setName(result.data.name);
          setEmail(result.data.email);
          // Note: Avoid storing and displaying passwords in the frontend
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getUserDetails();
  }, [userID]); // Include userID in the dependency array

  // Render the form
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
            required
          />
        </div>

        <button type="submit" id="saveChanges">
          Save Changes
        </button>
        <br />
        <button type="button" id="reset" onClick={resetHandler}>
          Reset
        </button>
      </div>
    </form>
  );
};

// Export the EditProfile component
export default EditProfile;
