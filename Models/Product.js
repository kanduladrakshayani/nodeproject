const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensures that the price is a positive number
  },
  image: {
    type: String, // Path or URL to the product image
    trim: true,
  },
  bestseller: {
    type: Boolean,
    default: false, // Indicates if the product is a bestseller (default: false)
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
