const express = require('express');
const router = express.Router();
const { insertarCarrito, obtenerCarritoId, eliminarCarritoId, obtenerUsuario } = require('../controllers/carritoController');

router.post('/', insertarCarrito);
router.get('/:id', obtenerCarritoId);
router.get('/user/:id', obtenerUsuario);
router.delete('/id', eliminarCarritoId);

module.exports = router;