const express = require('express');
const router = express.Router();
const { insertarCarrito, obtenerCarritoId, eliminarCarritoId } = require('../controllers/carritoController');

router.post('/', insertarCarrito);
router.get('/:id', obtenerCarritoId);
router.delete('/:id', eliminarCarritoId);

module.exports = router;