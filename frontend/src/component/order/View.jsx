import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert library
import TambahOrder from "./TambahOrder";

const Views = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/order");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleAddProduct = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/order/${id}`);
      fetchOrders(); // Refetch orders after deletion
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Order has been deleted successfully.",
        timer: 2000, // Optional, how long before the alert closes automatically
        timerProgressBar: true, // Optional, showing a progress bar
        showConfirmButton: false, // Optional, hide the "OK" button
      });
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-start">
        <h1 className="text-2xl font-bold">Orders</h1>
        <button
          onClick={handleAddProduct}
          className="bg-teal-800 text-white px-4 py-2 rounded hover:bg-teal-700 ml-[826px]"
        >
          Tambah Orders
        </button>
      </div>
      <div className="relative overflow-hidden shadow-md rounded-lg mt-3">
        <table className="table-fixed w-full text-left">
          <thead className="uppercase bg-gray-600 text-gray-200">
            <tr>
              <th className="py-1 border text-center p-2">Product</th>
              <th className="py-1 border text-center p-2">Amount</th>
              <th className="py-1 border text-center p-2">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-500">
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="py-5 border text-center p-2">
                  <div>{order.product.name}</div>
                </td>
                <td className="py-5 border text-center p-2">{order.amount}</td>
                <td className="py-5 border text-center p-2">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/orders/${order._id}`}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalVisible && <TambahOrder onClose={handleCloseModal} />}
    </>
  );
};

export default Views;
