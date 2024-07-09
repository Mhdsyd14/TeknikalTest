const Category = require("../categories/model");

// Create Category
const createCategory = async (req, res) => {
  try {
    const { code, name } = req.body;

    // Check if code is unique
    const codeExists = await Category.findOne({ code });
    if (codeExists) {
      return res.status(400).json({ msg: "Code already exists" });
    }

    const category = new Category({ code, name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get a category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Update a category by ID
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name } = req.body;
    let category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    // Check if code is unique
    if (code && code !== category.code) {
      const codeExists = await Category.findOne({ code });
      if (codeExists) {
        return res.status(400).json({ msg: "Code already exists" });
      }
      category.code = code;
    }

    if (name) category.name = name;
    category.updated_at = Date.now();
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    await category.deleteOne();
    res.status(200).json({ msg: "Category removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
