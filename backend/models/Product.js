const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  weight: { 
    type: String,
    required: true 
  },
  rating: { 
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  image: {
    type: String
  },
  category: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
