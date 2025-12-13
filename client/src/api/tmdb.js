// client/src/api/tmdb.js
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

console.log("TMDB API KEY from env:", API_KEY); // TEMP: check it's not undefined

export async function searchMovies(query) {
  if (!API_KEY) {
    console.error("❌ TMDB API KEY missing. Set VITE_TMDB_API_KEY in client/.env");
    return [];
  }

  const trimmed = query.trim();
  if (!trimmed) return [];

  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-IN&query=${encodeURIComponent(
    trimmed
  )}`;

  console.log("TMDB request URL:", url); // TEMP

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("TMDB raw data:", data); // TEMP

    if (!data.results) return [];
    return data.results;
  } catch (err) {
    console.error("TMDB search error:", err);
    return [];
  }
}

export function getPosterUrl(path) {
  return path
    ? `https://image.tmdb.org/t/p/w500${path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";
}
