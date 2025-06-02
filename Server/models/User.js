const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true },
  password: { type: String, required: true },
  name: {
    firstname: String,
    lastname: String
  },
  address: {
    city: String,
    street: String,
    number: Number,
    zipcode: String,
    geolocation: {
      lat: String,
      long: String
    }
  },
  phone: String,
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

module.exports = mongoose.model('User', userSchema);