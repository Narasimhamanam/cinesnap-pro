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
### Frontend (`client/.env`)
```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

---
## Website Client side overlook

<img width="1909" height="862" alt="Image" src="https://github.com/user-attachments/assets/605afefe-f910-4628-b43c-510cf2d759b2" />
<img width="1915" height="859" alt="Image" src="https://github.com/user-attachments/assets/a798c35d-ed21-4895-bd58-5a5f2bad8ee2" />
<img width="1915" height="864" alt="Image" src="https://github.com/user-attachments/assets/b24d04f7-3bfc-47d2-abc6-2f89b3f444d8" />

<img width="1914" height="862" alt="Image" src="https://github.com/user-attachments/assets/040e205e-08c1-46d8-ac28-40935974aecd" />

<img width="1913" height="862" alt="Image" src="https://github.com/user-attachments/assets/cf6d8bd0-5d65-4be1-9188-de99d6c97bb2" />


<img width="1914" height="867" alt="Image" src="https://github.com/user-attachments/assets/597b09e4-61d2-403e-a5d5-7ca8901b9fde" />

<img width="1913" height="873" alt="Image" src="https://github.com/user-attachments/assets/556b6cf8-c5da-48ce-b43d-41bda21ff92a" />

<img width="1912" height="863" alt="Image" src="https://github.com/user-attachments/assets/e35cd127-4b81-402e-b420-5c7b9e5caf76" />

<img width="1911" height="861" alt="Image" src="https://github.com/user-attachments/assets/7292fa13-f589-48cc-8c19-6feb162951ca" />

<img width="1914" height="863" alt="Image" src="https://github.com/user-attachments/assets/9a5b1548-834c-4cb5-8289-4c0f335896a7" />

---
## website Admin Side overlook

<img width="1916" height="859" alt="Image" src="https://github.com/user-attachments/assets/2c3a4e9a-c0f1-4942-a9a4-2085c8a78bf4" />
<img width="1914" height="866" alt="Image" src="https://github.com/user-attachments/assets/af8d0eca-d3ec-4f12-af84-332919c61011" />
<img width="1910" height="858" alt="Image" src="https://github.com/user-attachments/assets/7285c1f5-c948-4827-bd86-2079242074f4" />
<img width="1911" height="859" alt="Image" src="https://github.com/user-attachments/assets/bbb45ea7-bb1b-4ed7-8835-d845a7d67acf" />
<img width="1915" height="862" alt="Image" src="https://github.com/user-attachments/assets/0b54498c-d639-401d-aed6-5a9887f22425" />

## 🤝 Further Contributions

Contributions are always welcome! 🎉  
If you would like to improve this project, feel free to contribute in the following ways:

- Fix bugs or improve existing features
- Enhance UI/UX design
- Optimize backend performance
- Add new features like payments, reviews, or analytics
- Improve documentation or code readability

### How to Contribute
1. Fork this repository
2. Create a new branch  
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit
   ```bash
   git commit -m "Added new feature"
   ```
4. Push to your forked repository
   ```bash
   git push origin feature-name
    ```
5. Open a Pull Request
   All contributions will be reviewed and appreciated ❤️


## 📥 How to Clone and Use This Project

Follow the steps below to clone and run the project locally.

# 1️⃣ Clone the Repository
```bash
git clone https://github.com/Narasimhamanam/cinesnap-pro.git
```

# 2️⃣ Navigate into the Project Folder
```bash
cd cinesnap-pro
```
# 3️⃣ Open Project in VS Code
```bash
code .
```

# ▶️ Run the Application
```bash
Start Backend Server
cd backend
npm install
npm run dev
```

Backend will run on:
```bash
http://localhost:5000
```
Start Frontend Server

Open a new terminal and run:
```bash
cd client
npm install
npm run dev
```

Frontend will run on:
```bash
http://localhost:5173
```
# ✅ Notes

Make sure Node.js and npm are installed

Add required environment variables before running the project

MongoDB should be running locally or via MongoDB Atlas


---

