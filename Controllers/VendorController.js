const express = require("express");
const Vendor = require("../Models/Venodr");  // Make sure spelling is correct
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secretKey = process.env.WAHTISYOURANME;

// Vendor Registration
const VendorRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({
        status: false,
        message: "Vendor already registered with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newVendor = new Vendor({
      username,
      email,
      password: hashedPassword,
    });

    await newVendor.save();

    res.status(201).json({
      status: true,
      message: "Vendor registered successfully",
      data: {
        id: newVendor._id,
        username: newVendor.username,
        email: newVendor.email,
      },
    });
  } catch (err) {
    console.error("Error registering vendor:", err);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

// Vendor Login
const VendorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({
        status: false,
        message: "Invalid login credentials",
      });
    }

    const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: "1h" });

    res.status(200).json({
      status: true,
      message: "Login successful",
      token,
      data: {
        id: vendor._id,
        username: vendor.username,
        email: vendor.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      status: false,
      message: "Login failed due to server error",
    });
  }
};

module.exports = { VendorRegister, VendorLogin };
