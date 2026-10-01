const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const CV = require("../models/CV");

const router = express.Router();

// Create uploads/cv folder if it does not exist
const uploadFolder = path.join(__dirname, "../uploads/cv");

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  },
});

// File upload
const upload = multer({
  storage: storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: function (req, file, cb) {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only PDF, DOC, DOCX, JPG and PNG files are allowed."
        )
      );
    }
  },
});

// POST /api/cv
router.post("/", upload.single("cv"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a CV.",
      });
    }

    const newCV = new CV({
      originalName: req.file.originalname,
      fileName: req.file.filename,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      filePath: req.file.path,
    });

    const savedCV = await newCV.save();

    res.status(201).json({
      success: true,
      message: "CV uploaded successfully!",
      cv: savedCV,
    });
  } catch (error) {
    console.error("CV upload error:", error);

    res.status(500).json({
      success: false,
      message: "CV upload failed.",
      error: error.message,
    });
  }
});

module.exports = router;