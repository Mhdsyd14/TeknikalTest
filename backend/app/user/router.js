const express = require("express");
const { register, login, logout } = require("./controller");
const router = express.Router();
const auth = require("../../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", auth, logout);

module.exports = router;
