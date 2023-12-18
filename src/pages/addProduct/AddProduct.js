import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddProduct.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const fields = { name, price, brand, category };

  const submitHandler = (event) => {
    event.preventDefault();

    axios
      .post(
        "https://product-lister-backend.onrender.com/api/add-product",
        fields
      )
      .then(() => {
        resetHandler();
        navigate("/product");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const resetHandler = () => {
    setName("");
    setPrice("");
    setBrand("");
    setCategory("");
  };

  return (
    <div className="addProduct">
      <form onSubmit={submitHandler}>
        <h1 className="mt-3">Add Products</h1>
        <div className="button-container">
          <Link to="/product" className="button">
            Product List
          </Link>
        </div>
        <br />
        <div className="add-product-form">
          <div className="form-field">
            <span>Name:</span>
            <input
              type="text"
              name="name"
              placeholder="Enter product's name"
              className="input-field"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              required
            />
          </div>

          <div className="form-field">
            <span>Price:</span>
            <input
              type="text"
              name="price"
              placeholder="Enter product's price"
              className="input-field"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <span>Brand:</span>
            <input
              type="text"
              name="brand"
              placeholder="Enter product's brand"
              className="input-field"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <span>Category:</span>
            <input
              type="text"
              name="category"
              placeholder="Enter product's category"
              className="input-field"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary add ">
            Add
          </button>
          <button className="btn btn-primary reset" onClick={resetHandler}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
