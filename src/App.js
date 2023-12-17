// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddProduct from "./pages/addProduct/AddProduct.js";
import Product from "./pages/product/Product";
import UpdateProduct from "./pages/updateProduct/UpdateProduct";
import Profile from "./pages/profile/Profile";
import SignUp from "./pages/signUp/SignUp";
import Login from "./pages/login/Login";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import "./App.css";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const signed = localStorage.getItem("user");

    if (signed) {
      const userData = JSON.parse(signed);
      setLoggedIn(true);
      setUser(userData);
    } else {
      setLoggedIn(false);
      setUser(null);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        {loggedIn && <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        <Routes>
          <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/product" element={<Product user={user} />} />
          <Route path="/add" element={<AddProduct user={user} />} />
          <Route path="/update/:id" element={<UpdateProduct user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route
            path="/signup"
            element={<SignUp setLoggedIn={setLoggedIn} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
