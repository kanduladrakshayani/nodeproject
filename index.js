const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const vendorroutes = require("./Routes/routes");
const firmroutes = require("./Routes/Firmrouter"); 

const app = express();

dotenv.config();

const port = process.env.PORT ||4000;
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch((err) => {
  console.error("MongoDB connection failed:", err.message);
});

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/vendor', vendorroutes);  // 🔧 Fixed spelling
app.use('/firmroute', firmroutes);  // 🔧 Fixed spelling
app.get('/', (req, res) => {
  res.send("Hello home page");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
