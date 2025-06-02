const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

async function seedCarts() {
  await mongoose.connect(MONGO_URI);

  const users = await User.find();
  const products = await Product.find();

  if (!users.length || !products.length) {
    console.log('No hay usuarios o productos en la base de datos.');
    process.exit();
  }

  const carts = [];
  const now = new Date();

  for (const user of users) {
    // Cada usuario debe tener al menos 1 pedido
    const numPedidos = Math.floor(Math.random() * 3) + 1; // Entre 1 y 3 pedidos por usuario

    for (let i = 0; i < numPedidos; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - Math.floor(Math.random() * 12), 15); // Fecha aleatoria en los últimos 12 meses
      const numProductos = Math.floor(Math.random() * 3) + 1; // Entre 1 y 3 productos por pedido
      const productosPedido = [];

      for (let j = 0; j < numProductos; j++) {
        const product = products[Math.floor(Math.random() * products.length)];
        productosPedido.push({
          productId: product._id,
          quantity: Math.floor(Math.random() * 2) + 1 // Cantidad entre 1 y 2
        });
      }

      carts.push({
        userId: user._id,
        products: productosPedido,
        date,
        estado: Math.random() > 0.5 ? 'completado' : 'pendiente' // Estado aleatorio
      });
    }
  }

  await Cart.insertMany(carts);
  console.log('Carts insertados con estados aleatorios para todos los usuarios.');
  process.exit();
}

seedCarts();