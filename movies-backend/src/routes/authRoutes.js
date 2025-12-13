const express = require("express");
const router = express.Router();

const {
  register,
  login,
  sendResetOTP,
  verifyOTP,
  resetPassword,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", sendResetOTP);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

module.exports = router;
