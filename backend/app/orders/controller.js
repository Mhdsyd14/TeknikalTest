const Order = require("../orders/model");
const Product = require("../product/model");

const createOrder = async (req, res) => {
  const { product, amount } = req.body;

  try {
    const productExists = await Product.findById(product);
    if (!productExists) {
      return res.status(400).json({ msg: "Product not found" });
    }

    const order = new Order({
      product,
      amount,
    });

    await order.save();
    res.status(201).json({ msg: "Order created successfully", order });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("product");
    res.status(200).json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "product",
      "name price"
    );
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Update an order
const updateOrder = async (req, res) => {
  const { product, amount } = req.body;

  try {
    let order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    const productExists = await Product.findById(product);
    if (!productExists) {
      return res.status(400).json({ msg: "Product not found" });
    }

    order.product = product;
    order.amount = amount;
    order.updated_at = Date.now();

    await order.save();
    res.status(200).json({ msg: "Order updated successfully", order });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    await Order.deleteOne({ _id: req.params.id });
    res.status(200).json({ msg: "Order removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
