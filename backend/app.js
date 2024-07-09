const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
dotenv.config();

const app = express();
const userRouter = require("./app/user/router");
const categoryRouter = require("./app/categories/router");
const productRouter = require("./app/product/router");
const orderRouter = require("./app/orders/router");

connectDB();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));

app.use("/auth", userRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", orderRouter);

module.exports = app;
