const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

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

const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL, // your deployed frontend link, set in Render > Environment
].filter(Boolean);

app.use(
  cors({
    origin: true,
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
// CV upload setup (used by the "Change CV" button in My Profile)
// -----------------------------

const cvUploadDir = path.join(__dirname, "uploads", "cv");
fs.mkdirSync(cvUploadDir, { recursive: true });

const cvStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, cvUploadDir),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const allowedCvTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const cvUpload = multer({
  storage: cvStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    if (
      allowedCvTypes.includes(file.mimetype) ||
      file.mimetype.startsWith("image/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, DOCX or image files are allowed."));
    }
  },
});

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

// Change / replace CV from My Profile page
app.post("/api/upload-cv", cvUpload.single("cv"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded.",
    });
  }

  res.json({
    success: true,
    cv: {
      fileName: req.file.filename,
      originalName: req.file.originalname,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
      filePath: req.file.path,
    },
  });
});

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
