import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const OrderEdit = ({ orderId }) => {
  const [order, setOrder] = useState({
    product: "",
    amount: "",
  });

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/order/${orderId}`
        );
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchOrder();
    fetchProducts();
  }, [orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/order/${orderId}`, order);
      Swal.fire({
        icon: "success",
        title: "Order Updated",
        text: "The order has been updated successfully!",
      }).then(() => {
        navigate("/orders");
      });
    } catch (error) {
      console.error("Error updating order:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "There was an error updating the order.",
      });
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl mb-4">Edit Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="product"
          >
            Product
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="product"
            name="product"
            value={order.product}
            onChange={handleChange}
          >
            <option value="">Select a Product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            name="amount"
            type="text"
            value={order.amount}
            onChange={handleChange}
            placeholder="Amount"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderEdit;
