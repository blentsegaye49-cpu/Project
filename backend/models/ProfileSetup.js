const mongoose = require("mongoose");

const profileSetupSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    region: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    educationLevel: {
      type: String,
      required: true,
    },

    institution: {
      type: String,
      required: true,
    },

    fieldOfStudy: {
      type: String,
      required: true,
    },

    graduationYear: {
      type: String,
      required: true,
    },

    jobTitle: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    startDate: {
      type: String,
      required: true,
    },

    endDate: {
      type: String,
      required: true,
    },

    skill: {
      type: String,
      required: true,
    },

    skillLevel: {
      type: String,
      required: true,
    },

    industry: {
      type: String,
      required: true,
    },

    employmentType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ProfileSetup",
  profileSetupSchema
);