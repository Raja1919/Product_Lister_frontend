import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/navbar/Navbar";
import AddProduct from "./pages/addProduct/AddProduct.js";
import Product from "./pages/product/Product";
import UpdateProduct from "./pages/updateProduct/UpdateProduct";
import Profile from "./pages/profile/Profile";
import SignUp from "./pages/signUp/SignUp";
import Login from "./pages/login/Login";

import Footer from "./components/footer/Footer";
import "./App.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
