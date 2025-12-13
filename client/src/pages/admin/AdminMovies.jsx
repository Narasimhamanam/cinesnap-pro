// // src/pages/admin/AdminMovies.jsx
// import { useEffect, useState } from "react";
// import api from "../../api/axiosInstance";
// import { searchMovies, getPosterUrl } from "../../api/tmdb";

// const AdminMovies = () => {
//   const [query, setQuery] = useState("");
//   const [tmdbResults, setTmdbResults] = useState([]);
//   const [movies, setMovies] = useState([]);
//   const [loadingSearch, setLoadingSearch] = useState(false);
//   const [importingId, setImportingId] = useState(null);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   // load movies already stored in CineSnap
//   const fetchMovies = async () => {
//     try {
//       const res = await api.get("/movies");
//       setMovies(res.data);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load existing movies");
//     }
//   };

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");

//     if (!query.trim()) return;

//     setLoadingSearch(true);
//     const results = await searchMovies(query);
//     setTmdbResults(results);
//     setLoadingSearch(false);

//     if (!results.length) {
//       setMessage("No movies found for that search.");
//     }
//   };

//   const handleImport = async (m) => {
//     setError("");
//     setMessage("");
//     setImportingId(m.id);

//     try {
//       await api.post("/movies", {
//         title: m.title,
//         description: m.overview,
//         language: m.original_language,
//         posterUrl: getPosterUrl(m.poster_path),
//         releaseDate: m.release_date || null,
//         rating: m.vote_average ? m.vote_average.toFixed(1) : null,
//       });

//       setMessage(`Imported: ${m.title}`);
//       await fetchMovies();
//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.message || `Failed to import ${m.title}`
//       );
//     } finally {
//       setImportingId(null);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this movie from CineSnap?")) return;
//     setError("");
//     setMessage("");

//     try {
//       await api.delete(`/movies/${id}`);
//       setMessage("Movie deleted.");
//       await fetchMovies();
//     } catch (err) {
//       console.error(err);
//       setError("Failed to delete movie");
//     }
//   };

//   return (
//     <div className="admin-main-card">
//       <div className="admin-card-header">
//         <h1 className="page-title">Manage Movies</h1>
//         <p className="page-subtitle">
//           Search movies from TMDB and import them into CineSnap in one click.
//         </p>
//       </div>

//       {/* SEARCH + TMDB RESULTS */}
//       <div className="admin-card-section">
//         <form
//           onSubmit={handleSearch}
//           style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}
//         >
//           <input
//             className="input"
//             style={{ maxWidth: 360 }}
//             placeholder="Search TMDB (e.g., Salaar, Pushpa, Avatar)"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//           <button className="btn" type="submit" disabled={loadingSearch}>
//             {loadingSearch ? "Searching..." : "Search TMDB"}
//           </button>
//         </form>

//         {message && (
//           <p style={{ color: "lime", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
//             {message}
//           </p>
//         )}
//         {error && <p className="error-text">{error}</p>}

//         {tmdbResults.length > 0 && (
//           <>
//             <h2 className="section-title">TMDB Results</h2>
//             <div className="movie-grid">
//               {tmdbResults.map((m) => (
//                 <div key={m.id} className="movie-card">
//                   <img
//                     src={getPosterUrl(m.poster_path)}
//                     alt={m.title}
//                     className="movie-poster"
//                   />
//                   <div className="movie-card-body">
//                     <div className="movie-title">{m.title}</div>
//                     <div className="movie-meta">
//                       {m.release_date?.slice(0, 4) || "----"} •{" "}
//                       {m.original_language?.toUpperCase()}
//                     </div>
//                     <p className="movie-overview">
//                       {m.overview || "No description available from TMDB."}
//                     </p>
//                     <button
//                       className="btn"
//                       type="button"
//                       disabled={importingId === m.id}
//                       onClick={() => handleImport(m)}
//                     >
//                       {importingId === m.id
//                         ? "Importing..."
//                         : "Import to CineSnap"}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       {/* EXISTING MOVIES IN CINESNAP */}
//       <div className="admin-card-section" style={{ marginTop: "1.5rem" }}>
//         <h2 className="section-title">Movies in CineSnap</h2>

//         {movies.length === 0 ? (
//           <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
//             No movies yet. Import from TMDB above.
//           </p>
//         ) : (
//           <div className="admin-table">
//             {movies.map((m) => (
//               <div key={m._id} className="admin-row">
//                 <div>
//                   <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>
//                     {m.title}
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "0.8rem",
//                       color: "var(--text-muted)",
//                     }}
//                   >
//                     {m.language?.toUpperCase() || "LANG"} •{" "}
//                     {m.releaseDate?.slice(0, 4) || "----"}
//                   </div>
//                 </div>
//                 <button
//                   className="btn"
//                   type="button"
//                   style={{ background: "#ef4444", paddingInline: "0.7rem" }}
//                   onClick={() => handleDelete(m._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminMovies;
