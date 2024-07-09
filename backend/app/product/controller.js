const Product = require("../product/model");
const Category = require("../categories/model");

// Create Product
const createProduct = async (req, res) => {
  const { category, code, name, price } = req.body;

  try {
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ msg: "Category not found" });
    }

    const productExists = await Product.findOne({ code });
    if (productExists) {
      return res.status(400).json({ msg: "Product code already exists" });
    }

    const product = new Product({
      category,
      code,
      name,
      price,
    });

    // Save product
    await product.save();

    // Send success response with created product
    res.status(201).json({ msg: "Product created successfully", product });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name code");
    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get Single Product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name code"
    );
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Update Product
const updateProduct = async (req, res) => {
  const { category, code, name, price } = req.body;

  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ msg: "Category not found" });
      }
      product.category = category;
    }

    if (code) {
      const productExists = await Product.findOne({ code });
      if (productExists && productExists._id.toString() !== req.params.id) {
        return res.status(400).json({ msg: "Product code already exists" });
      }
      product.code = code;
    }

    if (name) product.name = name;
    if (price) product.price = price;

    product.updated_at = Date.now();

    await product.save();
    res.status(200).json({ msg: "Product updated successfully", product });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    await product.deleteOne();

    res.status(200).json({ msg: "Product removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
