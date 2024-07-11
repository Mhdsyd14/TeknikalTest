const express = require("express");
const router = express.Router();
const {
  createDummyProduct,
  createDummyCategory,
  createDummyOrder,
  createDummyUser,
} = require("./controller");

router.get("/dummy/product", createDummyProduct);
router.get("/dummy/category", createDummyCategory);
router.get("/dummy/order", createDummyOrder);
router.get("/dummy/users", createDummyUser);

module.exports = router;
