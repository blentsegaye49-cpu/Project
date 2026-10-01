const express = require("express");

const router = express.Router();

const ProfileSetup = require("../models/ProfileSetup");

// ============================================
// SAVE / UPDATE PROFILE SETUP
// POST /api/profile-setup
// ============================================

router.post("/", async (req, res) => {
  try {
    console.log("Profile setup data received:", req.body);

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "User email is required.",
      });
    }

    const savedProfile = await ProfileSetup.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      {
        ...req.body,
        email: email.toLowerCase().trim(),
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(201).json({
      success: true,
      message: "Profile completed and saved successfully!",
      profile: savedProfile,
    });
  } catch (error) {
    console.error("Profile setup error:", error);

    res.status(400).json({
      success: false,
      message: "Could not save profile setup.",
      error: error.message,
    });
  }
});

// ============================================
// GET PROFILE BY EMAIL
// GET /api/profile-setup/:email
// ============================================

router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email.toLowerCase().trim();

    const profile = await ProfileSetup.findOne({ email });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found.",
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Profile loading error:", error);

    res.status(500).json({
      success: false,
      message: "Could not load profile.",
      error: error.message,
    });
  }
});

// ============================================
// GET ALL PROFILES
// GET /api/profile-setup
// ============================================

router.get("/", async (req, res) => {
  try {
    const profiles = await ProfileSetup.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      profiles,
    });
  } catch (error) {
    console.error("Profile loading error:", error);

    res.status(500).json({
      success: false,
      message: "Could not load profiles.",
      error: error.message,
    });
  }
});

module.exports = router;