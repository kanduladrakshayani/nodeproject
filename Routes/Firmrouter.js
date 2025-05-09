const express = require("express");
const { addFirmMiddleware } = require("../Controllers/firmcontroller");
const verifyToken = require("../Middlewares/verifyToken");

const router = express.Router();

// Just use the middleware array directly
router.post("/add-firm", verifyToken, addFirmMiddleware);

module.exports = router;
