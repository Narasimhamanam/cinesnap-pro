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

### 🎟️ Booking Features
- Netflix-style movie catalog UI
- Real-time seat selection layout
- Automatic ticket price calculation
- Booking confirmation page
- Download / Print ticket option
- Booking history via **My Tickets**

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

CineSnap-Pro/
│
├── client/ # React frontend
│ ├── src/
│ │ ├── api/ # Axios & TMDB API setup
│ │ ├── components/
│ │ ├── context/ # AuthContext
│ │ ├── pages/
│ │ └── App.jsx
│
├── backend/ # Node + Express backend
│ ├── src/
│ │ ├── routes/
│ │ ├── controllers/
│ │ ├── middleware/
│ │ └── index.js
│ ├── .env
│ └── package.json
│
└── README.md

yaml
Copy code

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
TMDB_API_KEY=your_tmdb_api_key

shell
Copy code

### Frontend (`client/.env`)
VITE_TMDB_API_KEY=your_tmdb_api_key

yaml
Copy code

---

## ▶️ How to Run the Project

### 1️⃣ Start the Backend Server
```bash
cd backend
npm install
npm run dev
Backend runs on:

arduino
Copy code
http://localhost:5000
```
###2️⃣ Start the Frontend
```bash
Copy code
cd client
npm install
npm run dev
Frontend runs on:

arduino
Copy code
http://localhost:5173
```
###🔒 Authentication & Authorization
JWT-based authentication

Token stored securely in localStorage

Token automatically attached to protected API requests

Role-based access control for admin features

Auto-login support after page refresh

###🎯 Learning Outcomes
Hands-on MERN stack development

REST API design and integration

JWT authentication and middleware

Role-based access control

Seat booking logic implementation

React Context API for global state

Real-world project structure and deployment readiness

UI/UX design inspired by production applications

###🚧 Future Enhancements
Online payment gateway integration

Real-time seat locking using WebSockets

Multiple theatres and screens

Movie ratings and reviews

Admin analytics dashboard

Email ticket confirmation

###👨‍💻 Developer
Narasimha
Full Stack Developer | College Project

Built with ❤️ as a real-world learning project.
