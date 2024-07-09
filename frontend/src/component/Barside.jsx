import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Barside = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem("token");

      // Kirim permintaan logout ke server dengan menyertakan credentials
      await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // Sertakan credentials untuk menghapus cookies di server
        }
      );

      // Hapus token dari session storage dan cookies
      sessionStorage.removeItem("token");
      removeCookie("token", { path: "/" });

      // Arahkan ke halaman login
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
      <div className="flex flex-col p-4">
        <Link to="/" className="py-2 px-4 rounded hover:bg-gray-700">
          Profile
        </Link>
        <Link to="/products" className="py-2 px-4 rounded hover:bg-gray-700">
          Products
        </Link>
        <Link to="/categories" className="py-2 px-4 rounded hover:bg-gray-700">
          Categories
        </Link>
        <Link to="/orders" className="py-2 px-4 rounded hover:bg-gray-700">
          Orders
        </Link>
        <div className="mt-[280px]">
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-500 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Barside;
