const express = require("express");
const { VendorRegister, VendorLogin } = require("../Controllers/VendorController");

const router = express.Router();

router.post("/register", VendorRegister);
router.post("/login", VendorLogin);  // You can now test login too

module.exports = router;
