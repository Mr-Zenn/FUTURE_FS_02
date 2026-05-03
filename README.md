# FUTURE FS Task 2: Mini CRM (MERN)

## 📌 Overview
Mini CRM built using MERN stack. It allows users to manage leads and view basic analytics.

---

## 🚀 Features
- User authentication (JWT)
- Add / view / update / delete leads
- Dashboard with lead stats
- Dark / Light mode UI

---

## 🛠️ Tech Stack
- React.js
- Node.js
- Express.js
- MongoDB Atlas

---

## 📁 Structure
client/ → React frontend  
server/ → Node.js backend  

---

## ⚙️ Setup

### Clone
git clone https://github.com/Mr-Zenn/FUTURE_FS_02.git  
cd FUTURE_FS_02  

### Backend
cd server  
npm install  

Create `.env`:
PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret  

npm start  

### Frontend
cd client  
npm install  
npm run dev  

---

## 🌐 API
POST /api/auth/register  
POST /api/auth/login  

GET /api/leads  
POST /api/leads  
PUT /api/leads/:id  
DELETE /api/leads/:id  

GET /api/leads/stats  

---

## 📌 Internship
Track Code: FS  
Task: 02  
Repo: FUTURE_FS_02  

---

## 👤 Author
Jay Prakash

## 📸 Screenshots

### Login
![Login](./login.png)

### Dashboard
![Dashboard](./dashboard.png)


