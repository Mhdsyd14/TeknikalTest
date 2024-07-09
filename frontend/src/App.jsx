import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Products from "./pages/Product/Products";
import EditProduct from "./pages/Product/EditProduct";
import Categories from "./pages/Categories/Categories";
import EditCategories from "./pages/Categories/EditCategories";
import Orders from "./pages/Orders/Orders";
import EditOrder from "./pages/Orders/EditOrder";
import Register from "./component/Register";
import Login from "./component/Login";
import Layout from "./component/Layout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Profile />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<EditProduct />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/:id" element={<EditCategories />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<EditOrder />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
