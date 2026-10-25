# 🎬 CineSnap Pro — Full-Stack Movie Ticket Booking Platform

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.0-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Render](https://img.shields.io/badge/Deploy-Render-46E3B7?style=flat&logo=render&logoColor=white)](https://render.com)

CineSnap Pro is a full-stack MERN movie ticket booking web application inspired by BookMyShow and Netflix. The platform delivers an end-to-end cinema reservation workflow: browsing live movies via TMDB, inspecting showtimes, selecting seats via an interactive real-time seat matrix, booking confirmation with QR-code digital passes, and an administrative dashboard for catalog management.

---

## 🏗️ System Architecture

```mermaid
graph TD
    User["End User / Browser"]
    Admin["Theater Administrator"]
    Client["React 18 Frontend<br/>(Vite + Tailwind CSS + Context API)"]
    API["Express.js 5.0 API<br/>(Node.js + JWT Auth Middleware)"]
    DB[("MongoDB Atlas<br/>(Mongoose Models)")]
    TMDB["TMDB Public API<br/>(Movie Metadata & Posters)"]

    User -->|Browse & Reserve Seats| Client
    Admin -->|Manage Movies & Showtimes| Client
    Client -->|Axios REST / Bearer JWT| API
    Client -.->|Direct Metadata Queries| TMDB
    API -->|Read / Write Users, Bookings, Shows| DB
```

---

## 🚀 Implemented Features

### 👤 Customer Experience
- **Catalog & Discovery:** Netflix-style hero banner and categorized movie rows powered by TMDB metadata.
- **Showtimes & Details:** Real-time synopsis, cast, runtime, release date, and theatre showtime schedules.
- **Interactive Seat Matrix:** Grid-based seat selection layout with visual status indicators (`Available`, `Selected`, `Booked`).
- **QR Digital Tickets:** Instant reservation confirmation with downloadable and printable digital tickets embedded with verification QR codes.
- **Ticket History:** Dedicated **My Tickets** dashboard showing active and past reservations.
- **Session Persistence:** JWT authentication with secure localStorage state management.

### 🔐 Administrative Management
- **Role-Based Protection:** Admin-only protected navigation guards and backend middleware.
- **Catalog Management:** Add, import, and delete cinema titles with automatic showtime generation.
- **Booking Overview:** Track reservation metrics across active movie listings.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, React Router DOM, Axios, Context API (`AuthContext`), Vanilla CSS |
| **Backend** | Node.js, Express.js 5, Mongoose, JWT (`jsonwebtoken`), `bcryptjs`, CORS, Dotenv |
| **Database** | MongoDB Atlas (Cloud NoSQL) |
| **External APIs**| The Movie Database (TMDB) API |
| **Deployment** | Render Blueprint (`render.yaml`) & Netlify (`netlify.toml`) |

---

## 📂 Project Structure

```
cinesnap-pro/
├── client/                     # React frontend (Vite)
│   ├── src/
│   │   ├── api/                # Axios instance & TMDB API clients
│   │   ├── components/         # Seat matrix, Navbar, Footer, MovieCards
│   │   ├── context/            # AuthContext provider & hooks
│   │   ├── pages/              # Home, Movies, Showtimes, Booking, MyTickets, Admin
│   │   └── App.jsx
│   ├── .env.example            # Frontend environment template
│   └── package.json
│
├── movies-backend/             # Express.js REST API
│   ├── src/
│   │   ├── controllers/        # Auth, Booking, and Movie handlers
│   │   ├── middleware/         # JWT verification & Admin guards
│   │   ├── models/             # Mongoose schemas (User, Booking, Movie)
│   │   ├── routes/             # API route declarations
│   │   └── index.js            # Express server entry point
│   ├── .env.example            # Backend environment template
│   └── package.json
│
├── netlify.toml                # Netlify frontend deployment configuration
├── render.yaml                 # Render Blueprint specification
└── README.md
```

---

## ⚙️ Environment Configuration

### Backend: `movies-backend/.env`
Create `movies-backend/.env` from [`movies-backend/.env.example`](./movies-backend/.env.example):
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/cinesnap?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
```

### Frontend: `client/.env`
Create `client/.env` from [`client/.env.example`](./client/.env.example):
```env
VITE_API_URL=http://localhost:5000
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```
*(Get a free TMDB API key at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))*

---

## 🚀 Quickstart & Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Narasimhamanam/cinesnap-pro.git
cd cinesnap-pro
```

### 2. Start the Backend Server
```bash
cd movies-backend
cp .env.example .env
# Edit .env and supply your MONGO_URI and JWT_SECRET

npm install
npm run dev
# Server listening at http://localhost:5000
```

### 3. Start the Frontend Client
```bash
# In a new terminal window
cd client
cp .env.example .env
# Edit .env and supply your VITE_TMDB_API_KEY

npm install
npm run dev
# Vite dev server running at http://localhost:5173
```

---

## 📸 Application Screenshots

### Customer Interface
<img width="1909" height="862" alt="Home Screen" src="https://github.com/user-attachments/assets/605afefe-f910-4628-b43c-510cf2d759b2" />
<img width="1915" height="859" alt="Movie Catalog" src="https://github.com/user-attachments/assets/a798c35d-ed21-4895-bd58-5a5f2bad8ee2" />
<img width="1915" height="864" alt="Movie Details" src="https://github.com/user-attachments/assets/b24d04f7-3bfc-47d2-abc6-2f89b3f444d8" />
<img width="1914" height="862" alt="Showtime Selection" src="https://github.com/user-attachments/assets/040e205e-08c1-46d8-ac28-40935974aecd" />
<img width="1913" height="862" alt="Seat Matrix" src="https://github.com/user-attachments/assets/cf6d8bd0-5d65-4be1-9188-de99d6c97bb2" />
<img width="1914" height="867" alt="Booking Confirmation" src="https://github.com/user-attachments/assets/597b09e4-61d2-403e-a5d5-7ca8901b9fde" />
<img width="1913" height="873" alt="QR Digital Ticket" src="https://github.com/user-attachments/assets/556b6cf8-c5da-48ce-b43d-41bda21ff92a" />
<img width="1912" height="863" alt="My Tickets" src="https://github.com/user-attachments/assets/e35cd127-4b81-402e-b420-5c7b9e5caf76" />

### Administrative Dashboard
<img width="1916" height="859" alt="Admin Dashboard Overview" src="https://github.com/user-attachments/assets/2c3a4e9a-c0f1-4942-a9a4-2085c8a78bf4" />
<img width="1914" height="866" alt="Add Movies Panel" src="https://github.com/user-attachments/assets/af8d0eca-d3ec-4f12-af84-332919c61011" />
<img width="1910" height="858" alt="Manage Listings" src="https://github.com/user-attachments/assets/7285c1f5-c948-4827-bd86-2079242074f4" />

---

## ⚠️ Limitations & Honest Status

- **Payment Processing:** Payment step uses a simulated instant-checkout confirmation; integration with live payment gateways (e.g., Stripe / Razorpay) is planned for future work.
- **Seat Locking Concurrency:** Simultaneous seat selection conflicts are resolved at final checkout time via unique database constraint rather than real-time WebSocket seat hold locks.
