import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import TambahProduct from "./TambahProduct"; // Make sure the import path is correct

const Views = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/product/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      Swal.fire({
        title: "Deleted!",
        text: "Product has been deleted.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-start">
        <h1 className="text-2xl font-bold">Product</h1>
        <button
          onClick={handleAddProduct}
          className="bg-teal-800 text-white px-4 py-2 rounded hover:bg-teal-700 ml-[805px]"
        >
          Tambah Product
        </button>
      </div>
      <div className="relative overflow-hidden shadow-md rounded-lg mt-3">
        <table className="table-fixed w-full text-left">
          <thead className="uppercase bg-gray-600 text-gray-200">
            <tr>
              <th className="py-1 border text-center p-2">Product</th>
              <th className="py-1 border text-center p-2">Price</th>
              <th className="py-1 border text-center p-2">Category</th>
              <th className="py-1 border text-center p-2">Code</th>
              <th className="py-1 border text-center p-2">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-500">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="py-5 border text-center p-2">{product.name}</td>
                <td className="py-5 border text-center p-2">{product.price}</td>
                <td className="py-5 border text-center p-2">
                  {product.category.name}
                </td>
                <td className="py-5 border text-center p-2">{product.code}</td>
                <td className="py-5 border text-center p-2">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/products/${product._id}`}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
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
      {isModalVisible && <TambahProduct onClose={handleCloseModal} />}
    </>
  );
};

export default Views;
