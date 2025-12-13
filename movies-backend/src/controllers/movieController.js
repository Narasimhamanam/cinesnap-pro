// src/controllers/movieController.js
const Movie = require("../models/Movie");

// GET /api/movies
// exports.getMovies = async (req, res) => {
//   try {
//     const movies = await Movie.find().sort({ createdAt: -1 });
//     res.json(movies);
//   } catch (err) {
//     console.error("Get movies error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

exports.getMovies = async (req, res) => {
  try {
    const { search } = req.query;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const filter = {
      createdAt: { $gte: thirtyDaysAgo },
    };

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const movies = await Movie.find(filter).sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    console.error("Get movies error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET /api/movies/:id
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    console.error("Get movie by id error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/movies  (admin)
exports.addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    console.error("Add movie error:", err);
    res.status(500).json({ message: "Failed to add movie" });
  }
};

// DELETE /api/movies/:id  (admin)
exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted" });
  } catch (err) {
    console.error("Delete movie error:", err);
    res.status(500).json({ message: "Failed to delete movie" });
  }
};
