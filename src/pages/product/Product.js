import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = ({ user }) => {
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    axios
      .get(`http://localhost:9000/api/products`)
      .then((result) => {
        if (result.data) {
          setProducts(result.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:9000/api/product/${id}`)
      .then(() => {
        getProducts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const currentUserID = user && user._id;

  return (
    <div>
      <div className="product">
        <div className="product-add mt-3">
          <h1>Product List</h1>
          <div className="button-container">
            <Link to="/add" className="btn btn-primary ">
              Add Product
            </Link>
          </div>
        </div>
      </div>

      {products.length > 0 ? (
        <div>
          <div className="card-container mt-3">
            {products.map((product, index) => (
              <div key={index} className="card">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Price: {product.price}</p>
                  <p className="card-text">Brand: {product.brand}</p>
                  <p className="card-text">Category: {product.category}</p>
                  <div className="btn-group">
                    <button
                      onClick={() => deleteHandler(product._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    {product._id && (
                      <Link to={`/update/${product._id}`}>
                        <button className="btn btn-warning">Update</button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="product-header">
            <h3 className="product-add">
              {currentUserID ? "It's Empty Here" : "No Results Found"}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
