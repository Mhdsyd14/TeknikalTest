import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import TambahCategory from "./TambahCategory";

const Views = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddProduct = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/category/${id}`);

      const updatedCategories = categories.filter(
        (category) => category._id !== id
      );
      setCategories(updatedCategories);

      Swal.fire({
        icon: "success",
        title: "Category deleted successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error deleting category:", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete category.",
      });
    }
  };

  return (
    <>
      <div className="flex flex-row justify-start">
        <h1 className="text-2xl font-bold">Category</h1>
        <button
          onClick={handleAddProduct}
          className="bg-teal-800 text-white px-4 py-2 rounded hover:bg-teal-700 ml-[785px]"
        >
          Tambah Category
        </button>
      </div>
      <div className="relative overflow-hidden shadow-md rounded-lg mt-3">
        <table className="table-fixed w-full text-left">
          <thead className="uppercase bg-gray-600 text-gray-200">
            <tr>
              <th className="py-1 border text-center p-2">Category</th>
              <th className="py-1 border text-center p-2">Code</th>
              <th className="py-1 border text-center p-2">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-500">
            {categories.map((category) => (
              <tr key={category._id}>
                <td className="py-5 border text-center p-2">
                  <div>{category.name}</div>
                </td>
                <td className="py-5 border text-center p-2">{category.code}</td>
                <td className="py-5 border text-center p-2">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/categories/${category._id}`}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(category._id)}
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
      {isModalVisible && <TambahCategory onClose={handleCloseModal} />}
    </>
  );
};

export default Views;
