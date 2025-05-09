const mongoose = require("mongoose");

const firmSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  area: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String, // If you want to support multiple categories, change this to [String]
    required: true,
    trim: true,
  },
  region: {
    type: String,
    enum: ["Mumbai", "Delhi", "India"], // Corrected region names and case
    required: true, // Added 'required' to make sure region is always provided
  },
  offer: {
    type: String,
    trim: true,
  },
  image: {
    type: String, // Path or URL for image
    trim: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Firm = mongoose.model("Firm", firmSchema);

module.exports = Firm;
