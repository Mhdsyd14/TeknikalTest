import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import Barside from "./Barside";

const Layout = () => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies.token;

    if (!token) {
      // Redirect to login page if token is not present
      navigate("/login");
    }
  }, [cookies.token, navigate]);

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
