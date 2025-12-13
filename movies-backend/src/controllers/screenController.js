const Screen = require("../models/Screen");

// POST /api/screens
exports.createScreen = async (req, res) => {
  try {
    const { name, totalRows, seatsPerRow, cinemaName } = req.body;

    if (!name || !totalRows || !seatsPerRow) {
      return res.status(400).json({ message: "All fields required" });
    }

    const screen = await Screen.create({
      name,
      totalRows,
      seatsPerRow,
      cinemaName,
    });

    res.status(201).json(screen);
  } catch (err) {
    console.error("Create screen error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/screens
exports.getScreens = async (req, res) => {
  try {
    const screens = await Screen.find().sort({ createdAt: -1 });
    res.json(screens);
  } catch (err) {
    console.error("Get screens error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
