const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

// Routes
const authRoutes = require("./routes/authRoutes");
const profileSetupRoutes = require("./routes/ProfileSetupRoute");
const cvRoutes = require("./routes/cvRoutes");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("ERROR: MONGO_URI is not defined in your .env file.");
  process.exit(1);
}

// -----------------------------
// Middleware
// -----------------------------

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  "/uploads/cv",
  express.static(path.join(__dirname, "uploads", "cv"))
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -----------------------------
// Test route
// -----------------------------

app.get("/", (req, res) => {
  res.json({
    message: "QIDAME backend is running successfully.",
  });
});

// -----------------------------
// Routes
// -----------------------------

app.use("/auth", authRoutes);
app.use("/api/profile-setup", profileSetupRoutes);
app.use("/api/cv", cvRoutes);

// -----------------------------
// 404 handler (must come AFTER all real routes)
// -----------------------------

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// -----------------------------
// Error handler
// -----------------------------

app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error.",
  });
});

// -----------------------------
// MongoDB connection
// -----------------------------

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully.");
    app.listen(PORT, () => {
      console.log(`QIDAME backend running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });