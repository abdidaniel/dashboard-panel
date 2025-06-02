const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

// Crear uno o varios productos (solo admin)
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const products = await Product.insertMany(req.body);
      res.status(201).json(products);
    } else {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todas las categorías únicas (público)
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener productos por categoría (público)
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener todos los productos (público)
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Obtener producto por ID (público)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar producto (solo admin)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar producto (solo admin)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Productos más vendidos (top 10) (solo admin)
router.get('/stats/top-products', authenticate, isAdmin, async (req, res) => {
  try {
    const Cart = require('../models/Cart');
    const topProducts = await Cart.aggregate([
      { $unwind: "$products" },
      { $group: {
          _id: "$products.productId",
          totalSold: { $sum: "$products.quantity" }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: 0,
          productId: "$product._id",
          title: "$product.title",
          totalSold: 1
        }
      }
    ]);
    res.json(topProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;