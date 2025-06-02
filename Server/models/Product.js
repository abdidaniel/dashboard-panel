const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: { type: String, required: true },
  image: String,
  rating: {
    rate: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);