const express = require("express");
const router = express.Router();
const {
  login,
  forgotPassword,
  resetPassword,
} = require("../Controllers/authController");

router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);

module.exports = router;