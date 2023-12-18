import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = ({ user }) => {
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    axios
      .get(`https://product-lister-backend.onrender.com/api/products`)
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
      .delete(`https://product-lister-backend.onrender.com/api/product/${id}`)
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
        <div className="product-add m-3">
          <h1>Product List</h1>
          <div className="button-container">
            <Link to="/add" className="btn btn-primary ">
              Add Product
            </Link>
          </div>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
