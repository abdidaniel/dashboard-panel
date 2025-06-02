const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

// Crear usuario (registro, abierto)
router.post('/', async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      // Si es un array, hashea las contraseñas antes de insertar
      const usersData = await Promise.all(req.body.map(async user => {
        const { password, ...rest } = user;
        const hashedPassword = await bcrypt.hash(password, 10);
        return { ...rest, password: hashedPassword, role: 'user' }; // fuerza rol user
      }));
      const users = await User.insertMany(usersData);
      res.status(201).json(users);
    } else {
      // Si es un solo usuario
      const { password, ...rest } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ ...rest, password: hashedPassword, role: 'user' }); // fuerza rol user
      await user.save();
      res.status(201).json(user);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todos los usuarios (solo admin)
router.get('/', authenticate, isAdmin, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Obtener usuario por ID (solo admin)
router.get('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar usuario (solo admin)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    let update = { ...rest };
    if (password) {
      update.password = await bcrypt.hash(password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar usuario (solo admin)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Usuarios registrados por mes (solo admin)
router.get('/stats/registered-by-month', authenticate, isAdmin, async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cambiar contraseña
router.put('/:id/change-password', authenticate, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    // Buscar el usuario por ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña actual
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña actual incorrecta' });
    }

    // Actualizar la contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;