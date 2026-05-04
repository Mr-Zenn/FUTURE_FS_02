import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";

dotenv.config();

const app = express();

/*
  ✅ CORS FIX (important)
  - Allows your Vercel frontend to talk to Render backend
  - In production, you can replace "*" with your Vercel URL
*/
app.use(cors({
  origin: "https://future-fs-02-xi-cyan.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Health route
app.get("/", (req, res) => res.send("CRM API Running"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

// PORT (Render will provide this automatically)
const PORT = process.env.PORT || 5000;

// DB connect + server start
connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });