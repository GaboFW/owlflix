const express = require('express');
const router = express.Router();
const {
    insertarCarrito,
    obtenerCarritoId,
    eliminarCarritoId,
    eliminarIdItem,
    putCantidad
} = require('../controllers/carritoController');

router.post('/', insertarCarrito);
router.get('/:id', obtenerCarritoId);
router.delete('/:id', eliminarCarritoId);
router.delete('/:userId/:idItem', eliminarIdItem);
router.put('/:userId/:idItem', putCantidad);

module.exports = router;