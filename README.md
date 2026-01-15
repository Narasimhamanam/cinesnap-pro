# 🎬 CineSnap Pro

CineSnap Pro is a **full-stack movie ticket booking web application** inspired by modern platforms like **BookMyShow** and **Netflix**.  
It allows users to **browse movies, select seats, book tickets, and manage bookings** through a clean and modern UI.

This project is built as a **real-world college project** using the **MERN stack**, focusing on authentication, authorization, booking workflows, and UI/UX best practices.

---

## 🚀 Features

### 👤 User Features
- User registration and login (JWT-based authentication)
- Browse all available movies
- View movie details and showtimes
- Interactive seat selection (Available / Selected / Booked)
- Secure ticket booking flow
- QR-code based digital tickets
- View and re-download booked tickets
- Persistent login using localStorage

---

### 🎟️ Booking Features
- Netflix-style movie catalog UI
- Real-time seat selection layout
- Automatic ticket price calculation
- Booking confirmation page
- Download / Print ticket option
- Booking history via **My Tickets**

---

### 🔐 Admin Features
- Admin-only protected routes
- Add / import movies
- Delete movies
- Role-based access control (Admin & User)

---

## 🖼️ Application Screens
- Home page (Netflix-style hero section)
- Login & Register pages
- Movie catalog
- Movie details page
- Showtime selection
- Seat selection screen
- Payment & booking confirmation
- QR-code based digital ticket
- My Tickets dashboard

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Context API (AuthContext)
- Modern dark-themed UI with custom CSS

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt (password hashing)
- CORS
- dotenv

### External API
- TMDB API (movie data and posters)

---

## 📂 Project Structure

```bash
CineSnap-Pro/
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/             # Axios & TMDB API setup
│   │   ├── components/
│   │   ├── context/         # AuthContext
│   │   ├── pages/
│   │   └── App.jsx
│
├── backend/                # Node + Express backend
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── index.js
│   ├── .env
│   └── package.json
│
└── README.md
```
## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
TMDB_API_KEY=your_tmdb_api_key
```
### Backend (`backend/.env`)
```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```
