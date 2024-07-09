// Layout.js
import React from "react";
import Barside from "./Barside";
import { Outlet } from "react-router-dom";

const Layout = () => {
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
