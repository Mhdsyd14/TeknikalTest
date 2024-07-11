const Product = require("../product/model");
const Category = require("../categories/model");
const Order = require("../orders/model");
const User = require("../user/model");

const createDummyProduct = async (req, res) => {
  try {
    const dummyProduct = new Product({
      category: "668fdff713bb118358156f0f",
      code: 123456,
      name: "Dummy Product",
      price: 699,
    });

    await dummyProduct.save();

    res.status(201).send("Dummy product added");
  } catch (error) {
    console.error("Error adding dummy product:", error);
    res.status(500).send("Error adding dummy product");
  }
};

const createDummyCategory = async (req, res) => {
  try {
    const dummyData = {
      code: 209,
      name: "Dummy Category",
    };

    const dummyCategory = new Category(dummyData);
    await dummyCategory.save();
    res.status(201).send("Dummy category added");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const createDummyOrder = async (req, res) => {
  try {
    const dummyOrder = new Order({
      product: "668fe0c77f0159f6c08328df",
      amount: 5,
    });

    await dummyOrder.save();

    res
      .status(201)
      .json({ msg: "Dummy order created successfully", dummyOrder });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const createDummyUser = async (req, res) => {
  const dummyUserData = {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    phone_number: "1234567890",
    address: "123 Main St, Anytown, USA",
  };

  try {
    let user = await User.findOne({ email: dummyUserData.email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User(dummyUserData);

    await user.save();

    res.status(201).json({ msg: "Dummy user registered successfully", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createDummyProduct,
  createDummyCategory,
  createDummyOrder,
  createDummyUser,
};
