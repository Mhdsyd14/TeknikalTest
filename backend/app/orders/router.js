const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../orders/controller");

router.post("/order", createOrder);
router.get("/order", getOrders);
router.get("/order/:id", getOrderById);
router.put("/order/:id", updateOrder);
router.delete("/order/:id", deleteOrder);

module.exports = router;
