import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Barside from "./Barside";

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex">
      <Barside />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
