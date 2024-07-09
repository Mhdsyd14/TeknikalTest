import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const TambahOrder = ({ onClose }) => {
  const [productOptions, setProductOptions] = useState([]);
  const [formData, setFormData] = useState({
    product: "",
    amount: "",
  });

  useEffect(() => {
    fetchProductOptions();
  }, []);

  const fetchProductOptions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/product");
      setProductOptions(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/order", formData);
      onClose();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Order has been added successfully.",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-2xl mb-4">Tambah Order</h2>
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
              onChange={handleChange}
              value={formData.product}
            >
              <option value="">Select Product</option>
              {productOptions.map((product) => (
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
              type="text"
              placeholder="Amount"
              onChange={handleChange}
              value={formData.amount}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahOrder;
