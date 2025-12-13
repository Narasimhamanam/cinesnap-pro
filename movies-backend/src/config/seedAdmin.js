// src/config/seedAdmin.js
const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function seedAdmin() {
  try {
    const existing = await User.findOne({ role: "ADMIN" });
    if (existing) {
      console.log("👑 Admin user already exists:", existing.email);
      return;
    }

    const hashedPass = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      name: "Super Admin",
      email: "admin@cinesnap.com",
      passwordHash: hashedPass, // IMPORTANT: use passwordHash, not password
      role: "ADMIN",
    });

    console.log(
      "⚡ Default admin created:",
      admin.email,
      "password: admin123"
    );
  } catch (err) {
    console.error("❌ seedAdmin error:", err);
  }
}

module.exports = seedAdmin;
