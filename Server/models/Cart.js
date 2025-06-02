const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true }
    }
  ],
  date: { type: Date, default: Date.now },
  estado: { type: String, default: 'pendiente' }
});

module.exports = mongoose.model('Cart', CartSchema);