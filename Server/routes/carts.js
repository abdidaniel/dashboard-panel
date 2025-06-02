const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

// Crear carrito/pedido (usuario autenticado)
router.post('/', authenticate, async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const carts = await Cart.insertMany(req.body);
      res.status(201).json(carts);
    } else {
      const cart = new Cart(req.body);
      await cart.save();
      res.status(201).json(cart);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todos los carritos/pedidos (solo admin)
router.get('/', authenticate, isAdmin, async (req, res) => {
  const carts = await Cart.find()
    .populate('userId', 'username email')
    .populate('products.productId', 'title price category');
  res.json(carts);
});

// Obtener carrito/pedido por ID (solo admin)
router.get('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id)
      .populate('userId', 'username email')
      .populate('products.productId', 'title price category');
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener carritos/pedidos de un usuario (usuario dueño o admin)
router.get('/user/:userId', authenticate, async (req, res) => {
  if (req.user.id !== req.params.userId && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'No autorizado' });
  }
  try {
    const carts = await Cart.find({ userId: req.params.userId })
      .populate('products.productId', 'title price category');
    res.json(carts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar carrito/pedido (solo admin)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.put('/:id/estado', authenticate, isAdmin, async (req, res) => {
  const { estado } = req.body;
  if (!['pendiente', 'completado'].includes(estado)) {
    return res.status(400).json({ error: 'Estado inválido' });
  }

  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    );
    if (!cart) return res.status(404).json({ error: 'Pedido no encontrado' });
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar carrito/pedido (solo admin)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json({ message: 'Carrito eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate('products.productId', 'title price') // Poblamos solo los campos necesarios
      .populate('userId', 'username'); // Poblamos el usuario para obtener su nombre
    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ventas por mes (solo admin)
router.get('/stats/sales-by-month', authenticate, isAdmin, async (req, res) => {
  try {
    const sales = await Cart.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          totalOrders: { $sum: 1 },
          totalProducts: { $sum: { $sum: "$products.quantity" } }
        }
      },
      { $sort: { "_id": 1 } }
    ]);
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;