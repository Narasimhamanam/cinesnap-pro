import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";

// import ShowSelection from "./pages/ShowSelection";
import SeatSelection from "./pages/SeatSelection";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";

import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMovies from "./pages/AdminMovies";
// we will create AdminDashboard + AdminMovies just below

import AdminScreens from "./pages/AdminScreens";
import AdminShows from "./pages/AdminShows";

import MovieShows from "./pages/MovieShows";
// import SeatSelection from "./pages/SeatSelection";

import MyBookings from "./pages/MyBookings";
import TicketDetail from "./pages/TicketDetail";


function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/movie/:id/shows" element={<MovieShows />} />
          <Route path="/shows/:id/seats" element={<SeatSelection />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/bookings/:id" element={<TicketDetail />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="movies" element={<AdminMovies />} />
            {/* screens & shows pages will come later */}
            <Route path="screens" element={<AdminScreens />} />
            <Route path="shows" element={<AdminShows />} />

          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
