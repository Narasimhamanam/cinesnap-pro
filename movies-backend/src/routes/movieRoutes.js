const express = require("express");
const router = express.Router();
const {
  getMovies,
  getMovieById,
  addMovie,
  deleteMovie,
} = require("../controllers/movieController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/", getMovies);
router.get("/:id", getMovieById);

router.post("/", protect, adminOnly, addMovie);   // used by Import button
router.delete("/:id", protect, adminOnly, deleteMovie);

module.exports = router;
